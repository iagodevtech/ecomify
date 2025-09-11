'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Play, Star, Zap, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SearchBar } from '@/components/search/search-bar'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Tecnologia do Futuro",
      subtitle: "Descubra os produtos mais inovadores",
      description: "Explore nossa coleção de produtos digitais, computadores e hardware de última geração com tecnologia de ponta.",
      image: "/images/hero-tech.jpg",
      cta: "Explorar Produtos",
      features: ["IA Integrada", "Realidade Aumentada", "Pagamento Instantâneo"]
    },
    {
      title: "E-commerce Inteligente",
      subtitle: "Experiência de compra revolucionária",
      description: "Navegue por produtos com IA, visualize em realidade aumentada e finalize compras em segundos.",
      image: "/images/hero-ai.jpg",
      cta: "Começar Agora",
      features: ["Recomendações IA", "Visualização 3D", "Checkout Express"]
    },
    {
      title: "Inovação Sem Limites",
      subtitle: "O futuro da tecnologia em suas mãos",
      description: "Produtos digitais, software e hardware que definem o amanhã. Tecnologia que transforma vidas.",
      image: "/images/hero-innovation.jpg",
      cta: "Ver Inovações",
      features: ["Produtos Exclusivos", "Suporte 24/7", "Garantia Estendida"]
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 cyber-bg opacity-30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-blue rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50 px-4 py-2 text-sm font-cyber">
                <Zap className="w-4 h-4 mr-2" />
                Tecnologia de Ponta
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-bold font-cyber">
                <span className="cyber-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-cyber-300 font-light">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-cyber-400 leading-relaxed max-w-lg"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {slides[currentSlide].features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-lg px-4 py-2"
                >
                  <Star className="w-4 h-4 text-neon-green" />
                  <span className="text-sm text-cyber-300">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <SearchBar 
                onSearch={(query) => {
                  console.log('Search query:', query)
                  // Implementar busca
                }}
                onFilter={(filters) => {
                  console.log('Filters:', filters)
                  // Implementar filtros
                }}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-8 py-4 text-lg font-cyber">
                {slides[currentSlide].cta}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-900 px-8 py-4 text-lg font-cyber">
                <Play className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-8 pt-8"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-green" />
                <span className="text-sm text-cyber-400">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-neon-blue" />
                <span className="text-sm text-cyber-400">Global</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-neon-purple" />
                <span className="text-sm text-cyber-400">Instantâneo</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-2xl" />
              
              {/* Placeholder for product showcase */}
              <div className="absolute inset-4 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-cyber-500/30 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-cyber text-neon-blue">Produto em Destaque</h3>
                  <p className="text-cyber-400">Visualização 3D Interativa</p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 bg-neon-green/20 rounded-full border border-neon-green/50 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-8 h-8 text-neon-green" />
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-8 w-12 h-12 bg-neon-purple/20 rounded-full border border-neon-purple/50 flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Zap className="w-6 h-6 text-neon-purple" />
              </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-neon-blue scale-125'
                      : 'bg-cyber-500/50 hover:bg-cyber-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-neon-blue rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
