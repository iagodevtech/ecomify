'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Gift,
  Tag,
  X,
  Check,
  AlertCircle,
  Clock,
  MapPin,
  Star,
  Zap,
  Award,
  Package,
  Smartphone,
  Laptop,
  Headphones
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    price: 15999,
    originalPrice: 17999,
    quantity: 1,
    image: '/images/products/macbook-pro.jpg',
    brand: 'Apple',
    category: 'Laptops',
    inStock: true,
    stockCount: 5,
    rating: 4.9,
    reviewCount: 127,
    warranty: '1 ano',
    shipping: 'Frete grátis',
    estimatedDelivery: '2-3 dias úteis'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    price: 8999,
    originalPrice: 9999,
    quantity: 2,
    image: '/images/products/iphone-15-pro.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 89,
    warranty: '1 ano',
    shipping: 'Frete grátis',
    estimatedDelivery: '1-2 dias úteis'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 1299,
    originalPrice: 1499,
    quantity: 1,
    image: '/images/products/sony-wh1000xm5.jpg',
    brand: 'Sony',
    category: 'Áudio',
    inStock: true,
    stockCount: 8,
    rating: 4.7,
    reviewCount: 203,
    warranty: '2 anos',
    shipping: 'Frete grátis',
    estimatedDelivery: '3-5 dias úteis'
  }
]

const coupons = [
  {
    id: '1',
    code: 'WELCOME10',
    description: '10% de desconto para novos clientes',
    discount: 10,
    type: 'percentage',
    minValue: 1000,
    validUntil: '2024-12-31',
    isActive: true
  },
  {
    id: '2',
    code: 'TECH20',
    description: 'R$ 200 de desconto em produtos de tecnologia',
    discount: 200,
    type: 'fixed',
    minValue: 2000,
    validUntil: '2024-12-31',
    isActive: true
  },
  {
    id: '3',
    code: 'VIP15',
    description: '15% de desconto para clientes VIP',
    discount: 15,
    type: 'percentage',
    minValue: 5000,
    validUntil: '2024-12-31',
    isActive: false
  }
]

const shippingOptions = [
  {
    id: 'standard',
    name: 'Entrega Padrão',
    price: 0,
    estimatedDays: '3-5 dias úteis',
    description: 'Frete grátis para pedidos acima de R$ 200'
  },
  {
    id: 'express',
    name: 'Entrega Expressa',
    price: 29.90,
    estimatedDays: '1-2 dias úteis',
    description: 'Entrega rápida para todo o Brasil'
  },
  {
    id: 'same-day',
    name: 'Entrega no Mesmo Dia',
    price: 49.90,
    estimatedDays: 'Mesmo dia',
    description: 'Disponível apenas para São Paulo e Rio de Janeiro'
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [couponCode, setCouponCode] = useState('')
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0])
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [showShippingModal, setShowShippingModal] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0
  const shipping = subtotal >= 200 ? 0 : selectedShipping.price
  const total = subtotal - discount + shipping

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const moveToWishlist = (id: string) => {
    // In real app, this would add to wishlist
    removeItem(id)
  }

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase())
    if (coupon && coupon.isActive && subtotal >= coupon.minValue) {
      setAppliedCoupon(coupon)
      setShowCouponModal(false)
      setCouponCode('')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-cyber-500" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Carrinho Vazio</h1>
              <p className="text-cyber-400 mb-8">
                Adicione produtos ao seu carrinho para continuar
              </p>
              <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                <ArrowRight className="w-5 h-5 mr-2" />
                Continuar Comprando
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Carrinho de Compras
              </span>
            </h1>
            <p className="text-cyber-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no seu carrinho
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-1">
                          <span className="text-white font-bold text-sm">
                            {item.brand.charAt(0)}
                          </span>
                        </div>
                        <p className="text-cyber-400 text-xs">Imagem</p>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                          <p className="text-cyber-400 text-sm mb-2">{item.brand} • {item.category}</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-xs ${
                                  i < Math.floor(item.rating) ? 'text-neon-yellow' : 'text-cyber-600'
                                }`}>★</span>
                              ))}
                              <span className="text-cyber-400 ml-1">({item.reviewCount})</span>
                            </div>
                            <Badge className={`text-xs ${
                              item.inStock 
                                ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                                : 'bg-red-500/20 text-red-500 border-red-500/50'
                            }`}>
                              {item.inStock ? `${item.stockCount} em estoque` : 'Fora de estoque'}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-white font-bold text-lg">{formatPrice(item.price)}</p>
                          <p className="text-cyber-500 text-sm line-through">{formatPrice(item.originalPrice)}</p>
                          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs mt-1">
                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                          </Badge>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-cyber-400">Garantia</p>
                          <p className="text-white">{item.warranty}</p>
                        </div>
                        <div>
                          <p className="text-cyber-400">Frete</p>
                          <p className="text-white">{item.shipping}</p>
                        </div>
                        <div>
                          <p className="text-cyber-400">Entrega</p>
                          <p className="text-white">{item.estimatedDelivery}</p>
                        </div>
                        <div>
                          <p className="text-cyber-400">Total</p>
                          <p className="text-white font-bold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-cyber-700 hover:bg-cyber-600 flex items-center justify-center text-white transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-white font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-cyber-700 hover:bg-cyber-600 flex items-center justify-center text-white transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <Button
                            variant="outline"
                            onClick={() => moveToWishlist(item.id)}
                            className="border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Favoritar
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => removeItem(item.id)}
                          className="border-cyber-500 text-cyber-400 hover:border-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Security & Trust */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-neon-green" />
                  Compra Segura
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green to-cyber-600 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">SSL Seguro</p>
                      <p className="text-cyber-400 text-sm">Dados protegidos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-cyber-600 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Entrega Garantida</p>
                      <p className="text-cyber-400 text-sm">Rastreamento 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-cyber-600 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Garantia Estendida</p>
                      <p className="text-cyber-400 text-sm">Suporte premium</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

                {/* Coupon Section */}
                <div className="mb-6">
                  {appliedCoupon ? (
                    <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-neon-green" />
                          <span className="text-neon-green font-medium">{appliedCoupon.code}</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-cyber-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-cyber-300 text-sm">{appliedCoupon.description}</p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowCouponModal(true)}
                      variant="outline"
                      className="w-full border-cyber-500 text-cyber-400 hover:border-neon-green hover:text-neon-green"
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      Aplicar Cupom
                    </Button>
                  )}
                </div>

                {/* Shipping Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">Entrega</h3>
                    <Button
                      onClick={() => setShowShippingModal(true)}
                      variant="outline"
                      className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue text-sm"
                    >
                      Alterar
                    </Button>
                  </div>
                  <div className="p-3 bg-dark-700/30 rounded-lg">
                    <p className="text-white font-medium">{selectedShipping.name}</p>
                    <p className="text-cyber-400 text-sm">{selectedShipping.description}</p>
                    <p className="text-cyber-400 text-sm">{selectedShipping.estimatedDays}</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-cyber-400">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-cyber-400">Desconto</span>
                      <span className="text-neon-green">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-cyber-400">Frete</span>
                    <span className="text-white">
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <div className="border-t border-cyber-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-white font-bold text-lg">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full cyber-button bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white py-4 font-cyber text-lg mb-4">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Finalizar Compra
                </Button>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-cyber-400 text-sm mb-3">Formas de Pagamento</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-cyber-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-cyber-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">PIX</span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-cyber-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">B</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border border-cyber-500/30 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Aplicar Cupom</h3>
              <button
                onClick={() => setShowCouponModal(false)}
                className="text-cyber-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-cyber-300 text-sm font-medium mb-2">
                  Código do Cupom
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Digite o código"
                  className="w-full px-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <p className="text-cyber-300 text-sm font-medium">Cupons Disponíveis:</p>
                {coupons.filter(c => c.isActive).map((coupon) => (
                  <div key={coupon.id} className="p-3 bg-dark-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{coupon.code}</span>
                      <span className="text-neon-green font-bold">
                        {coupon.type === 'percentage' ? `${coupon.discount}%` : formatPrice(coupon.discount)}
                      </span>
                    </div>
                    <p className="text-cyber-400 text-sm">{coupon.description}</p>
                    <p className="text-cyber-500 text-xs">
                      Mínimo: {formatPrice(coupon.minValue)}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                onClick={applyCoupon}
                disabled={!couponCode}
                className="w-full cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
              >
                Aplicar Cupom
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Shipping Modal */}
      {showShippingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border border-cyber-500/30 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Opções de Entrega</h3>
              <button
                onClick={() => setShowShippingModal(false)}
                className="text-cyber-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {shippingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedShipping(option)
                    setShowShippingModal(false)
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedShipping.id === option.id
                      ? 'border-neon-green bg-neon-green/10'
                      : 'border-cyber-500/30 hover:border-cyber-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{option.name}</span>
                    <span className="text-white font-bold">
                      {option.price === 0 ? 'Grátis' : formatPrice(option.price)}
                    </span>
                  </div>
                  <p className="text-cyber-400 text-sm">{option.description}</p>
                  <p className="text-cyber-500 text-xs">{option.estimatedDays}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}