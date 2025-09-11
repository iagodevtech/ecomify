'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SortAsc, 
  SortDesc,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowLeft
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WishlistButton } from '@/components/ui/wishlist-button'
import { useProductSearch } from '@/hooks/use-product-search'
import { useCart } from '@/components/providers'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

export default function BuscaPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  const { 
    products, 
    loading, 
    error, 
    pagination, 
    search, 
    loadMore, 
    hasMore 
  } = useProductSearch()

  const { addItem } = useCart()

  // Get initial search query from URL
  const initialQuery = searchParams.get('q') || ''

  useEffect(() => {
    if (initialQuery) {
      search({ query: initialQuery })
    }
  }, [initialQuery, search])

  const handleSort = async (newSortBy: string) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
    
    await search({
      query: initialQuery,
      sortBy: newSortBy,
      sortOrder: newSortOrder
    })
  }

  const handleAddToCart = (product: any) => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      brand: product.brand
    })
  }

  const ProductCard = ({ product }: { product: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 group"
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-3 left-3">
          {product.isNew && (
            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
              Novo
            </Badge>
          )}
          {product.discount > 0 && (
            <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30 ml-2">
              -{product.discount}%
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <WishlistButton product={product} size="sm" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-cyber-400 text-sm">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-neon-yellow fill-current" />
            <span className="text-cyber-300 text-sm">{product.rating}</span>
            <span className="text-cyber-500 text-sm">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-neon-green font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-cyber-500 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => handleAddToCart(product)}
            className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <Link href={`/produto/${product.slug}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Resultados da Busca
            </h1>
            {initialQuery && (
              <p className="text-cyber-300">
                Resultados para: <span className="text-neon-blue font-semibold">"{initialQuery}"</span>
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <span className="text-cyber-300">
              {pagination.total} produtos encontrados
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-cyber-300 text-sm">Ordenar por:</span>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-')
                  handleSort(newSortBy)
                }}
                className="px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Preço (Menor)</option>
                <option value="price-desc">Preço (Maior)</option>
                <option value="rating-desc">Avaliação</option>
                <option value="newest-desc">Mais Recentes</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-neon-blue text-white' : 'border-cyber-500 text-cyber-400'}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-neon-blue text-white' : 'border-cyber-500 text-cyber-400'}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {loading && !products.length ? (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-cyber-300">Buscando produtos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">{error}</p>
            <Button
              onClick={() => search({ query: initialQuery })}
              className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
            >
              Tentar Novamente
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-cyber-400 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button
              asChild
              className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  {loading ? 'Carregando...' : 'Carregar Mais'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}