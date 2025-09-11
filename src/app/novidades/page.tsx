'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Calendar, 
  Tag, 
  ArrowLeft, 
  Eye, 
  Heart, 
  Share2,
  Filter,
  Search,
  Zap,
  Star,
  TrendingUp,
  Clock,
  User
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const newsItems = [
  {
    id: 1,
    title: 'MacBook Pro M3 Max: O Laptop Mais Poderoso da Apple',
    excerpt: 'Descubra as incríveis capacidades do novo MacBook Pro com chip M3 Max, oferecendo performance excepcional para profissionais criativos.',
    content: 'O novo MacBook Pro M3 Max representa um salto significativo em performance e eficiência energética. Com até 16 núcleos de CPU e 40 núcleos de GPU, este laptop redefine o que é possível em um dispositivo portátil.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center',
    category: 'Laptops',
    author: 'Equipe Ecomify',
    date: '2024-01-15',
    readTime: '5 min',
    views: 1247,
    likes: 89,
    isFeatured: true,
    tags: ['Apple', 'MacBook', 'M3 Max', 'Performance']
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Max: Revolução em Câmera e Performance',
    excerpt: 'O iPhone mais avançado da Apple chega com câmera de 48MP, chip A17 Pro e design em titânio premium.',
    content: 'O iPhone 15 Pro Max estabelece novos padrões para smartphones premium. Com sua câmera de 48MP, sistema de zoom óptico de 5x e chip A17 Pro, oferece uma experiência incomparável.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop&crop=center',
    category: 'Smartphones',
    author: 'Equipe Ecomify',
    date: '2024-01-14',
    readTime: '4 min',
    views: 892,
    likes: 67,
    isFeatured: true,
    tags: ['iPhone', 'Apple', 'Câmera', 'Titânio']
  },
  {
    id: 3,
    title: 'Samsung Galaxy S24 Ultra: IA Integrada e S Pen Avançado',
    excerpt: 'O Galaxy S24 Ultra combina hardware de ponta com inteligência artificial para uma experiência única.',
    content: 'Com Snapdragon 8 Gen 3, câmera de 200MP e recursos de IA integrados, o Galaxy S24 Ultra oferece produtividade e criatividade sem limites.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center',
    category: 'Smartphones',
    author: 'Equipe Ecomify',
    date: '2024-01-13',
    readTime: '6 min',
    views: 634,
    likes: 45,
    isFeatured: false,
    tags: ['Samsung', 'Galaxy', 'IA', 'S Pen']
  },
  {
    id: 4,
    title: 'Dell XPS 15: Elegância e Performance em um Laptop',
    excerpt: 'O Dell XPS 15 combina design elegante com performance excepcional, perfeito para profissionais e criativos.',
    content: 'Com tela 4K OLED, processador Intel Core i7 e design minimalista, o XPS 15 oferece a combinação perfeita de estilo e funcionalidade.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&crop=center',
    category: 'Laptops',
    author: 'Equipe Ecomify',
    date: '2024-01-12',
    readTime: '4 min',
    views: 423,
    likes: 32,
    isFeatured: false,
    tags: ['Dell', 'XPS', 'OLED', 'Design']
  },
  {
    id: 5,
    title: 'Tendências de Tecnologia para 2024',
    excerpt: 'Descubra as principais tendências tecnológicas que moldarão o ano de 2024.',
    content: 'De inteligência artificial generativa a computação quântica, 2024 promete ser um ano revolucionário para a tecnologia.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center',
    category: 'Tendências',
    author: 'Equipe Ecomify',
    date: '2024-01-10',
    readTime: '8 min',
    views: 1567,
    likes: 123,
    isFeatured: true,
    tags: ['Tendências', 'IA', 'Tecnologia', '2024']
  },
  {
    id: 6,
    title: 'Guia Completo: Como Escolher o Laptop Ideal',
    excerpt: 'Um guia detalhado para ajudá-lo a escolher o laptop perfeito para suas necessidades.',
    content: 'Desde processadores até gráficos, passando por armazenamento e conectividade, este guia cobre todos os aspectos importantes na escolha de um laptop.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&crop=center',
    category: 'Guias',
    author: 'Equipe Ecomify',
    date: '2024-01-08',
    readTime: '10 min',
    views: 2341,
    likes: 156,
    isFeatured: false,
    tags: ['Guia', 'Laptop', 'Escolha', 'Tutorial']
  }
]

const categories = ['Todos', 'Laptops', 'Smartphones', 'Tendências', 'Guias']

export default function NovidadesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredNews = newsItems.filter(item => item.isFeatured)

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
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Novidades
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                  <input
                    type="text"
                    placeholder="Buscar novidades..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap ${
                      selectedCategory === category
                        ? 'cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                        : 'border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured News */}
        {selectedCategory === 'Todos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-neon-yellow" />
              <h2 className="text-2xl font-bold text-white">Destaques</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.slice(0, 3).map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all group cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                        {item.category}
                      </Badge>
                      <span className="text-cyber-400 text-sm">{item.readTime}</span>
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-cyber-300 text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-cyber-400 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {item.likes}
                        </div>
                      </div>
                      <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* All News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-neon-green" />
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === 'Todos' ? 'Todas as Novidades' : selectedCategory}
            </h2>
            <Badge className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30">
              {filteredNews.length} artigos
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all group cursor-pointer"
              >
                <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isFeatured && (
                    <Badge className="absolute top-3 left-3 bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                      {item.category}
                    </Badge>
                    <span className="text-cyber-400 text-sm">{item.readTime}</span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-cyber-300 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-cyber-400 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {item.likes}
                      </div>
                    </div>
                    <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-neon-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Nenhuma novidade encontrada</h3>
              <p className="text-cyber-300">Tente ajustar os filtros ou termo de busca</p>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
