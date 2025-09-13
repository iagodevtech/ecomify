import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'SUA_URL_DO_SUPABASE_AQUI' && 
  supabaseAnonKey !== 'SUA_CHAVE_ANONIMA_AQUI' &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.startsWith('eyJ')

// Only create client if environment variables are properly configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => !!supabase

// Helper function to get Supabase client with error handling
export const getSupabaseClient = () => {
  if (!supabase) {
    console.warn('Supabase não está configurado. Verifique as variáveis de ambiente.')
    return null
  }
  return supabase
}

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          original_price: number | null
          category: string
          brand: string
          images: string[]
          specifications: Record<string, any>
          stock: number
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          original_price?: number | null
          category: string
          brand: string
          images: string[]
          specifications?: Record<string, any>
          stock?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          original_price?: number | null
          category?: string
          brand?: string
          images?: string[]
          specifications?: Record<string, any>
          stock?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Record<string, any>
          billing_address: Record<string, any>
          payment_method: string
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          tracking_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Record<string, any>
          billing_address: Record<string, any>
          payment_method: string
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          tracking_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total?: number
          shipping_address?: Record<string, any>
          billing_address?: Record<string, any>
          payment_method?: string
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          tracking_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          product_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      price_alerts: {
        Row: {
          id: string
          user_id: string
          product_id: string
          target_price: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          target_price: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          target_price?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'order' | 'promotion' | 'reminder' | 'security' | 'recommendation' | 'system'
          title: string
          message: string
          is_read: boolean
          metadata: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'order' | 'promotion' | 'reminder' | 'security' | 'recommendation' | 'system'
          title: string
          message: string
          is_read?: boolean
          metadata?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'order' | 'promotion' | 'reminder' | 'security' | 'recommendation' | 'system'
          title?: string
          message?: string
          is_read?: boolean
          metadata?: Record<string, any> | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}