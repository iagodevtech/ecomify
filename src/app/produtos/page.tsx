'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronDown,
  Search,
  X
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock data - in real app this would come from API
const products = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    slug: 'macbook-pro-m3-max',
    description: 'O mais poderoso MacBook Pro já criado com chip M3 Max',
    price: 15999,
    originalPrice: 17999,
    images: ['/images/products/macbook-pro.jpg'],
    rating: 4.9,
    reviewCount: 127,
    brand: 'Apple',
    isNew: true,
    isFeatured: true,
    tags: ['Novo', 'Premium', 'Profissional'],
    features: ['Chip M3 Max', '32GB RAM', '1TB SSD', 'Tela 16"'],
    inStock: true,
    stock: 15,
    category: 'laptops'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'O iPhone mais avançado com chip A17 Pro e câmera de 48MP',
    price: 8999,
    originalPrice: 9999,
    images: ['/images/products/iphone-15-pro.jpg'],
    rating: 4.8,
    reviewCount: 89,
    brand: 'Apple',
    isNew: true,
    isFeatured: true,
    tags: ['Novo', 'Premium', '5G'],
    features: ['Chip A17 Pro', 'Câmera 48MP', '5G', 'Titanium'],
    inStock: true,
    stock: 8,
    category: 'smartphones'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Fones de ouvido com cancelamento de ruído líder mundial',
    price: 1299,
    originalPrice: 1499,
    images: ['/images/products/sony-wh1000xm5.jpg'],
    rating: 4.7,
    reviewCount: 203,
    brand: 'Sony',
    isNew: false,
    isFeatured: true,
    tags: ['Áudio', 'Wireless', 'Premium'],
    features: ['Cancelamento de Ruído', '30h Bateria', 'Carregamento Rápido'],
    inStock: true,
    stock: 25,
    category: 'audio'
  },
  {
    id: '4',
    name: 'RTX 4090 Gaming PC',
    slug: 'rtx-4090-gaming-pc',
    description: 'PC Gamer com RTX 4090 e processador Intel i9-13900K',
    price: 18999,
    originalPrice: 21999,
    images: ['/images/products/rtx-4090-pc.jpg'],
    rating: 4.9,
    reviewCount: 45,
    brand: 'Custom Build',
    isNew: true,
    isFeatured: true,
    tags: ['Gaming', 'RTX 4090', 'High-End'],
    features: ['RTX 4090', 'i9-13900K', '32GB DDR5', '2TB NVMe'],
    inStock: true,
    stock: 3,
    category: 'gaming'
  },
  {
    id: '5',
    name: 'Samsung Odyssey G9',
    slug: 'samsung-odyssey-g9',
    description: 'Monitor ultrawide 49" 240Hz para gaming e produtividade',
    price: 3999,
    originalPrice: 4499,
    images: ['/images/products/samsung-g9.jpg'],
    rating: 4.6,
    reviewCount: 67,
    brand: 'Samsung',
    isNew: false,
    isFeatured: true,
    tags: ['Monitor', 'Gaming', 'Ultrawide'],
    features: ['49" Curvo', '240Hz', 'QHD', 'HDR1000'],
    inStock: true,
    stock: 12,
    category: 'monitors'
  },
  {
    id: '6',
    name: 'DJI Air 3 Drone',
    slug: 'dji-air-3-drone',
    description: 'Drone profissional com câmera dupla e 46 minutos de voo',
    price: 5999,
    originalPrice: 6999,
    images: ['/images/products/dji-air3.jpg'],
    rating: 4.8,
    reviewCount: 34,
    brand: 'DJI',
    isNew: true,
    isFeatured: true,
    tags: ['Drone', 'Profissional', 'Câmera'],
    features: ['Câmera Dupla', '46min Voo', '4K/60fps', 'OcuSync 4'],
    inStock: true,
    stock: 7,
    category: 'cameras'
  }
]

const categories = [
  { id: 'all', name: 'Todos os Produtos', count: 150 },
  { id: 'laptops', name: 'Laptops & Notebooks', count: 25 },
  { id: 'smartphones', name: 'Smartphones', count: 30 },
  { id: 'audio', name: 'Áudio & Som', count: 20 },
  { id: 'gaming', name: 'Gaming', count: 35 },
  { id: 'monitors', name: 'Monitores', count: 15 },
  { id: 'cameras', name: 'Câmeras', count: 18 },
  { id: 'components', name: 'Componentes', count: 7 }
]

const brands = [
  'Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Lenovo', 'Asus', 'MSI', 'NVIDIA', 'AMD'
]

const priceRanges = [
  { label: 'Até R$ 1.000', min: 0, max: 1000 },
  { label: 'R$ 1.000 - R$ 5.000', min: 1000, max: 5000 },
  { label: 'R$ 5.000 - R$ 10.000', min: 5000, max: 10000 },
  { label: 'R$ 10.000 - R$ 20.000', min: 10000, max: 20000 },
  { label: 'Acima de R$ 20.000', min: 20000, max: Infinity }
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<{min: number, max: number} | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false
    if (selectedPriceRange && (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max)) return false
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Produtos
              </span>
            </h1>
            <p className="text-cyber-400">
              Descubra nossa seleção completa de produtos de tecnologia
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Filtros</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-cyber-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Buscar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyber-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Nome do produto..."
                      className="w-full pl-10 pr-4 py-2 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-cyber-300 font-medium mb-3">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedCategory === category.id
                            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                            : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h3 className="text-cyber-300 font-medium mb-3">Marcas</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue"
                        />
                        <span className="text-cyber-400 text-sm hover:text-white transition-colors">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-cyber-300 font-medium mb-3">Faixa de Preço</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPriceRange(
                          selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                            ? null
                            : { min: range.min, max: range.max }
                        )}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                            : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedBrands([])
                    setSelectedPriceRange(null)
                    setSearchQuery('')
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-cyber-400 hover:text-white transition-all"
                  >
                    <Filter className="w-4 h-4" />
                    Filtros
                  </button>
                  
                  <span className="text-cyber-400 text-sm">
                    {filteredProducts.length} produtos encontrados
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
                  >
                    <option value="relevance">Relevância</option>
                    <option value="price-low">Menor Preço</option>
                    <option value="price-high">Maior Preço</option>
                    <option value="rating">Melhor Avaliação</option>
                    <option value="newest">Mais Recentes</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid'
                          ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                          : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list'
                          ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                          : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className={`bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}>
                      {/* Product Image */}
                      <div className={`bg-gradient-to-br from-cyber-800 to-cyber-900 overflow-hidden ${
                        viewMode === 'list' ? 'w-48 h-48' : 'h-48'
                      }`}>
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {product.brand.charAt(0)}
                              </span>
                            </div>
                            <p className="text-cyber-400 text-sm">Imagem do Produto</p>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.isNew && (
                            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                              Novo
                            </Badge>
                          )}
                          {product.originalPrice && (
                            <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/50 text-xs">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </Badge>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 hover:border-neon-pink/50 transition-all"
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              favorites.includes(product.id) 
                                ? 'text-neon-pink fill-neon-pink' 
                                : 'text-cyber-400 hover:text-neon-pink'
                            }`} 
                          />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <p className="text-cyber-500 text-sm font-medium mb-2">{product.brand}</p>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <p className="text-cyber-400 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) 
                                    ? 'text-neon-yellow fill-neon-yellow' 
                                    : 'text-cyber-600'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-cyber-400 text-sm">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-white">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-cyber-500 line-through ml-2">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-cyber-400 text-sm">Estoque</p>
                            <p className="text-neon-green text-sm font-medium">{product.stock} unidades</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Comprar
                          </Button>
                          <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-cyber-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
                  <p className="text-cyber-400 mb-6">
                    Tente ajustar os filtros ou buscar por outros termos
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedBrands([])
                      setSelectedPriceRange(null)
                      setSearchQuery('')
                    }}
                    className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
