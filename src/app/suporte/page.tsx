'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Search, 
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Send,
  FileText,
  Video,
  BookOpen,
  Users,
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
  Wifi,
  Bluetooth,
  Battery,
  Cpu,
  Memory,
  HardDrive,
  Star,
  Heart,
  ShoppingCart,
  Bell,
  Settings,
  User,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Gift
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock data
const faqCategories = [
  {
    id: 'account',
    name: 'Conta e Perfil',
    icon: User,
    color: 'from-neon-blue to-cyber-600',
    questions: [
      {
        question: 'Como criar uma conta?',
        answer: 'Para criar uma conta, clique em "Criar conta" na página de login e preencha os dados solicitados. Você pode usar email e senha ou fazer login com Google, Facebook ou Apple.'
      },
      {
        question: 'Como alterar minha senha?',
        answer: 'Vá para "Meu Perfil" > "Dados Pessoais" e clique em "Editar". Na seção "Alterar Senha", digite sua senha atual e a nova senha desejada.'
      },
      {
        question: 'Como excluir minha conta?',
        answer: 'Entre em contato conosco através do chat de suporte para solicitar a exclusão da sua conta. O processo pode levar até 7 dias úteis.'
      }
    ]
  },
  {
    id: 'orders',
    name: 'Pedidos e Entrega',
    icon: Package,
    color: 'from-neon-green to-cyber-600',
    questions: [
      {
        question: 'Como rastrear meu pedido?',
        answer: 'Você pode rastrear seu pedido em "Meus Pedidos" no seu perfil. Lá você encontrará o código de rastreamento e o status atual da entrega.'
      },
      {
        question: 'Qual o prazo de entrega?',
        answer: 'O prazo de entrega varia de 1 a 7 dias úteis, dependendo da sua localização e do produto. Produtos digitais são entregues instantaneamente.'
      },
      {
        question: 'Posso cancelar um pedido?',
        answer: 'Pedidos podem ser cancelados até 24 horas após a confirmação. Após esse período, entre em contato conosco para verificar as opções disponíveis.'
      }
    ]
  },
  {
    id: 'payments',
    name: 'Pagamentos',
    icon: CreditCard,
    color: 'from-neon-purple to-cyber-600',
    questions: [
      {
        question: 'Quais formas de pagamento vocês aceitam?',
        answer: 'Aceitamos PIX, cartões de crédito e débito (Visa, Mastercard, Elo), boleto bancário e pagamento via PayPal.'
      },
      {
        question: 'O pagamento é seguro?',
        answer: 'Sim, utilizamos criptografia SSL e processamento seguro através de parceiros confiáveis como Stripe e PagSeguro.'
      },
      {
        question: 'Como funciona o PIX?',
        answer: 'O PIX oferece 5% de desconto e é processado instantaneamente. Você receberá o QR Code ou chave PIX para pagamento.'
      }
    ]
  },
  {
    id: 'products',
    name: 'Produtos',
    icon: Smartphone,
    color: 'from-neon-pink to-cyber-600',
    questions: [
      {
        question: 'Vocês oferecem garantia?',
        answer: 'Sim, todos os produtos têm garantia de 1 ano contra defeitos de fabricação. Produtos digitais têm garantia de 30 dias.'
      },
      {
        question: 'Como funciona a troca?',
        answer: 'Você tem 7 dias para solicitar troca por arrependimento. Produtos com defeito podem ser trocados em até 30 dias.'
      },
      {
        question: 'Os produtos são originais?',
        answer: 'Sim, trabalhamos apenas com produtos 100% originais e autorizados pelos fabricantes.'
      }
    ]
  }
]

const supportChannels = [
  {
    id: 'chat',
    name: 'Chat Online',
    description: 'Atendimento instantâneo 24/7',
    icon: MessageSquare,
    color: 'from-neon-green to-cyber-600',
    available: true,
    responseTime: 'Imediato'
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Suporte por email',
    icon: Mail,
    color: 'from-neon-blue to-cyber-600',
    available: true,
    responseTime: 'Até 2 horas'
  },
  {
    id: 'phone',
    name: 'Telefone',
    description: 'Atendimento telefônico',
    icon: Phone,
    color: 'from-neon-purple to-cyber-600',
    available: true,
    responseTime: 'Imediato'
  }
]

const quickActions = [
  {
    id: 'track-order',
    name: 'Rastrear Pedido',
    description: 'Acompanhe o status da sua entrega',
    icon: Package,
    color: 'from-neon-blue to-cyber-600',
    href: '/dashboard'
  },
  {
    id: 'return-product',
    name: 'Devolver Produto',
    description: 'Solicite devolução ou troca',
    icon: Truck,
    color: 'from-neon-green to-cyber-600',
    href: '/dashboard'
  },
  {
    id: 'price-alert',
    name: 'Criar Alerta de Preço',
    description: 'Seja notificado sobre promoções',
    icon: Bell,
    color: 'from-neon-purple to-cyber-600',
    href: '/alertas'
  },
  {
    id: 'wishlist',
    name: 'Lista de Desejos',
    description: 'Veja seus produtos favoritos',
    icon: Heart,
    color: 'from-neon-pink to-cyber-600',
    href: '/favoritos'
  }
]

const helpArticles = [
  {
    id: '1',
    title: 'Como fazer seu primeiro pedido',
    category: 'Pedidos',
    readTime: '5 min',
    views: 1250,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Configurando alertas de preço',
    category: 'Alertas',
    readTime: '3 min',
    views: 890,
    rating: 4.6
  },
  {
    id: '3',
    title: 'Entendendo a garantia dos produtos',
    category: 'Garantia',
    readTime: '7 min',
    views: 2100,
    rating: 4.9
  },
  {
    id: '4',
    title: 'Formas de pagamento disponíveis',
    category: 'Pagamentos',
    readTime: '4 min',
    views: 1560,
    rating: 4.7
  }
]

export default function SuportePage() {
  const [activeCategory, setActiveCategory] = useState('account')
  const [searchQuery, setSearchQuery] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState('')

  const filteredFAQs = faqCategories.find(cat => cat.id === activeCategory)?.questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Mock send message
      console.log('Sending message:', chatMessage)
      setChatMessage('')
    }
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Central de Ajuda
              </span>
            </h1>
            <p className="text-cyber-400">
              Encontre respostas rápidas ou entre em contato conosco
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite sua dúvida ou palavra-chave..."
                className="w-full pl-10 pr-4 py-4 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all cursor-pointer"
                  onClick={() => window.location.href = action.href}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-center mb-2">{action.name}</h3>
                  <p className="text-cyber-400 text-sm text-center">{action.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Support Channels */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Canais de Suporte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${channel.color} rounded-lg flex items-center justify-center`}>
                      <channel.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{channel.name}</h3>
                      <p className="text-cyber-400 text-sm">{channel.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`text-xs ${
                      channel.available 
                        ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                        : 'bg-red-500/20 text-red-400 border-red-500/50'
                    }`}>
                      {channel.available ? 'Disponível' : 'Indisponível'}
                    </Badge>
                    <span className="text-cyber-400 text-sm">{channel.responseTime}</span>
                  </div>

                  <Button
                    onClick={() => channel.id === 'chat' ? setShowChat(true) : null}
                    disabled={!channel.available}
                    className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                  >
                    {channel.id === 'chat' ? 'Iniciar Chat' : 
                     channel.id === 'email' ? 'Enviar Email' : 'Ligar Agora'}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Perguntas Frequentes</h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                      : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-white font-bold mb-3">{faq.question}</h3>
                  <p className="text-cyber-400 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Help Articles */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Artigos de Ajuda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-2">{article.title}</h3>
                      <p className="text-cyber-400 text-sm mb-3">{article.category}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-cyber-500" />
                  </div>
                  
                  <div className="flex items-center gap-4 text-cyber-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-neon-yellow" />
                      {article.rating}
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
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-green focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                  >
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
