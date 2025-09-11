'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck,
  Settings,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  FileText
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PrivacyPage() {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introdução',
      content: 'A Ecomify valoriza sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações quando você utiliza nossa plataforma e serviços.'
    },
    {
      id: 'data-collection',
      title: '2. Dados que Coletamos',
      content: 'Coletamos diferentes tipos de informações: Dados pessoais (nome, email, telefone, endereço), dados de navegação (cookies, IP, dispositivo), dados de transação (histórico de compras, pagamentos), dados de comunicação (suporte, feedback) e dados de preferências (configurações, interesses).'
    },
    {
      id: 'data-usage',
      title: '3. Como Usamos seus Dados',
      content: 'Utilizamos seus dados para: processar pedidos e pagamentos, fornecer suporte ao cliente, personalizar sua experiência, enviar comunicações relevantes, melhorar nossos serviços, cumprir obrigações legais, prevenir fraudes e garantir a segurança da plataforma.'
    },
    {
      id: 'data-sharing',
      title: '4. Compartilhamento de Dados',
      content: 'Não vendemos seus dados pessoais. Compartilhamos informações apenas com: prestadores de serviços essenciais (entrega, pagamento), autoridades quando exigido por lei, parceiros comerciais com seu consentimento explícito, e em caso de fusão ou aquisição da empresa.'
    },
    {
      id: 'data-security',
      title: '5. Segurança dos Dados',
      content: 'Implementamos medidas de segurança técnicas e organizacionais robustas: criptografia SSL/TLS, armazenamento seguro em servidores protegidos, acesso restrito aos dados, monitoramento contínuo, backups regulares e treinamento da equipe em proteção de dados.'
    },
    {
      id: 'cookies',
      title: '6. Cookies e Tecnologias Similares',
      content: 'Utilizamos cookies para melhorar sua experiência: cookies essenciais (funcionamento básico), cookies de performance (análise de uso), cookies de funcionalidade (preferências), cookies de marketing (personalização). Você pode gerenciar suas preferências de cookies a qualquer momento.'
    },
    {
      id: 'data-retention',
      title: '7. Retenção de Dados',
      content: 'Mantemos seus dados apenas pelo tempo necessário: dados de conta (enquanto ativa), dados de transação (7 anos para fins fiscais), dados de marketing (até cancelamento), dados de suporte (3 anos), dados de navegação (2 anos). Após esses períodos, os dados são excluídos de forma segura.'
    },
    {
      id: 'user-rights',
      title: '8. Seus Direitos',
      content: 'Você tem os seguintes direitos: acesso aos seus dados, correção de informações incorretas, exclusão de dados desnecessários, portabilidade dos dados, oposição ao processamento, limitação do processamento, retirada de consentimento e não ser submetido a decisões automatizadas.'
    },
    {
      id: 'children-privacy',
      title: '9. Privacidade de Menores',
      content: 'Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados de menores sem consentimento dos pais. Se descobrirmos que coletamos dados de um menor, tomaremos medidas para excluir essas informações imediatamente.'
    },
    {
      id: 'international-transfers',
      title: '10. Transferências Internacionais',
      content: 'Alguns de nossos prestadores de serviços podem estar localizados fora do Brasil. Quando transferimos dados internacionalmente, garantimos proteções adequadas através de cláusulas contratuais padrão, certificações de adequação ou outros mecanismos legais aprovados.'
    },
    {
      id: 'policy-changes',
      title: '11. Alterações na Política',
      content: 'Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através de email ou aviso na plataforma. Recomendamos revisar esta política regularmente. O uso continuado dos serviços após alterações constitui aceitação da nova política.'
    },
    {
      id: 'contact',
      title: '12. Contato',
      content: 'Para questões sobre privacidade, entre em contato conosco: Email: privacidade@ecomify.com, Telefone: (11) 99999-9999, Endereço: Av. Paulista, 1000 - São Paulo, SP. Nossa equipe de privacidade responderá em até 30 dias úteis.'
    }
  ]

  const privacyPrinciples = [
    {
      icon: Shield,
      title: 'Transparência',
      description: 'Sempre informamos claramente como usamos seus dados'
    },
    {
      icon: Lock,
      title: 'Segurança',
      description: 'Protegemos seus dados com tecnologia de ponta'
    },
    {
      icon: UserCheck,
      title: 'Controle',
      description: 'Você tem controle total sobre seus dados pessoais'
    },
    {
      icon: Eye,
      title: 'Minimização',
      description: 'Coletamos apenas os dados necessários'
    }
  ]

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
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold font-cyber mb-4">
                  <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                    Política de Privacidade
                  </span>
                </h1>
                <p className="text-cyber-400 text-xl leading-relaxed">
                  Saiba como protegemos e utilizamos seus dados pessoais
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <CheckCircle className="w-6 h-6 text-neon-green" />
                  <span className="text-neon-green font-bold">Última atualização: 15 de Janeiro de 2024</span>
                </div>
                <p className="text-cyber-300">
                  Esta política foi atualizada para refletir as melhores práticas de proteção de dados 
                  e conformidade com a LGPD (Lei Geral de Proteção de Dados).
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="py-16 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Nossos Princípios de Privacidade</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Os valores que guiam nossa abordagem à proteção de dados
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {privacyPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mb-4">
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{principle.title}</h3>
                  <p className="text-cyber-400">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      {section.title}
                    </h2>
                    <p className="text-cyber-300 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data Protection Features */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Recursos de Proteção</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Tecnologias e medidas que implementamos para proteger seus dados
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Criptografia SSL/TLS</h3>
                <p className="text-cyber-400">
                  Todos os dados são transmitidos através de conexões criptografadas de ponta a ponta.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Armazenamento Seguro</h3>
                <p className="text-cyber-400">
                  Dados armazenados em servidores seguros com múltiplas camadas de proteção.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Controle de Acesso</h3>
                <p className="text-cyber-400">
                  Acesso restrito aos dados apenas para funcionários autorizados e treinados.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-yellow rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Monitoramento Contínuo</h3>
                <p className="text-cyber-400">
                  Monitoramento 24/7 para detectar e prevenir tentativas de acesso não autorizado.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon-yellow to-neon-orange rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Autenticação Dupla</h3>
                <p className="text-cyber-400">
                  Sistema de autenticação em duas etapas para maior segurança da conta.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon-orange to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Detecção de Fraude</h3>
                <p className="text-cyber-400">
                  Sistemas avançados de detecção de fraudes e atividades suspeitas.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Seus Direitos</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Você tem controle total sobre seus dados pessoais
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Acesso e Controle</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Visualizar todos os seus dados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Corrigir informações incorretas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Excluir dados desnecessários</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Exportar seus dados</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Preferências</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Gerenciar cookies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Controlar comunicações</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Personalizar experiência</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-cyber-300">Retirar consentimento</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-green/30 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Dúvidas sobre Privacidade?</h2>
              <p className="text-cyber-300 text-lg mb-8 max-w-2xl mx-auto">
                Nossa equipe de privacidade está disponível para esclarecer qualquer dúvida 
                sobre como protegemos seus dados pessoais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Baixar Política
                </Button>
                <Button variant="outline" className="border-cyber-500/30 text-cyber-400 hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Fale Conosco
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
