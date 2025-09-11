'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Gift, 
  Clock, 
  Star, 
  Heart, 
  ShoppingCart,
  Zap,
  Percent,
  Tag,
  ArrowRight,
  Timer
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/components/providers'

export default function PromocoesPage() {
  const { addItem } = useCart()
  
  // Filter products with discounts
  const promotionalProducts = products.filter(product => product.originalPrice && product.originalPrice > product.price)
  
  // Calculate discount percentage
  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  // Flash deals (products with high discounts)
  const flashDeals = promotionalProducts
    .filter(product => {
      const discount = getDiscountPercentage(product.originalPrice!, product.price)
      return discount >= 20
    })
    .slice(0, 4)

  // Limited time offers
  const limitedOffers = promotionalProducts
    .filter(product => product.isFeatured)
    .slice(0, 6)

  const handleAddToCart = (product: any) => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      brand: product.brand
    })
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-pink to-neon-purple rounded-full flex items-center justify-center mb-4">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold font-cyber mb-4">
                <span className="cyber-text bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                  Promoções
                </span>
              </h1>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Aproveite nossas ofertas especiais e economize em produtos de tecnologia de última geração
              </p>
            </motion.div>

            {/* Promo Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/30 rounded-2xl p-8 mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Timer className="w-8 h-8 text-neon-pink" />
                <h2 className="text-3xl font-bold text-white">Ofertas Relâmpago</h2>
                <Timer className="w-8 h-8 text-neon-pink" />
              </div>
              <p className="text-cyber-300 text-lg mb-4">
                Descontos de até 50% em produtos selecionados
              </p>
              <div className="flex items-center justify-center gap-2 text-neon-pink font-bold text-xl">
                <Clock className="w-6 h-6" />
                <span>Termina em: 23:59:59</span>
              </div>
            </motion.div>
          </div>

          {/* Flash Deals */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Ofertas Relâmpago</h2>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                <Clock className="w-4 h-4 mr-1" />
                Limitado
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashDeals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 hover:border-red-500/50 transition-all group relative overflow-hidden"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                      -{getDiscountPercentage(product.originalPrice!, product.price)}%
                    </Badge>
                  </div>

                  {/* Flash Deal Timer */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1 text-red-400 text-xs font-bold">
                        <Timer className="w-3 h-3" />
                        <span>23:59</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-cyber-400 text-sm">Imagem do Produto</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold text-lg line-clamp-2 mb-1">{product.name}</h3>
                      <p className="text-cyber-400 text-sm">{product.brand}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-neon-yellow fill-current'
                                : 'text-cyber-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-cyber-400 text-sm">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xl">{formatPrice(product.price)}</span>
                        <span className="text-cyber-500 text-sm line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      </div>
                      <div className="text-neon-green text-sm font-medium">
                        Economize {formatPrice(product.originalPrice! - product.price)}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full cyber-button bg-gradient-to-r from-red-500 to-orange-500 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar Agora
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Limited Time Offers */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Ofertas Limitadas</h2>
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                <Clock className="w-4 h-4 mr-1" />
                Tempo Limitado
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {limitedOffers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all group"
                >
                  {/* Discount Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                      -{getDiscountPercentage(product.originalPrice!, product.price)}% OFF
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-cyber-400 hover:text-neon-pink"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Product Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-cyber-400 text-sm">Imagem do Produto</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold text-lg line-clamp-2 mb-1">{product.name}</h3>
                      <p className="text-cyber-400 text-sm">{product.brand}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-neon-yellow fill-current'
                                : 'text-cyber-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-cyber-400 text-sm">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xl">{formatPrice(product.price)}</span>
                        <span className="text-cyber-500 text-sm line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      </div>
                      <div className="text-neon-green text-sm font-medium">
                        Economize {formatPrice(product.originalPrice! - product.price)}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* All Promotional Products */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Todas as Promoções</h2>
              </div>
              <Button
                variant="outline"
                className="cyber-button border-cyber-500/30 text-cyber-400 hover:text-white"
              >
                Ver Todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {promotionalProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all group"
                >
                  {/* Discount Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                      -{getDiscountPercentage(product.originalPrice!, product.price)}%
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-cyber-400 hover:text-neon-pink"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Product Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-cyber-400 text-sm">Imagem do Produto</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold text-lg line-clamp-2 mb-1">{product.name}</h3>
                      <p className="text-cyber-400 text-sm">{product.brand}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-neon-yellow fill-current'
                                : 'text-cyber-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-cyber-400 text-sm">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xl">{formatPrice(product.price)}</span>
                        <span className="text-cyber-500 text-sm line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      </div>
                      <div className="text-neon-green text-sm font-medium">
                        Economize {formatPrice(product.originalPrice! - product.price)}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Não perca nenhuma promoção!</h3>
            <p className="text-cyber-400 mb-6">
              Cadastre-se e receba ofertas exclusivas diretamente no seu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
              />
              <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                Cadastrar
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  )
}