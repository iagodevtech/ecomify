import { createClient } from '@supabase/supabase-js'

// Use default values if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Client component client (same as main client for now)
export const createClientSupabase = () => supabase

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url?: string
          phone?: string
          birth_date?: string
          gender?: 'male' | 'female' | 'other'
          preferences: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar_url?: string
          phone?: string
          birth_date?: string
          gender?: 'male' | 'female' | 'other'
          preferences?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string
          phone?: string
          birth_date?: string
          gender?: 'male' | 'female' | 'other'
          preferences?: any
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          short_description: string
          price: number
          original_price?: number
          discount?: number
          images: any[]
          category_id: string
          subcategory?: string
          brand: string
          sku: string
          stock: number
          is_digital: boolean
          is_active: boolean
          is_featured: boolean
          tags: string[]
          specifications: any[]
          rating: number
          review_count: number
          variants?: any[]
          related_products: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          short_description: string
          price: number
          original_price?: number
          discount?: number
          images?: any[]
          category_id: string
          subcategory?: string
          brand: string
          sku: string
          stock: number
          is_digital?: boolean
          is_active?: boolean
          is_featured?: boolean
          tags?: string[]
          specifications?: any[]
          rating?: number
          review_count?: number
          variants?: any[]
          related_products?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          short_description?: string
          price?: number
          original_price?: number
          discount?: number
          images?: any[]
          category_id?: string
          subcategory?: string
          brand?: string
          sku?: string
          stock?: number
          is_digital?: boolean
          is_active?: boolean
          is_featured?: boolean
          tags?: string[]
          specifications?: any[]
          rating?: number
          review_count?: number
          variants?: any[]
          related_products?: string[]
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          image: string
          icon: string
          parent_id?: string
          is_active: boolean
          order: number
          product_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          image: string
          icon: string
          parent_id?: string
          is_active?: boolean
          order?: number
          product_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          image?: string
          icon?: string
          parent_id?: string
          is_active?: boolean
          order?: number
          product_count?: number
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id?: string
          session_id?: string
          product_id: string
          quantity: number
          variant?: any
          price: number
          added_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          session_id?: string
          product_id: string
          quantity: number
          variant?: any
          price: number
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string
          product_id?: string
          quantity?: number
          variant?: any
          price?: number
          added_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          order_number: string
          status: string
          items: any[]
          subtotal: number
          discount: number
          shipping: number
          tax: number
          total: number
          payment: any
          shipping_info: any
          tracking?: any
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          order_number: string
          status?: string
          items: any[]
          subtotal: number
          discount?: number
          shipping: number
          tax?: number
          total: number
          payment: any
          shipping_info: any
          tracking?: any
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          order_number?: string
          status?: string
          items?: any[]
          subtotal?: number
          discount?: number
          shipping?: number
          tax?: number
          total?: number
          payment?: any
          shipping_info?: any
          tracking?: any
          notes?: string
          updated_at?: string
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          name: string
          items: any[]
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          items?: any[]
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          items?: any[]
          is_public?: boolean
          updated_at?: string
        }
      }
      price_alerts: {
        Row: {
          id: string
          user_id: string
          product_id: string
          target_price: number
          current_price: number
          is_active: boolean
          notification_methods: string[]
          created_at: string
          triggered_at?: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          target_price: number
          current_price: number
          is_active?: boolean
          notification_methods?: string[]
          created_at?: string
          triggered_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          target_price?: number
          current_price?: number
          is_active?: boolean
          notification_methods?: string[]
          triggered_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          product_id: string
          rating: number
          title: string
          comment: string
          images?: string[]
          is_verified: boolean
          helpful: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          rating: number
          title: string
          comment: string
          images?: string[]
          is_verified?: boolean
          helpful?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          rating?: number
          title?: string
          comment?: string
          images?: string[]
          is_verified?: boolean
          helpful?: number
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          data?: any
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          data?: any
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          data?: any
          is_read?: boolean
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
