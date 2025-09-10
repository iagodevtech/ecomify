'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft,
  Shield,
  Truck,
  CreditCard,
  Zap,
  Gift,
  Tag
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/components/providers'

// Mock cart data - in real app this would come from context/API
const mockCartItems = [
  {
    id: '1',
    productId: '1',
    product: {
      id: '1',
      name: 'MacBook Pro M3 Max',
      slug: 'macbook-pro-m3-max',
      description: 'O mais poderoso MacBook Pro já criado com chip M3 Max',
      price: 15999,
      originalPrice: 17999,
      images: ['/images/products/macbook-pro.jpg'],
      rating: 4.9,
      reviewCount: 127,
      brand: 'Apple',
      isNew: true,
      isFeatured: true,
      tags: ['Novo', 'Premium', 'Profissional'],
      features: ['Chip M3 Max', '32GB RAM', '1TB SSD', 'Tela 16"'],
      inStock: true,
      stock: 15
    },
    quantity: 1,
    variant: null,
    price: 15999,
    addedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    productId: '2',
    product: {
      id: '2',
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      description: 'O iPhone mais avançado com chip A17 Pro e câmera de 48MP',
      price: 8999,
      originalPrice: 9999,
      images: ['/images/products/iphone-15-pro.jpg'],
      rating: 4.8,
      reviewCount: 89,
      brand: 'Apple',
      isNew: true,
      isFeatured: true,
      tags: ['Novo', 'Premium', '5G'],
      features: ['Chip A17 Pro', 'Câmera 48MP', '5G', 'Titanium'],
      inStock: true,
      stock: 8
    },
    quantity: 2,
    variant: null,
    price: 8999,
    addedAt: '2024-01-15T11:15:00Z'
  },
  {
    id: '3',
    productId: '3',
    product: {
      id: '3',
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      description: 'Fones de ouvido com cancelamento de ruído líder mundial',
      price: 1299,
      originalPrice: 1499,
      images: ['/images/products/sony-wh1000xm5.jpg'],
      rating: 4.7,
      reviewCount: 203,
      brand: 'Sony',
      isNew: false,
      isFeatured: true,
      tags: ['Áudio', 'Wireless', 'Premium'],
      features: ['Cancelamento de Ruído', '30h Bateria', 'Carregamento Rápido'],
      inStock: true,
      stock: 25
    },
    quantity: 1,
    variant: null,
    price: 1299,
    addedAt: '2024-01-15T12:00:00Z'
  }
]

const coupons = [
  {
    code: 'WELCOME10',
    description: '10% de desconto na primeira compra',
    discount: 10,
    type: 'percentage' as const,
    minAmount: 1000
  },
  {
    code: 'TECH20',
    description: '20% de desconto em produtos de tecnologia',
    discount: 20,
    type: 'percentage' as const,
    minAmount: 2000
  },
  {
    code: 'FREESHIP',
    description: 'Frete grátis para todo o Brasil',
    discount: 0,
    type: 'free_shipping' as const,
    minAmount: 500
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.1 // 10% tax
  const couponDiscount = appliedCoupon ? subtotal * 0.1 : 0 // 10% discount for demo
  const total = subtotal + shipping + tax - couponDiscount

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const moveToFavorites = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId)
    if (item) {
      setFavorites(prev => [...prev, item.productId])
      removeItem(itemId)
    }
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase())
    if (coupon && subtotal >= coupon.minAmount) {
      setAppliedCoupon(couponCode)
      setCouponCode('')
    }
    setIsApplyingCoupon(false)
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
              
              <h1 className="text-4xl font-bold font-cyber mb-4">
                <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Carrinho Vazio
                </span>
              </h1>
              
              <p className="text-xl text-cyber-400 mb-8 max-w-md mx-auto">
                Seu carrinho está vazio. Que tal adicionar alguns produtos incríveis?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-8 py-4 text-lg font-cyber">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Continuar Comprando
                </Button>
                <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue px-8 py-4 text-lg font-cyber">
                  Ver Produtos em Destaque
                </Button>
              </div>
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
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              className="text-cyber-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continuar Comprando
            </Button>
            
            <div>
              <h1 className="text-4xl font-bold font-cyber">
                <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Carrinho
                </span>
              </h1>
              <p className="text-cyber-400">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no seu carrinho
              </p>
            </div>
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
                            {item.product.brand.charAt(0)}
                          </span>
                        </div>
                        <p className="text-cyber-500 text-xs">Imagem</p>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-cyber-400 text-sm">
                            {item.product.brand}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveToFavorites(item.id)}
                            className="p-2 text-cyber-400 hover:text-neon-pink transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-cyber-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-cyber-300 text-sm">Quantidade:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-dark-700 border border-cyber-500/30 flex items-center justify-center text-cyber-400 hover:text-white hover:border-neon-blue transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-dark-700 border border-cyber-500/30 flex items-center justify-center text-cyber-400 hover:text-white hover:border-neon-blue transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.product.originalPrice && (
                            <p className="text-cyber-500 text-sm line-through">
                              {formatPrice(item.product.originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

                {/* Coupon Section */}
                <div className="mb-6">
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Cupom de Desconto
                  </label>
                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Código do cupom"
                        className="flex-1 px-3 py-2 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all text-sm"
                      />
                      <Button
                        onClick={applyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="px-4 py-2 bg-neon-blue/20 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/30"
                      >
                        {isApplyingCoupon ? 'Aplicando...' : 'Aplicar'}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-neon-green" />
                        <span className="text-neon-green text-sm font-medium">
                          {appliedCoupon}
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-cyber-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-cyber-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-cyber-300">
                    <span>Frete</span>
                    <span className={shipping === 0 ? 'text-neon-green' : ''}>
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-cyber-300">
                    <span>Impostos</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-neon-green">
                      <span>Desconto</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  
                  <hr className="border-cyber-700" />
                  
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex items-center gap-4 mb-6 text-xs text-cyber-400">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>100% Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Frete Grátis</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>Entrega Rápida</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-4 text-lg font-cyber mb-4">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Finalizar Compra
                </Button>

                {/* Continue Shopping */}
                <Button variant="outline" className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                  Continuar Comprando
                </Button>

                {/* Gift Message */}
                <div className="mt-6 p-4 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-4 h-4 text-neon-blue" />
                    <span className="text-neon-blue text-sm font-medium">
                      Oferta Especial
                    </span>
                  </div>
                  <p className="text-cyber-400 text-xs">
                    Ganhe frete grátis em compras acima de R$ 500,00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
