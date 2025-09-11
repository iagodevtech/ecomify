'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export interface PaymentData {
  amount: number
  currency?: string
  paymentMethod: string
  metadata?: Record<string, any>
}

export interface PaymentResult {
  success: boolean
  payment_intent_id?: string
  error?: string
}

export function usePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPaymentIntent = async (data: PaymentData): Promise<PaymentResult> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar pagamento')
      }

      return {
        success: true,
        payment_intent_id: result.payment_intent_id
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  const confirmPayment = async (paymentIntentId: string): Promise<PaymentResult> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_intent_id: paymentIntentId }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao confirmar pagamento')
      }

      return {
        success: result.status === 'succeeded',
        payment_intent_id: paymentIntentId
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  const processPixPayment = async (data: PaymentData): Promise<PaymentResult> => {
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe não carregado')
      }

      // Create payment intent
      const paymentResult = await createPaymentIntent(data)
      if (!paymentResult.success || !paymentResult.payment_intent_id) {
        throw new Error(paymentResult.error || 'Erro ao criar pagamento')
      }

      // Confirm PIX payment
      const { error } = await stripe.confirmPixPayment(
        paymentResult.payment_intent_id,
        {
          payment_method: {
            pix: {
              // PIX doesn't require additional parameters
            }
          }
        }
      )

      if (error) {
        throw new Error(error.message)
      }

      return {
        success: true,
        payment_intent_id: paymentResult.payment_intent_id
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  const processCardPayment = async (
    data: PaymentData,
    cardElement: any
  ): Promise<PaymentResult> => {
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe não carregado')
      }

      // Create payment intent
      const paymentResult = await createPaymentIntent(data)
      if (!paymentResult.success || !paymentResult.payment_intent_id) {
        throw new Error(paymentResult.error || 'Erro ao criar pagamento')
      }

      // Confirm card payment
      const { error } = await stripe.confirmCardPayment(
        paymentResult.payment_intent_id,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.metadata?.cardName || '',
              email: data.metadata?.email || '',
            },
          }
        }
      )

      if (error) {
        throw new Error(error.message)
      }

      return {
        success: true,
        payment_intent_id: paymentResult.payment_intent_id
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  const processBoletoPayment = async (data: PaymentData): Promise<PaymentResult> => {
    setLoading(true)
    setError(null)

    try {
      // For boleto, we'll create a payment intent and return the boleto URL
      const paymentResult = await createPaymentIntent(data)
      if (!paymentResult.success || !paymentResult.payment_intent_id) {
        throw new Error(paymentResult.error || 'Erro ao criar pagamento')
      }

      // In a real implementation, you would generate a boleto URL here
      // For now, we'll simulate success
      return {
        success: true,
        payment_intent_id: paymentResult.payment_intent_id
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    createPaymentIntent,
    confirmPayment,
    processPixPayment,
    processCardPayment,
    processBoletoPayment,
    clearError: () => setError(null)
  }
}
