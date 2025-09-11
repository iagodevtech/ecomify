'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  X, 
  Mic, 
  Camera, 
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'

interface SearchResult {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  brand: string
  images: string[]
  rating: number
  reviewCount: number
  relevanceScore: number
  matchType: 'exact' | 'partial' | 'semantic' | 'ai'
}

export function AdvancedSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [trendingSearches, setTrendingSearches] = useState<string[]>([])
  const [voiceSearch, setVoiceSearch] = useState(false)
  const [imageSearch, setImageSearch] = useState(false)

  // Trending searches (simulated)
  useEffect(() => {
    setTrendingSearches([
      'iPhone 15 Pro Max',
      'MacBook Pro M3',
      'Sony WH-1000XM5',
      'NVIDIA RTX 4090',
      'Samsung Galaxy S24'
    ])
  }, [])

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ecomify-search-history')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    // Simulate AI-powered search with delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const searchResults: SearchResult[] = []
    const queryLower = searchQuery.toLowerCase()

    // Exact matches
    products.forEach(product => {
      if (product.name.toLowerCase().includes(queryLower) ||
          product.brand.toLowerCase().includes(queryLower) ||
          product.description.toLowerCase().includes(queryLower)) {
        
        let relevanceScore = 0
        let matchType: 'exact' | 'partial' | 'semantic' | 'ai' = 'partial'

        // Calculate relevance score
        if (product.name.toLowerCase().includes(queryLower)) {
          relevanceScore += 100
          matchType = 'exact'
        }
        if (product.brand.toLowerCase().includes(queryLower)) {
          relevanceScore += 80
        }
        if (product.description.toLowerCase().includes(queryLower)) {
          relevanceScore += 60
        }
        if (product.isFeatured) {
          relevanceScore += 20
        }
        if (product.rating >= 4.5) {
          relevanceScore += 15
        }

        // AI-powered semantic matching (simulated)
        const semanticMatches = [
          'smartphone', 'phone', 'celular',
          'laptop', 'notebook', 'computador',
          'headphone', 'fone', 'headset',
          'gaming', 'jogos', 'games',
          'camera', 'câmera', 'foto'
        ]

        semanticMatches.forEach(term => {
          if (queryLower.includes(term) && product.category.includes(term)) {
            relevanceScore += 30
            matchType = 'semantic'
          }
        })

        searchResults.push({
          ...product,
          relevanceScore,
          matchType
        })
      }
    })

    // Sort by relevance
    searchResults.sort((a, b) => b.relevanceScore - a.relevanceScore)

    setResults(searchResults.slice(0, 10))
    setIsSearching(false)

    // Save to search history
    if (!searchHistory.includes(searchQuery)) {
      const newHistory = [searchQuery, ...searchHistory].slice(0, 10)
      setSearchHistory(newHistory)
      localStorage.setItem('ecomify-search-history', JSON.stringify(newHistory))
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  const handleVoiceSearch = () => {
    setVoiceSearch(true)
    // Simulate voice recognition
    setTimeout(() => {
      setQuery('iPhone 15 Pro Max')
      setVoiceSearch(false)
      performSearch('iPhone 15 Pro Max')
    }, 2000)
  }

  const handleImageSearch = () => {
    setImageSearch(true)
    // Simulate image recognition
    setTimeout(() => {
      setQuery('MacBook Pro')
      setImageSearch(false)
      performSearch('MacBook Pro')
    }, 2000)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
  }

  return (
    <div className="relative">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Buscar produtos com IA..."
            className="w-full pl-12 pr-32 py-4 bg-dark-800/50 border border-cyber-500/30 rounded-2xl text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all text-lg"
          />
          
          {/* Action Buttons */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {query && (
              <Button
                type="button"
                onClick={clearSearch}
                size="icon"
                variant="ghost"
                className="w-8 h-8 text-cyber-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              type="button"
              onClick={handleVoiceSearch}
              size="icon"
              variant="ghost"
              className={`w-8 h-8 ${voiceSearch ? 'text-neon-blue' : 'text-cyber-500 hover:text-white'}`}
            >
              <Mic className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              onClick={handleImageSearch}
              size="icon"
              variant="ghost"
              className={`w-8 h-8 ${imageSearch ? 'text-neon-blue' : 'text-cyber-500 hover:text-white'}`}
            >
              <Camera className="w-4 h-4" />
            </Button>
            
            <Button
              type="submit"
              size="icon"
              className="w-8 h-8 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-dark-800/95 backdrop-blur-md border border-cyber-500/30 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {isSearching && (
              <div className="p-6 text-center">
                <div className="w-8 h-8 mx-auto border-2 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin mb-3" />
                <p className="text-cyber-400">Buscando com IA...</p>
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-neon-blue" />
                  <h3 className="text-white font-bold">Resultados da Busca IA</h3>
                  <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                    {results.length} encontrados
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {results.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-3 bg-cyber-800/30 rounded-lg hover:bg-cyber-700/30 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-cyber-500" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium">{result.name}</h4>
                          <Badge 
                            className={`text-xs ${
                              result.matchType === 'exact' ? 'bg-neon-green/20 text-neon-green' :
                              result.matchType === 'semantic' ? 'bg-neon-blue/20 text-neon-blue' :
                              'bg-cyber-500/20 text-cyber-400'
                            }`}
                          >
                            {result.matchType === 'exact' ? 'Exato' :
                             result.matchType === 'semantic' ? 'IA' : 'Parcial'}
                          </Badge>
                        </div>
                        <p className="text-cyber-400 text-sm">{result.brand}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white font-bold">{formatPrice(result.price)}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-neon-yellow fill-current" />
                            <span className="text-cyber-400 text-xs">{result.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {!isSearching && results.length === 0 && query && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-cyber-500" />
                </div>
                <h3 className="text-white font-bold mb-2">Nenhum resultado encontrado</h3>
                <p className="text-cyber-400 mb-4">
                  Tente usar termos diferentes ou use nossa busca por voz/imagem
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={handleVoiceSearch}
                    variant="outline"
                    className="border-cyber-500/30 text-cyber-400 hover:text-white"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Busca por Voz
                  </Button>
                  <Button
                    onClick={handleImageSearch}
                    variant="outline"
                    className="border-cyber-500/30 text-cyber-400 hover:text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Busca por Imagem
                  </Button>
                </div>
              </div>
            )}

            {!isSearching && !query && (
              <div className="p-6">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-cyber-500" />
                      <h3 className="text-white font-bold">Histórico</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.slice(0, 5).map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setQuery(term)
                            performSearch(term)
                          }}
                          className="px-3 py-1 bg-cyber-800/50 text-cyber-300 rounded-lg hover:bg-cyber-700/50 transition-all text-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-neon-blue" />
                    <h3 className="text-white font-bold">Em Alta</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term)
                          performSearch(term)
                        }}
                        className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-all text-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
