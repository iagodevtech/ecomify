'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Mail, 
  Bell, 
  Smartphone, 
  Gift, 
  Zap, 
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const benefits = [
  {
    icon: Gift,
    title: 'Ofertas Exclusivas',
    description: 'Descontos de até 50% em produtos selecionados'
  },
  {
    icon: Bell,
    title: 'Alertas de Preço',
    description: 'Notificações quando seus produtos favoritos baixarem de preço'
  },
  {
    icon: Zap,
    title: 'Lançamentos Primeiro',
    description: 'Seja o primeiro a conhecer novos produtos e tecnologias'
  },
  {
    icon: Shield,
    title: 'Conteúdo Premium',
    description: 'Guias, tutoriais e insights sobre tecnologia'
  }
]

export function NewsletterSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
    setPhone('')
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-orange to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-orange rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="bg-neon-orange/20 text-neon-orange border-neon-orange/50 px-4 py-2 text-sm font-cyber mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Newsletter Exclusiva
            </Badge>
            
            <h2 className="text-4xl lg:text-5xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-orange via-neon-pink to-neon-purple bg-clip-text text-transparent">
                Fique Sempre Atualizado
              </span>
            </h2>
            
            <p className="text-xl text-cyber-400 max-w-2xl mx-auto">
              Receba as últimas novidades, ofertas exclusivas e alertas de preço diretamente no seu dispositivo
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold font-cyber mb-6 text-white">
                Por que se inscrever?
              </h3>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-neon-orange to-neon-pink flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-cyber-400 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 p-6 bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-6 h-6 text-neon-green" />
                  <span className="text-white font-semibold">100% Seguro e Privado</span>
                </div>
                <p className="text-cyber-400 text-sm">
                  Seus dados estão protegidos com criptografia de nível militar. 
                  Você pode cancelar a qualquer momento.
                </p>
              </div>
            </motion.div>

            {/* Subscription Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {!isSubscribed ? (
                <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold font-cyber mb-6 text-white">
                    Inscreva-se Agora
                  </h3>

                  <form onSubmit={handleSubscribe} className="space-y-6">
                    {/* Email Input */}
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full pl-12 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        WhatsApp (Opcional)
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full pl-12 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="space-y-3">
                      <label className="block text-cyber-300 text-sm font-medium">
                        Preferências de Notificação
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue" />
                          <span className="text-cyber-400 text-sm">Ofertas e promoções</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue" />
                          <span className="text-cyber-400 text-sm">Alertas de preço</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue" />
                          <span className="text-cyber-400 text-sm">Novos produtos</span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full cyber-button bg-gradient-to-r from-neon-orange to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white py-3 text-lg font-cyber"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Inscrevendo...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5" />
                          Inscrever-se
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  </form>

                  <p className="text-cyber-500 text-xs mt-4 text-center">
                    Ao se inscrever, você concorda com nossos termos de uso e política de privacidade.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-neon-green/50 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-cyber mb-4 text-white">
                    Inscrição Confirmada!
                  </h3>
                  
                  <p className="text-cyber-400 mb-6">
                    Obrigado por se inscrever! Você receberá nossas atualizações em breve.
                  </p>
                  
                  <Button
                    onClick={() => setIsSubscribed(false)}
                    variant="outline"
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    Inscrever Outro Email
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
