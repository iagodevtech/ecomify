'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Shield, 
  User, 
  CreditCard, 
  Package, 
  Truck, 
  Bell, 
  Settings, 
  Zap, 
  Heart, 
  ShoppingCart, 
  Star, 
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
  MapPin
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const termsSections = [
  {
    id: 'acceptance',
    title: 'Aceitação dos Termos',
    icon: CheckCircle,
    color: 'from-neon-green to-cyber-600',
    content: `
      Ao acessar e utilizar a plataforma Ecomify, você concorda em cumprir e estar 
      vinculado aos termos e condições estabelecidos neste documento.
      
      Se você não concordar com qualquer parte destes termos, não deve utilizar 
      nossos serviços. Estes termos se aplicam a todos os visitantes, usuários e 
      outras pessoas que acessam ou utilizam o serviço.
    `
  },
  {
    id: 'services',
    title: 'Descrição dos Serviços',
    icon: Package,
    color: 'from-neon-blue to-cyber-600',
    content: `
      A Ecomify é uma plataforma de e-commerce especializada em produtos de tecnologia, 
      oferecendo:
      
      • Catálogo de produtos digitais e físicos
      • Sistema de compras online seguro
      • Processamento de pagamentos
      • Entrega e logística
      • Suporte ao cliente
      • Sistema de avaliações e reviews
      • Alertas de preço e promoções
      • Programa de fidelidade
      
      Reservamo-nos o direito de modificar ou descontinuar qualquer aspecto dos 
      serviços a qualquer momento.
    `
  },
  {
    id: 'account',
    title: 'Conta de Usuário',
    icon: User,
    color: 'from-neon-purple to-cyber-600',
    content: `
      Para utilizar certos recursos da plataforma, você deve criar uma conta:
      
      • Você é responsável por manter a confidencialidade de sua conta
      • Deve fornecer informações precisas e atualizadas
      • É responsável por todas as atividades em sua conta
      • Deve notificar-nos imediatamente sobre uso não autorizado
      • Podemos suspender ou encerrar contas que violem estes termos
      
      Você deve ter pelo menos 18 anos para criar uma conta. Menores de idade 
      devem ter supervisão de um responsável legal.
    `
  },
  {
    id: 'purchases',
    title: 'Compras e Pagamentos',
    icon: CreditCard,
    color: 'from-neon-pink to-cyber-600',
    content: `
      Ao realizar uma compra, você concorda com:
      
      • Preços são exibidos em tempo real e podem variar
      • Pagamentos são processados de forma segura
      • Aceitamos PIX, cartões de crédito/débito e boleto
      • Reservamo-nos o direito de recusar pedidos
      • Produtos digitais são entregues instantaneamente
      • Produtos físicos seguem prazos de entrega estabelecidos
      
      Todos os preços incluem impostos aplicáveis. Cupons e promoções têm 
      condições específicas que devem ser respeitadas.
    `
  },
  {
    id: 'returns',
    title: 'Devoluções e Reembolsos',
    icon: Truck,
    color: 'from-neon-yellow to-cyber-600',
    content: `
      Nossa política de devolução:
      
      • Produtos físicos: 7 dias para arrependimento
      • Produtos digitais: 30 dias para problemas técnicos
      • Produtos devem estar em condições originais
      • Custos de frete de devolução por conta do cliente
      • Reembolsos processados em até 10 dias úteis
      • Produtos personalizados não podem ser devolvidos
      
      Para solicitar devolução, entre em contato com nosso suporte através 
      dos canais oficiais.
    `
  },
  {
    id: 'intellectual',
    title: 'Propriedade Intelectual',
    icon: Crown,
    color: 'from-cyan-500 to-cyber-600',
    content: `
      Todo o conteúdo da plataforma Ecomify é protegido por direitos autorais:
      
      • Logotipos, marcas e designs são propriedade da Ecomify
      • Conteúdo de produtos pertence aos respectivos fabricantes
      • Você não pode copiar, modificar ou distribuir nosso conteúdo
      • Avaliações e reviews podem ser utilizadas para marketing
      • Respeitamos os direitos de propriedade intelectual de terceiros
      
      Qualquer uso não autorizado pode resultar em ação legal.
    `
  },
  {
    id: 'prohibited',
    title: 'Uso Proibido',
    icon: AlertCircle,
    color: 'from-red-500 to-cyber-600',
    content: `
      É proibido utilizar nossa plataforma para:
      
      • Atividades ilegais ou fraudulentas
      • Violação de direitos de terceiros
      • Transmissão de vírus ou malware
      • Tentativas de hackear ou comprometer a segurança
      • Criação de contas falsas ou múltiplas
      • Spam ou comunicações não solicitadas
      • Venda de produtos proibidos por lei
      • Qualquer atividade que prejudique outros usuários
      
      Violações podem resultar em suspensão permanente da conta.
    `
  },
  {
    id: 'privacy',
    title: 'Privacidade e Dados',
    icon: Shield,
    color: 'from-green-500 to-cyber-600',
    content: `
      Sua privacidade é importante para nós:
      
      • Coletamos apenas dados necessários para o serviço
      • Utilizamos dados para melhorar sua experiência
      • Não vendemos informações pessoais
      • Implementamos medidas rigorosas de segurança
      • Você pode gerenciar suas preferências de privacidade
      • Conformidade total com LGPD e GDPR
      
      Para mais detalhes, consulte nossa Política de Privacidade.
    `
  },
  {
    id: 'limitation',
    title: 'Limitação de Responsabilidade',
    icon: Info,
    color: 'from-orange-500 to-cyber-600',
    content: `
      A Ecomify não se responsabiliza por:
      
      • Danos indiretos ou consequenciais
      • Perda de lucros ou oportunidades
      • Interrupções temporárias do serviço
      • Problemas causados por terceiros
      • Uso inadequado dos produtos vendidos
      • Ações de outros usuários
      
      Nossa responsabilidade é limitada ao valor pago pelos produtos ou serviços.
      Produtos são vendidos "como estão" conforme descrição do fabricante.
    `
  },
  {
    id: 'modifications',
    title: 'Modificações dos Termos',
    icon: Settings,
    color: 'from-indigo-500 to-cyber-600',
    content: `
      Reservamo-nos o direito de modificar estes termos:
      
      • Alterações serão comunicadas com antecedência
      • Notificações via email para usuários registrados
      • Avisos no site e aplicativo
      • Uso continuado constitui aceitação das mudanças
      • Versão atual sempre disponível no site
      
      Recomendamos revisar periodicamente estes termos para 
      estar ciente de eventuais alterações.
    `
  },
  {
    id: 'termination',
    title: 'Rescisão',
    icon: Clock,
    color: 'from-purple-500 to-cyber-600',
    content: `
      Estes termos permanecem em vigor até serem rescindidos:
      
      • Você pode encerrar sua conta a qualquer momento
      • Podemos suspender contas que violem os termos
      • Rescisão não afeta direitos e obrigações existentes
      • Dados podem ser mantidos por obrigações legais
      • Produtos já adquiridos permanecem válidos
      
      Para encerrar sua conta, entre em contato com nosso suporte.
    `
  },
  {
    id: 'governing',
    title: 'Lei Aplicável',
    icon: Globe,
    color: 'from-teal-500 to-cyber-600',
    content: `
      Estes termos são regidos pelas leis brasileiras:
      
      • Jurisdição: Comarca de São Paulo/SP
      • Disputas serão resolvidas em tribunais brasileiros
      • Aplicação da Lei Geral de Proteção de Dados (LGPD)
      • Código de Defesa do Consumidor aplicável
      • Resolução alternativa de disputas disponível
      
      Para questões legais, entre em contato com nosso departamento jurídico.
    `
  }
]

const contactInfo = [
  {
    title: 'Suporte Legal',
    value: 'legal@ecomify.com',
    icon: Mail,
    color: 'from-neon-blue to-cyber-600'
  },
  {
    title: 'Telefone',
    value: '(11) 99999-9999',
    icon: Phone,
    color: 'from-neon-green to-cyber-600'
  },
  {
    title: 'Endereço',
    value: 'Av. Paulista, 1000 - São Paulo/SP',
    icon: MapPin,
    color: 'from-neon-purple to-cyber-600'
  }
]

export default function TermosPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Termos de Uso
              </span>
            </h1>
            <p className="text-cyber-400 text-lg">
              Última atualização: 15 de Janeiro de 2024
            </p>
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Termos e Condições</h2>
                <p className="text-cyber-400">Regras e diretrizes para uso da plataforma</p>
              </div>
            </div>
            
            <p className="text-cyber-300 leading-relaxed text-lg">
              Bem-vindo à Ecomify! Estes Termos de Uso estabelecem as regras e diretrizes 
              para o uso de nossa plataforma de e-commerce. Ao utilizar nossos serviços, 
              você concorda em cumprir estes termos e todas as leis e regulamentos aplicáveis.
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {termsSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                    <div className="prose prose-invert max-w-none">
                      {section.content.split('\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-cyber-300 leading-relaxed mb-4">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                Dúvidas sobre os Termos?
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${contact.color} rounded-lg flex items-center justify-center`}>
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{contact.title}</h3>
                  <p className="text-cyber-400">{contact.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-cyber-800 to-cyber-900 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold font-cyber mb-6">
                <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Pronto para Começar?
                </span>
              </h2>
              <p className="text-xl text-cyber-400 mb-8 max-w-2xl mx-auto">
                Agora que você conhece nossos termos, está pronto para aproveitar 
                tudo que a Ecomify tem a oferecer. Comece sua jornada conosco hoje!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Começar a Comprar
                </Button>
                <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                  <Mail className="w-5 h-5 mr-2" />
                  Entrar em Contato
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  )
}
