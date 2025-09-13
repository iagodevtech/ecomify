import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient, isSupabaseAvailable } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseAvailable()) {
      return NextResponse.json(
        { error: 'Supabase não está configurado' },
        { status: 503 }
      )
    }

    const {
      user_id,
      items,
      shipping_address,
      billing_address,
      payment_method,
      payment_intent_id,
      shipping_method,
      total,
      subtotal,
      shipping_cost,
      payment_fee
    } = await request.json()

    // Validate required fields
    if (!user_id || !items || !shipping_address || !payment_method || !total) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase não disponível' },
        { status: 503 }
      )
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id,
        status: 'pending',
        total,
        shipping_address,
        billing_address,
        payment_method,
        payment_status: 'pending',
        payment_intent_id,
        shipping_method,
        subtotal,
        shipping_cost,
        payment_fee
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return NextResponse.json(
        { error: 'Erro ao criar pedido' },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      return NextResponse.json(
        { error: 'Erro ao criar itens do pedido' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      order_id: order.id,
      order_number: `ECM${order.id.slice(-6)}`,
      status: order.status
    })

  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
