'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Eye, 
  Share2, 
  Bell, 
  Trash2, 
  Star,
  TrendingDown,
  TrendingUp,
  Package,
  Truck,
  CreditCard,
  Zap,
  Award,
  Crown,
  Gem,
  Sparkles,
  Clock,
  Settings,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  brand: string
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  addedDate: Date
  priceHistory: Array<{
    date: string
    price: number
  }>
  specifications: Record<string, string>
  notes?: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    productId: '1',
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
    addedDate: new Date('2024-01-10'),
    priceHistory: [
      { date: '2024-01-01', price: 17999 },
      { date: '2024-01-10', price: 15999 }
    ],
    specifications: {
      processor: 'Apple M3 Max',
      memory: '32GB',
      storage: '1TB SSD',
      display: '16.2" Liquid Retina XDR'
    },
    priority: 'high',
    tags: ['work', 'gaming', 'professional']
  },
  {
    id: '2',
    productId: '2',
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
    addedDate: new Date('2024-01-08'),
    priceHistory: [
      { date: '2024-01-01', price: 9999 },
      { date: '2024-01-08', price: 8999 }
    ],
    specifications: {
      processor: 'A17 Pro',
      memory: '8GB',
      storage: '256GB',
      display: '6.7" Super Retina XDR'
    },
    priority: 'medium',
    tags: ['mobile', 'photography']
  },
  {
    id: '3',
    productId: '3',
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
    addedDate: new Date('2024-01-05'),
    priceHistory: [
      { date: '2024-01-01', price: 1499 },
      { date: '2024-01-05', price: 1299 }
    ],
    specifications: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      battery: '30 horas',
      noiseCancelling: 'Sim'
    },
    priority: 'low',
    tags: ['audio', 'travel']
  }
]

const categories = [
  { name: 'Todos', count: mockWishlistItems.length, icon: Grid },
  { name: 'Laptops', count: 1, icon: Package },
  { name: 'Smartphones', count: 1, icon: Package },
  { name: 'Áudio', count: 1, icon: Package }
]

const priorityColors = {
  high: 'from-red-500 to-orange-500',
  medium: 'from-yellow-500 to-orange-500',
  low: 'from-green-500 to-cyan-500'
}

export function WishlistManager() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const filteredItems = wishlistItems.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      case 'name':
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      case 'rating':
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return sortOrder === 'asc' 
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'date':
      default:
        return sortOrder === 'asc' 
          ? a.addedDate.getTime() - b.addedDate.getTime()
          : b.addedDate.getTime() - a.addedDate.getTime()
    }
  })

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    // Mock add to cart
    console.log('Added to cart:', item)
  }

  const shareProduct = (item: WishlistItem) => {
    // Mock share
    console.log('Sharing:', item)
  }

  const createPriceAlert = (item: WishlistItem) => {
    // Mock price alert
    console.log('Creating price alert for:', item)
  }

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedItems(sortedItems.map(item => item.id))
  }

  const deselectAll = () => {
    setSelectedItems([])
  }

  const removeSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
    setSelectedItems([])
  }

  const getTotalValue = () => {
    return wishlistItems.reduce((sum, item) => sum + item.price, 0)
  }

  const getTotalSavings = () => {
    return wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Lista de Desejos</h2>
          <p className="text-cyber-400">
            {wishlistItems.length} produto{wishlistItems.length !== 1 ? 's' : ''} • 
            Valor total: {formatPrice(getTotalValue())} • 
            Economia: {formatPrice(getTotalSavings())}
          </p>
        </div>

        <div className="flex items-center gap-2">
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

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar na lista de desejos..."
              className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20 transition-all"
            />
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
                  <option value="priority">Prioridade</option>
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

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selecionado{selectedItems.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={deselectAll}
                className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
              >
                Desmarcar Todos
              </Button>
              <Button
                variant="outline"
                onClick={removeSelected}
                className="border-red-500 text-red-400 hover:border-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remover Selecionados
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Products */}
      {sortedItems.length === 0 ? (
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
          {sortedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl overflow-hidden hover:border-neon-pink/50 transition-all ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-4 left-4 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                  className="w-5 h-5 text-neon-pink bg-dark-700 border-cyber-500 rounded focus:ring-neon-pink"
                />
              </div>

              {/* Priority Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className={`bg-gradient-to-r ${priorityColors[item.priority]} text-white border-0 text-xs`}>
                  {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa'}
                </Badge>
              </div>

              {/* Product Image */}
              <div className={`bg-gradient-to-br from-cyber-800 to-cyber-900 flex items-center justify-center ${
                viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'
              }`}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-pink to-neon-purple rounded-full flex items-center justify-center mb-2">
                    <span className="text-white font-bold text-xl">
                      {item.brand.charAt(0)}
                    </span>
                  </div>
                  <p className="text-cyber-400 text-xs">Imagem do Produto</p>
                </div>
              </div>

              {/* Product Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-cyber-400 text-sm mb-2">{item.brand} • {item.category}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${
                            i < Math.floor(item.rating) ? 'text-neon-yellow' : 'text-cyber-600'
                          }`}>★</span>
                        ))}
                      </div>
                      <span className="text-cyber-400 text-sm">({item.reviewCount})</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-cyber-500 hover:text-red-400 transition-colors p-1"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-bold text-lg">{formatPrice(item.price)}</p>
                    <p className="text-cyber-500 text-sm line-through">{formatPrice(item.originalPrice)}</p>
                  </div>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                    -{item.discount}%
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`text-xs ${
                    item.inStock 
                      ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                      : 'bg-red-500/20 text-red-400 border-red-500/50'
                  }`}>
                    {item.inStock ? 'Em estoque' : 'Fora de estoque'}
                  </Badge>
                  <span className="text-cyber-400 text-xs">
                    Adicionado em {item.addedDate.toLocaleDateString()}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} className="bg-cyber-600 text-cyber-300 text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-2"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock ? 'Adicionar' : 'Indisponível'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => shareProduct(item)}
                    className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => createPriceAlert(item)}
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
  )
}
