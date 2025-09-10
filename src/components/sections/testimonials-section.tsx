'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, ThumbsUp, Award, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Silva',
    role: 'Desenvolvedor Full Stack',
    company: 'TechCorp',
    avatar: '/images/avatars/carlos.jpg',
    rating: 5,
    comment: 'A experiência de compra no Ecomify é simplesmente revolucionária. A IA entende exatamente o que preciso e as recomendações são sempre precisas.',
    verified: true,
    purchase: 'MacBook Pro M3 Max',
    location: 'São Paulo, SP'
  },
  {
    id: 2,
    name: 'Ana Santos',
    role: 'Designer UX/UI',
    company: 'Creative Studio',
    avatar: '/images/avatars/ana.jpg',
    rating: 5,
    comment: 'A realidade aumentada para visualizar produtos é incrível! Pude ver como o monitor ficaria na minha mesa antes de comprar. Tecnologia de outro nível.',
    verified: true,
    purchase: 'Samsung Odyssey G9',
    location: 'Rio de Janeiro, RJ'
  },
  {
    id: 3,
    name: 'Roberto Lima',
    role: 'Gamer Profissional',
    company: 'Esports Team',
    avatar: '/images/avatars/roberto.jpg',
    rating: 5,
    comment: 'O sistema de pagamento instantâneo é fantástico. Em segundos minha compra foi processada e o produto já estava a caminho. Ecomify é o futuro!',
    verified: true,
    purchase: 'RTX 4090 Gaming PC',
    location: 'Belo Horizonte, MG'
  },
  {
    id: 4,
    name: 'Mariana Costa',
    role: 'Fotógrafa',
    company: 'Freelancer',
    avatar: '/images/avatars/mariana.jpg',
    rating: 5,
    comment: 'A qualidade dos produtos e o suporte 24/7 são excepcionais. Comprei uma câmera e tive suporte técnico completo. Recomendo para todos!',
    verified: true,
    purchase: 'Sony A7R V',
    location: 'Porto Alegre, RS'
  },
  {
    id: 5,
    name: 'Pedro Oliveira',
    role: 'Engenheiro de Software',
    company: 'StartupTech',
    avatar: '/images/avatars/pedro.jpg',
    rating: 5,
    comment: 'A interface é intuitiva e a experiência mobile é perfeita. Comprei vários produtos e sempre tive uma experiência excepcional.',
    verified: true,
    purchase: 'iPhone 15 Pro Max',
    location: 'Brasília, DF'
  },
  {
    id: 6,
    name: 'Julia Fernandes',
    role: 'Estudante de TI',
    company: 'Universidade Federal',
    avatar: '/images/avatars/julia.jpg',
    rating: 5,
    comment: 'Como estudante, preciso de produtos de qualidade com preços justos. O Ecomify oferece exatamente isso, além de uma experiência única.',
    verified: true,
    purchase: 'Dell XPS 13',
    location: 'Salvador, BA'
  }
]

const stats = [
  { label: 'Clientes Satisfeitos', value: '50K+', icon: ThumbsUp },
  { label: 'Avaliação Média', value: '4.9/5', icon: Star },
  { label: 'Produtos Entregues', value: '100K+', icon: Award },
  { label: 'Tempo de Resposta', value: '< 2s', icon: Zap }
]

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-bg opacity-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
      
      {/* Floating Quote Icons */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-blue/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Quote />
          </motion.div>
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
          <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/50 px-4 py-2 text-sm font-cyber mb-4">
            <Star className="w-4 h-4 mr-2" />
            Depoimentos
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-cyber mb-4">
            <span className="cyber-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
              O que Nossos Clientes Dizem
            </span>
          </h2>
          
          <p className="text-xl text-cyber-400 max-w-2xl mx-auto">
            Milhares de clientes satisfeitos compartilham suas experiências revolucionárias com nossa plataforma
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-cyber-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 h-full hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-neon-blue/20">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-neon-yellow fill-neon-yellow" />
                  ))}
                  {testimonial.verified && (
                    <Badge className="ml-2 bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                      Verificado
                    </Badge>
                  )}
                </div>

                {/* Comment */}
                <blockquote className="text-cyber-300 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </blockquote>

                {/* Purchase Info */}
                <div className="mb-4 p-3 bg-cyber-800/30 rounded-lg">
                  <p className="text-cyber-400 text-sm">Produto comprado:</p>
                  <p className="text-neon-blue text-sm font-medium">{testimonial.purchase}</p>
                </div>

                {/* User Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-cyber-400 text-sm">{testimonial.role}</p>
                    <p className="text-cyber-500 text-xs">{testimonial.location}</p>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Junte-se a Nossa Comunidade
              </span>
            </h3>
            
            <p className="text-cyber-400 mb-6">
              Faça parte de milhares de usuários que já experimentaram o futuro do e-commerce
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-6 py-3 font-cyber">
                Começar Agora
              </button>
              <button className="border border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue px-6 py-3 rounded-lg transition-all">
                Ver Mais Depoimentos
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
