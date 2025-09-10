'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, ShoppingCart, Star, Zap } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Usuários Ativos',
    description: 'Comunidade crescente de tech enthusiasts',
    color: 'text-neon-blue'
  },
  {
    icon: ShoppingCart,
    value: '100K+',
    label: 'Produtos Vendidos',
    description: 'Tecnologia de ponta entregue',
    color: 'text-neon-green'
  },
  {
    icon: Star,
    value: '4.9',
    label: 'Avaliação Média',
    description: 'Excelência em cada produto',
    color: 'text-neon-purple'
  },
  {
    icon: Zap,
    value: '99.9%',
    label: 'Uptime',
    description: 'Disponibilidade garantida',
    color: 'text-neon-pink'
  }
]

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-purple/5" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-cyber mb-4">
            <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Números que Impressionam
            </span>
          </h2>
          <p className="text-xl text-cyber-400 max-w-2xl mx-auto">
            Nossa plataforma revolucionária está transformando a forma como as pessoas compram tecnologia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8 text-center hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyber-800 to-cyber-900 border border-cyber-500/30 mb-6 ${stat.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>

                {/* Value */}
                <motion.div
                  className="text-4xl lg:text-5xl font-bold font-cyber mb-2"
                  initial={{ scale: 0.5 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <span className={stat.color}>
                    {stat.value}
                  </span>
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-cyber-400 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Animated Border */}
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
          <div className="inline-flex items-center gap-4 bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-full px-8 py-4">
            <Zap className="w-6 h-6 text-neon-blue" />
            <span className="text-cyber-300 font-medium">
              Junte-se a milhares de usuários satisfeitos
            </span>
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple border-2 border-dark-800"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
