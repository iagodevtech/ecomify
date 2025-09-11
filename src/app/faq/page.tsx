'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Search,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  Zap
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const categories = [
    { id: 'all', name: 'Todas', icon: HelpCircle },
    { id: 'orders', name: 'Pedidos', icon: ShoppingCart },
    { id: 'payments', name: 'Pagamentos', icon: CreditCard },
    { id: 'shipping', name: 'Entrega', icon: Truck },
    { id: 'returns', name: 'Devoluções', icon: RotateCcw },
    { id: 'support', name: 'Suporte', icon: Headphones }
  ]

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'Como faço um pedido?',
      answer: 'Fazer um pedido é muito simples! Navegue pelos nossos produtos, adicione os itens desejados ao carrinho, clique em "Finalizar Compra", preencha seus dados de entrega e escolha a forma de pagamento. Após a confirmação do pagamento, você receberá um email com os detalhes do seu pedido.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'Posso alterar ou cancelar meu pedido?',
      answer: 'Sim! Você pode cancelar seu pedido até 24 horas após a compra, desde que não tenha sido enviado. Para alterações, entre em contato conosco o mais rápido possível. Pedidos já enviados não podem ser cancelados, mas você pode solicitar a devolução após o recebimento.'
    },
    {
      id: 3,
      category: 'orders',
      question: 'Como acompanho meu pedido?',
      answer: 'Após o envio, você receberá um código de rastreamento por email. Você pode acompanhar seu pedido através do nosso site, inserindo o código de rastreamento, ou acessando sua conta no dashboard. Também enviamos atualizações por email sobre o status do seu pedido.'
    },
    {
      id: 4,
      category: 'payments',
      question: 'Quais formas de pagamento vocês aceitam?',
      answer: 'Aceitamos PIX (com desconto), cartão de crédito (Visa, Mastercard, Elo, American Express), cartão de débito e boleto bancário. Todos os pagamentos são processados de forma segura através de nossos parceiros certificados.'
    },
    {
      id: 5,
      category: 'payments',
      question: 'O pagamento é seguro?',
      answer: 'Sim! Utilizamos criptografia SSL/TLS e processadores de pagamento certificados. Não armazenamos dados de cartão em nossos servidores. Todas as transações são protegidas pelas mais altas tecnologias de segurança disponíveis.'
    },
    {
      id: 6,
      category: 'payments',
      question: 'Posso parcelar minha compra?',
      answer: 'Sim! Oferecemos parcelamento em até 12x sem juros no cartão de crédito, sujeito à aprovação da operadora. O PIX oferece desconto adicional. Consulte as condições específicas no momento da finalização da compra.'
    },
    {
      id: 7,
      category: 'shipping',
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo de entrega varia de 2 a 7 dias úteis, dependendo da sua localização e do produto escolhido. Produtos em estoque são enviados em até 24 horas. Você pode verificar o prazo estimado no momento da compra.'
    },
    {
      id: 8,
      category: 'shipping',
      question: 'Oferecem frete grátis?',
      answer: 'Sim! Oferecemos frete grátis para pedidos acima de R$ 199,00 em todo o Brasil. Para pedidos menores, o frete é calculado automaticamente baseado na sua localização e peso dos produtos.'
    },
    {
      id: 9,
      category: 'shipping',
      question: 'Posso escolher o horário de entrega?',
      answer: 'Sim! Oferecemos diferentes modalidades de entrega, incluindo entrega agendada e entrega expressa. Você pode escolher o horário preferido durante o processo de compra, sujeito à disponibilidade na sua região.'
    },
    {
      id: 10,
      category: 'returns',
      question: 'Qual a política de devolução?',
      answer: 'Você tem até 7 dias corridos para solicitar a devolução de produtos não perecíveis, desde que estejam em perfeitas condições. Produtos com defeito de fabricação têm prazo diferenciado. O custo do frete de devolução é por conta do cliente, exceto em casos de defeito.'
    },
    {
      id: 11,
      category: 'returns',
      question: 'Como solicito uma devolução?',
      answer: 'Para solicitar uma devolução, acesse sua conta no dashboard, vá em "Meus Pedidos", selecione o pedido e clique em "Solicitar Devolução". Preencha o formulário e aguarde nossa aprovação. Você receberá as instruções por email.'
    },
    {
      id: 12,
      category: 'returns',
      question: 'Em quanto tempo recebo o reembolso?',
      answer: 'Após a aprovação da devolução e recebimento do produto, o reembolso é processado em até 5 dias úteis. Para pagamentos com cartão, o valor aparece na fatura do mês seguinte. PIX e boleto são reembolsados na conta de origem.'
    },
    {
      id: 13,
      category: 'support',
      question: 'Como entro em contato com o suporte?',
      answer: 'Você pode entrar em contato conosco através do chat online (disponível 24/7), email (contato@ecomify.com), telefone ((11) 99999-9999) ou WhatsApp. Nossa equipe responde em até 2 horas durante o horário comercial.'
    },
    {
      id: 14,
      category: 'support',
      question: 'Oferecem suporte técnico?',
      answer: 'Sim! Oferecemos suporte técnico especializado para todos os produtos vendidos. Nossa equipe pode ajudar com instalação, configuração, troubleshooting e dúvidas sobre funcionamento. O suporte é gratuito durante o período de garantia.'
    },
    {
      id: 15,
      category: 'support',
      question: 'Posso agendar uma consultoria técnica?',
      answer: 'Sim! Oferecemos consultoria técnica personalizada para ajudar você a escolher os melhores produtos para suas necessidades. Você pode agendar uma consultoria gratuita através do nosso site ou por telefone.'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                  <HelpCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold font-cyber mb-4">
                  <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                    Perguntas Frequentes
                  </span>
                </h1>
                <p className="text-cyber-400 text-xl leading-relaxed">
                  Encontre respostas rápidas para as dúvidas mais comuns sobre nossos produtos e serviços
                </p>
              </motion.div>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                  <input
                    type="text"
                    placeholder="Buscar perguntas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-dark-800/50 border border-cyber-500/30 rounded-2xl text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all text-lg"
                  />
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                        : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    {category.name}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-cyber-800/30 transition-all"
                      >
                        <h3 className="text-xl font-bold text-white pr-4">{faq.question}</h3>
                        <div className="flex-shrink-0">
                          {expandedItems.has(faq.id) ? (
                            <ChevronUp className="w-6 h-6 text-neon-blue" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-cyber-400" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedItems.has(faq.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-6">
                              <div className="pt-4 border-t border-cyber-700">
                                <p className="text-cyber-300 leading-relaxed text-lg">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-12 h-12 text-cyber-500" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Nenhuma pergunta encontrada</h3>
                  <p className="text-cyber-400 mb-4">
                    Tente ajustar os filtros ou buscar por outros termos
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm('')
                      setActiveCategory('all')
                    }}
                    className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                  >
                    Limpar Filtros
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Help */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Ajuda Rápida</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Precisa de ajuda imediata? Use nossos canais de suporte
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mb-4">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Chat Online</h3>
                <p className="text-cyber-400 mb-4">
                  Converse com nossa equipe em tempo real
                </p>
                <Button className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                  Iniciar Chat
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Suporte Técnico</h3>
                <p className="text-cyber-400 mb-4">
                  Ajuda especializada para seus produtos
                </p>
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  Solicitar Suporte
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Garantia</h3>
                <p className="text-cyber-400 mb-4">
                  Ativação e consulta de garantias
                </p>
                <Button className="cyber-button bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                  Consultar Garantia
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Não encontrou sua resposta?</h2>
              <p className="text-cyber-300 text-lg mb-8 max-w-2xl mx-auto">
                Nossa equipe de suporte está sempre disponível para ajudar você com qualquer dúvida ou problema.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Headphones className="w-4 h-4 mr-2" />
                  Fale Conosco
                </Button>
                <Button variant="outline" className="border-cyber-500/30 text-cyber-400 hover:text-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Suporte Técnico
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}