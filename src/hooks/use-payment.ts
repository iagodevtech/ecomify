'use client'

import { useState } from 'react'
import { useCart } from '@/components/providers'
import { useOrders } from '@/components/providers'
import { useAuth } from '@/components/providers'

interface PaymentData {
  paymentMethod: 'card' | 'pix' | 'boleto' | 'paypal'
  cardData?: {
    number: string
    expiry: string
    cvc: string
    name: string
  }
  billingAddress?: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  couponCode?: string
}

interface PaymentResult {
  success: boolean
  orderId?: string
  paymentIntentId?: string
  error?: string
  redirectUrl?: string
}

export function usePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { items, subtotal, shipping, discount, total, clearCart } = useCart()
  const { createOrder } = useOrders()
  const { user } = useAuth()

  const processPayment = async (paymentData: PaymentData): Promise<PaymentResult> => {
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    if (items.length === 0) {
      return { success: false, error: 'Carrinho vazio' }
    }

    try {
      setLoading(true)
      setError(null)

      // Create order first
      const orderData = {
        user_id: user.id,
        status: 'pending' as const,
        payment_status: 'pending' as const,
        payment_method: paymentData.paymentMethod,
        subtotal,
        shipping,
        discount,
        total,
        shipping_address: paymentData.shippingAddress,
        billing_address: paymentData.billingAddress,
        items: items.map(item => ({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          brand: item.brand
        }))
      }

      const orderResult = await createOrder(orderData)
      if (!orderResult.success || !orderResult.order) {
        return { success: false, error: orderResult.error || 'Erro ao criar pedido' }
      }

      // Process payment based on method
      let paymentResult: PaymentResult

      switch (paymentData.paymentMethod) {
        case 'card':
          paymentResult = await processCardPayment(orderResult.order.id, paymentData.cardData!)
          break
        case 'pix':
          paymentResult = await processPixPayment(orderResult.order.id)
          break
        case 'boleto':
          paymentResult = await processBoletoPayment(orderResult.order.id)
          break
        case 'paypal':
          paymentResult = await processPayPalPayment(orderResult.order.id)
          break
        default:
          return { success: false, error: 'Método de pagamento não suportado' }
      }

      if (paymentResult.success) {
        // Clear cart on successful payment
        clearCart()
      }

      return paymentResult
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no processamento do pagamento'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const processCardPayment = async (orderId: string, cardData: PaymentData['cardData']): Promise<PaymentResult> => {
    try {
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total,
          currency: 'brl',
          paymentMethod: 'card',
          cardData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Erro no processamento do cartão' }
      }

      // Confirm payment with Stripe
      const confirmResponse = await fetch('/api/payments/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId: data.paymentIntentId,
          orderId
        })
      })

      const confirmData = await confirmResponse.json()

      if (!confirmResponse.ok) {
        return { success: false, error: confirmData.error || 'Erro na confirmação do pagamento' }
      }

      return {
        success: true,
        orderId,
        paymentIntentId: data.paymentIntentId
      }
    } catch (error) {
      return { success: false, error: 'Erro no processamento do cartão' }
    }
  }

  const processPixPayment = async (orderId: string): Promise<PaymentResult> => {
    try {
      const response = await fetch('/api/payments/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total,
          currency: 'brl'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Erro no processamento do PIX' }
      }

      return {
        success: true,
        orderId,
        redirectUrl: data.pixUrl
      }
    } catch (error) {
      return { success: false, error: 'Erro no processamento do PIX' }
    }
  }

  const processBoletoPayment = async (orderId: string): Promise<PaymentResult> => {
    try {
      const response = await fetch('/api/payments/boleto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total,
          currency: 'brl'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Erro no processamento do boleto' }
      }

      return {
        success: true,
        orderId,
        redirectUrl: data.boletoUrl
      }
    } catch (error) {
      return { success: false, error: 'Erro no processamento do boleto' }
    }
  }

  const processPayPalPayment = async (orderId: string): Promise<PaymentResult> => {
    try {
      const response = await fetch('/api/payments/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total,
          currency: 'brl'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Erro no processamento do PayPal' }
      }

      return {
        success: true,
        orderId,
        redirectUrl: data.paypalUrl
      }
    } catch (error) {
      return { success: false, error: 'Erro no processamento do PayPal' }
    }
  }

  return {
    loading,
    error,
    processPayment
  }
}