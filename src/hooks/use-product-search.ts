'use client'

import { useState, useEffect, useCallback } from 'react'

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

interface SearchFilters {
  query?: string
  category?: string
  brand?: string
  minPrice?: string
  maxPrice?: string
  rating?: string
  inStock?: boolean
  sortBy?: string
  sortOrder?: string
}

interface SearchResult {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: SearchFilters
}

interface UseProductSearchReturn {
  products: Product[]
  loading: boolean
  error: string | null
  pagination: SearchResult['pagination']
  filters: SearchFilters
  search: (filters: SearchFilters) => Promise<void>
  loadMore: () => Promise<void>
  hasMore: boolean
  clearSearch: () => void
}

export function useProductSearch(): UseProductSearchReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<SearchResult['pagination']>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  })
  const [filters, setFilters] = useState<SearchFilters>({})
  const [hasMore, setHasMore] = useState(false)

  const buildSearchParams = useCallback((searchFilters: SearchFilters, page: number = 1) => {
    const params = new URLSearchParams()
    
    if (searchFilters.query) params.set('q', searchFilters.query)
    if (searchFilters.category) params.set('category', searchFilters.category)
    if (searchFilters.brand) params.set('brand', searchFilters.brand)
    if (searchFilters.minPrice) params.set('minPrice', searchFilters.minPrice)
    if (searchFilters.maxPrice) params.set('maxPrice', searchFilters.maxPrice)
    if (searchFilters.rating) params.set('rating', searchFilters.rating)
    if (searchFilters.inStock) params.set('inStock', 'true')
    if (searchFilters.sortBy) params.set('sortBy', searchFilters.sortBy)
    if (searchFilters.sortOrder) params.set('sortOrder', searchFilters.sortOrder)
    
    params.set('page', page.toString())
    params.set('limit', '12')
    
    return params.toString()
  }, [])

  const search = useCallback(async (searchFilters: SearchFilters) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = buildSearchParams(searchFilters, 1)
      const response = await fetch(`/api/products/search?${params}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos')
      }
      
      const data: SearchResult = await response.json()
      
      setProducts(data.products)
      setPagination(data.pagination)
      setFilters(searchFilters)
      setHasMore(data.pagination.page < data.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar produtos')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [buildSearchParams])

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return

    try {
      setLoading(true)
      
      const nextPage = pagination.page + 1
      const params = buildSearchParams(filters, nextPage)
      const response = await fetch(`/api/products/search?${params}`)
      
      if (!response.ok) {
        throw new Error('Erro ao carregar mais produtos')
      }
      
      const data: SearchResult = await response.json()
      
      setProducts(prev => [...prev, ...data.products])
      setPagination(data.pagination)
      setHasMore(data.pagination.page < data.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar mais produtos')
    } finally {
      setLoading(false)
    }
  }, [hasMore, loading, pagination.page, filters, buildSearchParams])

  const clearSearch = useCallback(() => {
    setProducts([])
    setPagination({
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0
    })
    setFilters({})
    setHasMore(false)
    setError(null)
  }, [])

  return {
    products,
    loading,
    error,
    pagination,
    filters,
    search,
    loadMore,
    hasMore,
    clearSearch
  }
}
