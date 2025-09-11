'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List, 
  SlidersHorizontal,
  X,
  Star,
  Heart,
  ShoppingCart,
  Eye,
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
  Speaker,
  Package,
  Tag,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Check,
  Minus,
  Plus
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock products data
const products = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    price: 15999,
    originalPrice: 17999,
    image: '/images/products/macbook-pro.jpg',
    brand: 'Apple',
    category: 'Laptops',
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    stockCount: 5,
    tags: ['premium', 'profissional', 'design', 'performance'],
    specifications: {
      processor: 'Apple M3 Max',
      ram: '32GB',
      storage: '1TB SSD',
      display: '14.2" Liquid Retina XDR',
      weight: '1.6 kg'
    },
    features: ['Touch ID', 'FaceTime HD', 'Thunderbolt 4', 'Wi-Fi 6E'],
    isNew: true,
    isFeatured: true,
    discount: 11
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    price: 8999,
    originalPrice: 9999,
    image: '/images/products/iphone-15-pro.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockCount: 15,
    tags: ['premium', 'camera', '5g', 'titanium'],
    specifications: {
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      display: '6.7" Super Retina XDR',
      weight: '221g'
    },
    features: ['Face ID', 'Action Button', 'USB-C', '5G'],
    isNew: true,
    isFeatured: false,
    discount: 10
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 1299,
    originalPrice: 1499,
    image: '/images/products/sony-wh1000xm5.jpg',
    brand: 'Sony',
    category: 'Áudio',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    stockCount: 8,
    tags: ['noise-cancelling', 'wireless', 'premium', 'battery'],
    specifications: {
      battery: '30 horas',
      connectivity: 'Bluetooth 5.2',
      weight: '250g',
      frequency: '4Hz - 40kHz'
    },
    features: ['Noise Cancelling', 'Quick Charge', 'Touch Controls', 'Hi-Res Audio'],
    isNew: false,
    isFeatured: true,
    discount: 13
  },
  {
    id: '4',
    name: 'Dell XPS 15',
    price: 12999,
    originalPrice: 14999,
    image: '/images/products/dell-xps15.jpg',
    brand: 'Dell',
    category: 'Laptops',
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockCount: 8,
    tags: ['premium', '4k', 'oled', 'windows'],
    specifications: {
      processor: 'Intel Core i7-13700H',
      ram: '16GB',
      storage: '512GB SSD',
      display: '15.6" 4K OLED',
      weight: '1.8 kg'
    },
    features: ['4K OLED Display', 'Thunderbolt 4', 'Windows 11', 'Premium Design'],
    isNew: false,
    isFeatured: false,
    discount: 13
  },
  {
    id: '5',
    name: 'ASUS ROG Zephyrus G14',
    price: 8999,
    originalPrice: 10999,
    image: '/images/products/asus-rog-g14.jpg',
    brand: 'ASUS',
    category: 'Laptops',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    stockCount: 12,
    tags: ['gaming', 'rtx', 'amd', 'portable'],
    specifications: {
      processor: 'AMD Ryzen 7 7735HS',
      ram: '16GB',
      storage: '1TB SSD',
      display: '14" QHD 165Hz',
      weight: '1.7 kg'
    },
    features: ['RTX 4060', '165Hz Display', 'RGB Keyboard', 'Gaming Performance'],
    isNew: false,
    isFeatured: true,
    discount: 18
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24 Ultra',
    price: 7999,
    originalPrice: 8999,
    image: '/images/products/samsung-s24-ultra.jpg',
    brand: 'Samsung',
    category: 'Smartphones',
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    stockCount: 20,
    tags: ['android', 'camera', 's-pen', 'premium'],
    specifications: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      display: '6.8" Dynamic AMOLED 2X',
      weight: '232g'
    },
    features: ['S Pen', '200MP Camera', 'AI Features', '5G'],
    isNew: true,
    isFeatured: false,
    discount: 11
  }
]

const categories = [
  { id: 'all', name: 'Todos', icon: Package, count: products.length },
  { id: 'laptops', name: 'Laptops', icon: Laptop, count: products.filter(p => p.category === 'Laptops').length },
  { id: 'smartphones', name: 'Smartphones', icon: Smartphone, count: products.filter(p => p.category === 'Smartphones').length },
  { id: 'audio', name: 'Áudio', icon: Headphones, count: products.filter(p => p.category === 'Áudio').length },
  { id: 'gaming', name: 'Gaming', icon: Gamepad, count: products.filter(p => p.tags.includes('gaming')).length },
  { id: 'premium', name: 'Premium', icon: Award, count: products.filter(p => p.tags.includes('premium')).length }
]

const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'ASUS']
const priceRanges = [
  { label: 'Até R$ 1.000', min: 0, max: 1000 },
  { label: 'R$ 1.000 - R$ 5.000', min: 1000, max: 5000 },
  { label: 'R$ 5.000 - R$ 10.000', min: 5000, max: 10000 },
  { label: 'Acima de R$ 10.000', min: 10000, max: Infinity }
]

const sortOptions = [
  { value: 'relevance', label: 'Relevância', icon: TrendingUp },
  { value: 'price-asc', label: 'Menor Preço', icon: SortAsc },
  { value: 'price-desc', label: 'Maior Preço', icon: SortDesc },
  { value: 'rating', label: 'Melhor Avaliação', icon: Star },
  { value: 'newest', label: 'Mais Recentes', icon: Clock },
  { value: 'discount', label: 'Maior Desconto', icon: Tag }
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<{min: number, max: number} | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    inStock: false,
    isNew: false,
    isFeatured: false,
    minRating: 0
  })

  const [filteredProducts, setFilteredProducts] = useState(products)

  // Apply filters
  useEffect(() => {
    let filtered = products

    // Search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        switch (selectedCategory) {
          case 'laptops': return product.category === 'Laptops'
          case 'smartphones': return product.category === 'Smartphones'
          case 'audio': return product.category === 'Áudio'
          case 'gaming': return product.tags.includes('gaming')
          case 'premium': return product.tags.includes('premium')
          default: return true
        }
      })
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand))
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(product => 
        product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
      )
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product => 
        selectedTags.some(tag => product.tags.includes(tag))
      )
    }

    // Additional filters
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }
    if (filters.isNew) {
      filtered = filtered.filter(product => product.isNew)
    }
    if (filters.isFeatured) {
      filtered = filtered.filter(product => product.isFeatured)
    }
    if (filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.minRating)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount)
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, selectedBrands, selectedPriceRange, selectedTags, sortBy, filters])

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedBrands([])
    setSelectedPriceRange(null)
    setSelectedTags([])
    setFilters({
      inStock: false,
      isNew: false,
      isFeatured: false,
      minRating: 0
    })
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Laptops': Laptop,
      'Smartphones': Smartphone,
      'Áudio': Headphones,
      'Gaming': Gamepad,
      'Monitores': Monitor
    }
    return iconMap[category] || Package
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
                Busca Avançada
              </span>
            </h1>
            <p className="text-cyber-400">
              Encontre exatamente o que você procura com nossos filtros inteligentes
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos, marcas, categorias..."
                className="w-full pl-12 pr-4 py-4 bg-dark-800/50 border border-cyber-500/30 rounded-2xl text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all text-lg"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtros
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="text-cyber-400 hover:text-white text-sm"
                  >
                    Limpar
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                            : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <category.icon className="w-4 h-4" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge className="bg-cyber-700 text-cyber-300 text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Marcas</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue"
                        />
                        <span className="text-cyber-300">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Faixa de Preço</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPriceRange(selectedPriceRange?.min === range.min ? null : range)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedPriceRange?.min === range.min
                            ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                            : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['premium', 'gaming', 'wireless', 'camera', 'design', 'performance'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50'
                            : 'bg-cyber-700 text-cyber-300 hover:bg-cyber-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Filtros Adicionais</h3>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="w-4 h-4 text-neon-green bg-dark-700 border-cyber-500 rounded focus:ring-neon-green"
                    />
                    <span className="text-cyber-300">Apenas em estoque</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isNew}
                      onChange={(e) => setFilters(prev => ({ ...prev, isNew: e.target.checked }))}
                      className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue"
                    />
                    <span className="text-cyber-300">Produtos novos</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isFeatured}
                      onChange={(e) => setFilters(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4 h-4 text-neon-pink bg-dark-700 border-cyber-500 rounded focus:ring-neon-pink"
                    />
                    <span className="text-cyber-300">Produtos em destaque</span>
                  </label>

                  <div>
                    <label className="block text-cyber-300 text-sm mb-2">
                      Avaliação mínima: {filters.minRating}★
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={filters.minRating}
                      onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-cyber-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                  </h2>
                  {searchQuery && (
                    <p className="text-cyber-400 text-sm">
                      Resultados para "{searchQuery}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-neon-blue/20 text-neon-blue' 
                          : 'text-cyber-400 hover:text-white'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list' 
                          ? 'bg-neon-blue/20 text-neon-blue' 
                          : 'text-cyber-400 hover:text-white'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                    : 'space-y-4'
                }`}>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all ${
                        viewMode === 'list' ? 'flex gap-6' : ''
                      }`}
                    >
                      {/* Product Image */}
                      <div className={`${
                        viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48 mb-4'
                      } bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center`}>
                        <div className="text-center">
                          <div className={`${
                            viewMode === 'list' ? 'w-12 h-12' : 'w-16 h-16'
                          } mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2`}>
                            <span className={`text-white font-bold ${
                              viewMode === 'list' ? 'text-lg' : 'text-xl'
                            }`}>
                              {product.brand.charAt(0)}
                            </span>
                          </div>
                          <p className="text-cyber-400 text-xs">Imagem do Produto</p>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                                {React.createElement(getCategoryIcon(product.category), { className: "w-3 h-3 text-white" })}
                              </div>
                              <span className="text-cyber-400 text-sm">{product.brand}</span>
                              {product.isNew && (
                                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                                  Novo
                                </Badge>
                              )}
                              {product.isFeatured && (
                                <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/50 text-xs">
                                  Destaque
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                            <p className="text-cyber-400 text-sm mb-3">{product.category}</p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${
                                i < Math.floor(product.rating) ? 'text-neon-yellow' : 'text-cyber-600'
                              }`}>★</span>
                            ))}
                          </div>
                          <span className="text-cyber-400 text-sm">({product.reviewCount})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-white font-bold text-xl">{formatPrice(product.price)}</p>
                            <p className="text-cyber-500 text-sm line-through">{formatPrice(product.originalPrice)}</p>
                          </div>
                          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                            -{product.discount}%
                          </Badge>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-4">
                          <Badge className={`text-xs ${
                            product.inStock 
                              ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                              : 'bg-red-500/20 text-red-500 border-red-500/50'
                          }`}>
                            {product.inStock ? `${product.stockCount} em estoque` : 'Fora de estoque'}
                          </Badge>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-cyber-700 text-cyber-300 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button className="flex-1 cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Comprar
                          </Button>
                          <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                    <Search className="w-16 h-16 text-cyber-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Nenhum produto encontrado</h3>
                  <p className="text-cyber-400 mb-8">
                    Tente ajustar os filtros ou usar termos de busca diferentes
                  </p>
                  <Button
                    onClick={clearFilters}
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
