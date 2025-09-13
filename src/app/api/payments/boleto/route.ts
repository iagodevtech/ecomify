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

    const { orderId, amount, currency } = await request.json()

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: 'Order ID and amount are required' },
        { status: 400 }
      )
    }

    // Generate boleto data
    const boletoNumber = generateBoletoNumber()
    const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    const barcode = generateBarcode(boletoNumber, amount, dueDate)

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase não disponível' },
        { status: 503 }
      )
    }

    // Update order with boleto data
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'pending',
        payment_data: {
          boleto_number: boletoNumber,
          barcode,
          due_date: dueDate.toISOString(),
          amount
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Error updating order with boleto data:', updateError)
    }

    return NextResponse.json({
      success: true,
      boletoNumber,
      barcode,
      dueDate: dueDate.toISOString(),
      boletoUrl: `/boleto/${boletoNumber}`,
      amount
    })
  } catch (error) {
    console.error('Error creating boleto payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateBoletoNumber(): string {
  // Generate a boleto number (simplified)
  const bankCode = '341' // Itaú
  const currencyCode = '9'
  const dueDate = Date.now().toString().slice(-8)
  const randomNumber = Math.random().toString().slice(2, 12)
  
  return `${bankCode}${currencyCode}${dueDate}${randomNumber}`
}

function generateBarcode(boletoNumber: string, amount: number, dueDate: Date): string {
  // Generate barcode (simplified)
  const bankCode = '341'
  const currencyCode = '9'
  const dueDateStr = dueDate.toISOString().slice(0, 10).replace(/-/g, '')
  const amountStr = Math.round(amount * 100).toString().padStart(10, '0')
  const randomPart = Math.random().toString().slice(2, 12)
  
  return `${bankCode}${currencyCode}${dueDateStr}${amountStr}${randomPart}`
}
