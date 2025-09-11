'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/providers'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  brand: string
  category: string
  rating: number
  reviewCount: number
  stockQuantity: number
  isFeatured: boolean
  isNew: boolean
  createdAt: string
  discount: number
}

interface RecommendationResult {
  recommendations: Product[]
  type: string
  count: number
}

interface UseRecommendationsReturn {
  recommendations: Product[]
  loading: boolean
  error: string | null
  getUserRecommendations: () => Promise<void>
  getProductRecommendations: (productId: string) => Promise<void>
  getTrendingRecommendations: () => Promise<void>
  getSimilarProducts: (productId: string) => Promise<void>
  refreshRecommendations: () => Promise<void>
}

export function useRecommendations(): UseRecommendationsReturn {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentType, setCurrentType] = useState<string>('general')
  const { user } = useAuth()

  const fetchRecommendations = useCallback(async (
    type: string, 
    productId?: string, 
    limit: number = 10
  ) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        type,
        limit: limit.toString()
      })

      if (user) {
        params.set('userId', user.id)
      }

      if (productId) {
        params.set('productId', productId)
      }

      const response = await fetch(`/api/recommendations?${params}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar recomendações')
      }

      const data: RecommendationResult = await response.json()
      
      setRecommendations(data.recommendations)
      setCurrentType(data.type)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar recomendações')
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }, [user])

  const getUserRecommendations = useCallback(async () => {
    await fetchRecommendations('user-based')
  }, [fetchRecommendations])

  const getProductRecommendations = useCallback(async (productId: string) => {
    await fetchRecommendations('product-based', productId)
  }, [fetchRecommendations])

  const getTrendingRecommendations = useCallback(async () => {
    await fetchRecommendations('trending')
  }, [fetchRecommendations])

  const getSimilarProducts = useCallback(async (productId: string) => {
    await fetchRecommendations('similar', productId)
  }, [fetchRecommendations])

  const refreshRecommendations = useCallback(async () => {
    await fetchRecommendations(currentType)
  }, [fetchRecommendations, currentType])

  // Load initial recommendations
  useEffect(() => {
    if (user) {
      getUserRecommendations()
    } else {
      getTrendingRecommendations()
    }
  }, [user, getUserRecommendations, getTrendingRecommendations])

  return {
    recommendations,
    loading,
    error,
    getUserRecommendations,
    getProductRecommendations,
    getTrendingRecommendations,
    getSimilarProducts,
    refreshRecommendations
  }
}
