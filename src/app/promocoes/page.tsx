'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Tag, 
  Gift, 
  Zap, 
  Clock, 
  Star, 
  TrendingUp, 
  Award, 
  Crown,
  Sparkles,
  Target,
  Calendar,
  Percent,
  DollarSign,
  ShoppingCart,
  Heart,
  Eye,
  Copy,
  Check,
  X,
  ArrowRight,
  Fire,
  Rocket,
  Diamond,
  Shield,
  Truck,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad,
  Monitor,
  Package
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock data
const promotions = [
  {
    id: '1',
    title: 'Black Friday Tech',
    description: 'Até 70% de desconto em produtos de tecnologia',
    type: 'sale',
    discount: 70,
    discountType: 'percentage',
    minValue: 500,
    maxDiscount: 2000,
    validUntil: '2024-12-31',
    isActive: true,
    isExclusive: true,
    usageCount: 1247,
    maxUsage: 5000,
    category: 'all',
    icon: Fire,
    color: 'from-red-500 to-orange-500',
    bgColor: 'from-red-500/10 to-orange-500/10',
    borderColor: 'border-red-500/30',
    products: [
      { name: 'MacBook Pro M3 Max', originalPrice: 17999, discountPrice: 10799 },
      { name: 'iPhone 15 Pro Max', originalPrice: 9999, discountPrice: 5999 },
      { name: 'Sony WH-1000XM5', originalPrice: 1499, discountPrice: 899 }
    ]
  },
  {
    id: '2',
    title: 'Frete Grátis Premium',
    description: 'Frete grátis em todos os pedidos acima de R$ 200',
    type: 'shipping',
    discount: 0,
    discountType: 'shipping',
    minValue: 200,
    validUntil: '2024-12-31',
    isActive: true,
    isExclusive: false,
    usageCount: 3456,
    maxUsage: null,
    category: 'all',
    icon: Truck,
    color: 'from-neon-green to-cyber-600',
    bgColor: 'from-neon-green/10 to-cyber-600/10',
    borderColor: 'border-neon-green/30',
    products: []
  },
  {
    id: '3',
    title: 'Cliente VIP',
    description: '15% de desconto exclusivo para clientes VIP',
    type: 'vip',
    discount: 15,
    discountType: 'percentage',
    minValue: 1000,
    validUntil: '2024-12-31',
    isActive: true,
    isExclusive: true,
    usageCount: 89,
    maxUsage: 500,
    category: 'premium',
    icon: Crown,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-500/10 to-orange-500/10',
    borderColor: 'border-yellow-500/30',
    products: []
  },
  {
    id: '4',
    title: 'Primeira Compra',
    description: 'R$ 200 de desconto na sua primeira compra',
    type: 'first-purchase',
    discount: 200,
    discountType: 'fixed',
    minValue: 500,
    validUntil: '2024-12-31',
    isActive: true,
    isExclusive: false,
    usageCount: 2341,
    maxUsage: 10000,
    category: 'all',
    icon: Gift,
    color: 'from-neon-blue to-neon-purple',
    bgColor: 'from-neon-blue/10 to-neon-purple/10',
    borderColor: 'border-neon-blue/30',
    products: []
  },
  {
    id: '5',
    title: 'Gaming Week',
    description: 'Até 50% de desconto em produtos para gaming',
    type: 'category',
    discount: 50,
    discountType: 'percentage',
    minValue: 300,
    validUntil: '2024-12-31',
    isActive: true,
    isExclusive: false,
    usageCount: 567,
    maxUsage: 2000,
    category: 'gaming',
    icon: Gamepad,
    color: 'from-neon-purple to-neon-pink',
    bgColor: 'from-neon-purple/10 to-neon-pink/10',
    borderColor: 'border-neon-purple/30',
    products: [
      { name: 'ASUS ROG Zephyrus G14', originalPrice: 10999, discountPrice: 5499 },
      { name: 'RTX 4090 Gaming PC', originalPrice: 21999, discountPrice: 10999 }
    ]
  },
  {
    id: '6',
    title: 'Cashback 10%',
    description: '10% de cashback em todas as compras',
    type: 'cashback',
    discount: 10,
    discountType: 'cashback',
    minValue: 100,
    validUntil: '2024-12-31',
    isActive: true,
    isExclusive: false,
    usageCount: 4567,
    maxUsage: null,
    category: 'all',
    icon: Diamond,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    products: []
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
    isActive: true,
    usageCount: 1247,
    maxUsage: 5000,
    category: 'all'
  },
  {
    id: '2',
    code: 'TECH20',
    description: 'R$ 200 de desconto em produtos de tecnologia',
    discount: 200,
    type: 'fixed',
    minValue: 2000,
    validUntil: '2024-12-31',
    isActive: true,
    usageCount: 567,
    maxUsage: 2000,
    category: 'technology'
  },
  {
    id: '3',
    code: 'VIP15',
    description: '15% de desconto para clientes VIP',
    discount: 15,
    type: 'percentage',
    minValue: 5000,
    validUntil: '2024-12-31',
    isActive: false,
    usageCount: 89,
    maxUsage: 500,
    category: 'premium'
  },
  {
    id: '4',
    code: 'GAMING25',
    description: '25% de desconto em produtos gaming',
    discount: 25,
    type: 'percentage',
    minValue: 500,
    validUntil: '2024-12-31',
    isActive: true,
    usageCount: 234,
    maxUsage: 1000,
    category: 'gaming'
  }
]

const categories = [
  { id: 'all', name: 'Todas', icon: Package },
  { id: 'sale', name: 'Promoções', icon: Tag },
  { id: 'shipping', name: 'Frete', icon: Truck },
  { id: 'vip', name: 'VIP', icon: Crown },
  { id: 'first-purchase', name: 'Primeira Compra', icon: Gift },
  { id: 'category', name: 'Categoria', icon: Target },
  { id: 'cashback', name: 'Cashback', icon: Diamond }
]

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredPromotions = selectedCategory === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.type === selectedCategory)

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Laptops': Laptop,
      'Smartphones': Smartphone,
      'Áudio': Headphones,
      'Gaming': Gamepad,
      'Monitores': Monitor
    }
    return iconMap[category] || Package
  }

  const getUsagePercentage = (usageCount: number, maxUsage: number | null) => {
    if (!maxUsage) return 0
    return Math.min((usageCount / maxUsage) * 100, 100)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                Promoções e Cupons
              </span>
            </h1>
            <p className="text-cyber-400">
              Aproveite nossas ofertas exclusivas e economize em suas compras
            </p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                      : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPromotions.map((promotion, index) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${promotion.bgColor} backdrop-blur-sm border ${promotion.borderColor} rounded-2xl p-6 relative overflow-hidden`}
              >
                {/* Exclusive Badge */}
                {promotion.isExclusive && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Exclusivo
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${promotion.color} flex items-center justify-center`}>
                    <promotion.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{promotion.title}</h3>
                    <p className="text-cyber-300 text-sm">{promotion.description}</p>
                  </div>
                </div>

                {/* Discount Info */}
                <div className="mb-4">
                  {promotion.discountType === 'percentage' && (
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-white">{promotion.discount}%</span>
                      <span className="text-cyber-300">OFF</span>
                    </div>
                  )}
                  {promotion.discountType === 'fixed' && (
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-white">{formatPrice(promotion.discount)}</span>
                      <span className="text-cyber-300">OFF</span>
                    </div>
                  )}
                  {promotion.discountType === 'shipping' && (
                    <div className="flex items-center gap-2">
                      <Truck className="w-6 h-6 text-neon-green" />
                      <span className="text-xl font-bold text-white">Frete Grátis</span>
                    </div>
                  )}
                  {promotion.discountType === 'cashback' && (
                    <div className="flex items-center gap-2">
                      <Diamond className="w-6 h-6 text-cyan-400" />
                      <span className="text-xl font-bold text-white">{promotion.discount}% Cashback</span>
                    </div>
                  )}
                </div>

                {/* Conditions */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-cyber-300 text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span>Mínimo: {formatPrice(promotion.minValue)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyber-300 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Válido até: {promotion.validUntil}</span>
                  </div>
                  {promotion.maxDiscount && (
                    <div className="flex items-center gap-2 text-cyber-300 text-sm">
                      <Target className="w-4 h-4" />
                      <span>Máximo: {formatPrice(promotion.maxDiscount)}</span>
                    </div>
                  )}
                </div>

                {/* Usage Progress */}
                {promotion.maxUsage && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyber-300 text-sm">Uso</span>
                      <span className="text-cyber-300 text-sm">
                        {promotion.usageCount.toLocaleString()} / {promotion.maxUsage.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-cyber-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all"
                        style={{ width: `${getUsagePercentage(promotion.usageCount, promotion.maxUsage)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Featured Products */}
                {promotion.products.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Produtos em Destaque:</h4>
                    <div className="space-y-2">
                      {promotion.products.map((product, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-dark-700/30 rounded-lg">
                          <span className="text-cyber-300 text-sm">{product.name}</span>
                          <div className="text-right">
                            <span className="text-white font-bold text-sm">{formatPrice(product.discountPrice)}</span>
                            <span className="text-cyber-500 text-xs line-through ml-2">{formatPrice(product.originalPrice)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button className="w-full cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Aproveitar Oferta
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Coupons Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Tag className="w-6 h-6 text-neon-blue" />
              Cupons de Desconto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {coupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-dark-800/50 backdrop-blur-sm border ${
                    coupon.isActive ? 'border-neon-green/30' : 'border-cyber-500/30'
                  } rounded-2xl p-4`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-neon-green" />
                      <span className="text-white font-bold text-lg">{coupon.code}</span>
                    </div>
                    <Badge className={`text-xs ${
                      coupon.isActive 
                        ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                        : 'bg-cyber-500/20 text-cyber-500 border-cyber-500/50'
                    }`}>
                      {coupon.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>

                  <p className="text-cyber-300 text-sm mb-3">{coupon.description}</p>

                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      {coupon.type === 'percentage' ? (
                        <span className="text-2xl font-bold text-white">{coupon.discount}%</span>
                      ) : (
                        <span className="text-2xl font-bold text-white">{formatPrice(coupon.discount)}</span>
                      )}
                      <span className="text-cyber-300 text-sm">OFF</span>
                    </div>
                    <p className="text-cyber-400 text-xs">Mínimo: {formatPrice(coupon.minValue)}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-cyber-300 text-xs">Uso</span>
                      <span className="text-cyber-300 text-xs">
                        {coupon.usageCount.toLocaleString()} / {coupon.maxUsage?.toLocaleString() || '∞'}
                      </span>
                    </div>
                    {coupon.maxUsage && (
                      <div className="w-full h-1 bg-cyber-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all"
                          style={{ width: `${getUsagePercentage(coupon.usageCount, coupon.maxUsage)}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => copyToClipboard(coupon.code)}
                    disabled={!coupon.isActive}
                    className={`w-full ${
                      coupon.isActive 
                        ? 'cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white' 
                        : 'bg-cyber-700 text-cyber-500 cursor-not-allowed'
                    }`}
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Código
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How to Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-neon-purple" />
              Como Usar
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-white font-bold mb-2">Escolha sua Promoção</h3>
                <p className="text-cyber-300 text-sm">
                  Selecione a promoção ou cupom que deseja aproveitar
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-white font-bold mb-2">Adicione ao Carrinho</h3>
                <p className="text-cyber-300 text-sm">
                  Adicione os produtos que atendem aos critérios da promoção
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-white font-bold mb-2">Aplique o Desconto</h3>
                <p className="text-cyber-300 text-sm">
                  Use o código do cupom ou aproveite a promoção automaticamente
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
