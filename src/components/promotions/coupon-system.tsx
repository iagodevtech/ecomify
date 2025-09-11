'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Tag, 
  Gift, 
  Percent, 
  DollarSign, 
  Clock, 
  Users, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Star,
  Heart,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Bell,
  Settings,
  Zap,
  Award,
  Crown,
  Gem,
  Sparkles,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Eye,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  MapPin,
  Globe,
  Lock,
  Shield,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  X,
  Plus,
  Minus,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

interface Coupon {
  id: string
  code: string
  name: string
  description: string
  type: 'percentage' | 'fixed' | 'free_shipping' | 'buy_x_get_y'
  value: number
  minOrderValue?: number
  maxDiscount?: number
  validFrom: Date
  validUntil: Date
  usageLimit?: number
  usedCount: number
  isActive: boolean
  categories?: string[]
  products?: string[]
  userRestrictions?: {
    newUsersOnly?: boolean
    minOrders?: number
    maxOrders?: number
  }
  conditions?: {
    minQuantity?: number
    maxQuantity?: number
    paymentMethods?: string[]
  }
  icon: any
  color: string
  popularity: number
  isUsed?: boolean
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    name: 'Bem-vindo à Ecomify',
    description: '10% de desconto para novos usuários',
    type: 'percentage',
    value: 10,
    minOrderValue: 100,
    maxDiscount: 500,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    usageLimit: 1000,
    usedCount: 234,
    isActive: true,
    userRestrictions: {
      newUsersOnly: true
    },
    icon: Gift,
    color: 'from-neon-green to-cyber-600',
    popularity: 95
  },
  {
    id: '2',
    code: 'PIX5',
    name: 'Desconto PIX',
    description: '5% de desconto extra no PIX',
    type: 'percentage',
    value: 5,
    minOrderValue: 50,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    isActive: true,
    conditions: {
      paymentMethods: ['pix']
    },
    icon: CreditCard,
    color: 'from-neon-blue to-cyber-600',
    popularity: 88
  },
  {
    id: '3',
    code: 'FREESHIP',
    name: 'Frete Grátis',
    description: 'Frete grátis para pedidos acima de R$ 200',
    type: 'free_shipping',
    value: 0,
    minOrderValue: 200,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    isActive: true,
    icon: Truck,
    color: 'from-neon-purple to-cyber-600',
    popularity: 92
  },
  {
    id: '4',
    code: 'TECH50',
    name: 'R$ 50 OFF',
    description: 'R$ 50 de desconto em produtos de tecnologia',
    type: 'fixed',
    value: 50,
    minOrderValue: 300,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-06-30'),
    usageLimit: 500,
    usedCount: 156,
    isActive: true,
    categories: ['Laptops', 'Smartphones', 'Gaming'],
    icon: Tag,
    color: 'from-neon-pink to-cyber-600',
    popularity: 78
  },
  {
    id: '5',
    code: 'BUY2GET1',
    name: 'Compre 2, Leve 3',
    description: 'Compre 2 produtos e ganhe 1 grátis',
    type: 'buy_x_get_y',
    value: 1,
    minOrderValue: 100,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-03-31'),
    isActive: true,
    conditions: {
      minQuantity: 2
    },
    icon: Package,
    color: 'from-neon-yellow to-cyber-600',
    popularity: 85
  }
]

const getCouponIcon = (type: Coupon['type']) => {
  switch (type) {
    case 'percentage':
      return Percent
    case 'fixed':
      return DollarSign
    case 'free_shipping':
      return Truck
    case 'buy_x_get_y':
      return Gift
    default:
      return Tag
  }
}

const getCouponValue = (coupon: Coupon) => {
  switch (coupon.type) {
    case 'percentage':
      return `${coupon.value}%`
    case 'fixed':
      return `R$ ${coupon.value}`
    case 'free_shipping':
      return 'Frete Grátis'
    case 'buy_x_get_y':
      return `+${coupon.value} Grátis`
    default:
      return coupon.value.toString()
  }
}

export function CouponSystem() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons)
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'available' | 'used'>('all')
  const [sortBy, setSortBy] = useState<'popularity' | 'value' | 'expiry'>('popularity')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const availableCoupons = coupons.filter(coupon => {
    const now = new Date()
    const isExpired = now > coupon.validUntil
    const isNotStarted = now < coupon.validFrom
    const isUsageLimitReached = coupon.usageLimit && coupon.usedCount >= coupon.usageLimit
    const isUsed = appliedCoupons.includes(coupon.id)
    
    return !isExpired && !isNotStarted && !isUsageLimitReached && !isUsed && coupon.isActive
  })

  const filteredCoupons = availableCoupons.filter(coupon => {
    const matchesSearch = coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filterType === 'used') {
      return appliedCoupons.includes(coupon.id)
    }
    
    return matchesSearch
  })

  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.value - a.value
      case 'expiry':
        return a.validUntil.getTime() - b.validUntil.getTime()
      case 'popularity':
      default:
        return b.popularity - a.popularity
    }
  })

  const applyCoupon = (couponId: string) => {
    if (!appliedCoupons.includes(couponId)) {
      setAppliedCoupons(prev => [...prev, couponId])
    }
  }

  const removeCoupon = (couponId: string) => {
    setAppliedCoupons(prev => prev.filter(id => id !== couponId))
  }

  const copyCouponCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getDaysUntilExpiry = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  const getTotalSavings = () => {
    return appliedCoupons.reduce((total, couponId) => {
      const coupon = coupons.find(c => c.id === couponId)
      if (!coupon) return total
      
      switch (coupon.type) {
        case 'percentage':
          return total + (coupon.maxDiscount || 1000)
        case 'fixed':
          return total + coupon.value
        case 'free_shipping':
          return total + 50 // Estimated shipping cost
        case 'buy_x_get_y':
          return total + 100 // Estimated value of free item
        default:
          return total
      }
    }, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Cupons e Promoções</h2>
          <p className="text-cyber-400">
            {availableCoupons.length} cupom{availableCoupons.length !== 1 ? 's' : ''} disponível{availableCoupons.length !== 1 ? 'is' : ''} • 
            Economia total: {formatPrice(getTotalSavings())}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
            {appliedCoupons.length} Aplicado{appliedCoupons.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Applied Coupons */}
      {appliedCoupons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neon-green/10 border border-neon-green/30 rounded-2xl p-6"
        >
          <h3 className="text-white font-bold mb-4">Cupons Aplicados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliedCoupons.map((couponId) => {
              const coupon = coupons.find(c => c.id === couponId)
              if (!coupon) return null

              return (
                <div
                  key={couponId}
                  className="bg-dark-800/50 border border-neon-green/30 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 bg-gradient-to-br ${coupon.color} rounded-lg flex items-center justify-center`}>
                        <coupon.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-bold text-sm">{coupon.code}</span>
                    </div>
                    <button
                      onClick={() => removeCoupon(couponId)}
                      className="text-cyber-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-cyber-300 text-sm mb-2">{coupon.name}</p>
                  <p className="text-neon-green font-bold text-lg">{getCouponValue(coupon)}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cupons..."
              className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            >
              <option value="all">Todos</option>
              <option value="available">Disponíveis</option>
              <option value="used">Usados</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            >
              <option value="popularity">Popularidade</option>
              <option value="value">Valor</option>
              <option value="expiry">Vencimento</option>
            </select>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      {sortedCoupons.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
            <Tag className="w-16 h-16 text-cyber-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {searchQuery ? 'Nenhum cupom encontrado' : 'Nenhum cupom disponível'}
          </h3>
          <p className="text-cyber-400 mb-8">
            {searchQuery 
              ? 'Tente ajustar sua busca'
              : 'Novos cupons são adicionados regularmente'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCoupons.map((coupon) => {
            const daysUntilExpiry = getDaysUntilExpiry(coupon.validUntil)
            const isExpiringSoon = daysUntilExpiry <= 7
            const usagePercentage = coupon.usageLimit 
              ? (coupon.usedCount / coupon.usageLimit) * 100 
              : 0

            return (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 hover:border-neon-blue/50 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${coupon.color} rounded-lg flex items-center justify-center`}>
                      <coupon.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{coupon.name}</h3>
                      <p className="text-cyber-400 text-sm">{coupon.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-neon-blue font-bold text-2xl">{getCouponValue(coupon)}</p>
                    <div className="flex items-center gap-1 text-cyber-400 text-xs">
                      <Star className="w-3 h-3" />
                      <span>{coupon.popularity}%</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="bg-dark-700/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-300 text-sm">Código:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-bold">{coupon.code}</span>
                      <button
                        onClick={() => copyCouponCode(coupon.code)}
                        className="p-1 text-cyber-400 hover:text-neon-blue transition-colors"
                      >
                        {copiedCode === coupon.code ? (
                          <CheckCircle className="w-4 h-4 text-neon-green" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conditions */}
                <div className="space-y-2 mb-4">
                  {coupon.minOrderValue && (
                    <div className="flex items-center gap-2 text-cyber-400 text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span>Pedido mínimo: {formatPrice(coupon.minOrderValue)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-cyber-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Válido até: {formatDate(coupon.validUntil)}</span>
                    {isExpiringSoon && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-xs">
                        Expira em {daysUntilExpiry} dias
                      </Badge>
                    )}
                  </div>

                  {coupon.usageLimit && (
                    <div className="flex items-center gap-2 text-cyber-400 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{coupon.usedCount}/{coupon.usageLimit} usados</span>
                      <div className="flex-1 bg-cyber-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all"
                          style={{ width: `${usagePercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories */}
                {coupon.categories && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {coupon.categories.map((category, index) => (
                      <Badge key={index} className="bg-cyber-600 text-cyber-300 text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Apply Button */}
                <Button
                  onClick={() => applyCoupon(coupon.id)}
                  className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Aplicar Cupom
                </Button>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
