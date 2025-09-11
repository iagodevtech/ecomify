'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  ArrowLeft, 
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Share2,
  Filter,
  SortAsc,
  SortDesc,
  Zap,
  Award,
  Trophy,
  Medal
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/stripe'

// Mock data - em produção viria da API
const bestSellingProducts = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max 16"',
    brand: 'Apple',
    price: 15999,
    originalPrice: 17999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center',
    rating: 4.9,
    reviewCount: 127,
    salesCount: 245,
    rank: 1,
    category: 'Laptops',
    discount: 11,
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 8999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop&crop=center',
    rating: 4.8,
    reviewCount: 892,
    salesCount: 189,
    rank: 2,
    category: 'Smartphones',
    discount: 10,
    inStock: true
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 6999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center',
    rating: 4.7,
    reviewCount: 634,
    salesCount: 156,
    rank: 3,
    category: 'Smartphones',
    discount: 12,
    inStock: true
  },
  {
    id: '4',
    name: 'Dell XPS 15',
    brand: 'Dell',
    price: 12999,
    originalPrice: 14999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&crop=center',
    rating: 4.6,
    reviewCount: 423,
    salesCount: 134,
    rank: 4,
    category: 'Laptops',
    discount: 13,
    inStock: true
  },
  {
    id: '5',
    name: 'Samsung Odyssey G9',
    brand: 'Samsung',
    price: 3999,
    originalPrice: 4499,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop&crop=center',
    rating: 4.6,
    reviewCount: 67,
    salesCount: 98,
    rank: 5,
    category: 'Monitores',
    discount: 11,
    inStock: true
  },
  {
    id: '6',
    name: 'DJI Air 3 Drone',
    brand: 'DJI',
    price: 5999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop&crop=center',
    rating: 4.8,
    reviewCount: 34,
    salesCount: 87,
    rank: 6,
    category: 'Câmeras',
    discount: 14,
    inStock: true
  }
]

const categories = ['Todos', 'Laptops', 'Smartphones', 'Monitores', 'Câmeras']
const sortOptions = [
  { value: 'sales', label: 'Mais Vendidos' },
  { value: 'rating', label: 'Melhor Avaliação' },
  { value: 'price-low', label: 'Menor Preço' },
  { value: 'price-high', label: 'Maior Preço' }
]

export default function MaisVendidosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [sortBy, setSortBy] = useState('sales')
  const [viewMode, setViewMode] = useState('grid')

  const filteredProducts = bestSellingProducts.filter(product => 
    selectedCategory === 'Todos' || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'sales':
        return b.salesCount - a.salesCount
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      default:
        return a.rank - b.rank
    }
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-neon-yellow" />
      case 2:
        return <Medal className="w-5 h-5 text-cyber-300" />
      case 3:
        return <Award className="w-5 h-5 text-orange-400" />
      default:
        return <span className="text-cyber-400 font-bold">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30'
      case 2:
        return 'bg-cyber-300/20 text-cyber-300 border-cyber-300/30'
      case 3:
        return 'bg-orange-400/20 text-orange-400 border-orange-400/30'
      default:
        return 'bg-cyber-800/50 text-cyber-300 border-cyber-500/30'
    }
  }

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
              <div className="w-10 h-10 bg-gradient-to-br from-neon-yellow to-neon-orange rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Mais Vendidos
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Top 3 Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-neon-yellow" />
            <h2 className="text-2xl font-bold text-white">Top 3 Mais Vendidos</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {bestSellingProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`relative bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all group ${
                  index === 0 ? 'ring-2 ring-neon-yellow/50' : ''
                }`}
              >
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className={getRankColor(product.rank)}>
                    {getRankIcon(product.rank)}
                  </Badge>
                </div>

                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-3 right-3 bg-neon-green/20 text-neon-green border-neon-green/30">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <p className="text-cyber-400 text-sm mb-1">{product.brand}</p>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-neon-yellow fill-current'
                              : 'text-cyber-500'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-cyber-400 text-sm">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Sales Count */}
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-neon-green" />
                    <span className="text-neon-green text-sm font-medium">
                      {product.salesCount} vendas
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-lg">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-cyber-400 text-sm line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-cyber-400" />
                <span className="text-cyber-300 text-sm">Categoria:</span>
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

              {/* Sort Options */}
              <div className="flex items-center gap-3">
                <SortAsc className="w-5 h-5 text-cyber-400" />
                <span className="text-cyber-300 text-sm">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-800 border border-cyber-500/30 rounded-lg px-3 py-2 text-white text-sm focus:border-neon-blue focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-neon-green" />
            <h2 className="text-2xl font-bold text-white">
              Todos os Mais Vendidos
            </h2>
            <Badge className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30">
              {sortedProducts.length} produtos
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all group"
              >
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className={getRankColor(product.rank)}>
                    {getRankIcon(product.rank)}
                  </Badge>
                </div>

                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-3 right-3 bg-neon-green/20 text-neon-green border-neon-green/30">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-cyber-400 text-sm mb-1">{product.brand}</p>
                    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-neon-yellow fill-current'
                              : 'text-cyber-500'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-cyber-400 text-xs">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Sales Count */}
                  <div className="flex items-center gap-1 mb-3">
                    <TrendingUp className="w-3 h-3 text-neon-green" />
                    <span className="text-neon-green text-xs font-medium">
                      {product.salesCount} vendas
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-base">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-cyber-400 text-xs line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Comprar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
