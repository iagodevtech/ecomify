'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Smartphone, 
  FileText, 
  Shield, 
  Check,
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Truck,
  Gift,
  AlertCircle
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

const paymentMethods = [
  {
    id: 'pix',
    name: 'PIX',
    description: 'Pagamento instantâneo',
    icon: Zap,
    color: 'from-neon-green to-cyber-600',
    isRecommended: true
  },
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    description: 'Visa, Mastercard, Elo',
    icon: CreditCard,
    color: 'from-neon-blue to-cyber-600',
    isRecommended: false
  },
  {
    id: 'debit_card',
    name: 'Cartão de Débito',
    description: 'Débito online',
    icon: CreditCard,
    color: 'from-neon-purple to-cyber-600',
    isRecommended: false
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    description: 'Pagamento em até 3 dias',
    icon: FileText,
    color: 'from-neon-orange to-cyber-600',
    isRecommended: false
  }
]

const shippingMethods = [
  {
    id: 'standard',
    name: 'Entrega Padrão',
    description: '5-7 dias úteis',
    cost: 0,
    isFree: true
  },
  {
    id: 'express',
    name: 'Entrega Expressa',
    description: '2-3 dias úteis',
    cost: 25,
    isFree: false
  },
  {
    id: 'same_day',
    name: 'Entrega no Mesmo Dia',
    description: 'Disponível em SP e RJ',
    cost: 50,
    isFree: false
  }
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pix')
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('standard')
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil'
  })

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil'
  })

  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: 1
  })

  const [pixInfo, setPixInfo] = useState({
    key: '',
    type: 'cpf'
  })

  // Mock order data
  const orderData = {
    subtotal: 26997,
    shipping: selectedShippingMethod === 'standard' ? 0 : 
              selectedShippingMethod === 'express' ? 25 : 50,
    tax: 2699.7,
    total: 29721.7
  }

  const steps = [
    { id: 1, name: 'Entrega', description: 'Informações de entrega' },
    { id: 2, name: 'Pagamento', description: 'Método de pagamento' },
    { id: 3, name: 'Confirmação', description: 'Revisar pedido' }
  ]

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

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    setOrderPlaced(true)
    setIsProcessing(false)
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center"
              >
                <Check className="w-16 h-16 text-white" />
              </motion.div>

              <h1 className="text-4xl font-bold font-cyber mb-4">
                <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                  Pedido Confirmado!
                </span>
              </h1>

              <p className="text-xl text-cyber-400 mb-8">
                Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
              </p>

              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Detalhes do Pedido</h3>
                <div className="space-y-2 text-cyber-300">
                  <div className="flex justify-between">
                    <span>Número do Pedido:</span>
                    <span className="text-neon-blue font-mono">#ECM2024001</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="text-white font-bold">{formatPrice(orderData.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Método de Pagamento:</span>
                    <span className="text-neon-green">PIX</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Previsão de Entrega:</span>
                    <span>5-7 dias úteis</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-8 py-4 text-lg font-cyber">
                  Acompanhar Pedido
                </Button>
                <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue px-8 py-4 text-lg font-cyber">
                  Continuar Comprando
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              className="text-cyber-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Carrinho
            </Button>
            
            <div>
              <h1 className="text-4xl font-bold font-cyber">
                <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Finalizar Compra
                </span>
              </h1>
              <p className="text-cyber-400">
                Complete seu pedido de forma segura e rápida
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep >= step.id
                      ? 'bg-neon-blue border-neon-blue text-white'
                      : 'border-cyber-500 text-cyber-500'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-bold">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${
                      currentStep >= step.id ? 'text-white' : 'text-cyber-500'
                    }`}>
                      {step.name}
                    </p>
                    <p className="text-sm text-cyber-400">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-neon-blue' : 'bg-cyber-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-neon-blue" />
                    Informações de Entrega
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Sobrenome *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="Seu sobrenome"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Telefone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        CEP *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.cep}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, cep: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="00000-000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Rua *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.street}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="Nome da rua"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Número *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.number}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, number: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="123"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.complement}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, complement: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="Apartamento, sala, etc."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.neighborhood}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, neighborhood: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="Nome do bairro"
                      />
                    </div>
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="Nome da cidade"
                      />
                    </div>
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Estado *
                      </label>
                      <select
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                      >
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="PR">Paraná</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Payment Methods */}
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-neon-blue" />
                      Método de Pagamento
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            selectedPaymentMethod === method.id
                              ? 'border-neon-blue bg-neon-blue/10'
                              : 'border-cyber-500/30 hover:border-cyber-400'
                          }`}
                        >
                          {method.isRecommended && (
                            <Badge className="absolute -top-2 -right-2 bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                              Recomendado
                            </Badge>
                          )}
                          
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                              <method.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-bold text-white">{method.name}</h3>
                              <p className="text-cyber-400 text-sm">{method.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Details */}
                  {selectedPaymentMethod === 'credit_card' && (
                    <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-6">Dados do Cartão</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Número do Cartão *
                          </label>
                          <input
                            type="text"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>

                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Nome no Cartão *
                          </label>
                          <input
                            type="text"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                            placeholder="Nome como está no cartão"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">
                              Validade *
                            </label>
                            <input
                              type="text"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                              className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                              className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                              placeholder="000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Parcelas
                          </label>
                          <select
                            value={cardInfo.installments}
                            onChange={(e) => setCardInfo({ ...cardInfo, installments: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                              <option key={num} value={num}>
                                {num}x de {formatPrice(orderData.total / num)} sem juros
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === 'pix' && (
                    <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-6">Pagamento PIX</h3>
                      
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-neon-green to-cyber-600 rounded-2xl flex items-center justify-center">
                          <Zap className="w-16 h-16 text-white" />
                        </div>
                        
                        <p className="text-cyber-400 mb-4">
                          Após confirmar o pedido, você receberá o código PIX para pagamento instantâneo
                        </p>
                        
                        <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-4">
                          <p className="text-neon-green text-sm font-medium">
                            ✓ Pagamento instantâneo e seguro
                          </p>
                          <p className="text-neon-green text-sm font-medium">
                            ✓ Sem taxas adicionais
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Check className="w-6 h-6 text-neon-blue" />
                    Revisar Pedido
                  </h2>

                  <div className="space-y-6">
                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Endereço de Entrega</h3>
                      <div className="bg-dark-700/50 rounded-lg p-4">
                        <p className="text-cyber-300">
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p className="text-cyber-300">
                          {shippingInfo.street}, {shippingInfo.number}
                        </p>
                        {shippingInfo.complement && (
                          <p className="text-cyber-300">{shippingInfo.complement}</p>
                        )}
                        <p className="text-cyber-300">
                          {shippingInfo.neighborhood}, {shippingInfo.city} - {shippingInfo.state}
                        </p>
                        <p className="text-cyber-300">CEP: {shippingInfo.cep}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Método de Pagamento</h3>
                      <div className="bg-dark-700/50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-cyber-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-cyber-300">PIX - Pagamento Instantâneo</span>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-neon-blue" />
                        <div>
                          <h4 className="text-neon-blue font-medium">Compra 100% Segura</h4>
                          <p className="text-cyber-400 text-sm">
                            Seus dados estão protegidos com criptografia SSL de 256 bits
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  Voltar
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={handleNextStep}
                    className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white"
                  >
                    Continuar
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white"
                  >
                    {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center">
                      <span className="text-cyber-400 text-xs">IMG</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">MacBook Pro M3 Max</h4>
                      <p className="text-cyber-400 text-xs">Apple</p>
                      <p className="text-cyber-300 text-sm">Qtd: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPrice(15999)}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center">
                      <span className="text-cyber-400 text-xs">IMG</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">iPhone 15 Pro Max</h4>
                      <p className="text-cyber-400 text-xs">Apple</p>
                      <p className="text-cyber-300 text-sm">Qtd: 2</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPrice(17998)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-cyber-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(orderData.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-cyber-300">
                    <span>Frete</span>
                    <span className={orderData.shipping === 0 ? 'text-neon-green' : ''}>
                      {orderData.shipping === 0 ? 'Grátis' : formatPrice(orderData.shipping)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-cyber-300">
                    <span>Impostos</span>
                    <span>{formatPrice(orderData.tax)}</span>
                  </div>
                  
                  <hr className="border-cyber-700" />
                  
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>{formatPrice(orderData.total)}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex items-center gap-4 text-xs text-cyber-400">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>SSL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Rápido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
