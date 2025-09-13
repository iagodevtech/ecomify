'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth-provider'
import { supabase } from '@/lib/supabase'

interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  total: number
  subtotal: number
  shipping: number
  discount: number
  addItem: (product: Omit<CartItem, 'id' | 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  loading: boolean
  syncCart: () => Promise<void>
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>
  removeCoupon: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const { user } = useAuth()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 5000 ? 0 : 150 // Frete grátis acima de R$ 50
  const total = subtotal + shipping - discount

  // Load cart from localStorage or database
  useEffect(() => {
    if (user) {
      loadCartFromDatabase()
    } else {
      loadCartFromLocalStorage()
    }
  }, [user])

  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('ecomify-cart')
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
  }

  const loadCartFromDatabase = async () => {
    if (!user) return

    setLoading(true)
    try {
      // For now, we'll use localStorage even for logged-in users
      // In a real app, you'd sync with the database
      loadCartFromLocalStorage()
    } catch (error) {
      console.error('Error loading cart from database:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem('ecomify-cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }

  const addItem = (product: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product_id === product.product_id)
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...prevItems, { ...product, id: Date.now().toString(), quantity: 1 }]
      }

      saveCartToLocalStorage(newItems)
      return newItems
    })
  }

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.product_id !== productId)
      saveCartToLocalStorage(newItems)
      return newItems
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      )
      saveCartToLocalStorage(newItems)
      return newItems
    })
  }

  const clearCart = () => {
    setItems([])
    setDiscount(0)
    setAppliedCoupon(null)
    saveCartToLocalStorage([])
  }

  const syncCart = async () => {
    if (!user || !supabase) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error

      if (data) {
        setItems(data.map(item => ({
          id: item.id,
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          brand: item.brand
        })))
      }
    } catch (error) {
      console.error('Error syncing cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          userId: user?.id,
          subtotal
        })
      })

      const data = await response.json()

      if (data.valid) {
        setDiscount(data.discount)
        setAppliedCoupon(code)
        return { success: true, message: 'Cupom aplicado com sucesso!' }
      } else {
        return { success: false, message: data.message || 'Cupom inválido' }
      }
    } catch (error) {
      return { success: false, message: 'Erro ao validar cupom' }
    }
  }

  const removeCoupon = () => {
    setDiscount(0)
    setAppliedCoupon(null)
  }

  const value = {
    items,
    itemCount,
    total,
    subtotal,
    shipping,
    discount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loading,
    syncCart,
    applyCoupon,
    removeCoupon,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
