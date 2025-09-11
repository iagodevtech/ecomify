'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Users, 
  Award, 
  Target, 
  Heart,
  Globe,
  Smartphone,
  Laptop,
  Headphones,
  Monitor,
  Keyboard,
  Mouse,
  Camera,
  Gamepad,
  Speaker,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Star,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Truck,
  CreditCard,
  Bell,
  Settings,
  User,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  Lightbulb,
  Rocket,
  Crown,
  Gem,
  Sparkles
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const teamMembers = [
  {
    name: 'João Silva',
    role: 'CEO & Fundador',
    image: '/images/team/joao.jpg',
    bio: 'Visionário da tecnologia com 15 anos de experiência em e-commerce.',
    social: {
      linkedin: 'https://linkedin.com/in/joaosilva',
      twitter: 'https://twitter.com/joaosilva'
    }
  },
  {
    name: 'Maria Santos',
    role: 'CTO',
    image: '/images/team/maria.jpg',
    bio: 'Especialista em arquitetura de sistemas e inteligência artificial.',
    social: {
      linkedin: 'https://linkedin.com/in/mariasantos',
      github: 'https://github.com/mariasantos'
    }
  },
  {
    name: 'Pedro Costa',
    role: 'Head de Design',
    image: '/images/team/pedro.jpg',
    bio: 'Criativo por natureza, transforma ideias em experiências únicas.',
    social: {
      linkedin: 'https://linkedin.com/in/pedrocosta',
      dribbble: 'https://dribbble.com/pedrocosta'
    }
  },
  {
    name: 'Ana Oliveira',
    role: 'Head de Marketing',
    image: '/images/team/ana.jpg',
    bio: 'Estrategista digital com foco em crescimento e engajamento.',
    social: {
      linkedin: 'https://linkedin.com/in/anaoliveira',
      instagram: 'https://instagram.com/anaoliveira'
    }
  }
]

const milestones = [
  {
    year: '2020',
    title: 'Fundação da Ecomify',
    description: 'Nascimento da ideia de revolucionar o e-commerce de tecnologia no Brasil.',
    icon: Rocket
  },
  {
    year: '2021',
    title: 'Primeiro Milhão',
    description: 'Alcançamos nosso primeiro milhão de reais em vendas.',
    icon: DollarSign
  },
  {
    year: '2022',
    title: 'Expansão Nacional',
    description: 'Expandimos para todo o território nacional com entrega rápida.',
    icon: Globe
  },
  {
    year: '2023',
    title: 'App Mobile',
    description: 'Lançamento do aplicativo mobile com recursos avançados.',
    icon: Smartphone
  },
  {
    year: '2024',
    title: 'IA e Futuro',
    description: 'Implementação de IA para recomendações e experiência personalizada.',
    icon: Zap
  }
]

const values = [
  {
    title: 'Inovação',
    description: 'Sempre buscamos as tecnologias mais avançadas para oferecer a melhor experiência.',
    icon: Lightbulb,
    color: 'from-neon-blue to-cyber-600'
  },
  {
    title: 'Transparência',
    description: 'Mantemos total transparência em nossos processos e comunicações.',
    icon: Eye,
    color: 'from-neon-green to-cyber-600'
  },
  {
    title: 'Qualidade',
    description: 'Garantimos produtos 100% originais e de alta qualidade.',
    icon: Award,
    color: 'from-neon-purple to-cyber-600'
  },
  {
    title: 'Satisfação',
    description: 'A satisfação do cliente é nossa prioridade número um.',
    icon: Heart,
    color: 'from-neon-pink to-cyber-600'
  }
]

const stats = [
  { label: 'Clientes Ativos', value: '500K+', icon: Users },
  { label: 'Produtos Vendidos', value: '2M+', icon: Package },
  { label: 'Avaliações 5★', value: '98%', icon: Star },
  { label: 'Tempo de Entrega', value: '24h', icon: Truck }
]

const features = [
  {
    title: 'Tecnologia de Ponta',
    description: 'Utilizamos as mais avançadas tecnologias para oferecer uma experiência única.',
    icon: Zap,
    color: 'from-neon-blue to-cyber-600'
  },
  {
    title: 'Segurança Total',
    description: 'Seus dados e pagamentos estão protegidos com criptografia de nível bancário.',
    icon: Shield,
    color: 'from-neon-green to-cyber-600'
  },
  {
    title: 'Suporte 24/7',
    description: 'Nossa equipe está sempre disponível para ajudar você.',
    icon: MessageSquare,
    color: 'from-neon-purple to-cyber-600'
  },
  {
    title: 'Entrega Rápida',
    description: 'Entregamos seus produtos em até 24 horas em todo o Brasil.',
    icon: Truck,
    color: 'from-neon-pink to-cyber-600'
  }
]

export default function SobrePage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50 mb-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Sobre a Ecomify
                  </Badge>
                  <h1 className="text-5xl font-bold font-cyber mb-6">
                    <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                      Revolucionando o
                    </span>
                    <br />
                    <span className="cyber-text bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                      E-commerce
                    </span>
                  </h1>
                  <p className="text-xl text-cyber-400 leading-relaxed">
                    Somos uma plataforma de e-commerce futurística especializada em tecnologia, 
                    oferecendo a melhor experiência de compra com IA, realidade aumentada e 
                    pagamentos instantâneos.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                    <Rocket className="w-5 h-5 mr-2" />
                    Nossa História
                  </Button>
                  <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                    <Users className="w-5 h-5 mr-2" />
                    Conheça a Equipe
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="w-full h-96 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                      <Zap className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-cyber-400">Visualização da Plataforma</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-cyber-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-cyber mb-6">
                <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                  Nossa Missão
                </span>
              </h2>
              <p className="text-xl text-cyber-400 max-w-3xl mx-auto">
                Democratizar o acesso à tecnologia de ponta, oferecendo produtos de qualidade 
                com uma experiência de compra revolucionária e suporte excepcional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-cyber-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-cyber mb-6">
                <span className="cyber-text bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                  Nossa Jornada
                </span>
              </h2>
              <p className="text-xl text-cyber-400">
                Uma trajetória de inovação e crescimento constante
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue to-neon-purple"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                            <milestone.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                            <p className="text-neon-blue font-bold">{milestone.year}</p>
                          </div>
                        </div>
                        <p className="text-cyber-400">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center relative z-10">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-cyber mb-6">
                <span className="cyber-text bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                  Nossa Equipe
                </span>
              </h2>
              <p className="text-xl text-cyber-400">
                Conheça os visionários por trás da Ecomify
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-neon-blue font-medium mb-4">{member.role}</p>
                  <p className="text-cyber-400 text-sm mb-6">{member.bio}</p>
                  
                  <div className="flex justify-center gap-3">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-cyber-700 rounded-full flex items-center justify-center text-cyber-400 hover:text-neon-blue transition-colors"
                      >
                        <span className="text-xs font-bold">{platform[0].toUpperCase()}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-cyber mb-6">
                <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                  Por que Escolher a Ecomify?
                </span>
              </h2>
              <p className="text-xl text-cyber-400">
                Recursos únicos que fazem a diferença
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-cyber-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-cyber-800 to-cyber-900 rounded-2xl p-12 text-center">
              <h2 className="text-4xl font-bold font-cyber mb-6">
                <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Pronto para o Futuro?
                </span>
              </h2>
              <p className="text-xl text-cyber-400 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de clientes que já descobriram a melhor experiência 
                de compra em tecnologia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Começar a Comprar
                </Button>
                <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Falar Conosco
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
