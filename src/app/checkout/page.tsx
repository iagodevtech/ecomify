'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Shield,
  Check,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Smartphone,
  Laptop,
  Headphones,
  Package,
  Truck,
  Clock,
  Gift,
  Tag,
  AlertCircle,
  CheckCircle,
  Zap,
  Award
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock data
const cartItems = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    price: 15999,
    quantity: 1,
    image: '/images/products/macbook-pro.jpg',
    brand: 'Apple'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    price: 8999,
    quantity: 2,
    image: '/images/products/iphone-15-pro.jpg',
    brand: 'Apple'
  }
]

const paymentMethods = [
  {
    id: 'pix',
    name: 'PIX',
    description: 'Aprovação imediata',
    icon: Zap,
    color: 'from-neon-green to-cyber-600',
    discount: 5
  },
  {
    id: 'credit',
    name: 'Cartão de Crédito',
    description: 'Até 12x sem juros',
    icon: CreditCard,
    color: 'from-neon-blue to-cyber-600',
    discount: 0
  },
  {
    id: 'debit',
    name: 'Cartão de Débito',
    description: 'Aprovação imediata',
    icon: CreditCard,
    color: 'from-neon-purple to-cyber-600',
    discount: 0
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    description: 'Vencimento em 3 dias',
    icon: Package,
    color: 'from-neon-orange to-cyber-600',
    discount: 0
  }
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('pix')
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage'
  })

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    
    // Address
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Login
    password: '',
    confirmPassword: ''
  })

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = appliedCoupon.type === 'percentage' 
    ? (subtotal * appliedCoupon.discount) / 100 
    : appliedCoupon.discount
  const paymentDiscount = selectedPayment === 'pix' ? (subtotal * 5) / 100 : 0
  const total = subtotal - discount - paymentDiscount

  const steps = [
    { id: 1, name: 'Identificação', icon: User },
    { id: 2, name: 'Endereço', icon: MapPin },
    { id: 3, name: 'Pagamento', icon: CreditCard },
    { id: 4, name: 'Confirmação', icon: Check }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleLogin = () => {
    // Mock login
    setIsLoggedIn(true)
  }

  const handleRegister = () => {
    // Mock register
    setIsLoggedIn(true)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                Finalizar Compra
              </span>
            </h1>
            <p className="text-cyber-400">
              Complete seu pedido de forma segura e rápida
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-3 ${
                    currentStep >= step.id ? 'text-neon-green' : 'text-cyber-500'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.id 
                        ? 'border-neon-green bg-neon-green/20' 
                        : 'border-cyber-500 bg-cyber-800/50'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5 text-neon-green" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="font-medium hidden sm:block">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-neon-green' : 'bg-cyber-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Identification */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-neon-blue" />
                    Identificação
                  </h2>

                  {!isLoggedIn ? (
                    <div className="space-y-6">
                      {/* Login Form */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Senha *
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              placeholder="Sua senha"
                              className="w-full px-4 py-3 pr-12 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-500 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleLogin}
                        className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white py-3"
                      >
                        Entrar
                      </Button>

                      <div className="text-center">
                        <span className="text-cyber-400">ou</span>
                      </div>

                      {/* Register Form */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Nome *
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Seu nome"
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Sobrenome *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Seu sobrenome"
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Telefone *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="(11) 99999-9999"
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            CPF *
                          </label>
                          <input
                            type="text"
                            value={formData.cpf}
                            onChange={(e) => handleInputChange('cpf', e.target.value)}
                            placeholder="000.000.000-00"
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleRegister}
                        className="w-full cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white py-3"
                      >
                        Criar Conta e Continuar
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Login realizado com sucesso!</h3>
                      <p className="text-cyber-400">Continuando para o próximo passo...</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-neon-blue" />
                    Endereço de Entrega
                  </h2>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">
                          CEP *
                        </label>
                        <input
                          type="text"
                          value={formData.cep}
                          onChange={(e) => handleInputChange('cep', e.target.value)}
                          placeholder="00000-000"
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-cyber-300 text-sm font-medium mb-2">
                          Rua *
                        </label>
                        <input
                          type="text"
                          value={formData.street}
                          onChange={(e) => handleInputChange('street', e.target.value)}
                          placeholder="Nome da rua"
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          value={formData.number}
                          onChange={(e) => handleInputChange('number', e.target.value)}
                          placeholder="123"
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-cyber-300 text-sm font-medium mb-2">
                          Complemento
                        </label>
                        <input
                          type="text"
                          value={formData.complement}
                          onChange={(e) => handleInputChange('complement', e.target.value)}
                          placeholder="Apartamento, casa, etc."
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                          placeholder="Nome do bairro"
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Nome da cidade"
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-cyber-300 text-sm font-medium mb-2">
                          Estado *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        >
                          <option value="">Selecione</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="RS">Rio Grande do Sul</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-neon-blue" />
                    Forma de Pagamento
                  </h2>

                  <div className="space-y-6">
                    {/* Payment Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedPayment === method.id
                              ? 'border-neon-green bg-neon-green/10'
                              : 'border-cyber-500/30 hover:border-cyber-400'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                              <method.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">{method.name}</h3>
                              <p className="text-cyber-400 text-sm">{method.description}</p>
                            </div>
                          </div>
                          {method.discount > 0 && (
                            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                              {method.discount}% de desconto
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Card Details (if credit/debit selected) */}
                    {(selectedPayment === 'credit' || selectedPayment === 'debit') && (
                      <div className="space-y-4">
                        <h3 className="text-white font-bold">Dados do Cartão</h3>
                        
                        <div>
                          <label className="block text-cyber-300 text-sm font-medium mb-2">
                            Número do Cartão *
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">
                              Nome no Cartão *
                            </label>
                            <input
                              type="text"
                              value={formData.cardName}
                              onChange={(e) => handleInputChange('cardName', e.target.value)}
                              placeholder="Nome como está no cartão"
                              className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-cyber-300 text-sm font-medium mb-2">
                                Validade *
                              </label>
                              <input
                                type="text"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                placeholder="MM/AA"
                                className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-cyber-300 text-sm font-medium mb-2">
                                CVV *
                              </label>
                              <input
                                type="text"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                placeholder="000"
                                className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Info */}
                    <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-neon-green" />
                        <div>
                          <h4 className="text-white font-bold">Pagamento 100% Seguro</h4>
                          <p className="text-cyber-300 text-sm">
                            Seus dados são protegidos com criptografia SSL e não são armazenados em nossos servidores.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Check className="w-6 h-6 text-neon-green" />
                    Confirmação do Pedido
                  </h2>

                  <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-dark-700/30 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-4">Resumo do Pedido</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {item.brand.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-cyber-400 text-sm">Qtd: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-white font-bold">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-dark-700/30 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-4">Endereço de Entrega</h3>
                      <p className="text-cyber-300">
                        {formData.street}, {formData.number}
                        {formData.complement && `, ${formData.complement}`}
                      </p>
                      <p className="text-cyber-300">
                        {formData.neighborhood}, {formData.city} - {formData.state}
                      </p>
                      <p className="text-cyber-300">CEP: {formData.cep}</p>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-dark-700/30 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-4">Forma de Pagamento</h3>
                      <div className="flex items-center gap-3">
                        {selectedPayment === 'pix' && <Zap className="w-5 h-5 text-neon-green" />}
                        {selectedPayment === 'credit' && <CreditCard className="w-5 h-5 text-neon-blue" />}
                        {selectedPayment === 'debit' && <CreditCard className="w-5 h-5 text-neon-purple" />}
                        {selectedPayment === 'boleto' && <Package className="w-5 h-5 text-neon-orange" />}
                        <span className="text-white font-medium">
                          {paymentMethods.find(m => m.id === selectedPayment)?.name}
                        </span>
                      </div>
                    </div>

                    {/* Success Message */}
                    <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-neon-green" />
                        <div>
                          <h4 className="text-white font-bold">Pedido Confirmado!</h4>
                          <p className="text-cyber-300 text-sm">
                            Você receberá um email de confirmação em breve.
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
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                    <Check className="w-4 h-4 mr-2" />
                    Finalizar Pedido
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {item.brand.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm line-clamp-2">{item.name}</p>
                        <p className="text-cyber-400 text-xs">Qtd: {item.quantity}</p>
                      </div>
                      <p className="text-white font-bold text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                {/* Applied Coupon */}
                {appliedCoupon && (
                  <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-neon-green" />
                        <span className="text-neon-green font-medium text-sm">{appliedCoupon.code}</span>
                      </div>
                      <span className="text-neon-green font-bold text-sm">
                        -{appliedCoupon.discount}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-cyber-400">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-cyber-400">Desconto Cupom</span>
                      <span className="text-neon-green">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  {paymentDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-cyber-400">Desconto PIX</span>
                      <span className="text-neon-green">-{formatPrice(paymentDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-cyber-400">Frete</span>
                    <span className="text-white">Grátis</span>
                  </div>
                  
                  <div className="border-t border-cyber-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-white font-bold text-lg">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-neon-green" />
                    <span className="text-cyber-300 text-sm">Compra 100% Segura</span>
                  </div>
                  <p className="text-cyber-400 text-xs">
                    Seus dados são protegidos com criptografia SSL
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}