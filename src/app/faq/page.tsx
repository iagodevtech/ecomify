'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Zap, 
  Shield, 
  User, 
  CreditCard, 
  Package, 
  Truck, 
  Bell, 
  Settings, 
  Heart, 
  ShoppingCart, 
  Award, 
  Crown, 
  Gem, 
  Sparkles,
  Globe,
  Lock,
  Eye,
  Database,
  Activity,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const faqCategories = [
  {
    id: 'all',
    name: 'Todas',
    icon: HelpCircle,
    color: 'from-neon-blue to-cyber-600'
  },
  {
    id: 'account',
    name: 'Conta',
    icon: User,
    color: 'from-neon-green to-cyber-600'
  },
  {
    id: 'orders',
    name: 'Pedidos',
    icon: Package,
    color: 'from-neon-purple to-cyber-600'
  },
  {
    id: 'payments',
    name: 'Pagamentos',
    icon: CreditCard,
    color: 'from-neon-pink to-cyber-600'
  },
  {
    id: 'shipping',
    name: 'Entrega',
    icon: Truck,
    color: 'from-neon-yellow to-cyber-600'
  },
  {
    id: 'products',
    name: 'Produtos',
    icon: ShoppingCart,
    color: 'from-cyan-500 to-cyber-600'
  },
  {
    id: 'technical',
    name: 'Técnico',
    icon: Settings,
    color: 'from-orange-500 to-cyber-600'
  }
]

const faqData = [
  {
    id: 1,
    category: 'account',
    question: 'Como criar uma conta na Ecomify?',
    answer: 'Para criar uma conta, clique em "Criar conta" no canto superior direito da página. Preencha seus dados pessoais (nome, email, senha) e confirme seu email. Você também pode fazer login com Google, Facebook ou Apple para uma experiência mais rápida.',
    helpful: 89,
    notHelpful: 3
  },
  {
    id: 2,
    category: 'account',
    question: 'Esqueci minha senha. Como recuperar?',
    answer: 'Na página de login, clique em "Esqueci minha senha". Digite seu email e você receberá um link para redefinir sua senha. Verifique também sua pasta de spam caso não receba o email.',
    helpful: 76,
    notHelpful: 2
  },
  {
    id: 3,
    category: 'orders',
    question: 'Como rastrear meu pedido?',
    answer: 'Após a confirmação do pedido, você receberá um código de rastreamento por email. Você pode acompanhar o status em "Meus Pedidos" no seu perfil ou usar o código diretamente no site dos Correios.',
    helpful: 95,
    notHelpful: 1
  },
  {
    id: 4,
    category: 'orders',
    question: 'Posso cancelar um pedido após a compra?',
    answer: 'Sim, você pode cancelar pedidos até 24 horas após a confirmação. Após esse período, entre em contato conosco para verificar as opções disponíveis. Produtos digitais não podem ser cancelados após o download.',
    helpful: 82,
    notHelpful: 4
  },
  {
    id: 5,
    category: 'payments',
    question: 'Quais formas de pagamento vocês aceitam?',
    answer: 'Aceitamos PIX (com 5% de desconto), cartões de crédito e débito (Visa, Mastercard, Elo), boleto bancário e pagamento via PayPal. Todos os pagamentos são processados de forma segura.',
    helpful: 91,
    notHelpful: 2
  },
  {
    id: 6,
    category: 'payments',
    question: 'O pagamento é seguro?',
    answer: 'Sim, utilizamos criptografia SSL e processamento seguro através de parceiros confiáveis como Stripe e PagSeguro. Seus dados de pagamento são criptografados e nunca armazenados em nossos servidores.',
    helpful: 88,
    notHelpful: 1
  },
  {
    id: 7,
    category: 'shipping',
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia de 1 a 7 dias úteis, dependendo da sua localização e do produto. Produtos digitais são entregues instantaneamente por email. Você pode verificar o prazo estimado na página do produto.',
    helpful: 94,
    notHelpful: 3
  },
  {
    id: 8,
    category: 'shipping',
    question: 'Vocês entregam em todo o Brasil?',
    answer: 'Sim, entregamos em todo o território nacional. Para algumas regiões remotas, o prazo pode ser maior. Consulte a disponibilidade na página do produto antes de finalizar a compra.',
    helpful: 87,
    notHelpful: 2
  },
  {
    id: 9,
    category: 'products',
    question: 'Os produtos são originais?',
    answer: 'Sim, trabalhamos apenas com produtos 100% originais e autorizados pelos fabricantes. Todos os produtos vêm com garantia oficial e nota fiscal.',
    helpful: 96,
    notHelpful: 1
  },
  {
    id: 10,
    category: 'products',
    question: 'Como funciona a garantia?',
    answer: 'Produtos físicos têm garantia de 1 ano contra defeitos de fabricação. Produtos digitais têm garantia de 30 dias. A garantia é válida apenas para uso normal do produto.',
    helpful: 83,
    notHelpful: 3
  },
  {
    id: 11,
    category: 'technical',
    question: 'Como usar o sistema de alertas de preço?',
    answer: 'Na página do produto, clique em "Criar Alerta". Defina o preço desejado e escolha como quer ser notificado (email, WhatsApp, SMS). Você será avisado quando o preço baixar.',
    helpful: 79,
    notHelpful: 2
  },
  {
    id: 12,
    category: 'technical',
    question: 'O site está lento. O que fazer?',
    answer: 'Tente limpar o cache do navegador, desabilitar extensões ou usar o modo incógnito. Se o problema persistir, entre em contato conosco. Pode ser um problema temporário de servidor.',
    helpful: 71,
    notHelpful: 5
  },
  {
    id: 13,
    category: 'orders',
    question: 'Como devolver um produto?',
    answer: 'Você tem 7 dias para solicitar devolução por arrependimento. Entre em contato conosco através do chat ou email. O produto deve estar em condições originais. Custos de frete de devolução são por sua conta.',
    helpful: 85,
    notHelpful: 4
  },
  {
    id: 14,
    category: 'account',
    question: 'Como alterar meus dados pessoais?',
    answer: 'Acesse "Meu Perfil" no menu do usuário. Clique em "Editar" e atualize suas informações. Algumas alterações podem precisar de confirmação por email.',
    helpful: 77,
    notHelpful: 1
  },
  {
    id: 15,
    category: 'payments',
    question: 'Como funciona o PIX?',
    answer: 'O PIX oferece 5% de desconto e é processado instantaneamente. Após a compra, você receberá o QR Code ou chave PIX para pagamento. A confirmação é automática.',
    helpful: 92,
    notHelpful: 1
  }
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [helpfulVotes, setHelpfulVotes] = useState<{[key: number]: 'helpful' | 'not-helpful' | null}>({})

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleHelpfulVote = (id: number, vote: 'helpful' | 'not-helpful') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: prev[id] === vote ? null : vote
    }))
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Perguntas Frequentes
              </span>
            </h1>
            <p className="text-cyber-400 text-lg">
              Encontre respostas rápidas para as dúvidas mais comuns
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite sua dúvida ou palavra-chave..."
                className="w-full pl-10 pr-4 py-4 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                      : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                  <Badge className="bg-cyber-600 text-cyber-300 text-xs">
                    {category.id === 'all' 
                      ? faqData.length 
                      : faqData.filter(faq => faq.category === category.id).length
                    }
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-6 text-left hover:bg-cyber-800/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-2">{faq.question}</h3>
                          <div className="flex items-center gap-4">
                            <Badge className="bg-cyber-600 text-cyber-300 text-xs">
                              {faqCategories.find(cat => cat.id === faq.category)?.name}
                            </Badge>
                            <div className="flex items-center gap-1 text-cyber-400 text-sm">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{faq.helpful}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {expandedItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-cyber-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-cyber-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="ml-14">
                            <p className="text-cyber-300 leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            
                            {/* Helpful Vote */}
                            <div className="flex items-center gap-4">
                              <span className="text-cyber-400 text-sm">Esta resposta foi útil?</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleHelpfulVote(faq.id, 'helpful')}
                                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all ${
                                    helpfulVotes[faq.id] === 'helpful'
                                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                                      : 'text-cyber-400 hover:text-neon-green hover:bg-neon-green/10'
                                  }`}
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  Sim
                                </button>
                                <button
                                  onClick={() => handleHelpfulVote(faq.id, 'not-helpful')}
                                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all ${
                                    helpfulVotes[faq.id] === 'not-helpful'
                                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                                      : 'text-cyber-400 hover:text-red-400 hover:bg-red-500/10'
                                  }`}
                                >
                                  <ThumbsDown className="w-4 h-4" />
                                  Não
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                <HelpCircle className="w-16 h-16 text-cyber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nenhuma pergunta encontrada</h3>
              <p className="text-cyber-400 mb-8">
                Tente ajustar sua busca ou filtros para encontrar o que procura
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
              >
                Limpar Filtros
              </Button>
            </motion.div>
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-cyber-800 to-cyber-900 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold font-cyber mb-6">
                <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Não Encontrou o que Procurava?
                </span>
              </h2>
              <p className="text-xl text-cyber-400 mb-8 max-w-2xl mx-auto">
                Nossa equipe de suporte está pronta para ajudar você. Entre em contato 
                conosco através dos canais abaixo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat Online
                </Button>
                <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                  <Mail className="w-5 h-5 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-green hover:text-neon-green">
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar Agora
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  )
}
