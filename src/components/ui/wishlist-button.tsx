'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/components/providers'
import { useAuth } from '@/components/providers'
import { Button } from './button'
import { toast } from 'react-hot-toast'

interface WishlistButtonProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    brand: string
    slug: string
  }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'button'
  className?: string
}

export function WishlistButton({ 
  product, 
  size = 'md', 
  variant = 'icon',
  className = '' 
}: WishlistButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const { isInWishlist, addItem, removeItem, loading } = useWishlist()
  const { user } = useAuth()

  const isFavorited = isInWishlist(product.id)

  const handleToggle = async () => {
    if (!user) {
      toast.error('Faça login para adicionar aos favoritos')
      return
    }

    if (loading) return

    setIsAnimating(true)
    
    try {
      if (isFavorited) {
        const result = await removeItem(product.id)
        if (result.success) {
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      } else {
        const result = await addItem({
          product_id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          brand: product.brand,
          slug: product.slug
        })
        if (result.success) {
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      }
    } catch (error) {
      toast.error('Erro ao atualizar favoritos')
    } finally {
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  if (variant === 'button') {
    return (
      <Button
        onClick={handleToggle}
        disabled={loading}
        variant="outline"
        size={size === 'sm' ? 'sm' : 'default'}
        className={`border-cyber-500/30 text-cyber-400 hover:border-neon-pink hover:text-neon-pink transition-all duration-300 ${className}`}
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart 
            className={`${iconSizes[size]} ${isFavorited ? 'fill-neon-pink text-neon-pink' : ''}`} 
          />
        </motion.div>
        {size !== 'sm' && (
          <span className="ml-2">
            {isFavorited ? 'Remover' : 'Favoritar'}
          </span>
        )}
      </Button>
    )
  }

  return (
    <motion.button
      onClick={handleToggle}
      disabled={loading}
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        border 
        flex 
        items-center 
        justify-center 
        transition-all 
        duration-300 
        backdrop-blur-sm
        ${isFavorited 
          ? 'border-neon-pink/50 bg-neon-pink/10 text-neon-pink' 
          : 'border-cyber-500/30 bg-dark-800/50 text-cyber-400 hover:border-neon-pink/50 hover:bg-neon-pink/10 hover:text-neon-pink'
        }
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Heart 
        className={`${iconSizes[size]} ${isFavorited ? 'fill-current' : ''}`} 
      />
    </motion.button>
  )
}
