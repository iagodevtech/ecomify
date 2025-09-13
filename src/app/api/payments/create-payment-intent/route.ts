import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient, isStripeAvailable } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeAvailable()) {
      return NextResponse.json(
        { error: 'Stripe não está configurado' },
        { status: 503 }
      )
    }

    const { amount, currency = 'brl', paymentMethod, metadata } = await request.json()

    // Validate amount
    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Valor mínimo de R$ 0,50' },
        { status: 400 }
      )
    }

    const stripe = getStripeClient()
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe não disponível' },
        { status: 503 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method_types: paymentMethod === 'pix' ? ['pix'] : ['card'],
      metadata: {
        ...metadata,
        payment_method: paymentMethod
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    })

  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
