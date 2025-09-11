'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  FileText, 
  User, 
  Database, 
  Lock, 
  Eye, 
  Trash2, 
  Download,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function LGPDPage() {
  const rights = [
    {
      icon: Eye,
      title: 'Acesso aos Dados',
      description: 'Solicitar informações sobre quais dados pessoais temos sobre você',
      color: 'text-neon-blue'
    },
    {
      icon: FileText,
      title: 'Correção de Dados',
      description: 'Corrigir dados incompletos, inexatos ou desatualizados',
      color: 'text-neon-green'
    },
    {
      icon: Trash2,
      title: 'Exclusão de Dados',
      description: 'Solicitar a exclusão de dados desnecessários ou excessivos',
      color: 'text-neon-red'
    },
    {
      icon: Download,
      title: 'Portabilidade',
      description: 'Solicitar a portabilidade de seus dados para outro fornecedor',
      color: 'text-neon-purple'
    },
    {
      icon: Shield,
      title: 'Anonimização',
      description: 'Solicitar a anonimização de seus dados pessoais',
      color: 'text-neon-yellow'
    },
    {
      icon: Database,
      title: 'Informações sobre Compartilhamento',
      description: 'Obter informações sobre com quem compartilhamos seus dados',
      color: 'text-neon-pink'
    }
  ]

  const legalBases = [
    {
      title: 'Consentimento',
      description: 'Quando você nos dá permissão explícita para processar seus dados',
      examples: ['Newsletter', 'Marketing direto', 'Cookies não essenciais']
    },
    {
      title: 'Execução de Contrato',
      description: 'Para cumprir obrigações contratuais com você',
      examples: ['Processamento de pedidos', 'Entrega de produtos', 'Suporte ao cliente']
    },
    {
      title: 'Obrigação Legal',
      description: 'Para cumprir obrigações legais e regulamentares',
      examples: ['Relatórios fiscais', 'Prevenção à lavagem de dinheiro', 'Auditorias']
    },
    {
      title: 'Interesse Legítimo',
      description: 'Para proteger nossos interesses legítimos de negócio',
      examples: ['Prevenção de fraudes', 'Segurança da plataforma', 'Melhoria de serviços']
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-cyber-400 hover:text-neon-blue"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Lei Geral de Proteção de Dados (LGPD)
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Conformidade com a LGPD</h2>
              <p className="text-cyber-300">Lei nº 13.709/2018 - Última atualização: 15 de Janeiro de 2024</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-neon-blue" />
                Sobre a LGPD
              </h3>
              <p className="text-cyber-300 leading-relaxed mb-4">
                A Lei Geral de Proteção de Dados (LGPD) é a legislação brasileira que regula o tratamento de dados pessoais. 
                Na Ecomify, estamos comprometidos em cumprir integralmente todas as disposições da LGPD, garantindo que seus 
                dados pessoais sejam tratados de forma transparente, segura e respeitando seus direitos fundamentais.
              </p>
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <p className="text-neon-blue text-sm">
                  <strong>Nosso Compromisso:</strong> Tratamos seus dados pessoais com total transparência, 
                  segurança e respeito aos seus direitos fundamentais de privacidade e proteção de dados.
                </p>
              </div>
            </div>

            {/* Data Controller */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-neon-green" />
                Controlador de Dados
              </h3>
              
              <div className="bg-dark-700/50 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Ecomify</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-neon-blue" />
                        <span className="text-cyber-300">iagodevtech@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-neon-green" />
                        <span className="text-cyber-300">+55 21 95922-0456</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-neon-purple" />
                        <span className="text-cyber-300">São Paulo, SP - Brasil</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Encarregado de Dados (DPO)</h4>
                    <p className="text-cyber-300 text-sm mb-2">
                      Iago Alves - Desenvolvedor e Responsável pela Proteção de Dados
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neon-blue" />
                      <span className="text-cyber-300 text-sm">iagodevtech@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Bases */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-neon-purple" />
                Bases Legais para Tratamento
              </h3>
              
              <p className="text-cyber-300 leading-relaxed mb-4">
                Tratamos seus dados pessoais com base nas seguintes hipóteses legais previstas na LGPD:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {legalBases.map((base, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-dark-700/50 rounded-lg p-4"
                  >
                    <h4 className="text-white font-semibold mb-2">{base.title}</h4>
                    <p className="text-cyber-300 text-sm mb-3">{base.description}</p>
                    <div className="space-y-1">
                      {base.examples.map((example, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-neon-blue rounded-full"></div>
                          <span className="text-cyber-400 text-xs">{example}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* User Rights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-green" />
                Seus Direitos Fundamentais
              </h3>
              
              <p className="text-cyber-300 leading-relaxed mb-6">
                De acordo com a LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-dark-700/50 rounded-lg p-4 hover:bg-dark-700/70 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                        <right.icon className={`w-5 h-5 ${right.color}`} />
                      </div>
                      <h4 className="text-white font-semibold text-sm">{right.title}</h4>
                    </div>
                    <p className="text-cyber-300 text-xs leading-relaxed">{right.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How to Exercise Rights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-neon-blue" />
                Como Exercer seus Direitos
              </h3>
              
              <div className="bg-dark-700/50 rounded-lg p-4">
                <p className="text-cyber-300 leading-relaxed mb-4">
                  Para exercer qualquer um dos seus direitos, entre em contato conosco através dos canais abaixo:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Canais de Contato</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-neon-blue" />
                        <span className="text-cyber-300 text-sm">iagodevtech@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-neon-green" />
                        <span className="text-cyber-300 text-sm">+55 21 95922-0456</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Informações Necessárias</h4>
                    <ul className="text-cyber-300 text-sm space-y-1">
                      <li>• Nome completo</li>
                      <li>• E-mail cadastrado</li>
                      <li>• CPF (para verificação)</li>
                      <li>• Descrição do direito a ser exercido</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                  <p className="text-neon-green text-sm">
                    <strong>Prazo de Resposta:</strong> Responderemos sua solicitação em até 15 dias úteis, 
                    conforme previsto na LGPD.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-neon-yellow" />
                Segurança e Proteção de Dados
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Medidas Técnicas</h4>
                  <ul className="text-cyber-300 text-sm space-y-1">
                    <li>• Criptografia de dados sensíveis</li>
                    <li>• Controle de acesso baseado em funções</li>
                    <li>• Monitoramento de segurança 24/7</li>
                    <li>• Backup seguro e criptografado</li>
                  </ul>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Medidas Organizacionais</h4>
                  <ul className="text-cyber-300 text-sm space-y-1">
                    <li>• Políticas de privacidade e segurança</li>
                    <li>• Treinamento de funcionários</li>
                    <li>• Contratos com fornecedores</li>
                    <li>• Auditorias regulares de conformidade</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Breach */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-neon-red" />
                Incidentes de Segurança
              </h3>
              
              <div className="bg-dark-700/50 rounded-lg p-4">
                <p className="text-cyber-300 leading-relaxed mb-4">
                  Em caso de incidente de segurança que possa resultar em risco ou dano relevante aos titulares, 
                  adotaremos as seguintes medidas:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-cyber-300 text-sm">
                      <strong>Comunicação à ANPD:</strong> Notificaremos a Autoridade Nacional de Proteção de Dados 
                      em até 72 horas após a descoberta do incidente.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-cyber-300 text-sm">
                      <strong>Comunicação aos Titulares:</strong> Informaremos os titulares afetados sobre o incidente 
                      e as medidas tomadas para mitigar os riscos.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-cyber-300 text-sm">
                      <strong>Medidas Corretivas:</strong> Implementaremos medidas imediatas para conter e corrigir 
                      o incidente de segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="text-center">
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <p className="text-neon-blue text-sm">
                  <strong>Atualizações:</strong> Esta política de conformidade com a LGPD pode ser atualizada 
                  periodicamente. Recomendamos que você revise esta página regularmente para se manter informado 
                  sobre como protegemos seus dados pessoais.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
