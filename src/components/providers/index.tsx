'use client'

import React from 'react'
import { AuthProvider } from './auth-provider'
import { CartProvider } from './cart-provider'
import { WishlistProvider } from './wishlist-provider'
import { OrderProvider } from './order-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            {children}
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

// Re-export hooks for convenience
export { useAuth } from './auth-provider'
export { useCart } from './cart-provider'
export { useWishlist } from './wishlist-provider'
export { useOrders } from './order-provider'
