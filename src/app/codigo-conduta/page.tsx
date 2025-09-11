'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Heart, 
  Shield, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  FileText,
  Mail,
  Phone,
  MapPin,
  Star,
  Zap
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CodigoCondutaPage() {
  const principles = [
    {
      icon: Heart,
      title: 'Respeito',
      description: 'Tratamos todos com dignidade, cortesia e consideração',
      color: 'text-neon-pink'
    },
    {
      icon: Shield,
      title: 'Integridade',
      description: 'Agimos com honestidade, transparência e ética em todas as situações',
      color: 'text-neon-blue'
    },
    {
      icon: Users,
      title: 'Inclusão',
      description: 'Valorizamos a diversidade e criamos um ambiente acolhedor para todos',
      color: 'text-neon-green'
    },
    {
      icon: MessageCircle,
      title: 'Comunicação',
      description: 'Mantemos diálogo aberto, claro e construtivo',
      color: 'text-neon-purple'
    },
    {
      icon: Star,
      title: 'Excelência',
      description: 'Buscamos sempre a melhor qualidade em nossos produtos e serviços',
      color: 'text-neon-yellow'
    },
    {
      icon: Zap,
      title: 'Inovação',
      description: 'Promovemos criatividade e soluções inovadoras',
      color: 'text-neon-orange'
    }
  ]

  const expectedBehaviors = [
    {
      category: 'Comportamentos Esperados',
      icon: CheckCircle,
      color: 'text-neon-green',
      items: [
        'Tratar todos com respeito e cortesia',
        'Manter comunicação profissional e construtiva',
        'Respeitar diferentes opiniões e perspectivas',
        'Colaborar de forma positiva com a equipe',
        'Manter confidencialidade quando necessário',
        'Seguir políticas e procedimentos da empresa',
        'Reportar problemas ou preocupações adequadamente',
        'Participar de treinamentos e desenvolvimento'
      ]
    },
    {
      category: 'Comportamentos Inaceitáveis',
      icon: XCircle,
      color: 'text-red-400',
      items: [
        'Discriminação ou preconceito de qualquer tipo',
        'Assédio moral, sexual ou psicológico',
        'Uso de linguagem ofensiva ou inadequada',
        'Comportamento agressivo ou violento',
        'Divulgação de informações confidenciais',
        'Uso inadequado de recursos da empresa',
        'Conflito de interesses não declarado',
        'Qualquer forma de corrupção ou fraude'
      ]
    }
  ]

  const reportingProcess = [
    {
      step: 1,
      title: 'Identificação',
      description: 'Reconheça o comportamento inadequado e documente os fatos'
    },
    {
      step: 2,
      title: 'Comunicação',
      description: 'Entre em contato através dos canais oficiais de denúncia'
    },
    {
      step: 3,
      title: 'Investigação',
      description: 'Nossa equipe investigará o caso de forma imparcial e confidencial'
    },
    {
      step: 4,
      title: 'Resolução',
      description: 'Tomaremos as medidas apropriadas baseadas nos achados da investigação'
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Código de Conduta
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
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Código de Conduta</h2>
              <p className="text-cyber-300">Nossos valores e princípios que guiam nosso comportamento</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-neon-blue" />
                Nossa Missão
              </h3>
              <p className="text-cyber-300 leading-relaxed mb-4">
                Na Ecomify, acreditamos que um ambiente de trabalho positivo e respeitoso é fundamental para o sucesso 
                de nossa empresa e o bem-estar de todos. Este Código de Conduta estabelece os valores, princípios e 
                comportamentos esperados de todos os membros de nossa comunidade.
              </p>
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <p className="text-neon-blue text-sm">
                  <strong>Nosso Compromisso:</strong> Criamos um ambiente inclusivo, respeitoso e colaborativo onde 
                  todos podem prosperar e contribuir para nosso sucesso coletivo.
                </p>
              </div>
            </div>

            {/* Core Principles */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-neon-yellow" />
                Nossos Valores Fundamentais
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-dark-700/50 rounded-lg p-4 hover:bg-dark-700/70 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                        <principle.icon className={`w-5 h-5 ${principle.color}`} />
                      </div>
                      <h4 className="text-white font-semibold">{principle.title}</h4>
                    </div>
                    <p className="text-cyber-300 text-sm leading-relaxed">{principle.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Expected Behaviors */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-green" />
                Comportamentos Esperados
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {expectedBehaviors.map((behavior, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-dark-700/50 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <behavior.icon className={`w-6 h-6 ${behavior.color}`} />
                      <h4 className="text-white font-semibold">{behavior.category}</h4>
                    </div>
                    
                    <ul className="space-y-2">
                      {behavior.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            behavior.color === 'text-neon-green' ? 'bg-neon-green' : 'bg-red-400'
                          }`}></div>
                          <span className="text-cyber-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reporting Process */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-neon-yellow" />
                Processo de Denúncia
              </h3>
              
              <p className="text-cyber-300 leading-relaxed mb-6">
                Se você testemunhar ou for vítima de comportamento inadequado, siga este processo:
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportingProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-dark-700/50 rounded-lg p-4 text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                    <p className="text-cyber-300 text-sm">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-neon-blue" />
                Canais de Comunicação
              </h3>
              
              <div className="bg-dark-700/50 rounded-lg p-4">
                <p className="text-cyber-300 leading-relaxed mb-4">
                  Para reportar violações do Código de Conduta ou esclarecer dúvidas, entre em contato:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Contato Direto</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-neon-blue" />
                        <span className="text-cyber-300 text-sm">iagodevtech@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-neon-green" />
                        <span className="text-cyber-300 text-sm">+55 21 95922-0456</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-neon-purple" />
                        <span className="text-cyber-300 text-sm">São Paulo, SP - Brasil</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Canal de Denúncias</h4>
                    <p className="text-cyber-300 text-sm mb-2">
                      Para denúncias anônimas ou confidenciais:
                    </p>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-neon-yellow" />
                      <span className="text-cyber-300 text-sm">denuncias@ecomify.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                  <p className="text-neon-green text-sm">
                    <strong>Confidencialidade:</strong> Todas as denúncias são tratadas com total confidencialidade 
                    e investigadas de forma imparcial e justa.
                  </p>
                </div>
              </div>
            </div>

            {/* Consequences */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                Consequências
              </h3>
              
              <div className="bg-dark-700/50 rounded-lg p-4">
                <p className="text-cyber-300 leading-relaxed mb-4">
                  Violações do Código de Conduta podem resultar em medidas disciplinares, incluindo:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Medidas Leves</h4>
                    <ul className="text-cyber-300 text-sm space-y-1">
                      <li>• Advertência verbal</li>
                      <li>• Advertência por escrito</li>
                      <li>• Treinamento adicional</li>
                      <li>• Acompanhamento de performance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Medidas Graves</h4>
                    <ul className="text-cyber-300 text-sm space-y-1">
                      <li>• Suspensão temporária</li>
                      <li>• Redução de responsabilidades</li>
                      <li>• Transferência de função</li>
                      <li>• Rescisão do contrato</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div className="text-center">
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-3">Nosso Compromisso</h3>
                <p className="text-cyber-300 leading-relaxed">
                  Este Código de Conduta reflete nossos valores e compromisso com um ambiente de trabalho 
                  positivo e respeitoso. Todos os membros da Ecomify são responsáveis por seguir estes 
                  princípios e contribuir para uma cultura organizacional saudável e produtiva.
                </p>
                <div className="mt-4 flex justify-center">
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Compromisso com a Excelência
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
