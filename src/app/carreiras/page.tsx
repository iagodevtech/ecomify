'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Briefcase, 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  Zap, 
  Award,
  ChevronRight,
  CheckCircle,
  Globe,
  Code,
  Palette,
  BarChart3
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const benefits = [
  {
    icon: Heart,
    title: 'Plano de Saúde',
    description: 'Cobertura completa para você e sua família'
  },
  {
    icon: Zap,
    title: 'Vale Refeição',
    description: 'R$ 800/mês para alimentação'
  },
  {
    icon: Globe,
    title: 'Home Office',
    description: 'Flexibilidade para trabalhar de casa'
  },
  {
    icon: Award,
    title: 'Bônus Anual',
    description: 'Participação nos lucros da empresa'
  },
  {
    icon: Star,
    title: 'Desenvolvimento',
    description: 'Cursos e certificações pagos'
  },
  {
    icon: Users,
    title: 'Ambiente Inclusivo',
    description: 'Diversidade e igualdade de oportunidades'
  }
]

const positions = [
  {
    title: 'Desenvolvedor Frontend Senior',
    department: 'Tecnologia',
    location: 'São Paulo - SP',
    type: 'CLT',
    level: 'Senior',
    description: 'Desenvolver interfaces modernas e responsivas usando React, Next.js e TypeScript.',
    requirements: [
      '5+ anos de experiência com React/Next.js',
      'Conhecimento em TypeScript',
      'Experiência com Tailwind CSS',
      'Conhecimento em testes automatizados'
    ],
    benefits: ['Vale refeição R$ 800', 'Plano de saúde', 'Home office']
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'São Paulo - SP',
    type: 'CLT',
    level: 'Pleno',
    description: 'Criar experiências digitais excepcionais e interfaces intuitivas.',
    requirements: [
      '3+ anos de experiência em UX/UI',
      'Domínio do Figma',
      'Conhecimento em design system',
      'Portfolio com projetos relevantes'
    ],
    benefits: ['Vale refeição R$ 800', 'Plano de saúde', 'Home office']
  },
  {
    title: 'Analista de Dados',
    department: 'Analytics',
    location: 'São Paulo - SP',
    type: 'CLT',
    level: 'Pleno',
    description: 'Analisar dados de vendas e comportamento do usuário para insights estratégicos.',
    requirements: [
      '2+ anos de experiência em análise de dados',
      'Conhecimento em SQL e Python',
      'Experiência com ferramentas de BI',
      'Conhecimento em estatística'
    ],
    benefits: ['Vale refeição R$ 800', 'Plano de saúde', 'Home office']
  }
]

const departments = [
  { name: 'Tecnologia', icon: Code, color: 'text-neon-blue' },
  { name: 'Design', icon: Palette, color: 'text-neon-purple' },
  { name: 'Marketing', icon: BarChart3, color: 'text-neon-green' },
  { name: 'Vendas', icon: Users, color: 'text-neon-pink' }
]

export default function CarreirasPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Carreiras
              </span>
            </h1>
            <p className="text-xl text-cyber-300 mb-8 leading-relaxed">
              Faça parte da revolução do e-commerce futurístico. 
              Junte-se à nossa equipe e construa o futuro do comércio digital.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                <Zap className="w-4 h-4 mr-2" />
                Ambiente Inovador
              </Badge>
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                <Users className="w-4 h-4 mr-2" />
                Equipe Diversa
              </Badge>
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                <Award className="w-4 h-4 mr-2" />
                Crescimento Contínuo
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Por que trabalhar conosco?
            </h2>
            <p className="text-cyber-300 text-lg">
              Oferecemos um ambiente de trabalho excepcional com benefícios competitivos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">{benefit.title}</h3>
                </div>
                <p className="text-cyber-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nossos Departamentos
            </h2>
            <p className="text-cyber-300 text-lg">
              Explore as áreas onde você pode fazer a diferença
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 text-center hover:border-neon-blue/50 transition-all group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <dept.icon className={`w-8 h-8 text-white`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{dept.name}</h3>
                <p className="text-cyber-400 text-sm">
                  {dept.name === 'Tecnologia' && 'Desenvolvimento e inovação'}
                  {dept.name === 'Design' && 'Criatividade e experiência'}
                  {dept.name === 'Marketing' && 'Estratégia e crescimento'}
                  {dept.name === 'Vendas' && 'Relacionamento e resultados'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vagas Abertas
            </h2>
            <p className="text-cyber-300 text-lg">
              Encontre a oportunidade perfeita para sua carreira
            </p>
          </motion.div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-white font-bold text-xl">{position.title}</h3>
                      <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                        {position.level}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-cyber-400 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </div>
                    </div>
                    
                    <p className="text-cyber-300 mb-4">{position.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Requisitos:</h4>
                      <ul className="space-y-1">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center gap-2 text-cyber-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {position.benefits.map((benefit, benefitIndex) => (
                        <Badge key={benefitIndex} className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:ml-6">
                    <Button className="w-full lg:w-auto cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                      Candidatar-se
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Não encontrou a vaga ideal?
            </h2>
            <p className="text-cyber-300 text-lg mb-8">
              Envie seu currículo e fique por dentro das novas oportunidades. 
              Estamos sempre em busca de talentos excepcionais!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                Enviar Currículo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                Conhecer a Empresa
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
