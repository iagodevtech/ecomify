'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PoliticaPrivacidadePage() {
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
                Política de Privacidade
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
              <h2 className="text-2xl font-bold text-white mb-2">Política de Privacidade</h2>
              <p className="text-cyber-300">Última atualização: 15 de Janeiro de 2024</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-neon-blue" />
                Introdução
              </h3>
              <p className="text-cyber-300 leading-relaxed mb-4">
                A Ecomify ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. 
                Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos 
                suas informações pessoais quando você utiliza nossos serviços.
              </p>
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <p className="text-neon-blue text-sm">
                  <strong>Importante:</strong> Ao usar nossos serviços, você concorda com a coleta 
                  e uso de informações de acordo com esta política.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-neon-green" />
                Informações que Coletamos
              </h3>
              
              <div className="space-y-4">
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-neon-blue" />
                    Informações Pessoais
                  </h4>
                  <ul className="text-cyber-300 text-sm space-y-1 ml-6">
                    <li>• Nome completo e dados de contato</li>
                    <li>• Endereço de e-mail e número de telefone</li>
                    <li>• Endereço de entrega e cobrança</li>
                    <li>• Data de nascimento (opcional)</li>
                    <li>• Preferências de comunicação</li>
                  </ul>
                </div>

                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-neon-purple" />
                    Informações de Uso
                  </h4>
                  <ul className="text-cyber-300 text-sm space-y-1 ml-6">
                    <li>• Histórico de navegação e compras</li>
                    <li>• Produtos visualizados e favoritos</li>
                    <li>• Interações com o site e aplicativo</li>
                    <li>• Dados de localização (quando permitido)</li>
                    <li>• Informações do dispositivo e navegador</li>
                  </ul>
                </div>

                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-neon-pink" />
                    Informações de Pagamento
                  </h4>
                  <ul className="text-cyber-300 text-sm space-y-1 ml-6">
                    <li>• Informações de cartão de crédito (criptografadas)</li>
                    <li>• Histórico de transações</li>
                    <li>• Dados de faturamento</li>
                    <li>• Informações de reembolso</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                Como Usamos suas Informações
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Processamento de Pedidos</h4>
                  <p className="text-cyber-300 text-sm">
                    Processar e entregar seus pedidos, gerenciar pagamentos e fornecer suporte ao cliente.
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Comunicação</h4>
                  <p className="text-cyber-300 text-sm">
                    Enviar atualizações de pedidos, ofertas promocionais e informações importantes sobre sua conta.
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Personalização</h4>
                  <p className="text-cyber-300 text-sm">
                    Personalizar sua experiência, recomendar produtos e melhorar nossos serviços.
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Segurança</h4>
                  <p className="text-cyber-300 text-sm">
                    Detectar e prevenir fraudes, proteger contra atividades suspeitas e manter a segurança da plataforma.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-neon-yellow" />
                Compartilhamento de Dados
              </h3>
              
              <p className="text-cyber-300 leading-relaxed mb-4">
                Não vendemos suas informações pessoais. Compartilhamos dados apenas nas seguintes situações:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-cyber-300 text-sm">
                    <strong>Prestadores de Serviços:</strong> Parceiros confiáveis que nos ajudam a operar nossa plataforma 
                    (processamento de pagamentos, entrega, suporte ao cliente).
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-cyber-300 text-sm">
                    <strong>Obrigações Legais:</strong> Quando exigido por lei, ordem judicial ou para proteger nossos direitos.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-cyber-300 text-sm">
                    <strong>Consentimento:</strong> Quando você nos dá permissão explícita para compartilhar suas informações.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-neon-green" />
                Segurança dos Dados
              </h3>
              
              <div className="bg-dark-700/50 rounded-lg p-4">
                <p className="text-cyber-300 leading-relaxed mb-4">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Criptografia</h4>
                    <p className="text-cyber-300 text-sm">
                      Dados sensíveis são criptografados em trânsito e em repouso usando padrões da indústria.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Acesso Restrito</h4>
                    <p className="text-cyber-300 text-sm">
                      Apenas funcionários autorizados têm acesso às suas informações pessoais.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Monitoramento</h4>
                    <p className="text-cyber-300 text-sm">
                      Monitoramos continuamente nossos sistemas para detectar atividades suspeitas.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Backup Seguro</h4>
                    <p className="text-cyber-300 text-sm">
                      Realizamos backups regulares e seguros de todos os dados importantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-neon-purple" />
                Seus Direitos
              </h3>
              
              <p className="text-cyber-300 leading-relaxed mb-4">
                De acordo com a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Acesso</h4>
                  <p className="text-cyber-300 text-sm">
                    Solicitar informações sobre quais dados pessoais temos sobre você.
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Correção</h4>
                  <p className="text-cyber-300 text-sm">
                    Corrigir dados incompletos, inexatos ou desatualizados.
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Exclusão</h4>
                  <p className="text-cyber-300 text-sm">
                    Solicitar a exclusão de dados desnecessários ou excessivos.
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Portabilidade</h4>
                  <p className="text-cyber-300 text-sm">
                    Solicitar a portabilidade de seus dados para outro fornecedor.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-neon-blue" />
                Contato
              </h3>
              
              <div className="bg-dark-700/50 rounded-lg p-4">
                <p className="text-cyber-300 leading-relaxed mb-4">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos, 
                  entre em contato conosco:
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-neon-blue" />
                    <span className="text-cyber-300">iagodevtech@gmail.com</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-neon-green" />
                    <span className="text-cyber-300">+55 21 95922-0456</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-neon-purple" />
                    <span className="text-cyber-300">São Paulo, SP - Brasil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="text-center">
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <p className="text-neon-blue text-sm">
                  <strong>Atualizações:</strong> Esta política pode ser atualizada periodicamente. 
                  Recomendamos que você revise esta página regularmente para se manter informado sobre 
                  como protegemos suas informações.
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
