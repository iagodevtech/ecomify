'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Camera, 
  Gamepad2, 
  Cpu, 
  HardDrive, 
  Monitor,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categories = [
  {
    id: 'laptops',
    name: 'Laptops & Notebooks',
    description: 'Computadores portáteis de última geração',
    icon: Laptop,
    image: '/images/categories/laptops.jpg',
    productCount: 150,
    color: 'from-neon-blue to-cyber-600',
    bgColor: 'bg-neon-blue/10',
    borderColor: 'border-neon-blue/50',
    isTrending: true
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'Celulares inteligentes e acessórios',
    icon: Smartphone,
    image: '/images/categories/smartphones.jpg',
    productCount: 200,
    color: 'from-neon-green to-cyber-600',
    bgColor: 'bg-neon-green/10',
    borderColor: 'border-neon-green/50',
    isTrending: false
  },
  {
    id: 'audio',
    name: 'Áudio & Som',
    description: 'Fones, caixas de som e equipamentos de áudio',
    icon: Headphones,
    image: '/images/categories/audio.jpg',
    productCount: 120,
    color: 'from-neon-purple to-cyber-600',
    bgColor: 'bg-neon-purple/10',
    borderColor: 'border-neon-purple/50',
    isTrending: true
  },
  {
    id: 'cameras',
    name: 'Câmeras & Fotografia',
    description: 'Câmeras profissionais e equipamentos',
    icon: Camera,
    image: '/images/categories/cameras.jpg',
    productCount: 80,
    color: 'from-neon-pink to-cyber-600',
    bgColor: 'bg-neon-pink/10',
    borderColor: 'border-neon-pink/50',
    isTrending: false
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Consoles, jogos e acessórios para gamers',
    icon: Gamepad2,
    image: '/images/categories/gaming.jpg',
    productCount: 300,
    color: 'from-neon-orange to-cyber-600',
    bgColor: 'bg-neon-orange/10',
    borderColor: 'border-neon-orange/50',
    isTrending: true
  },
  {
    id: 'components',
    name: 'Componentes',
    description: 'Processadores, placas e memórias',
    icon: Cpu,
    image: '/images/categories/components.jpg',
    productCount: 250,
    color: 'from-cyber-400 to-cyber-600',
    bgColor: 'bg-cyber-400/10',
    borderColor: 'border-cyber-400/50',
    isTrending: false
  },
  {
    id: 'storage',
    name: 'Armazenamento',
    description: 'SSDs, HDs e soluções de backup',
    icon: HardDrive,
    image: '/images/categories/storage.jpg',
    productCount: 90,
    color: 'from-cyber-500 to-cyber-700',
    bgColor: 'bg-cyber-500/10',
    borderColor: 'border-cyber-500/50',
    isTrending: false
  },
  {
    id: 'monitors',
    name: 'Monitores',
    description: 'Telas 4K, ultrawide e gaming',
    icon: Monitor,
    image: '/images/categories/monitors.jpg',
    productCount: 70,
    color: 'from-cyber-300 to-cyber-500',
    bgColor: 'bg-cyber-300/10',
    borderColor: 'border-cyber-300/50',
    isTrending: true
  }
]

export function CategoriesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-bg opacity-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50 px-4 py-2 text-sm font-cyber mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Categorias em Destaque
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-cyber mb-4">
            <span className="cyber-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
              Explore Nossas Categorias
            </span>
          </h2>
          
          <p className="text-xl text-cyber-400 max-w-2xl mx-auto">
            Descubra produtos de tecnologia organizados por categoria, cada um com a mais alta qualidade e inovação
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`relative bg-dark-800/50 backdrop-blur-sm border ${category.borderColor} rounded-2xl p-6 h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl`}>
                {/* Trending Badge */}
                {category.isTrending && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                      Trending
                    </Badge>
                  </div>
                )}

                {/* Background Gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-cyber-400 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Product Count */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyber-500 text-sm">
                      {category.productCount} produtos
                    </span>
                    <ArrowRight className="w-4 h-4 text-cyber-500 group-hover:text-neon-blue group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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
          <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-8 py-4 text-lg font-cyber">
            Ver Todas as Categorias
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
