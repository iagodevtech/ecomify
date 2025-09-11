'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WishlistButton } from '@/components/ui/wishlist-button'
import { useRecommendations } from '@/hooks/use-recommendations'
import { useCart } from '@/components/providers'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

interface RecommendationSectionProps {
  title?: string
  type?: 'user' | 'trending' | 'similar' | 'product'
  productId?: string
  limit?: number
  showHeader?: boolean
  className?: string
}

export function RecommendationSection({ 
  title,
  type = 'trending',
  productId,
  limit = 8,
  showHeader = true,
  className = ''
}: RecommendationSectionProps) {
  const [activeTab, setActiveTab] = useState(type)
  const { 
    recommendations, 
    loading, 
    error, 
    getUserRecommendations,
    getProductRecommendations,
    getTrendingRecommendations,
    getSimilarProducts,
    refreshRecommendations
  } = useRecommendations()
  
  const { addItem } = useCart()

  const tabs = [
    { id: 'trending', label: 'Em Alta', icon: TrendingUp },
    { id: 'user', label: 'Para Você', icon: Users },
    { id: 'similar', label: 'Similares', icon: Sparkles }
  ]

  const handleTabChange = async (tabId: string) => {
    setActiveTab(tabId)
    
    switch (tabId) {
      case 'user':
        await getUserRecommendations()
        break
      case 'trending':
        await getTrendingRecommendations()
        break
      case 'similar':
        if (productId) {
          await getSimilarProducts(productId)
        }
        break
    }
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

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-400 mb-4">{error}</p>
        <Button
          onClick={refreshRecommendations}
          variant="outline"
          className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      {showHeader && (
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {title || 'Recomendados para Você'}
            </h2>
            <p className="text-cyber-400">
              Produtos selecionados especialmente para você
            </p>
          </div>
          
          <Button
            onClick={refreshRecommendations}
            variant="outline"
            size="sm"
            className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                : 'text-cyber-400 hover:text-neon-blue hover:bg-cyber-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <div
              key={index}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-4 animate-pulse"
            >
              <div className="aspect-square bg-cyber-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-cyber-700 rounded mb-2"></div>
              <div className="h-4 bg-cyber-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-cyber-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhuma recomendação encontrada
          </h3>
          <p className="text-cyber-400 mb-6">
            Tente atualizar ou explore outros produtos
          </p>
          <Button
            onClick={refreshRecommendations}
            className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Recomendações
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {recommendations.slice(0, limit).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}

      {/* View More Button */}
      {recommendations.length > limit && (
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <Link href="/produtos">
              Ver Mais Produtos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
