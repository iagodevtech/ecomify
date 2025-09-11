'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Database, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Zap, 
  Settings, 
  Bell, 
  Heart, 
  ShoppingCart, 
  Package, 
  Truck, 
  Award, 
  Star, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Target, 
  Crown, 
  Gem, 
  Sparkles
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const privacySections = [
  {
    id: 'introduction',
    title: 'Introdução',
    icon: Info,
    color: 'from-neon-blue to-cyber-600',
    content: `
      A Ecomify valoriza sua privacidade e está comprometida em proteger suas informações pessoais. 
      Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas 
      informações quando você utiliza nossos serviços.
      
      Ao usar a Ecomify, você concorda com as práticas descritas nesta política. Se você não 
      concordar com alguma parte desta política, por favor, não use nossos serviços.
    `
  },
  {
    id: 'data-collection',
    title: 'Coleta de Dados',
    icon: Database,
    color: 'from-neon-green to-cyber-600',
    content: `
      Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
      
      • Informações pessoais: nome, email, telefone, endereço
      • Informações de pagamento: dados de cartão de crédito (criptografados)
      • Informações de navegação: páginas visitadas, tempo de permanência
      • Informações de dispositivo: tipo de dispositivo, sistema operacional
      • Cookies e tecnologias similares para personalização
      
      Todas as informações são coletadas de forma transparente e com seu consentimento.
    `
  },
  {
    id: 'data-usage',
    title: 'Uso dos Dados',
    icon: Activity,
    color: 'from-neon-purple to-cyber-600',
    content: `
      Utilizamos suas informações para:
      
      • Processar pedidos e entregas
      • Fornecer suporte ao cliente
      • Personalizar sua experiência
      • Enviar comunicações importantes
      • Melhorar nossos produtos e serviços
      • Detectar fraudes e garantir segurança
      • Cumprir obrigações legais
      
      Nunca vendemos suas informações pessoais para terceiros.
    `
  },
  {
    id: 'data-protection',
    title: 'Proteção de Dados',
    icon: Shield,
    color: 'from-neon-pink to-cyber-600',
    content: `
      Implementamos medidas rigorosas de segurança:
      
      • Criptografia SSL/TLS para transmissão de dados
      • Criptografia AES-256 para armazenamento
      • Acesso restrito baseado em função
      • Monitoramento contínuo de segurança
      • Backup seguro e redundante
      • Conformidade com LGPD e GDPR
      
      Nossos servidores são protegidos por firewalls avançados e sistemas de detecção de intrusão.
    `
  },
  {
    id: 'cookies',
    title: 'Cookies e Tecnologias',
    icon: Globe,
    color: 'from-neon-yellow to-cyber-600',
    content: `
      Utilizamos cookies e tecnologias similares para:
      
      • Manter sua sessão ativa
      • Lembrar suas preferências
      • Analisar o uso do site
      • Personalizar conteúdo
      • Melhorar a performance
      
      Você pode gerenciar cookies através das configurações do seu navegador. 
      Algumas funcionalidades podem não funcionar corretamente se os cookies 
      estiverem desabilitados.
    `
  },
  {
    id: 'third-parties',
    title: 'Terceiros',
    icon: User,
    color: 'from-cyan-500 to-cyber-600',
    content: `
      Compartilhamos informações apenas com:
      
      • Processadores de pagamento (Stripe, PagSeguro)
      • Serviços de entrega (Correios, transportadoras)
      • Provedores de email (para comunicações)
      • Serviços de análise (Google Analytics)
      • Autoridades legais (quando exigido por lei)
      
      Todos os terceiros são obrigados a manter a confidencialidade e segurança 
      das suas informações.
    `
  },
  {
    id: 'your-rights',
    title: 'Seus Direitos',
    icon: CheckCircle,
    color: 'from-green-500 to-cyber-600',
    content: `
      Você tem o direito de:
      
      • Acessar suas informações pessoais
      • Corrigir dados incorretos
      • Solicitar exclusão de dados
      • Portabilidade de dados
      • Revogar consentimento
      • Opor-se ao processamento
      • Não ser submetido a decisões automatizadas
      
      Para exercer seus direitos, entre em contato conosco através dos canais 
      oficiais de suporte.
    `
  },
  {
    id: 'data-retention',
    title: 'Retenção de Dados',
    icon: Clock,
    color: 'from-orange-500 to-cyber-600',
    content: `
      Mantemos suas informações pelo tempo necessário para:
      
      • Cumprir finalidades comerciais
      • Atender obrigações legais
      • Resolver disputas
      • Fazer cumprir acordos
      
      Dados de pedidos: 5 anos
      Dados de conta: enquanto ativa
      Dados de marketing: até revogação
      Dados de suporte: 3 anos
      
      Após esses períodos, os dados são excluídos de forma segura.
    `
  },
  {
    id: 'children',
    title: 'Menores de Idade',
    icon: Heart,
    color: 'from-pink-500 to-cyber-600',
    content: `
      Nossos serviços não são direcionados a menores de 18 anos. Não coletamos 
      intencionalmente informações pessoais de menores.
      
      Se você é pai/mãe e acredita que seu filho nos forneceu informações pessoais, 
      entre em contato conosco imediatamente.
      
      Removeremos tais informações de nossos registros assim que possível.
    `
  },
  {
    id: 'changes',
    title: 'Alterações na Política',
    icon: Settings,
    color: 'from-indigo-500 to-cyber-600',
    content: `
      Podemos atualizar esta Política de Privacidade periodicamente. 
      Notificaremos sobre mudanças significativas através de:
      
      • Email para usuários registrados
      • Aviso no site
      • Notificação no aplicativo
      
      Recomendamos revisar esta política regularmente. O uso continuado 
      dos serviços após alterações constitui aceitação da nova política.
    `
  }
]

const contactInfo = [
  {
    title: 'Email',
    value: 'privacidade@ecomify.com',
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
    icon: Globe,
    color: 'from-neon-purple to-cyber-600'
  }
]

export default function PrivacidadePage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Política de Privacidade
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Compromisso com a Privacidade</h2>
                <p className="text-cyber-400">Sua privacidade é nossa prioridade</p>
              </div>
            </div>
            
            <p className="text-cyber-300 leading-relaxed text-lg">
              Na Ecomify, levamos a proteção de dados muito a sério. Esta política detalha 
              como coletamos, usamos e protegemos suas informações pessoais, garantindo 
              total transparência e conformidade com a LGPD (Lei Geral de Proteção de Dados).
            </p>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {privacySections.map((section, index) => (
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
                Dúvidas sobre Privacidade?
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
                  Sua Privacidade é Importante
                </span>
              </h2>
              <p className="text-xl text-cyber-400 mb-8 max-w-2xl mx-auto">
                Temos orgulho de ser transparentes sobre como protegemos seus dados. 
                Se você tiver alguma dúvida ou preocupação, não hesite em entrar em contato.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Mail className="w-5 h-5 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
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
