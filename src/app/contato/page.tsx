'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Zap,
  Headphones,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@ecomify.com',
      description: 'Respondemos em até 2 horas'
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(11) 99999-9999',
      description: 'Seg-Sex: 8h às 18h'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'São Paulo, SP',
      description: 'Av. Paulista, 1000'
    },
    {
      icon: Clock,
      title: 'Horário',
      value: 'Seg-Sex: 8h-18h',
      description: 'Sáb: 9h-15h'
    }
  ]

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', url: '#', color: 'from-pink-500 to-purple-500' },
    { icon: Twitter, name: 'Twitter', url: '#', color: 'from-blue-400 to-blue-600' },
    { icon: Facebook, name: 'Facebook', url: '#', color: 'from-blue-600 to-blue-800' },
    { icon: Linkedin, name: 'LinkedIn', url: '#', color: 'from-blue-700 to-blue-900' },
    { icon: Youtube, name: 'YouTube', url: '#', color: 'from-red-500 to-red-700' }
  ]

  const faqs = [
    {
      question: 'Como posso rastrear meu pedido?',
      answer: 'Você pode rastrear seu pedido através do código de rastreamento enviado por email ou acessando sua conta no dashboard.'
    },
    {
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo de entrega varia de 2 a 7 dias úteis, dependendo da sua localização e do produto escolhido.'
    },
    {
      question: 'Oferecem garantia estendida?',
      answer: 'Sim, oferecemos garantia estendida para todos os produtos, com cobertura adicional de até 3 anos.'
    },
    {
      question: 'Posso cancelar meu pedido?',
      answer: 'Sim, você pode cancelar seu pedido até 24 horas após a compra, desde que não tenha sido enviado.'
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
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold font-cyber mb-4">
                  <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                    Fale Conosco
                  </span>
                </h1>
                <p className="text-cyber-400 text-xl leading-relaxed">
                  Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo 
                  ou envie uma mensagem diretamente pelo formulário.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-4">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                  <p className="text-neon-blue font-medium mb-1">{info.value}</p>
                  <p className="text-cyber-400 text-sm">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Envie uma Mensagem</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Assunto *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="suporte">Suporte Técnico</option>
                        <option value="vendas">Dúvidas sobre Produtos</option>
                        <option value="pedido">Status do Pedido</option>
                        <option value="devolucao">Devolução/Troca</option>
                        <option value="parceria">Parcerias</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all resize-none"
                      placeholder="Descreva sua dúvida ou solicitação..."
                    />
                  </div>

                  {/* Success/Error Messages */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white py-3 text-lg font-medium"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Enviar Mensagem
                        <Send className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                {/* Map Placeholder */}
                <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Nossa Localização</h2>
                  </div>
                  
                  <div className="w-full h-64 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-cyber-500 mx-auto mb-2" />
                      <p className="text-cyber-400">Mapa Interativo</p>
                      <p className="text-cyber-500 text-sm">Av. Paulista, 1000 - São Paulo, SP</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-neon-blue" />
                      <span className="text-cyber-300">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-neon-blue" />
                      <span className="text-cyber-300">(11) 99999-9999</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-neon-blue" />
                      <span className="text-cyber-300">contato@ecomify.com</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Siga-nos</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="flex items-center gap-3 p-3 bg-cyber-800/30 rounded-lg hover:bg-cyber-700/30 transition-all group"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center`}>
                          <social.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-cyber-300 group-hover:text-white transition-colors">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Perguntas Frequentes</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Encontre respostas rápidas para as dúvidas mais comuns
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-cyber-300 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Precisa de Ajuda Imediata?</h2>
              <p className="text-cyber-300 text-lg mb-8 max-w-2xl mx-auto">
                Nossa equipe de suporte está disponível 24/7 para ajudar você com qualquer dúvida ou problema.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </Button>
                <Button variant="outline" className="border-cyber-500/30 text-cyber-400 hover:text-white">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat Online
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}