'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Users,
  CreditCard,
  Package,
  Truck,
  Shield,
  Settings,
  Smartphone,
  Monitor,
  Zap,
  Heart
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categories = [
  {
    id: 'account',
    name: 'Conta e Perfil',
    icon: Users,
    color: 'text-neon-blue',
    articles: [
      {
        title: 'Como criar uma conta na Ecomify?',
        content: 'Para criar uma conta, clique em "Criar Conta" no canto superior direito, preencha seus dados e confirme seu email.'
      },
      {
        title: 'Como alterar minha senha?',
        content: 'Acesse "Meu Perfil" > "Configurações de Segurança" > "Alterar Senha" e siga as instruções.'
      },
      {
        title: 'Como ativar a autenticação de dois fatores?',
        content: 'Vá em "Meu Perfil" > "Segurança" > "Autenticação de Dois Fatores" e siga o processo de configuração.'
      }
    ]
  },
  {
    id: 'orders',
    name: 'Pedidos e Entrega',
    icon: Package,
    color: 'text-neon-green',
    articles: [
      {
        title: 'Como rastrear meu pedido?',
        content: 'Acesse "Meus Pedidos" e clique no pedido desejado. O código de rastreamento estará disponível assim que o pedido for enviado.'
      },
      {
        title: 'Quais são os prazos de entrega?',
        content: 'Entrega padrão: 5-7 dias úteis. Entrega expressa: 2-3 dias úteis. Entrega no mesmo dia: disponível em algumas regiões.'
      },
      {
        title: 'Como cancelar um pedido?',
        content: 'Pedidos podem ser cancelados até 24h após a compra. Acesse "Meus Pedidos" e clique em "Cancelar Pedido".'
      }
    ]
  },
  {
    id: 'payment',
    name: 'Pagamentos',
    icon: CreditCard,
    color: 'text-neon-purple',
    articles: [
      {
        title: 'Quais formas de pagamento são aceitas?',
        content: 'Aceitamos PIX, cartão de crédito/débito (Visa, Mastercard, Elo) e boleto bancário.'
      },
      {
        title: 'Como funciona o PIX?',
        content: 'O PIX é processado instantaneamente. Após a confirmação do pagamento, seu pedido é liberado imediatamente.'
      },
      {
        title: 'Posso parcelar minha compra?',
        content: 'Sim, compras no cartão de crédito podem ser parceladas em até 12x sem juros (sujeito à aprovação).'
      }
    ]
  },
  {
    id: 'returns',
    name: 'Trocas e Devoluções',
    icon: Truck,
    color: 'text-neon-pink',
    articles: [
      {
        title: 'Qual é o prazo para trocas e devoluções?',
        content: 'Você tem 7 dias corridos após o recebimento do produto para solicitar troca ou devolução.'
      },
      {
        title: 'Como solicitar uma troca?',
        content: 'Acesse "Meus Pedidos" > "Solicitar Troca" e preencha o formulário com o motivo da troca.'
      },
      {
        title: 'Quem paga o frete da devolução?',
        content: 'Em caso de defeito ou erro nosso, o frete é por nossa conta. Em outros casos, o frete é por conta do cliente.'
      }
    ]
  },
  {
    id: 'security',
    name: 'Segurança',
    icon: Shield,
    color: 'text-neon-yellow',
    articles: [
      {
        title: 'Meus dados estão seguros?',
        content: 'Sim, utilizamos criptografia SSL e seguimos todas as normas de segurança da LGPD.'
      },
      {
        title: 'Como denunciar uma tentativa de fraude?',
        content: 'Entre em contato imediatamente através do email segurança@ecomify.com ou pelo chat online.'
      },
      {
        title: 'O que fazer se minha conta foi hackeada?',
        content: 'Altere sua senha imediatamente e entre em contato conosco. Nossa equipe de segurança irá investigar.'
      }
    ]
  }
]

const contactMethods = [
  {
    name: 'Chat Online',
    icon: MessageCircle,
    description: 'Atendimento instantâneo 24/7',
    responseTime: 'Imediato',
    availability: '24h',
    color: 'text-neon-blue'
  },
  {
    name: 'Email',
    icon: Mail,
    description: 'Suporte por email',
    responseTime: 'Até 2h',
    availability: '24h',
    color: 'text-neon-green'
  },
  {
    name: 'Telefone',
    icon: Phone,
    description: 'Atendimento telefônico',
    responseTime: 'Imediato',
    availability: '8h às 18h',
    color: 'text-neon-purple'
  }
]

const quickActions = [
  { name: 'Rastrear Pedido', icon: Package, href: '/meus-pedidos' },
  { name: 'Meu Perfil', icon: Users, href: '/perfil' },
  { name: 'Favoritos', icon: Heart, href: '/favoritos' },
  { name: 'Configurações', icon: Settings, href: '/configuracoes' }
]

export default function CentralAjudaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Central de Ajuda
              </span>
            </h1>
            <p className="text-xl text-cyber-300 mb-8 leading-relaxed">
              Encontre respostas rápidas para suas dúvidas ou entre em contato conosco. 
              Estamos aqui para ajudar!
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
              <input
                type="text"
                placeholder="Digite sua dúvida ou palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-dark-800/50 border border-cyber-500/30 rounded-xl text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ Completo
              </Badge>
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat 24/7
              </Badge>
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                <Phone className="w-4 h-4 mr-2" />
                Suporte Telefônico
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ações Rápidas
            </h2>
            <p className="text-cyber-300 text-lg">
              Acesso direto às principais funcionalidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{action.name}</h3>
                    <p className="text-cyber-400 text-sm">Acesso direto</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-cyber-300 text-lg">
              Encontre respostas para as dúvidas mais comuns
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-dark-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                      <p className="text-cyber-400 text-sm">{category.articles.length} artigos</p>
                    </div>
                  </div>
                  {selectedCategory === category.id ? (
                    <ChevronDown className="w-5 h-5 text-cyber-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-cyber-400" />
                  )}
                </button>

                <AnimatePresence>
                  {selectedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-cyber-500/30"
                    >
                      <div className="p-6 space-y-4">
                        {category.articles.map((article, articleIndex) => (
                          <div key={articleIndex} className="border-b border-cyber-500/20 pb-4 last:border-b-0 last:pb-0">
                            <button
                              onClick={() => setExpandedArticle(expandedArticle === `${category.id}-${articleIndex}` ? null : `${category.id}-${articleIndex}`)}
                              className="w-full text-left flex items-center justify-between"
                            >
                              <h4 className="text-white font-medium hover:text-neon-blue transition-colors">
                                {article.title}
                              </h4>
                              {expandedArticle === `${category.id}-${articleIndex}` ? (
                                <ChevronDown className="w-4 h-4 text-cyber-400" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-cyber-400" />
                              )}
                            </button>
                            
                            <AnimatePresence>
                              {expandedArticle === `${category.id}-${articleIndex}` && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3"
                                >
                                  <p className="text-cyber-300 text-sm leading-relaxed">
                                    {article.content}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Entre em Contato
            </h2>
            <p className="text-cyber-300 text-lg">
              Escolha a forma mais conveniente para você
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 text-center hover:border-neon-blue/50 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className={`w-8 h-8 ${method.color}`} />
                </div>
                
                <h3 className="text-white font-bold text-xl mb-2">{method.name}</h3>
                <p className="text-cyber-300 mb-4">{method.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-400">Resposta:</span>
                    <span className="text-cyber-300">{method.responseTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-400">Disponibilidade:</span>
                    <span className="text-cyber-300">{method.availability}</span>
                  </div>
                </div>
                
                <Button className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  {method.name === 'Chat Online' && 'Iniciar Chat'}
                  {method.name === 'Email' && 'Enviar Email'}
                  {method.name === 'Telefone' && 'Ligar Agora'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
