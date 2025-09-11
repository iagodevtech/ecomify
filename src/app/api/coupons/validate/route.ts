import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { code, userId, subtotal } = await request.json()

    if (!code) {
      return NextResponse.json(
        { valid: false, message: 'Código do cupom é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar cupom no banco de dados
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !coupon) {
      return NextResponse.json({
        valid: false,
        message: 'Cupom não encontrado ou inativo'
      })
    }

    // Verificar se o cupom ainda é válido
    const now = new Date()
    const startDate = new Date(coupon.start_date)
    const endDate = new Date(coupon.end_date)

    if (now < startDate) {
      return NextResponse.json({
        valid: false,
        message: 'Cupom ainda não está ativo'
      })
    }

    if (now > endDate) {
      return NextResponse.json({
        valid: false,
        message: 'Cupom expirado'
      })
    }

    // Verificar valor mínimo
    if (coupon.minimum_amount && subtotal < coupon.minimum_amount) {
      return NextResponse.json({
        valid: false,
        message: `Valor mínimo de R$ ${coupon.minimum_amount.toFixed(2)} para usar este cupom`
      })
    }

    // Verificar se o usuário já usou este cupom
    if (userId) {
      const { data: usage, error: usageError } = await supabase
        .from('coupon_usage')
        .select('*')
        .eq('user_id', userId)
        .eq('coupon_id', coupon.id)

      if (usageError) {
        console.error('Error checking coupon usage:', usageError)
      }

      if (usage && usage.length > 0) {
        return NextResponse.json({
          valid: false,
          message: 'Você já usou este cupom'
        })
      }
    }

    // Calcular desconto
    let discount = 0
    if (coupon.discount_type === 'percentage') {
      discount = (subtotal * coupon.discount_value) / 100
      if (coupon.max_discount && discount > coupon.max_discount) {
        discount = coupon.max_discount
      }
    } else if (coupon.discount_type === 'fixed') {
      discount = coupon.discount_value
    }

    return NextResponse.json({
      valid: true,
      discount: Math.round(discount * 100) / 100, // Arredondar para 2 casas decimais
      coupon: {
        id: coupon.id,
        code: coupon.code,
        name: coupon.name,
        description: coupon.description
      }
    })
  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { valid: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
