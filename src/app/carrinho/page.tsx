'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  CreditCard, 
  Truck,
  Shield,
  Zap,
  Heart,
  X
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/providers'
import { formatPrice } from '@/lib/stripe'

// Mock data - em produção viria do contexto
const mockCartItems = [
  {
    id: '1',
    name: 'MacBook Pro 16" M3 Max',
    price: 15999,
    quantity: 1,
    image: '/images/products/macbook-pro.jpg',
    brand: 'Apple',
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    price: 8999,
    quantity: 2,
    image: '/images/products/iphone-15-pro.jpg',
    brand: 'Apple',
    inStock: true
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 Ultra',
    price: 7999,
    quantity: 1,
    image: '/images/products/galaxy-s24.jpg',
    brand: 'Samsung',
    inStock: false
  }
]

export default function CarrinhoPage() {
  const { itemCount } = useCart()
  const [cartItems, setCartItems] = React.useState(mockCartItems)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 25
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
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
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
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-neon-blue" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Seu carrinho está vazio</h2>
            <p className="text-cyber-300 mb-8">Que tal adicionar alguns produtos incríveis?</p>
            <Button 
              className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
              onClick={() => window.location.href = '/produtos'}
            >
              <Zap className="w-5 h-5 mr-2" />
              Explorar Produtos
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="w-8 h-8 text-neon-blue" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                            <p className="text-cyber-400 text-sm mb-2">{item.brand}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={item.inStock ? "bg-neon-green/20 text-neon-green border-neon-green/30" : "bg-red-400/20 text-red-400 border-red-400/30"}>
                                {item.inStock ? 'Em Estoque' : 'Fora de Estoque'}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-cyber-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0 text-cyber-400 hover:text-neon-blue"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0 text-cyber-400 hover:text-neon-blue"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-cyber-400 text-sm">{formatPrice(item.price)} cada</p>
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
                <h2 className="text-white font-bold text-xl mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-cyber-300">Subtotal ({cartItems.length} itens)</span>
                    <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-300">Frete</span>
                    <span className="text-white font-semibold">
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-cyber-400 text-sm">
                      Frete grátis em compras acima de {formatPrice(500)}
                    </p>
                  )}
                  <hr className="border-cyber-500/30" />
                  <div className="flex justify-between">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-white font-bold text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white mb-4"
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
                  <Zap className="w-5 h-5 mr-2" />
                  Continuar Comprando
                </Button>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-cyber-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-neon-green" />
                    <span className="text-cyber-300 text-sm">Compra 100% Segura</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-4 h-4 text-neon-blue" />
                    <span className="text-cyber-300 text-sm">Entrega Rápida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-neon-pink" />
                    <span className="text-cyber-300 text-sm">Garantia Estendida</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}