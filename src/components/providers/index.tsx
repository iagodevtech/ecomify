'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './auth-provider'
import { CartProvider } from './cart-provider'
import { WishlistProvider } from './wishlist-provider'
import { OrderProvider } from './order-provider'
import { NotificationProvider } from './notification-provider'
import { ReviewProvider } from './review-provider'
import { ThemeProvider } from './theme-provider'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <NotificationProvider>
                  <ReviewProvider>
                    {children}
                  </ReviewProvider>
                </NotificationProvider>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

// Re-export hooks for convenience
export { useAuth } from './auth-provider'
export { useCart } from './cart-provider'
export { useWishlist } from './wishlist-provider'
export { useOrders } from './order-provider'
export { useNotifications } from './notification-provider'
export { useReviews } from './review-provider'
export { useTheme } from './theme-provider'
