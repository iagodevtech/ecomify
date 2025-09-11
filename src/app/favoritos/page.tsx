'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Trash2, 
  ArrowLeft, 
  Zap,
  Star,
  Eye,
  Share2,
  AlertCircle,
  ShoppingCart
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/stripe'
import { ProtectedRoute } from '@/components/auth/protected-route'

// Mock data - em produção viria do contexto
const mockWishlistItems = [
  {
    id: '1',
    name: 'Dell XPS 15',
    price: 12999,
    originalPrice: 14999,
    image: '/images/products/dell-xps.jpg',
    brand: 'Dell',
    rating: 4.6,
    reviews: 423,
    inStock: true,
    discount: 13,
    addedDate: '2024-01-12'
  },
  {
    id: '2',
    name: 'AirPods Pro 2',
    price: 2499,
    originalPrice: 2499,
    image: '/images/products/airpods-pro.jpg',
    brand: 'Apple',
    rating: 4.8,
    reviews: 892,
    inStock: true,
    discount: 0,
    addedDate: '2024-01-14'
  }
]

export default function FavoritosPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const [sortBy, setSortBy] = useState('recent')

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (item: any) => {
    // Em produção, isso adicionaria ao carrinho
    console.log('Adicionando ao carrinho:', item)
  }

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'recent':
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
  })

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark-900">
        <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-cyber-400 hover:text-neon-blue"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-pink to-neon-purple rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Meus Favoritos
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {wishlistItems.length === 0 ? (
          /* Empty Wishlist */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-16 h-16 text-neon-pink" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Sua lista de favoritos está vazia</h2>
            <p className="text-cyber-300 mb-8">Adicione produtos que você ama para não perdê-los!</p>
            <Button 
              className="cyber-button bg-gradient-to-r from-neon-pink to-neon-purple text-white"
              onClick={() => window.location.href = '/produtos'}
            >
              <Zap className="w-5 h-5 mr-2" />
              Explorar Produtos
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Header with Sort */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            >
              <div>
                <h2 className="text-white font-bold text-xl">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'produto' : 'produtos'} favoritos
                </h2>
                <p className="text-cyber-300">Produtos que você salvou para comprar depois</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-cyber-300 text-sm">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-800 border border-cyber-500/30 rounded-lg px-3 py-2 text-white text-sm focus:border-neon-blue focus:outline-none"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>
            </motion.div>

            {/* Wishlist Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all group"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <Star className="w-16 h-16 text-neon-pink" />
                    {item.discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-neon-green/20 text-neon-green border-neon-green/30">
                        -{item.discount}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 p-0 bg-dark-800/80 hover:bg-red-500/20 text-cyber-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2 group-hover:text-neon-blue transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-cyber-400 text-sm">{item.brand}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? 'text-neon-yellow fill-current'
                                : 'text-cyber-500'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-cyber-400 text-sm">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-lg">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-cyber-400 text-sm line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                      <Badge className={item.inStock ? "bg-neon-green/20 text-neon-green border-neon-green/30" : "bg-red-400/20 text-red-400 border-red-400/30"}>
                        {item.inStock ? 'Em Estoque' : 'Fora de Estoque'}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button
                        className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                        >
                          <Share2 className="w-4 h-4 mr-1" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bulk Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 p-6 bg-dark-800/50 border border-cyber-500/30 rounded-xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-white font-semibold mb-1">Ações em Lote</h3>
                  <p className="text-cyber-300 text-sm">Gerencie todos os seus favoritos de uma vez</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar Todos ao Carrinho
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyber-500 text-cyber-400 hover:border-red-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar Lista
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
      </div>
    </ProtectedRoute>
  )
}