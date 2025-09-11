'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  CreditCard, 
  MapPin, 
  User, 
  Lock, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Truck,
  Shield,
  Zap,
  Gift,
  Clock
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/providers'
import { useAuth } from '@/components/providers'
import { formatPrice, calculateShipping, calculatePaymentFee } from '@/lib/stripe'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil',
    
    // Payment
    paymentMethod: 'pix',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    
    // Billing
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    
    // Additional
    notes: '',
    newsletter: true,
    terms: false
  })

  const [shippingMethod, setShippingMethod] = useState('standard')
  const [orderId, setOrderId] = useState('')

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Entrega Padrão',
      description: '5-7 dias úteis',
      price: 15.90,
      freeFrom: 199
    },
    {
      id: 'express',
      name: 'Entrega Expressa',
      description: '2-3 dias úteis',
      price: 29.90,
      freeFrom: 299
    },
    {
      id: 'same_day',
      name: 'Entrega no Mesmo Dia',
      description: 'Disponível em algumas regiões',
      price: 49.90,
      freeFrom: 499
    }
  ]

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo',
      fee: 0,
      icon: '💳'
    },
    {
      id: 'credit_card',
      name: 'Cartão de Crédito',
      description: 'Visa, Mastercard, Elo',
      fee: 0.0299,
      icon: '💳'
    },
    {
      id: 'debit_card',
      name: 'Cartão de Débito',
      description: 'Visa, Mastercard, Elo',
      fee: 0.0199,
      icon: '💳'
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      description: 'Pagamento via boleto',
      fee: 0,
      icon: '📄'
    }
  ]

  const selectedShipping = shippingOptions.find(s => s.id === shippingMethod)!
  const selectedPayment = paymentMethods.find(p => p.id === formData.paymentMethod)!
  
  const shippingCost = total >= selectedShipping.freeFrom ? 0 : selectedShipping.price
  const paymentFee = calculatePaymentFee(total + shippingCost, formData.paymentMethod as any)
  const finalTotal = total + shippingCost + paymentFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitOrder = async () => {
    setLoading(true)
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate order ID
      const newOrderId = `ECM${Date.now().toString().slice(-6)}`
      setOrderId(newOrderId)
      
      // Clear cart
      clearCart()
      
      // Show success
      setOrderComplete(true)
    } catch (error) {
      console.error('Error processing order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-12 h-12 text-cyber-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Carrinho Vazio</h2>
            <p className="text-cyber-400 mb-6">Adicione produtos ao carrinho para continuar</p>
            <Button
              onClick={() => router.push('/produtos')}
              className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
            >
              Continuar Comprando
            </Button>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (orderComplete) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mb-8">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">Pedido Confirmado!</h1>
            <p className="text-cyber-400 text-xl mb-6">
              Seu pedido foi processado com sucesso
            </p>
            
            <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Detalhes do Pedido</h2>
              <div className="space-y-2 text-cyber-300">
                <p><span className="text-white font-medium">Número do Pedido:</span> {orderId}</p>
                <p><span className="text-white font-medium">Total:</span> {formatPrice(finalTotal)}</p>
                <p><span className="text-white font-medium">Forma de Pagamento:</span> {selectedPayment.name}</p>
                <p><span className="text-white font-medium">Entrega:</span> {selectedShipping.name}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/dashboard')}
                className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
              >
                Ver Pedidos
              </Button>
              <Button
                onClick={() => router.push('/produtos')}
                variant="outline"
                className="border-cyber-500/30 text-cyber-400 hover:text-white"
              >
                Continuar Comprando
              </Button>
            </div>
          </motion.div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="mb-4 border-cyber-500/30 text-cyber-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-4xl font-bold font-cyber mb-2">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Finalizar Compra
              </span>
            </h1>
            <p className="text-cyber-400">
              Complete seu pedido de forma segura e rápida
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  {[
                    { step: 1, title: 'Entrega', icon: MapPin },
                    { step: 2, title: 'Pagamento', icon: CreditCard },
                    { step: 3, title: 'Confirmação', icon: CheckCircle }
                  ].map((step, index) => (
                    <div key={step.step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step.step
                          ? 'bg-neon-blue text-white'
                          : 'bg-cyber-700 text-cyber-400'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <span className={`ml-2 font-medium ${
                        currentStep >= step.step ? 'text-white' : 'text-cyber-400'
                      }`}>
                        {step.title}
                      </span>
                      {index < 2 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          currentStep > step.step ? 'bg-neon-blue' : 'bg-cyber-700'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Shipping Address */}
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-neon-blue" />
                      Endereço de Entrega
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">Nome *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">Sobrenome *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          placeholder="Seu sobrenome"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">Telefone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-cyber-300 text-sm font-medium mb-2">Endereço *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          placeholder="Rua, número, complemento"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">Cidade *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          placeholder="Sua cidade"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">Estado *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        >
                          <option value="">Selecione</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="PR">Paraná</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="BA">Bahia</option>
                          <option value="GO">Goiás</option>
                          <option value="PE">Pernambuco</option>
                          <option value="CE">Ceará</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">CEP *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Truck className="w-6 h-6 text-neon-blue" />
                      Método de Entrega
                    </h2>
                    
                    <div className="space-y-4">
                      {shippingOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => setShippingMethod(option.id)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            shippingMethod === option.id
                              ? 'border-neon-blue bg-neon-blue/10'
                              : 'border-cyber-500/30 hover:border-cyber-400/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-bold">{option.name}</h3>
                              <p className="text-cyber-400">{option.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold">
                                {total >= option.freeFrom ? 'Grátis' : formatPrice(option.price)}
                              </p>
                              {total >= option.freeFrom && (
                                <p className="text-neon-green text-sm">Frete grátis!</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Payment Method */}
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-neon-blue" />
                      Método de Pagamento
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? 'border-neon-blue bg-neon-blue/10'
                              : 'border-cyber-500/30 hover:border-cyber-400/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                              <h3 className="text-white font-bold">{method.name}</h3>
                              <p className="text-cyber-400 text-sm">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Details (if credit/debit card) */}
                  {(formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') && (
                    <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Dados do Cartão</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">Número do Cartão *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">Nome no Cartão *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                            placeholder="Nome como está no cartão"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">Validade *</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">CVV *</label>
                            <input
                              type="text"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                              placeholder="000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terms */}
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={formData.terms}
                          onChange={handleInputChange}
                          className="mt-1 w-5 h-5 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue"
                        />
                        <span className="text-cyber-300">
                          Eu concordo com os{' '}
                          <a href="/terms" className="text-neon-blue hover:text-neon-purple">
                            Termos de Uso
                          </a>{' '}
                          e{' '}
                          <a href="/privacy" className="text-neon-blue hover:text-neon-purple">
                            Política de Privacidade
                          </a>
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                          className="mt-1 w-5 h-5 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue"
                        />
                        <span className="text-cyber-300">
                          Quero receber ofertas e novidades por email
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-neon-blue" />
                      Confirmação do Pedido
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Order Summary */}
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">Resumo do Pedido</h3>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-cyber-300">
                              <span>{item.name} x {item.quantity}</span>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Shipping Info */}
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">Entrega</h3>
                        <div className="text-cyber-300 space-y-1">
                          <p>{formData.firstName} {formData.lastName}</p>
                          <p>{formData.address}</p>
                          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p>{selectedShipping.name} - {selectedShipping.description}</p>
                        </div>
                      </div>
                      
                      {/* Payment Info */}
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">Pagamento</h3>
                        <div className="text-cyber-300">
                          <p>{selectedPayment.name}</p>
                          {formData.paymentMethod === 'credit_card' && (
                            <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button
                    onClick={handlePrevStep}
                    variant="outline"
                    className="border-cyber-500/30 text-cyber-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                )}
                
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <Button
                      onClick={handleNextStep}
                      className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={loading || !formData.terms}
                      className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processando...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Finalizar Pedido
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-cyber-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm line-clamp-2">{item.name}</h3>
                        <p className="text-cyber-400 text-xs">Qtd: {item.quantity}</p>
                      </div>
                      <span className="text-white font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 border-t border-cyber-700 pt-4">
                  <div className="flex justify-between text-cyber-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-cyber-300">
                    <span>Frete</span>
                    <span>{shippingCost === 0 ? 'Grátis' : formatPrice(shippingCost)}</span>
                  </div>
                  {paymentFee > 0 && (
                    <div className="flex justify-between text-cyber-300">
                      <span>Taxa de Pagamento</span>
                      <span>{formatPrice(paymentFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-lg border-t border-cyber-700 pt-3">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
                
                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-cyber-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-neon-green" />
                    <span className="text-neon-green text-sm font-medium">Compra 100% Segura</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-neon-blue" />
                    <span className="text-neon-blue text-sm font-medium">Dados Criptografados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-neon-purple" />
                    <span className="text-neon-purple text-sm font-medium">Garantia Estendida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}