'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  CreditCard, 
  Smartphone, 
  FileText, 
  Paypal,
  ArrowLeft,
  Check,
  AlertCircle,
  MapPin,
  User,
  Mail,
  Phone,
  Lock
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useCart } from '@/components/providers'
import { usePayment } from '@/hooks/use-payment'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, shipping, discount, total } = useCart()
  const { loading, error, processPayment } = usePayment()
  
  const [step, setStep] = useState<'address' | 'payment' | 'review' | 'processing'>('address')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto' | 'paypal'>('card')
  const [formData, setFormData] = useState({
    shippingAddress: {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'Brasil'
    },
    billingAddress: {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'Brasil'
    },
    cardData: {
      number: '',
      expiry: '',
      cvc: '',
      name: ''
    },
    useSameAddress: true
  })

  const paymentMethods = [
    {
      id: 'card',
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Visa, Mastercard, Elo'
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: Smartphone,
      description: 'Pagamento instantâneo'
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      icon: FileText,
      description: 'Vencimento em 3 dias'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Paypal,
      description: 'Pague com sua conta PayPal'
    }
  ]

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    if (step === 'address') {
      setStep('payment')
    } else if (step === 'payment') {
      setStep('review')
    }
  }

  const handleBack = () => {
    if (step === 'payment') {
      setStep('address')
    } else if (step === 'review') {
      setStep('payment')
    }
  }

  const handleSubmit = async () => {
    setStep('processing')
    
    const paymentData = {
      paymentMethod,
      cardData: paymentMethod === 'card' ? formData.cardData : undefined,
      shippingAddress: formData.shippingAddress,
      billingAddress: formData.useSameAddress ? formData.shippingAddress : formData.billingAddress
    }

    const result = await processPayment(paymentData)
    
    if (result.success) {
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl
      } else {
        router.push(`/pedido/${result.orderId}`)
      }
    } else {
      setStep('review')
    }
  }

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-dark-900">
          <Header />
          <div className="pt-24 pb-16 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Carrinho Vazio</h1>
              <p className="text-cyber-400 mb-6">Adicione produtos ao carrinho antes de finalizar a compra</p>
              <Button asChild className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                <Link href="/">Continuar Comprando</Link>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        {/* Progress Steps */}
        <section className="pt-24 pb-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {[
                { id: 'address', label: 'Endereço', icon: MapPin },
                { id: 'payment', label: 'Pagamento', icon: CreditCard },
                { id: 'review', label: 'Revisão', icon: Check }
              ].map((stepItem, index) => {
                const isActive = step === stepItem.id
                const isCompleted = ['address', 'payment', 'review'].indexOf(step) > index
                
                return (
                  <div key={stepItem.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isActive || isCompleted 
                        ? 'border-neon-blue bg-neon-blue text-white' 
                        : 'border-cyber-500 text-cyber-500'
                    }`}>
                      <stepItem.icon className="w-5 h-5" />
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      isActive || isCompleted ? 'text-neon-blue' : 'text-cyber-500'
                    }`}>
                      {stepItem.label}
                    </span>
                    {index < 2 && (
                      <div className={`w-8 h-0.5 mx-4 ${
                        isCompleted ? 'bg-neon-blue' : 'bg-cyber-500'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'address' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Endereço de Entrega</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-cyber-300 text-sm mb-2">Nome Completo</label>
                      <input
                        type="text"
                        value={formData.shippingAddress.name}
                        onChange={(e) => handleInputChange('shippingAddress', 'name', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-cyber-300 text-sm mb-2">Endereço</label>
                      <input
                        type="text"
                        value={formData.shippingAddress.street}
                        onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-cyber-300 text-sm mb-2">Cidade</label>
                        <input
                          type="text"
                          value={formData.shippingAddress.city}
                          onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                          className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          placeholder="Cidade"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm mb-2">Estado</label>
                        <input
                          type="text"
                          value={formData.shippingAddress.state}
                          onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                          className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          placeholder="Estado"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-cyber-300 text-sm mb-2">CEP</label>
                      <input
                        type="text"
                        value={formData.shippingAddress.zip}
                        onChange={(e) => handleInputChange('shippingAddress', 'zip', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Payment Methods */}
                  <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Método de Pagamento</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id as any)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === method.id
                              ? 'border-neon-blue bg-neon-blue/10'
                              : 'border-cyber-500/30 hover:border-cyber-500/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <method.icon className={`w-6 h-6 ${
                              paymentMethod === method.id ? 'text-neon-blue' : 'text-cyber-400'
                            }`} />
                            <div className="text-left">
                              <div className={`font-medium ${
                                paymentMethod === method.id ? 'text-neon-blue' : 'text-white'
                              }`}>
                                {method.name}
                              </div>
                              <div className="text-cyber-400 text-sm">{method.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Dados do Cartão</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-cyber-300 text-sm mb-2">Número do Cartão</label>
                          <input
                            type="text"
                            value={formData.cardData.number}
                            onChange={(e) => handleInputChange('cardData', 'number', e.target.value)}
                            className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cyber-300 text-sm mb-2">Validade</label>
                            <input
                              type="text"
                              value={formData.cardData.expiry}
                              onChange={(e) => handleInputChange('cardData', 'expiry', e.target.value)}
                              className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-cyber-300 text-sm mb-2">CVV</label>
                            <input
                              type="text"
                              value={formData.cardData.cvc}
                              onChange={(e) => handleInputChange('cardData', 'cvc', e.target.value)}
                              className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                              placeholder="000"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-cyber-300 text-sm mb-2">Nome no Cartão</label>
                          <input
                            type="text"
                            value={formData.cardData.name}
                            onChange={(e) => handleInputChange('cardData', 'name', e.target.value)}
                            className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                            placeholder="Nome como está no cartão"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Revisar Pedido</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Endereço de Entrega</h3>
                      <div className="bg-dark-700/50 rounded-lg p-4">
                        <p className="text-white">{formData.shippingAddress.name}</p>
                        <p className="text-cyber-300">{formData.shippingAddress.street}</p>
                        <p className="text-cyber-300">
                          {formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.zip}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Método de Pagamento</h3>
                      <div className="bg-dark-700/50 rounded-lg p-4">
                        <p className="text-white">
                          {paymentMethods.find(m => m.id === paymentMethod)?.name}
                        </p>
                        <p className="text-cyber-300">
                          {paymentMethods.find(m => m.id === paymentMethod)?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'processing' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 text-center"
                >
                  <div className="animate-spin w-12 h-12 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h2 className="text-2xl font-bold text-white mb-2">Processando Pagamento</h2>
                  <p className="text-cyber-300">Aguarde enquanto processamos seu pagamento...</p>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              {step !== 'processing' && (
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                    disabled={step === 'address'}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  
                  {step === 'review' ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                    >
                      {loading ? 'Processando...' : 'Finalizar Pedido'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      Continuar
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h3>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-cyber-400 text-xs">Qtd: {item.quantity}</p>
                      </div>
                      <p className="text-neon-green font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-cyber-500/30 pt-4">
                  <div className="flex justify-between text-cyber-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-cyber-300">
                    <span>Frete</span>
                    <span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-neon-green">
                      <span>Desconto</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-lg border-t border-cyber-500/30 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}