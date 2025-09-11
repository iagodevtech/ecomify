'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  TrendingUp, 
  Heart, 
  ShoppingCart,
  Star,
  Zap,
  Eye,
  Clock,
  Target,
  Brain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/components/providers'

interface Recommendation {
  id: string
  product: any
  reason: string
  confidence: number
  type: 'trending' | 'personalized' | 'similar' | 'complementary' | 'seasonal'
  metadata?: any
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'personalized' | 'trending' | 'similar'>('personalized')
  const { addItem } = useCart()

  // Simulate AI-powered recommendations
  useEffect(() => {
    const generateRecommendations = async () => {
      setLoading(true)
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500))

      const allRecommendations: Recommendation[] = []

      // Personalized recommendations (based on user behavior)
      const personalizedProducts = products
        .filter(p => p.isFeatured || p.rating >= 4.5)
        .slice(0, 6)
        .map((product, index) => ({
          id: `personalized-${product.id}`,
          product,
          reason: [
            'Baseado no seu histórico de compras',
            'Produtos similares aos seus favoritos',
            'Recomendado para seu perfil de usuário',
            'Produtos populares na sua região',
            'Baseado nas suas visualizações recentes',
            'Produtos com alta avaliação'
          ][index],
          confidence: Math.random() * 0.3 + 0.7, // 70-100%
          type: 'personalized' as const,
          metadata: {
            algorithm: 'collaborative_filtering',
            userSegment: 'tech_enthusiast'
          }
        }))

      // Trending recommendations
      const trendingProducts = products
        .filter(p => p.category === 'smartphones' || p.category === 'laptops')
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 4)
        .map((product, index) => ({
          id: `trending-${product.id}`,
          product,
          reason: [
            'Tendência em alta este mês',
            'Produto mais vendido da semana',
            'Novidade que está bombando',
            'Escolha dos especialistas'
          ][index],
          confidence: Math.random() * 0.2 + 0.8, // 80-100%
          type: 'trending' as const,
          metadata: {
            algorithm: 'trend_analysis',
            popularityScore: Math.random() * 100
          }
        }))

      // Similar products
      const similarProducts = products
        .filter(p => p.category === 'audio' || p.category === 'gaming')
        .slice(0, 4)
        .map((product, index) => ({
          id: `similar-${product.id}`,
          product,
          reason: [
            'Similar aos produtos que você viu',
            'Outros clientes também compraram',
            'Produto complementar recomendado',
            'Baseado no seu interesse em gaming'
          ][index],
          confidence: Math.random() * 0.25 + 0.75, // 75-100%
          type: 'similar' as const,
          metadata: {
            algorithm: 'content_based',
            similarityScore: Math.random() * 100
          }
        }))

      allRecommendations.push(...personalizedProducts, ...trendingProducts, ...similarProducts)
      
      setRecommendations(allRecommendations)
      setLoading(false)
    }

    generateRecommendations()
  }, [])

  const getRecommendationsByType = (type: string) => {
    return recommendations.filter(rec => rec.type === type)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-neon-green'
    if (confidence >= 0.8) return 'text-neon-blue'
    if (confidence >= 0.7) return 'text-neon-yellow'
    return 'text-cyber-400'
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return 'Muito Alta'
    if (confidence >= 0.8) return 'Alta'
    if (confidence >= 0.7) return 'Média'
    return 'Baixa'
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

  const tabs = [
    { id: 'personalized', name: 'Para Você', icon: Brain, count: getRecommendationsByType('personalized').length },
    { id: 'trending', name: 'Em Alta', icon: TrendingUp, count: getRecommendationsByType('trending').length },
    { id: 'similar', name: 'Similares', icon: Target, count: getRecommendationsByType('similar').length }
  ]

  if (loading) {
    return (
      <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Recomendações IA</h2>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto border-2 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin mb-4" />
          <p className="text-cyber-400">Analisando seus dados com IA...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Recomendações IA</h2>
            <p className="text-cyber-400">Personalizadas para você</p>
          </div>
        </div>
        
        <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
          <Brain className="w-3 h-3 mr-1" />
          IA Ativa
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
            <Badge className="bg-cyber-700 text-cyber-300 text-xs">
              {tab.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getRecommendationsByType(activeTab).map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-700/50 backdrop-blur-sm border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all group"
          >
            {/* Product Image */}
            <div className="w-full h-48 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <p className="text-cyber-400 text-sm">Imagem do Produto</p>
              </div>
              
              {/* AI Badge */}
              <div className="absolute top-2 left-2">
                <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                  <Sparkles className="w-3 h-3 mr-1" />
                  IA
                </Badge>
              </div>
              
              {/* Confidence Score */}
              <div className="absolute top-2 right-2">
                <div className={`px-2 py-1 rounded-lg bg-dark-800/80 backdrop-blur-sm ${getConfidenceColor(rec.confidence)}`}>
                  <span className="text-xs font-bold">
                    {Math.round(rec.confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-white font-bold text-lg line-clamp-2 mb-1">
                  {rec.product.name}
                </h3>
                <p className="text-cyber-400 text-sm">{rec.product.brand}</p>
              </div>

              {/* AI Reason */}
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-4 h-4 text-neon-blue" />
                  <span className="text-neon-blue text-sm font-medium">Por que recomendamos:</span>
                </div>
                <p className="text-cyber-300 text-sm">{rec.reason}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rec.product.rating)
                          ? 'text-neon-yellow fill-current'
                          : 'text-cyber-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-cyber-400 text-sm">
                  {rec.product.rating} ({rec.product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl">
                  {formatPrice(rec.product.price)}
                </span>
                {rec.product.originalPrice && (
                  <span className="text-cyber-500 text-sm line-through">
                    {formatPrice(rec.product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(rec.product)}
                  className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-cyber-500/30 text-cyber-400 hover:text-neon-pink"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-cyber-500/30 text-cyber-400 hover:text-neon-blue"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>

              {/* Confidence Details */}
              <div className="pt-3 border-t border-cyber-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyber-400">Confiança:</span>
                  <span className={`font-medium ${getConfidenceColor(rec.confidence)}`}>
                    {getConfidenceText(rec.confidence)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-cyber-400">Algoritmo:</span>
                  <span className="text-cyber-300">
                    {rec.metadata?.algorithm?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="mt-8 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-neon-blue" />
          <h3 className="text-xl font-bold text-white">Insights da IA</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-neon-blue/20 rounded-full flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-neon-blue" />
            </div>
            <h4 className="text-white font-bold mb-1">Tendências</h4>
            <p className="text-cyber-400 text-sm">
              Produtos de tecnologia estão em alta este mês
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-neon-green/20 rounded-full flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-neon-green" />
            </div>
            <h4 className="text-white font-bold mb-1">Personalização</h4>
            <p className="text-cyber-400 text-sm">
              Baseado no seu perfil de usuário tech-savvy
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-neon-purple/20 rounded-full flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-neon-purple" />
            </div>
            <h4 className="text-white font-bold mb-1">Tempo Real</h4>
            <p className="text-cyber-400 text-sm">
              Recomendações atualizadas a cada interação
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
