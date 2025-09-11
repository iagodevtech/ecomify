'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Trash2, 
  Share2, 
  Star,
  TrendingDown,
  Bell,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Search,
  X,
  Plus,
  Minus,
  Zap,
  Shield,
  Truck,
  Award,
  Smartphone,
  Laptop,
  Headphones,
  Monitor,
  Keyboard,
  Mouse,
  Camera,
  Gamepad,
  Speaker
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock data
const favoriteProducts = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    price: 15999,
    originalPrice: 17999,
    discount: 11,
    image: '/images/products/macbook-pro.jpg',
    brand: 'Apple',
    category: 'Laptops',
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    addedDate: '2024-01-10',
    priceHistory: [
      { date: '2024-01-01', price: 17999 },
      { date: '2024-01-10', price: 15999 }
    ],
    specifications: {
      processor: 'Apple M3 Max',
      memory: '32GB',
      storage: '1TB SSD',
      display: '16.2" Liquid Retina XDR'
    }
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    image: '/images/products/iphone-15-pro.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    addedDate: '2024-01-08',
    priceHistory: [
      { date: '2024-01-01', price: 9999 },
      { date: '2024-01-08', price: 8999 }
    ],
    specifications: {
      processor: 'A17 Pro',
      memory: '8GB',
      storage: '256GB',
      display: '6.7" Super Retina XDR'
    }
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 1299,
    originalPrice: 1499,
    discount: 13,
    image: '/images/products/sony-wh1000xm5.jpg',
    brand: 'Sony',
    category: 'Áudio',
    rating: 4.7,
    reviewCount: 203,
    inStock: false,
    addedDate: '2024-01-05',
    priceHistory: [
      { date: '2024-01-01', price: 1499 },
      { date: '2024-01-05', price: 1299 }
    ],
    specifications: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      battery: '30 horas',
      noiseCancelling: 'Sim'
    }
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    price: 7999,
    originalPrice: 8999,
    discount: 11,
    image: '/images/products/galaxy-s24-ultra.jpg',
    brand: 'Samsung',
    category: 'Smartphones',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    addedDate: '2024-01-12',
    priceHistory: [
      { date: '2024-01-01', price: 8999 },
      { date: '2024-01-12', price: 7999 }
    ],
    specifications: {
      processor: 'Snapdragon 8 Gen 3',
      memory: '12GB',
      storage: '256GB',
      display: '6.8" Dynamic AMOLED 2X'
    }
  },
  {
    id: '5',
    name: 'NVIDIA RTX 4090',
    price: 12999,
    originalPrice: 14999,
    discount: 13,
    image: '/images/products/rtx-4090.jpg',
    brand: 'NVIDIA',
    category: 'Gaming',
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    addedDate: '2024-01-15',
    priceHistory: [
      { date: '2024-01-01', price: 14999 },
      { date: '2024-01-15', price: 12999 }
    ],
    specifications: {
      memory: '24GB GDDR6X',
      cores: '16384 CUDA',
      memoryBus: '384-bit',
      power: '450W'
    }
  }
]

const categories = [
  { name: 'Todos', count: favoriteProducts.length, icon: Grid },
  { name: 'Laptops', count: 1, icon: Laptop },
  { name: 'Smartphones', count: 2, icon: Smartphone },
  { name: 'Áudio', count: 1, icon: Headphones },
  { name: 'Gaming', count: 1, icon: Gamepad }
]

export default function FavoritosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState(favoriteProducts)

  const filteredFavorites = favorites.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      case 'name':
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      case 'rating':
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
      case 'date':
      default:
        return sortOrder === 'asc' ? 
          new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime() :
          new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
  })

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(product => product.id !== productId))
  }

  const addToCart = (product: any) => {
    // Mock add to cart
    console.log('Added to cart:', product)
  }

  const shareProduct = (product: any) => {
    // Mock share
    console.log('Sharing:', product)
  }

  const createPriceAlert = (product: any) => {
    // Mock price alert
    console.log('Creating price alert for:', product)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Laptops': return Laptop
      case 'Smartphones': return Smartphone
      case 'Áudio': return Headphones
      case 'Gaming': return Gamepad
      case 'Monitores': return Monitor
      case 'Teclados': return Keyboard
      case 'Mouses': return Mouse
      case 'Câmeras': return Camera
      case 'Caixas de Som': return Speaker
      default: return Package
    }
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                Meus Favoritos
              </span>
            </h1>
            <p className="text-cyber-400">
              {favorites.length} produto{favorites.length !== 1 ? 's' : ''} salvo{favorites.length !== 1 ? 's' : ''} nos seus favoritos
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar nos favoritos..."
                  className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20 transition-all"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink"
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-lg p-4"
              >
                <div className="flex flex-wrap gap-4">
                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">Ordenar por</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-pink focus:outline-none"
                    >
                      <option value="date">Data de adição</option>
                      <option value="price">Preço</option>
                      <option value="name">Nome</option>
                      <option value="rating">Avaliação</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">Ordem</label>
                    <Button
                      variant="outline"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.name
                      ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50'
                      : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                  <Badge className="bg-cyber-600 text-cyber-300 text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          {sortedFavorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-cyber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {searchQuery ? 'Nenhum produto encontrado' : 'Nenhum favorito ainda'}
              </h3>
              <p className="text-cyber-400 mb-8">
                {searchQuery 
                  ? 'Tente ajustar sua busca ou filtros'
                  : 'Adicione produtos aos seus favoritos para vê-los aqui'
                }
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => window.location.href = '/produtos'}
                  className="cyber-button bg-gradient-to-r from-neon-pink to-neon-purple text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Explorar Produtos
                </Button>
              )}
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedFavorites.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl overflow-hidden hover:border-neon-pink/50 transition-all ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`bg-gradient-to-br from-cyber-800 to-cyber-900 flex items-center justify-center ${
                    viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'
                  }`}>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-pink to-neon-purple rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold text-xl">
                          {product.brand.charAt(0)}
                        </span>
                      </div>
                      <p className="text-cyber-400 text-xs">Imagem do Produto</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-bold mb-1 line-clamp-2">{product.name}</h3>
                        <p className="text-cyber-400 text-sm mb-2">{product.brand} • {product.category}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${
                                i < Math.floor(product.rating) ? 'text-neon-yellow' : 'text-cyber-600'
                              }`}>★</span>
                            ))}
                          </div>
                          <span className="text-cyber-400 text-sm">({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFromFavorites(product.id)}
                        className="text-cyber-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-bold text-lg">{formatPrice(product.price)}</p>
                        <p className="text-cyber-500 text-sm line-through">{formatPrice(product.originalPrice)}</p>
                      </div>
                      <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                        -{product.discount}%
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={`text-xs ${
                        product.inStock 
                          ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                          : 'bg-red-500/20 text-red-400 border-red-500/50'
                      }`}>
                        {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                      </Badge>
                      <span className="text-cyber-400 text-xs">
                        Adicionado em {new Date(product.addedDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-2"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Adicionar' : 'Indisponível'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => shareProduct(product)}
                        className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => createPriceAlert(product)}
                        className="border-cyber-500 text-cyber-400 hover:border-neon-green hover:text-neon-green"
                      >
                        <Bell className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
