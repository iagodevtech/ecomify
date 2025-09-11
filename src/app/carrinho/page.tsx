'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  ArrowLeft, 
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Truck,
  Shield,
  Heart,
  Eye
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/stripe'

// Mock data - em produção viria do contexto do carrinho
const cartItems = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max 16"',
    brand: 'Apple',
    price: 15999,
    originalPrice: 17999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center',
    quantity: 1,
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 8999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop&crop=center',
    quantity: 2,
    inStock: true
  }
]

export default function CarrinhoPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const shipping = subtotal > 5000 ? 0 : 150
  const total = subtotal + shipping

  return (
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
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Carrinho de Compras
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-cyber-400 text-sm mb-1">{item.brand}</p>
                            <h3 className="text-white font-semibold text-lg mb-2">
                              {item.name}
                            </h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-cyber-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-white font-bold text-lg">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-cyber-400 text-sm line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-cyber-300 text-sm">Quantidade:</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-white font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink"
                            onClick={() => window.location.href = '/favoritos'}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Favoritos
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 sticky top-24"
              >
                <h3 className="text-white font-bold text-xl mb-6">Resumo do Pedido</h3>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-300">Subtotal:</span>
                    <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-neon-green">Desconto:</span>
                      <span className="text-neon-green font-medium">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-300">Frete:</span>
                    <span className="text-white font-medium">
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <div className="border-t border-cyber-500/30 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Total:</span>
                      <span className="text-white font-bold text-lg">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-cyber-300 text-sm">
                    <Truck className="w-4 h-4 text-neon-green" />
                    <span>Frete grátis para pedidos acima de R$ 5.000</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyber-300 text-sm">
                    <Shield className="w-4 h-4 text-neon-blue" />
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyber-300 text-sm">
                    <CreditCard className="w-4 h-4 text-neon-purple" />
                    <span>Parcelamento em até 12x sem juros</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  className="w-full cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white mb-4"
                  onClick={() => window.location.href = '/checkout'}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Finalizar Compra
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  onClick={() => window.location.href = '/produtos'}
                >
                  Continuar Comprando
                </Button>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-cyber-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Seu carrinho está vazio
            </h2>
            
            <p className="text-cyber-300 mb-8 max-w-md mx-auto">
              Que tal adicionar alguns produtos incríveis ao seu carrinho? 
              Explore nossa seleção de tecnologia de ponta!
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button
                className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                onClick={() => window.location.href = '/produtos'}
              >
                Ver Produtos
              </Button>
              <Button
                variant="outline"
                className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                onClick={() => window.location.href = '/mais-vendidos'}
              >
                Mais Vendidos
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}