import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

// Check if Stripe is configured
const isStripeConfigured = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
  process.env.STRIPE_SECRET_KEY &&
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_') &&
  process.env.STRIPE_SECRET_KEY.startsWith('sk_')

// Client-side Stripe
export const stripePromise = isStripeConfigured 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  : null

// Server-side Stripe
export const stripe = isStripeConfigured
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    })
  : null

// Helper function to check if Stripe is available
export const isStripeAvailable = () => !!stripe

// Helper function to get Stripe client with error handling
export const getStripeClient = () => {
  if (!stripe) {
    console.warn('Stripe não está configurado. Verifique as variáveis de ambiente.')
    return null
  }
  return stripe
}

// Payment methods configuration
export const paymentMethods = {
  pix: {
    name: 'PIX',
    icon: '💳',
    description: 'Pagamento instantâneo via PIX',
    fee: 0,
    processingTime: 'Imediato'
  },
  credit_card: {
    name: 'Cartão de Crédito',
    icon: '💳',
    description: 'Visa, Mastercard, Elo, American Express',
    fee: 0.0299,
    processingTime: 'Imediato'
  },
  debit_card: {
    name: 'Cartão de Débito',
    icon: '💳',
    description: 'Visa, Mastercard, Elo',
    fee: 0.0199,
    processingTime: 'Imediato'
  },
  boleto: {
    name: 'Boleto Bancário',
    icon: '📄',
    description: 'Pagamento via boleto bancário',
    fee: 0,
    processingTime: '1-3 dias úteis'
  }
}

// Shipping options
export const shippingOptions = {
  standard: {
    name: 'Entrega Padrão',
    description: '5-7 dias úteis',
    price: 15.90,
    freeFrom: 199
  },
  express: {
    name: 'Entrega Expressa',
    description: '2-3 dias úteis',
    price: 29.90,
    freeFrom: 299
  },
  same_day: {
    name: 'Entrega no Mesmo Dia',
    description: 'Disponível em algumas regiões',
    price: 49.90,
    freeFrom: 499
  }
}

// Calculate shipping cost
export function calculateShipping(subtotal: number, method: keyof typeof shippingOptions): number {
  const option = shippingOptions[method]
  return subtotal >= option.freeFrom ? 0 : option.price
}

// Calculate payment fee
export function calculatePaymentFee(amount: number, method: keyof typeof paymentMethods): number {
  const option = paymentMethods[method]
  return amount * option.fee
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

// Format price (alias for formatCurrency)
export function formatPrice(amount: number): string {
  return formatCurrency(amount)
}
