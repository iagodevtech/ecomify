'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth-provider'
import { supabase } from '@/lib/supabase'

interface WishlistItem {
  id: string
  product_id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  slug: string
  addedDate: string
}

interface WishlistContextType {
  items: WishlistItem[]
  itemCount: number
  addItem: (product: Omit<WishlistItem, 'id' | 'addedDate'>) => Promise<{ success: boolean; message: string }>
  removeItem: (productId: string) => Promise<{ success: boolean; message: string }>
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => Promise<void>
  loading: boolean
  syncWishlist: () => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const itemCount = items.length

  // Load wishlist from database when user logs in
  useEffect(() => {
    if (user) {
      loadWishlistFromDatabase()
    } else {
      setItems([])
    }
  }, [user])

  const loadWishlistFromDatabase = async () => {
    if (!user || !supabase) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          id,
          product_id,
          added_date,
          products (
            name,
            price,
            original_price,
            images,
            brand,
            slug
          )
        `)
        .eq('user_id', user.id)
        .order('added_date', { ascending: false })

      if (error) throw error

      if (data) {
        const wishlistItems = data.map(item => ({
          id: item.id,
          product_id: item.product_id,
          name: item.products.name,
          price: item.products.price,
          originalPrice: item.products.original_price,
          image: Array.isArray(item.products.images) ? item.products.images[0] : item.products.images,
          brand: item.products.brand,
          slug: item.products.slug,
          addedDate: item.added_date
        }))
        setItems(wishlistItems)
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (product: Omit<WishlistItem, 'id' | 'addedDate'>): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'Você precisa estar logado para adicionar aos favoritos' }
    }

    // Check if item already exists
    if (isInWishlist(product.product_id)) {
      return { success: false, message: 'Produto já está na sua lista de desejos' }
    }

    try {
      setLoading(true)
      
      if (supabase) {
        const { error } = await supabase
          .from('wishlist')
          .insert({
            user_id: user.id,
            product_id: product.product_id
          })

        if (error) throw error
      }

      // Add to local state
      const newItem: WishlistItem = {
        ...product,
        id: `${user.id}-${product.product_id}`,
        addedDate: new Date().toISOString()
      }
      setItems(prev => [newItem, ...prev])

      return { success: true, message: 'Produto adicionado aos favoritos!' }
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      return { success: false, message: 'Erro ao adicionar aos favoritos' }
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'Você precisa estar logado' }
    }

    try {
      setLoading(true)
      
      if (supabase) {
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId)

        if (error) throw error
      }

      // Remove from local state
      setItems(prev => prev.filter(item => item.product_id !== productId))

      return { success: true, message: 'Produto removido dos favoritos' }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      return { success: false, message: 'Erro ao remover dos favoritos' }
    } finally {
      setLoading(false)
    }
  }

  const isInWishlist = (productId: string): boolean => {
    return items.some(item => item.product_id === productId)
  }

  const clearWishlist = async (): Promise<void> => {
    if (!user) return

    try {
      setLoading(true)
      
      if (supabase) {
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)

        if (error) throw error
      }

      setItems([])
    } catch (error) {
      console.error('Error clearing wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const syncWishlist = async (): Promise<void> => {
    if (!user) return
    await loadWishlistFromDatabase()
  }

  const value = {
    items,
    itemCount,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    loading,
    syncWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
