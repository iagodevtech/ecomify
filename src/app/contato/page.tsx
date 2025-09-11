'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Shield,
  Truck,
  CreditCard,
  Package,
  Smartphone,
  Laptop,
  Headphones,
  Monitor,
  Keyboard,
  Mouse,
  Camera,
  Gamepad,
  Speaker,
  Star,
  Heart,
  ShoppingCart,
  Bell,
  Settings,
  Globe,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  DollarSign,
  Eye,
  Share2,
  ThumbsUp,
  Lightbulb,
  Rocket,
  Crown,
  Gem,
  Sparkles
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const contactMethods = [
  {
    id: 'chat',
    name: 'Chat Online',
    description: 'Atendimento instantâneo 24/7',
    icon: MessageSquare,
    color: 'from-neon-green to-cyber-600',
    available: true,
    responseTime: 'Imediato',
    contact: 'Iniciar Chat'
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Suporte por email',
    icon: Mail,
    color: 'from-neon-blue to-cyber-600',
    available: true,
    responseTime: 'Até 2 horas',
    contact: 'contato@ecomify.com'
  },
  {
    id: 'phone',
    name: 'Telefone',
    description: 'Atendimento telefônico',
    icon: Phone,
    color: 'from-neon-purple to-cyber-600',
    available: true,
    responseTime: 'Imediato',
    contact: '(11) 99999-9999'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Suporte via WhatsApp',
    icon: MessageSquare,
    color: 'from-neon-green to-cyber-600',
    available: true,
    responseTime: 'Até 1 hora',
    contact: '(11) 99999-9999'
  }
]

const departments = [
  {
    name: 'Suporte Técnico',
    description: 'Dúvidas sobre produtos e funcionalidades',
    icon: Settings,
    color: 'from-neon-blue to-cyber-600',
    email: 'suporte@ecomify.com',
    phone: '(11) 99999-0001'
  },
  {
    name: 'Vendas',
    description: 'Informações sobre produtos e preços',
    icon: ShoppingCart,
    color: 'from-neon-green to-cyber-600',
    email: 'vendas@ecomify.com',
    phone: '(11) 99999-0002'
  },
  {
    name: 'Financeiro',
    description: 'Questões sobre pagamentos e faturas',
    icon: CreditCard,
    color: 'from-neon-purple to-cyber-600',
    email: 'financeiro@ecomify.com',
    phone: '(11) 99999-0003'
  },
  {
    name: 'Parcerias',
    description: 'Oportunidades de parceria e afiliação',
    icon: Handshake,
    color: 'from-neon-pink to-cyber-600',
    email: 'parcerias@ecomify.com',
    phone: '(11) 99999-0004'
  }
]

const faqs = [
  {
    question: 'Como posso rastrear meu pedido?',
    answer: 'Você pode rastrear seu pedido através do seu perfil em "Meus Pedidos" ou usando o código de rastreamento enviado por email.',
    category: 'Pedidos'
  },
  {
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo de entrega varia de 1 a 7 dias úteis, dependendo da sua localização. Produtos digitais são entregues instantaneamente.',
    category: 'Entrega'
  },
  {
    question: 'Posso cancelar um pedido?',
    answer: 'Sim, pedidos podem ser cancelados até 24 horas após a confirmação através do seu perfil ou entrando em contato conosco.',
    category: 'Pedidos'
  },
  {
    question: 'Quais formas de pagamento vocês aceitam?',
    answer: 'Aceitamos PIX, cartões de crédito e débito, boleto bancário e pagamento via PayPal.',
    category: 'Pagamentos'
  }
]

const officeHours = [
  { day: 'Segunda a Sexta', hours: '08:00 - 18:00' },
  { day: 'Sábado', hours: '09:00 - 15:00' },
  { day: 'Domingo', hours: 'Fechado' }
]

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: '',
    priority: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        department: '',
        message: '',
        priority: 'normal'
      })
    }, 2000)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Entre em Contato
              </span>
            </h1>
            <p className="text-cyber-400 text-lg">
              Estamos aqui para ajudar você. Escolha a melhor forma de entrar em contato conosco.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Canais de Contato</h2>
                <div className="space-y-4">
                  {contactMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold mb-1">{method.name}</h3>
                          <p className="text-cyber-400 text-sm mb-2">{method.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge className={`text-xs ${
                              method.available 
                                ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                                : 'bg-red-500/20 text-red-400 border-red-500/50'
                            }`}>
                              {method.available ? 'Disponível' : 'Indisponível'}
                            </Badge>
                            <span className="text-cyber-400 text-xs">{method.responseTime}</span>
                          </div>
                          <p className="text-neon-blue text-sm mt-2 font-medium">{method.contact}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Horário de Funcionamento</h3>
                <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-cyber-400">{schedule.day}</span>
                        <span className="text-white font-medium">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Nossa Localização</h3>
                <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-neon-blue flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-medium">Ecomify Tecnologia</p>
                      <p className="text-cyber-400 text-sm">
                        Av. Paulista, 1000 - Bela Vista<br />
                        São Paulo - SP, 01310-100<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Envie sua Mensagem</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Nome completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Seu nome completo"
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Telefone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Departamento
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                      >
                        <option value="">Selecione um departamento</option>
                        <option value="suporte">Suporte Técnico</option>
                        <option value="vendas">Vendas</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="parcerias">Parcerias</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">
                      Assunto *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Resumo da sua mensagem"
                        className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">
                      Prioridade
                    </label>
                    <div className="flex gap-4">
                      {[
                        { value: 'low', label: 'Baixa', color: 'text-cyber-400' },
                        { value: 'normal', label: 'Normal', color: 'text-neon-blue' },
                        { value: 'high', label: 'Alta', color: 'text-neon-yellow' },
                        { value: 'urgent', label: 'Urgente', color: 'text-red-400' }
                      ].map((priority) => (
                        <label key={priority.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="priority"
                            value={priority.value}
                            checked={formData.priority === priority.value}
                            onChange={(e) => handleInputChange('priority', e.target.value)}
                            className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 focus:ring-neon-blue"
                          />
                          <span className={`text-sm ${priority.color}`}>{priority.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Descreva sua dúvida ou solicitação..."
                      rows={6}
                      className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-3 font-cyber"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensagem
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Departamentos Especializados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center`}>
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{dept.name}</h3>
                  <p className="text-cyber-400 text-sm mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <p className="text-neon-blue text-sm font-medium">{dept.email}</p>
                    <p className="text-cyber-400 text-sm">{dept.phone}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Perguntas Frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{faq.question}</h3>
                      <p className="text-cyber-400 text-sm mb-3">{faq.answer}</p>
                      <Badge className="bg-cyber-600 text-cyber-300 text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-800 border border-cyber-500/30 rounded-2xl w-full max-w-md"
            >
              <div className="p-6 border-b border-cyber-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-cyber-600 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Chat de Suporte</h3>
                      <p className="text-cyber-400 text-sm">Online agora</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-cyber-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 h-64 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-cyber-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div className="bg-cyber-700/50 rounded-lg p-3 max-w-xs">
                      <p className="text-white text-sm">Olá! Como posso ajudá-lo hoje?</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-cyber-500/30">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-green focus:outline-none"
                  />
                  <Button className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
