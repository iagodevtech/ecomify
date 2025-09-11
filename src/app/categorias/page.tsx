'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Grid3X3, 
  ArrowLeft, 
  Zap,
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Cpu,
  Monitor,
  Camera,
  HardDrive
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categories = [
  {
    id: 'laptops',
    name: 'Laptops & Notebooks',
    slug: 'laptops-notebooks',
    description: 'Laptops e notebooks para trabalho e entretenimento',
    icon: Laptop,
    color: 'from-neon-blue to-neon-purple',
    productCount: 12,
    featured: true
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Smartphones e acessórios',
    icon: Smartphone,
    color: 'from-neon-green to-neon-blue',
    productCount: 8,
    featured: true
  },
  {
    id: 'audio',
    name: 'Áudio & Som',
    slug: 'audio-som',
    description: 'Fones, caixas de som e equipamentos de áudio',
    icon: Headphones,
    color: 'from-neon-pink to-neon-purple',
    productCount: 15,
    featured: true
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Produtos para jogos e entretenimento',
    icon: Gamepad2,
    color: 'from-neon-yellow to-neon-orange',
    productCount: 20,
    featured: true
  },
  {
    id: 'componentes',
    name: 'Componentes',
    slug: 'componentes',
    description: 'Peças e componentes para computadores',
    icon: Cpu,
    color: 'from-neon-purple to-neon-pink',
    productCount: 25,
    featured: false
  },
  {
    id: 'monitores',
    name: 'Monitores',
    slug: 'monitores',
    description: 'Monitores e displays',
    icon: Monitor,
    color: 'from-neon-blue to-neon-green',
    productCount: 10,
    featured: false
  },
  {
    id: 'cameras',
    name: 'Câmeras',
    slug: 'cameras',
    description: 'Câmeras e equipamentos fotográficos',
    icon: Camera,
    color: 'from-neon-green to-neon-yellow',
    productCount: 6,
    featured: false
  },
  {
    id: 'armazenamento',
    name: 'Armazenamento',
    slug: 'armazenamento',
    description: 'HDs, SSDs e dispositivos de armazenamento',
    icon: HardDrive,
    color: 'from-neon-orange to-neon-red',
    productCount: 18,
    featured: false
  }
]

export default function CategoriasPage() {
  const featuredCategories = categories.filter(cat => cat.featured)
  const otherCategories = categories.filter(cat => !cat.featured)

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
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Categorias
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-neon-yellow" />
            <h2 className="text-2xl font-bold text-white">Categorias em Destaque</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.a
                key={category.id}
                href={`/categoria/${category.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-cyber-300 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                      {category.productCount} produtos
                    </Badge>
                    <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                      <Zap className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Grid3X3 className="w-6 h-6 text-neon-green" />
            <h2 className="text-2xl font-bold text-white">Todas as Categorias</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.a
                key={category.id}
                href={`/categoria/${category.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                className="group bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-neon-blue transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-cyber-300 text-sm mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <Badge className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30">
                      {category.productCount} produtos
                    </Badge>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Nossas Categorias</h3>
              <p className="text-cyber-300">Explore nossa ampla variedade de produtos de tecnologia</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid3X3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-bold text-2xl mb-2">{categories.length}</h4>
                <p className="text-cyber-300">Categorias Disponíveis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-bold text-2xl mb-2">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                </h4>
                <p className="text-cyber-300">Produtos em Estoque</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-pink to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-bold text-2xl mb-2">{featuredCategories.length}</h4>
                <p className="text-cyber-300">Categorias em Destaque</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
