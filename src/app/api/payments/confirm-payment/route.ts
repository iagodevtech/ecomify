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

    const { payment_intent_id } = await request.json()

    if (!payment_intent_id) {
      return NextResponse.json(
        { error: 'ID do pagamento é obrigatório' },
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

    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id)

    if (!paymentIntent) {
      return NextResponse.json(
        { error: 'Pagamento não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      status: paymentIntent.status,
      payment_intent: paymentIntent
    })

  } catch (error) {
    console.error('Error confirming payment:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
