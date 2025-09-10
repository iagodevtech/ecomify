'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Brain, 
  Eye, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone,
  Cpu,
  Wifi,
  ArrowRight,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const techFeatures = [
  {
    icon: Brain,
    title: 'Inteligência Artificial',
    description: 'Recomendações personalizadas e suporte inteligente 24/7',
    color: 'from-neon-blue to-cyber-600',
    features: ['Chatbot IA', 'Recomendações', 'Análise de Comportamento']
  },
  {
    icon: Eye,
    title: 'Realidade Aumentada',
    description: 'Visualize produtos em seu ambiente antes de comprar',
    color: 'from-neon-purple to-cyber-600',
    features: ['Visualização 3D', 'AR Shopping', 'Try Before Buy']
  },
  {
    icon: Zap,
    title: 'Pagamentos Instantâneos',
    description: 'Checkout em segundos com tecnologia blockchain',
    color: 'from-neon-green to-cyber-600',
    features: ['PIX Instantâneo', 'Crypto Payments', 'One-Click Buy']
  },
  {
    icon: Shield,
    title: 'Segurança Avançada',
    description: 'Proteção de dados com criptografia de nível militar',
    color: 'from-neon-pink to-cyber-600',
    features: ['Criptografia AES-256', '2FA', 'Biometria']
  },
  {
    icon: Globe,
    title: 'Global & Local',
    description: 'Entrega mundial com estoque local inteligente',
    color: 'from-neon-orange to-cyber-600',
    features: ['Entrega Global', 'Estoque Local', 'Tracking Real-time']
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Experiência otimizada para todos os dispositivos',
    color: 'from-cyber-400 to-cyber-600',
    features: ['App Nativo', 'PWA', 'Responsive Design']
  }
]

const innovations = [
  {
    title: 'Neural Shopping Assistant',
    description: 'IA que aprende seus gostos e sugere produtos perfeitos',
    image: '/images/innovations/neural-shopping.jpg',
    status: 'Ativo'
  },
  {
    title: 'Holographic Product Display',
    description: 'Visualização holográfica de produtos em 3D',
    image: '/images/innovations/holographic-display.jpg',
    status: 'Beta'
  },
  {
    title: 'Quantum Payment Processing',
    description: 'Processamento de pagamentos com tecnologia quântica',
    image: '/images/innovations/quantum-payments.jpg',
    status: 'Desenvolvimento'
  }
]

export function TechShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
      
      {/* Floating Tech Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-neon-blue rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 px-4 py-2 text-sm font-cyber mb-4">
            <Cpu className="w-4 h-4 mr-2" />
            Tecnologia de Vanguarda
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-cyber mb-4">
            <span className="cyber-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
              O Futuro do E-commerce
            </span>
          </h2>
          
          <p className="text-xl text-cyber-400 max-w-3xl mx-auto">
            Experimente a próxima geração de tecnologia de compras com IA, realidade aumentada e pagamentos instantâneos
          </p>
        </motion.div>

        {/* Tech Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 h-full hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Background Gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-cyber-400 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-cyber-300">
                        <div className="w-1.5 h-1.5 bg-neon-blue rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Innovations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                Inovações em Desenvolvimento
              </span>
            </h3>
            <p className="text-cyber-400 max-w-2xl mx-auto">
              Tecnologias revolucionárias que estão sendo desenvolvidas para o futuro do e-commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {innovations.map((innovation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="group"
              >
                <div className="relative bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all duration-300">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-cyber-800 to-cyber-900 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-cyber-400 text-sm">Visualização da Inovação</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        className={`text-xs ${
                          innovation.status === 'Ativo' 
                            ? 'bg-neon-green/20 text-neon-green border-neon-green/50'
                            : innovation.status === 'Beta'
                            ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50'
                            : 'bg-neon-orange/20 text-neon-orange border-neon-orange/50'
                        }`}
                      >
                        {innovation.status}
                      </Badge>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                      {innovation.title}
                    </h4>

                    <p className="text-cyber-400 text-sm leading-relaxed">
                      {innovation.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold font-cyber mb-4">
                <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Experimente o Futuro Agora
                </span>
              </h3>
              
              <p className="text-xl text-cyber-400 mb-8">
                Veja como nossa tecnologia revolucionária está transformando a experiência de compras
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-8 py-4 text-lg font-cyber">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo Interativa
                </Button>
                
                <Button variant="outline" className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-900 px-8 py-4 text-lg font-cyber">
                  <Wifi className="w-5 h-5 mr-2" />
                  Teste Beta
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 mt-8 text-cyber-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  <span className="text-sm">IA Ativa</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                  <span className="text-sm">AR Disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
                  <span className="text-sm">Blockchain</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
