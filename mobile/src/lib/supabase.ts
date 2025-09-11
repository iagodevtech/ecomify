import { createClient } from '@supabase/supabase-js';

// Use default values if environment variables are not set
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: {
      getItem: async (key: string) => {
        try {
          const { getItemAsync } = await import('@react-native-async-storage/async-storage');
          return await getItemAsync(key);
        } catch (error) {
          console.error('Error getting item from storage:', error);
          return null;
        }
      },
      setItem: async (key: string, value: string) => {
        try {
          const { setItemAsync } = await import('@react-native-async-storage/async-storage');
          await setItemAsync(key, value);
        } catch (error) {
          console.error('Error setting item in storage:', error);
        }
      },
      removeItem: async (key: string) => {
        try {
          const { removeItemAsync } = await import('@react-native-async-storage/async-storage');
          await removeItemAsync(key);
        } catch (error) {
          console.error('Error removing item from storage:', error);
        }
      },
    },
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string;
          phone?: string;
          birth_date?: string;
          gender?: 'male' | 'female' | 'other';
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string;
          phone?: string;
          birth_date?: string;
          gender?: 'male' | 'female' | 'other';
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          phone?: string;
          birth_date?: string;
          gender?: 'male' | 'female' | 'other';
          preferences?: any;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          price: number;
          original_price?: number;
          discount?: number;
          images: any[];
          category_id: string;
          subcategory?: string;
          brand: string;
          sku: string;
          stock: number;
          is_digital: boolean;
          is_active: boolean;
          is_featured: boolean;
          tags: string[];
          specifications: any[];
          rating: number;
          review_count: number;
          variants?: any[];
          related_products: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          price: number;
          original_price?: number;
          discount?: number;
          images?: any[];
          category_id: string;
          subcategory?: string;
          brand: string;
          sku: string;
          stock: number;
          is_digital?: boolean;
          is_active?: boolean;
          is_featured?: boolean;
          tags?: string[];
          specifications?: any[];
          rating?: number;
          review_count?: number;
          variants?: any[];
          related_products?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          short_description?: string;
          price?: number;
          original_price?: number;
          discount?: number;
          images?: any[];
          category_id?: string;
          subcategory?: string;
          brand?: string;
          sku?: string;
          stock?: number;
          is_digital?: boolean;
          is_active?: boolean;
          is_featured?: boolean;
          tags?: string[];
          specifications?: any[];
          rating?: number;
          review_count?: number;
          variants?: any[];
          related_products?: string[];
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id?: string;
          session_id?: string;
          product_id: string;
          quantity: number;
          variant?: any;
          price: number;
          added_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          session_id?: string;
          product_id: string;
          quantity: number;
          variant?: any;
          price: number;
          added_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_id?: string;
          product_id?: string;
          quantity?: number;
          variant?: any;
          price?: number;
          added_at?: string;
        };
      };
    };
  };
}
