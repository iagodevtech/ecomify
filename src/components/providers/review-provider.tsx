'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth-provider'
import { supabase } from '@/lib/supabase'

interface Review {
  id: string
  user_id: string
  product_id: string
  rating: number
  title: string
  comment: string
  helpful_count: number
  created_at: string
  updated_at: string
  user: {
    name: string
    avatar_url?: string
  }
}

interface ReviewContextType {
  reviews: Review[]
  loading: boolean
  createReview: (productId: string, rating: number, title: string, comment: string) => Promise<{ success: boolean; error?: string }>
  updateReview: (reviewId: string, rating: number, title: string, comment: string) => Promise<{ success: boolean; error?: string }>
  deleteReview: (reviewId: string) => Promise<{ success: boolean; error?: string }>
  markHelpful: (reviewId: string) => Promise<{ success: boolean; error?: string }>
  getProductReviews: (productId: string) => Promise<Review[]>
  getUserReview: (productId: string) => Promise<Review | null>
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const createReview = async (
    productId: string, 
    rating: number, 
    title: string, 
    comment: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    try {
      setLoading(true)
      const now = new Date().toISOString()

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          product_id: productId,
          rating,
          title,
          comment,
          helpful_count: 0,
          created_at: now,
          updated_at: now
        })
        .select(`
          *,
          user:profiles(name, avatar_url)
        `)
        .single()

      if (error) throw error

      setReviews(prev => [data, ...prev])
      return { success: true }
    } catch (error) {
      console.error('Error creating review:', error)
      return { success: false, error: 'Erro ao criar avaliação' }
    } finally {
      setLoading(false)
    }
  }

  const updateReview = async (
    reviewId: string, 
    rating: number, 
    title: string, 
    comment: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      const now = new Date().toISOString()

      const { data, error } = await supabase
        .from('reviews')
        .update({
          rating,
          title,
          comment,
          updated_at: now
        })
        .eq('id', reviewId)
        .select(`
          *,
          user:profiles(name, avatar_url)
        `)
        .single()

      if (error) throw error

      setReviews(prev => prev.map(review => 
        review.id === reviewId ? data : review
      ))
      return { success: true }
    } catch (error) {
      console.error('Error updating review:', error)
      return { success: false, error: 'Erro ao atualizar avaliação' }
    } finally {
      setLoading(false)
    }
  }

  const deleteReview = async (reviewId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)

      if (error) throw error

      setReviews(prev => prev.filter(review => review.id !== reviewId))
      return { success: true }
    } catch (error) {
      console.error('Error deleting review:', error)
      return { success: false, error: 'Erro ao excluir avaliação' }
    } finally {
      setLoading(false)
    }
  }

  const markHelpful = async (reviewId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('reviews')
        .update({
          helpful_count: supabase.raw('helpful_count + 1')
        })
        .eq('id', reviewId)
        .select()
        .single()

      if (error) throw error

      setReviews(prev => prev.map(review => 
        review.id === reviewId ? { ...review, helpful_count: review.helpful_count + 1 } : review
      ))
      return { success: true }
    } catch (error) {
      console.error('Error marking review as helpful:', error)
      return { success: false, error: 'Erro ao marcar como útil' }
    } finally {
      setLoading(false)
    }
  }

  const getProductReviews = async (productId: string): Promise<Review[]> => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          user:profiles(name, avatar_url)
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error getting product reviews:', error)
      return []
    }
  }

  const getUserReview = async (productId: string): Promise<Review | null> => {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          user:profiles(name, avatar_url)
        `)
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      return data || null
    } catch (error) {
      console.error('Error getting user review:', error)
      return null
    }
  }

  const value = {
    reviews,
    loading,
    createReview,
    updateReview,
    deleteReview,
    markHelpful,
    getProductReviews,
    getUserReview,
  }

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider')
  }
  return context
}
