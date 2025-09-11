'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProductSearch } from '@/hooks/use-product-search'

interface SearchBarProps {
  onSearch?: (query: string) => void
  onFilter?: (filters: any) => void
  placeholder?: string
}

export function SearchBar({ 
  onSearch, 
  onFilter, 
  placeholder = "Buscar produtos, marcas..." 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    brand: '',
    rating: '',
    inStock: false
  })
  const { search } = useProductSearch()

  const categories = [
    'Todos',
    'Laptops & Notebooks',
    'Smartphones',
    'Áudio & Som',
    'Gaming',
    'Componentes',
    'Monitores',
    'Câmeras',
    'Armazenamento'
  ]

  const brands = [
    'Todos',
    'Apple',
    'Samsung',
    'Dell',
    'ASUS',
    'Lenovo',
    'HP',
    'Sony',
    'NVIDIA',
    'Intel',
    'AMD'
  ]

  const priceRanges = [
    'Todos',
    'Até R$ 1.000',
    'R$ 1.000 - R$ 5.000',
    'R$ 5.000 - R$ 10.000',
    'R$ 10.000 - R$ 20.000',
    'Acima de R$ 20.000'
  ]

  const ratings = [
    'Todos',
    '4+ estrelas',
    '3+ estrelas',
    '2+ estrelas',
    '1+ estrelas'
  ]

  const handleSearch = async () => {
    const searchFilters = {
      query: searchQuery,
      category: filters.category === 'Todos' ? undefined : filters.category,
      brand: filters.brand === 'Todos' ? undefined : filters.brand,
      rating: filters.rating === 'Todos' ? undefined : filters.rating,
      inStock: filters.inStock,
      sortBy: 'name',
      sortOrder: 'asc'
    }

    // Parse price range
    if (filters.priceRange && filters.priceRange !== 'Todos') {
      const priceRanges: { [key: string]: { min?: string; max?: string } } = {
        'Até R$ 1.000': { max: '1000' },
        'R$ 1.000 - R$ 5.000': { min: '1000', max: '5000' },
        'R$ 5.000 - R$ 10.000': { min: '5000', max: '10000' },
        'R$ 10.000 - R$ 20.000': { min: '10000', max: '20000' },
        'Acima de R$ 20.000': { min: '20000' }
      }
      
      const range = priceRanges[filters.priceRange]
      if (range) {
        if (range.min) searchFilters.minPrice = range.min
        if (range.max) searchFilters.maxPrice = range.max
      }
    }

    await search(searchFilters)

    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  const handleFilterChange = async (key: string, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Auto-search when filters change
    const searchFilters = {
      query: searchQuery,
      category: newFilters.category === 'Todos' ? undefined : newFilters.category,
      brand: newFilters.brand === 'Todos' ? undefined : newFilters.brand,
      rating: newFilters.rating === 'Todos' ? undefined : newFilters.rating,
      inStock: newFilters.inStock,
      sortBy: 'name',
      sortOrder: 'asc'
    }

    // Parse price range
    if (newFilters.priceRange && newFilters.priceRange !== 'Todos') {
      const priceRanges: { [key: string]: { min?: string; max?: string } } = {
        'Até R$ 1.000': { max: '1000' },
        'R$ 1.000 - R$ 5.000': { min: '1000', max: '5000' },
        'R$ 5.000 - R$ 10.000': { min: '5000', max: '10000' },
        'R$ 10.000 - R$ 20.000': { min: '10000', max: '20000' },
        'Acima de R$ 20.000': { min: '20000' }
      }
      
      const range = priceRanges[newFilters.priceRange]
      if (range) {
        if (range.min) searchFilters.minPrice = range.min
        if (range.max) searchFilters.maxPrice = range.max
      }
    }

    await search(searchFilters)

    if (onFilter) {
      onFilter(newFilters)
    }
  }

  const clearFilters = async () => {
    const clearedFilters = {
      category: '',
      priceRange: '',
      brand: '',
      rating: '',
      inStock: false
    }
    setFilters(clearedFilters)
    
    // Clear search
    await search({
      query: searchQuery,
      sortBy: 'name',
      sortOrder: 'asc'
    })
    
    if (onFilter) {
      onFilter(clearedFilters)
    }
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== false
  )

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={placeholder}
              className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-cyber-500/30 rounded-xl text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20"
            />
          </div>
          
          <Button
            onClick={handleSearch}
            className="px-6 py-3 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
          >
            Buscar
          </Button>
          
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className={`px-4 py-3 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue ${
              hasActiveFilters ? 'border-neon-blue text-neon-blue' : ''
            }`}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filtros
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-neon-blue rounded-full"></span>
            )}
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-6 bg-dark-800/50 border border-cyber-500/30 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Filtros</h3>
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="text-cyber-400 hover:text-neon-blue"
            >
              <X className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-cyber-300 text-sm mb-2">Categoria</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-cyber-300 text-sm mb-2">Marca</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-cyber-300 text-sm mb-2">Faixa de Preço</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-cyber-300 text-sm mb-2">Avaliação</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stock Filter */}
          <div className="mt-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue focus:ring-2"
              />
              <span className="text-cyber-300">Apenas produtos em estoque</span>
            </label>
          </div>
        </motion.div>
      )}
    </div>
  )
}
