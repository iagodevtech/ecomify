'use client'

import React from 'react'
import { AuthProvider } from './auth-provider'
import { CartProvider } from './cart-provider'
import { WishlistProvider } from './wishlist-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

// Re-export hooks for convenience
export { useAuth } from './auth-provider'
export { useCart } from './cart-provider'
export { useWishlist } from './wishlist-provider'
