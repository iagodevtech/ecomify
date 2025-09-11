'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  Zap,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products, categories, brands } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/components/providers'

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const { addItem } = useCart()

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        filtered.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy])

  const handleAddToCart = (product: any) => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      brand: product.brand
    })
  }

  return (
    <AppLayout>
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
              Explore nossa seleção completa de produtos de tecnologia
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                  <input
                    type="text"
                    placeholder="Buscar produtos, marcas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="cyber-button border-cyber-500/30 text-cyber-400 hover:text-white"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtros
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                  <option value="newest">Mais Recentes</option>
                </select>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    className={viewMode === 'grid' ? 'cyber-button bg-neon-blue text-white' : 'border-cyber-500/30 text-cyber-400'}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    className={viewMode === 'list' ? 'cyber-button bg-neon-blue text-white' : 'border-cyber-500/30 text-cyber-400'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-cyber-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">Categoria</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    >
                      <option value="all">Todas as Categorias</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">Marca</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    >
                      <option value="all">Todas as Marcas</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-cyber-300 text-sm font-medium mb-2">
                      Preço: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-cyber-400">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Products Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all group"
                >
                  {/* Product Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-cyber-400 text-sm">Imagem do Produto</p>
                    </div>
                    {product.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-neon-pink/20 text-neon-pink border-neon-pink/50">
                        Destaque
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-cyber-400 hover:text-neon-pink"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold text-lg line-clamp-2 mb-1">{product.name}</h3>
                      <p className="text-cyber-400 text-sm">{product.brand}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-neon-yellow fill-current'
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
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-xl">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-cyber-500 text-sm line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all"
                >
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-1">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-cyber-400 text-xs">Imagem</p>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-xl mb-2">{product.name}</h3>
                          <p className="text-cyber-400 mb-2">{product.brand}</p>
                          <p className="text-cyber-300 text-sm line-clamp-2 mb-3">{product.description}</p>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-neon-yellow fill-current'
                                      : 'text-cyber-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-cyber-400 text-sm">
                              {product.rating} ({product.reviewCount} avaliações)
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-2xl">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-cyber-500 text-lg line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 ml-6">
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Adicionar
                          </Button>
                          <Button
                            variant="outline"
                            className="border-cyber-500/30 text-cyber-400 hover:text-neon-pink"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center mb-4">
                <Search className="w-12 h-12 text-cyber-500" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Nenhum produto encontrado</h3>
              <p className="text-cyber-400 mb-4">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedBrand('all')
                  setPriceRange([0, 50000])
                }}
                className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}