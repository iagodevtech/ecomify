'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Target, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Heart, 
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Rocket
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SobrePage() {
  const stats = [
    { label: 'Produtos Vendidos', value: '50K+', icon: TrendingUp },
    { label: 'Clientes Satisfeitos', value: '25K+', icon: Users },
    { label: 'Anos de Experiência', value: '5+', icon: Award },
    { label: 'Países Atendidos', value: '15+', icon: Globe }
  ]

  const values = [
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Sempre na vanguarda da tecnologia, oferecendo os produtos mais avançados e inovadores do mercado.'
    },
    {
      icon: Shield,
      title: 'Confiabilidade',
      description: 'Produtos autênticos, garantia estendida e suporte técnico especializado para sua tranquilidade.'
    },
    {
      icon: Heart,
      title: 'Paixão',
      description: 'Amamos tecnologia e compartilhamos essa paixão com nossos clientes através de produtos excepcionais.'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Construímos uma comunidade de entusiastas de tecnologia que compartilham conhecimento e experiências.'
    }
  ]

  const team = [
    {
      name: 'Iago DevTech',
      role: 'Fundador & CEO',
      description: 'Visionário da tecnologia com 10+ anos de experiência em e-commerce e desenvolvimento de produtos.',
      image: '/images/team/iago.jpg'
    },
    {
      name: 'Ana Silva',
      role: 'CTO',
      description: 'Especialista em tecnologia com foco em inovação e desenvolvimento de soluções escaláveis.',
      image: '/images/team/ana.jpg'
    },
    {
      name: 'Carlos Santos',
      role: 'Head of Product',
      description: 'Especialista em produtos de tecnologia com vasta experiência em hardware e software.',
      image: '/images/team/carlos.jpg'
    },
    {
      name: 'Maria Oliveira',
      role: 'Head of Marketing',
      description: 'Estrategista de marketing digital com foco em tecnologia e experiência do cliente.',
      image: '/images/team/maria.jpg'
    }
  ]

  const milestones = [
    {
      year: '2019',
      title: 'Fundação da Ecomify',
      description: 'Nascimento da nossa visão de revolucionar o e-commerce de tecnologia no Brasil.'
    },
    {
      year: '2020',
      title: 'Primeira Loja Física',
      description: 'Abertura da nossa primeira loja física em São Paulo, expandindo nossa presença.'
    },
    {
      year: '2021',
      title: 'Plataforma Digital',
      description: 'Lançamento da nossa plataforma online com tecnologia de ponta e experiência futurística.'
    },
    {
      year: '2022',
      title: 'Expansão Nacional',
      description: 'Expansão para 15 estados brasileiros, levando tecnologia para todo o país.'
    },
    {
      year: '2023',
      title: 'IA e Personalização',
      description: 'Implementação de IA para recomendações personalizadas e experiência única.'
    },
    {
      year: '2024',
      title: 'Futuro Presente',
      description: 'Lançamento de funcionalidades de realidade aumentada e pagamentos instantâneos.'
    }
  ]

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-6xl font-bold font-cyber mb-6">
                  <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                    Sobre a Ecomify
                  </span>
                </h1>
                <p className="text-cyber-400 text-xl leading-relaxed">
                  Somos a plataforma de e-commerce mais inovadora do Brasil, 
                  especializada em produtos de tecnologia de última geração. 
                  Nossa missão é democratizar o acesso à tecnologia de ponta, 
                  oferecendo uma experiência de compra futurística e personalizada.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  Conheça Nossa História
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-cyber-500/30 text-cyber-400 hover:text-white">
                  Nossa Equipe
                </Button>
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
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-cyber-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Nossa Missão</h2>
                <p className="text-cyber-300 text-lg leading-relaxed">
                  Democratizar o acesso à tecnologia de ponta, oferecendo produtos inovadores 
                  com uma experiência de compra futurística, personalizada e acessível para 
                  todos os brasileiros, independentemente de sua localização.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Nossa Visão</h2>
                <p className="text-cyber-300 text-lg leading-relaxed">
                  Ser a principal referência em e-commerce de tecnologia no Brasil, 
                  reconhecida pela inovação, qualidade e experiência única. Queremos 
                  ser a ponte entre o futuro da tecnologia e o presente dos nossos clientes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Nossos Valores</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Os princípios que guiam nossa empresa e definem nossa cultura
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-cyber-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Nossa Jornada</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Marcos importantes na nossa história de inovação e crescimento
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue to-neon-purple rounded-full"></div>

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
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                        </div>
                        <p className="text-cyber-400">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="w-6 h-6 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full border-4 border-dark-900 z-10"></div>

                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Nossa Equipe</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Conheça os visionários por trás da Ecomify
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 text-center hover:border-neon-blue/50 transition-all"
                >
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-4">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-neon-blue font-medium mb-3">{member.role}</p>
                  <p className="text-cyber-400 text-sm leading-relaxed">{member.description}</p>
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
                <Star className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Faça Parte da Revolução</h2>
              <p className="text-cyber-300 text-lg mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de clientes que já descobriram o futuro da tecnologia. 
                Explore nossos produtos e viva uma experiência única de compra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  Explorar Produtos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-cyber-500/30 text-cyber-400 hover:text-white">
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