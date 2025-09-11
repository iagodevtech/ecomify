'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cookie, 
  Settings, 
  Eye, 
  Shield, 
  BarChart3, 
  Target, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PoliticaCookiesPage() {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  const handleCookieToggle = (type: keyof typeof cookieSettings) => {
    if (type === 'necessary') return // Necessary cookies cannot be disabled
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const saveCookieSettings = () => {
    // Em produção, isso salvaria as preferências do usuário
    localStorage.setItem('cookiePreferences', JSON.stringify(cookieSettings))
    alert('Preferências de cookies salvas!')
  }

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Cookies Necessários',
      description: 'Essenciais para o funcionamento básico do site',
      icon: Shield,
      color: 'text-neon-green',
      examples: ['Sessão do usuário', 'Preferências de idioma', 'Carrinho de compras'],
      required: true
    },
    {
      id: 'analytics',
      name: 'Cookies de Análise',
      description: 'Nos ajudam a entender como você usa nosso site',
      icon: BarChart3,
      color: 'text-neon-blue',
      examples: ['Google Analytics', 'Métricas de performance', 'Estatísticas de uso'],
      required: false
    },
    {
      id: 'marketing',
      name: 'Cookies de Marketing',
      description: 'Usados para personalizar anúncios e conteúdo',
      icon: Target,
      color: 'text-neon-purple',
      examples: ['Anúncios personalizados', 'Remarketing', 'Redes sociais'],
      required: false
    },
    {
      id: 'preferences',
      name: 'Cookies de Preferências',
      description: 'Lembram suas escolhas e configurações',
      icon: Settings,
      color: 'text-neon-yellow',
      examples: ['Tema do site', 'Configurações de notificação', 'Preferências de layout'],
      required: false
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
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Política de Cookies
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
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Política de Cookies</h2>
              <p className="text-cyber-300">Última atualização: 15 de Janeiro de 2024</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-neon-blue" />
                O que são Cookies?
              </h3>
              <p className="text-cyber-300 leading-relaxed mb-4">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site. 
                Eles nos ajudam a melhorar sua experiência, personalizar conteúdo e analisar como você usa nossos serviços.
              </p>
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <p className="text-neon-blue text-sm">
                  <strong>Importante:</strong> Você pode controlar e gerenciar cookies através das configurações do seu navegador 
                  ou usando nossas ferramentas de preferências abaixo.
                </p>
              </div>
            </div>

            {/* Cookie Settings */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-neon-green" />
                Configurações de Cookies
              </h3>
              
              <div className="space-y-4">
                {cookieTypes.map((cookie) => (
                  <motion.div
                    key={cookie.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center`}>
                          <cookie.icon className={`w-4 h-4 ${cookie.color}`} />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{cookie.name}</h4>
                          <p className="text-cyber-300 text-sm">{cookie.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {cookie.required && (
                          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                            Necessário
                          </Badge>
                        )}
                        
                        <button
                          onClick={() => handleCookieToggle(cookie.id as keyof typeof cookieSettings)}
                          disabled={cookie.required}
                          className={`flex items-center gap-2 ${
                            cookie.required 
                              ? 'cursor-not-allowed opacity-50' 
                              : 'cursor-pointer hover:opacity-80'
                          }`}
                        >
                          {cookieSettings[cookie.id as keyof typeof cookieSettings] ? (
                            <ToggleRight className="w-6 h-6 text-neon-green" />
                          ) : (
                            <ToggleLeft className="w-6 h-6 text-cyber-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="ml-11">
                      <p className="text-cyber-300 text-sm mb-2">Exemplos de uso:</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, index) => (
                          <Badge key={index} className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30 text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={saveCookieSettings}
                  className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </div>

            {/* Cookie Details */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-neon-purple" />
                Detalhes dos Cookies
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cyber-500/30">
                      <th className="text-left text-white font-semibold py-3 px-4">Nome</th>
                      <th className="text-left text-white font-semibold py-3 px-4">Finalidade</th>
                      <th className="text-left text-white font-semibold py-3 px-4">Duração</th>
                      <th className="text-left text-white font-semibold py-3 px-4">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-cyber-500/20">
                      <td className="text-cyber-300 py-3 px-4 font-mono text-sm">session_id</td>
                      <td className="text-cyber-300 py-3 px-4">Manter sessão do usuário</td>
                      <td className="text-cyber-300 py-3 px-4">Sessão</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                          Necessário
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-cyber-500/20">
                      <td className="text-cyber-300 py-3 px-4 font-mono text-sm">cart_items</td>
                      <td className="text-cyber-300 py-3 px-4">Armazenar itens do carrinho</td>
                      <td className="text-cyber-300 py-3 px-4">30 dias</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                          Necessário
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-cyber-500/20">
                      <td className="text-cyber-300 py-3 px-4 font-mono text-sm">_ga</td>
                      <td className="text-cyber-300 py-3 px-4">Análise de tráfego (Google Analytics)</td>
                      <td className="text-cyber-300 py-3 px-4">2 anos</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                          Análise
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-cyber-500/20">
                      <td className="text-cyber-300 py-3 px-4 font-mono text-sm">_fbp</td>
                      <td className="text-cyber-300 py-3 px-4">Pixel do Facebook</td>
                      <td className="text-cyber-300 py-3 px-4">90 dias</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                          Marketing
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-cyber-300 py-3 px-4 font-mono text-sm">theme_preference</td>
                      <td className="text-cyber-300 py-3 px-4">Lembrar preferência de tema</td>
                      <td className="text-cyber-300 py-3 px-4">1 ano</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                          Preferências
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Browser Settings */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-neon-yellow" />
                Configurações do Navegador
              </h3>
              
              <p className="text-cyber-300 leading-relaxed mb-4">
                Você também pode controlar cookies diretamente através das configurações do seu navegador:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Google Chrome</h4>
                  <p className="text-cyber-300 text-sm">
                    Configurações → Privacidade e segurança → Cookies e outros dados do site
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Mozilla Firefox</h4>
                  <p className="text-cyber-300 text-sm">
                    Opções → Privacidade e Segurança → Cookies e Dados do Site
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Safari</h4>
                  <p className="text-cyber-300 text-sm">
                    Preferências → Privacidade → Gerenciar dados do site
                  </p>
                </div>
                
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Microsoft Edge</h4>
                  <p className="text-cyber-300 text-sm">
                    Configurações → Cookies e permissões do site → Cookies e dados armazenados
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center">
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                <p className="text-neon-blue text-sm">
                  <strong>Dúvidas sobre Cookies?</strong> Entre em contato conosco em 
                  <span className="text-white"> iagodevtech@gmail.com</span> para mais informações 
                  sobre nossa política de cookies.
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
