'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth-provider'
import { supabase } from '@/lib/supabase'

interface OrderItem {
  id: string
  product_id: string
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

interface Order {
  id: string
  order_number: string
  user_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: string
  subtotal: number
  shipping: number
  discount: number
  total: number
  shipping_address: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  billing_address?: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  items: OrderItem[]
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

interface OrderContextType {
  orders: Order[]
  currentOrder: Order | null
  loading: boolean
  createOrder: (orderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>) => Promise<{ success: boolean; order?: Order; error?: string }>
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<{ success: boolean; error?: string }>
  getOrder: (orderId: string) => Promise<Order | null>
  getOrdersByUser: () => Promise<Order[]>
  syncOrders: () => Promise<void>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Load orders when user logs in
  useEffect(() => {
    if (user) {
      syncOrders()
    } else {
      setOrders([])
      setCurrentOrder(null)
    }
  }, [user])

  const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    return `ECO-${timestamp}-${random}`.toUpperCase()
  }

  const createOrder = async (orderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; order?: Order; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    try {
      setLoading(true)
      const orderNumber = generateOrderNumber()
      const now = new Date().toISOString()

      // Create order in database
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          status: orderData.status,
          payment_status: orderData.payment_status,
          payment_method: orderData.payment_method,
          subtotal: orderData.subtotal,
          shipping: orderData.shipping,
          discount: orderData.discount,
          total: orderData.total,
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address,
          notes: orderData.notes,
          created_at: now,
          updated_at: now
        })
        .select()
        .single()

      if (error) throw error

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        brand: item.brand
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Get complete order with items
      const completeOrder = await getOrder(order.id)
      if (completeOrder) {
        setOrders(prev => [completeOrder, ...prev])
        setCurrentOrder(completeOrder)
      }

      return { success: true, order: completeOrder || undefined }
    } catch (error) {
      console.error('Error creating order:', error)
      return { success: false, error: 'Erro ao criar pedido' }
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) throw error

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status, updated_at: new Date().toISOString() }
          : order
      ))

      if (currentOrder?.id === orderId) {
        setCurrentOrder(prev => prev ? { ...prev, status, updated_at: new Date().toISOString() } : null)
      }

      return { success: true }
    } catch (error) {
      console.error('Error updating order status:', error)
      return { success: false, error: 'Erro ao atualizar status do pedido' }
    } finally {
      setLoading(false)
    }
  }

  const getOrder = async (orderId: string): Promise<Order | null> => {
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            name,
            price,
            quantity,
            image,
            brand
          )
        `)
        .eq('id', orderId)
        .single()

      if (error) throw error

      return {
        ...order,
        items: order.order_items || []
      }
    } catch (error) {
      console.error('Error getting order:', error)
      return null
    }
  }

  const getOrdersByUser = async (): Promise<Order[]> => {
    if (!user) return []

    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            name,
            price,
            quantity,
            image,
            brand
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return orders.map(order => ({
        ...order,
        items: order.order_items || []
      }))
    } catch (error) {
      console.error('Error getting orders:', error)
      return []
    }
  }

  const syncOrders = async (): Promise<void> => {
    if (!user) return

    try {
      setLoading(true)
      const userOrders = await getOrdersByUser()
      setOrders(userOrders)
    } catch (error) {
      console.error('Error syncing orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    orders,
    currentOrder,
    loading,
    createOrder,
    updateOrderStatus,
    getOrder,
    getOrdersByUser,
    syncOrders,
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
