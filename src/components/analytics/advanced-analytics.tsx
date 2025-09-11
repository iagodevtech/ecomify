'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  Award, 
  Star,
  Heart,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Bell,
  Settings,
  Zap,
  Crown,
  Gem,
  Sparkles,
  Clock,
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
  Search,
  DollarSign,
  Percent,
  Users,
  MousePointer,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  Bluetooth,
  Battery,
  Cpu,
  Memory,
  HardDrive,
  Camera,
  Gamepad,
  Speaker,
  Headphones,
  Keyboard,
  Mouse
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

interface AnalyticsData {
  overview: {
    totalOrders: number
    totalSpent: number
    averageOrderValue: number
    totalSavings: number
    loyaltyPoints: number
    rank: string
  }
  spending: {
    monthly: Array<{
      month: string
      amount: number
      orders: number
    }>
    categories: Array<{
      name: string
      amount: number
      percentage: number
      color: string
    }>
    trends: {
      weeklyGrowth: number
      monthlyGrowth: number
      yearlyGrowth: number
    }
  }
  behavior: {
    mostViewed: Array<{
      id: string
      name: string
      views: number
      category: string
    }>
    mostPurchased: Array<{
      id: string
      name: string
      quantity: number
      totalSpent: number
    }>
    wishlist: {
      totalItems: number
      mostWanted: Array<{
        id: string
        name: string
        price: number
        category: string
      }>
    }
    searchHistory: Array<{
      query: string
      count: number
      lastSearched: Date
    }>
  }
  preferences: {
    favoriteBrands: Array<{
      name: string
      orders: number
      spent: number
    }>
    preferredPaymentMethods: Array<{
      method: string
      usage: number
      percentage: number
    }>
    deviceUsage: Array<{
      device: string
      sessions: number
      percentage: number
    }>
    timePatterns: Array<{
      hour: number
      activity: number
    }>
  }
  recommendations: Array<{
    type: 'product' | 'category' | 'deal'
    title: string
    description: string
    action: string
    priority: 'high' | 'medium' | 'low'
  }>
}

const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalOrders: 24,
    totalSpent: 45680,
    averageOrderValue: 1903,
    totalSavings: 5230,
    loyaltyPoints: 2450,
    rank: 'Gold'
  },
  spending: {
    monthly: [
      { month: 'Jan', amount: 3200, orders: 2 },
      { month: 'Fev', amount: 2800, orders: 1 },
      { month: 'Mar', amount: 4200, orders: 3 },
      { month: 'Abr', amount: 3800, orders: 2 },
      { month: 'Mai', amount: 5100, orders: 4 },
      { month: 'Jun', amount: 4800, orders: 3 }
    ],
    categories: [
      { name: 'Laptops', amount: 18900, percentage: 41, color: 'from-neon-blue to-cyber-600' },
      { name: 'Smartphones', amount: 12800, percentage: 28, color: 'from-neon-green to-cyber-600' },
      { name: 'Áudio', amount: 6800, percentage: 15, color: 'from-neon-purple to-cyber-600' },
      { name: 'Gaming', amount: 4500, percentage: 10, color: 'from-neon-pink to-cyber-600' },
      { name: 'Outros', amount: 2680, percentage: 6, color: 'from-neon-yellow to-cyber-600' }
    ],
    trends: {
      weeklyGrowth: 12.5,
      monthlyGrowth: 8.3,
      yearlyGrowth: 45.2
    }
  },
  behavior: {
    mostViewed: [
      { id: '1', name: 'MacBook Pro M3 Max', views: 45, category: 'Laptops' },
      { id: '2', name: 'iPhone 15 Pro Max', views: 38, category: 'Smartphones' },
      { id: '3', name: 'Sony WH-1000XM5', views: 32, category: 'Áudio' },
      { id: '4', name: 'NVIDIA RTX 4090', views: 28, category: 'Gaming' },
      { id: '5', name: 'Samsung Galaxy S24 Ultra', views: 25, category: 'Smartphones' }
    ],
    mostPurchased: [
      { id: '1', name: 'MacBook Pro M3 Max', quantity: 2, totalSpent: 31998 },
      { id: '2', name: 'iPhone 15 Pro Max', quantity: 1, totalSpent: 8999 },
      { id: '3', name: 'Sony WH-1000XM5', quantity: 1, totalSpent: 1299 },
      { id: '4', name: 'NVIDIA RTX 4090', quantity: 1, totalSpent: 12999 },
      { id: '5', name: 'Samsung Galaxy S24 Ultra', quantity: 1, totalSpent: 7999 }
    ],
    wishlist: {
      totalItems: 12,
      mostWanted: [
        { id: '1', name: 'MacBook Pro M3 Max', price: 15999, category: 'Laptops' },
        { id: '2', name: 'iPhone 15 Pro Max', price: 8999, category: 'Smartphones' },
        { id: '3', name: 'Sony WH-1000XM5', price: 1299, category: 'Áudio' }
      ]
    },
    searchHistory: [
      { query: 'MacBook Pro', count: 15, lastSearched: new Date('2024-01-15') },
      { query: 'iPhone 15', count: 12, lastSearched: new Date('2024-01-14') },
      { query: 'fones de ouvido', count: 8, lastSearched: new Date('2024-01-13') },
      { query: 'RTX 4090', count: 6, lastSearched: new Date('2024-01-12') },
      { query: 'Samsung Galaxy', count: 5, lastSearched: new Date('2024-01-11') }
    ]
  },
  preferences: {
    favoriteBrands: [
      { name: 'Apple', orders: 8, spent: 18900 },
      { name: 'Sony', orders: 4, spent: 6800 },
      { name: 'NVIDIA', orders: 2, spent: 12999 },
      { name: 'Samsung', orders: 3, spent: 12800 }
    ],
    preferredPaymentMethods: [
      { method: 'PIX', usage: 12, percentage: 50 },
      { method: 'Cartão de Crédito', usage: 8, percentage: 33 },
      { method: 'Boleto', usage: 4, percentage: 17 }
    ],
    deviceUsage: [
      { device: 'Desktop', sessions: 45, percentage: 60 },
      { device: 'Mobile', sessions: 25, percentage: 33 },
      { device: 'Tablet', sessions: 5, percentage: 7 }
    ],
    timePatterns: [
      { hour: 9, activity: 15 },
      { hour: 10, activity: 25 },
      { hour: 11, activity: 30 },
      { hour: 12, activity: 20 },
      { hour: 13, activity: 10 },
      { hour: 14, activity: 35 },
      { hour: 15, activity: 40 },
      { hour: 16, activity: 45 },
      { hour: 17, activity: 35 },
      { hour: 18, activity: 25 },
      { hour: 19, activity: 30 },
      { hour: 20, activity: 35 },
      { hour: 21, activity: 25 },
      { hour: 22, activity: 15 }
    ]
  },
  recommendations: [
    {
      type: 'product',
      title: 'Produto Similar ao seu Histórico',
      description: 'Baseado nos seus pedidos anteriores, você pode gostar do MacBook Air M3',
      action: 'Ver Produto',
      priority: 'high'
    },
    {
      type: 'deal',
      title: 'Oferta Especial para Você',
      description: '20% de desconto em fones de ouvido Sony - categoria que você mais compra',
      action: 'Ver Oferta',
      priority: 'high'
    },
    {
      type: 'category',
      title: 'Nova Categoria',
      description: 'Explore nossa seção de Monitores Gaming - pode interessar você',
      action: 'Explorar',
      priority: 'medium'
    }
  ]
}

export function AdvancedAnalytics() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData)
  const [activeTab, setActiveTab] = useState<'overview' | 'spending' | 'behavior' | 'preferences'>('overview')
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: BarChart3 },
    { id: 'spending', name: 'Gastos', icon: DollarSign },
    { id: 'behavior', name: 'Comportamento', icon: Activity },
    { id: 'preferences', name: 'Preferências', icon: Target }
  ]

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Bronze': return 'from-amber-600 to-amber-800'
      case 'Silver': return 'from-gray-400 to-gray-600'
      case 'Gold': return 'from-yellow-500 to-yellow-700'
      case 'Platinum': return 'from-purple-500 to-purple-700'
      case 'Diamond': return 'from-blue-500 to-blue-700'
      default: return 'from-cyber-500 to-cyber-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-orange-500'
      case 'medium': return 'from-yellow-500 to-orange-500'
      case 'low': return 'from-green-500 to-cyan-500'
      default: return 'from-cyber-500 to-cyber-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Analytics Avançado</h2>
          <p className="text-cyber-400">
            Insights detalhados sobre seus hábitos de compra e preferências
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="year">Último Ano</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-cyber-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-cyber-400 text-sm">Total de Pedidos</p>
                  <p className="text-white font-bold text-2xl">{data.overview.totalOrders}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-cyber-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-cyber-400 text-sm">Total Gasto</p>
                  <p className="text-white font-bold text-2xl">{formatPrice(data.overview.totalSpent)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-cyber-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-cyber-400 text-sm">Ticket Médio</p>
                  <p className="text-white font-bold text-2xl">{formatPrice(data.overview.averageOrderValue)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-cyber-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-cyber-400 text-sm">Pontos de Fidelidade</p>
                  <p className="text-white font-bold text-2xl">{data.overview.loyaltyPoints.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-yellow to-cyber-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-cyber-400 text-sm">Total Economizado</p>
                  <p className="text-white font-bold text-2xl">{formatPrice(data.overview.totalSavings)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getRankColor(data.overview.rank)} rounded-lg flex items-center justify-center`}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-cyber-400 text-sm">Nível de Fidelidade</p>
                  <p className="text-white font-bold text-2xl">{data.overview.rank}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Growth Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Tendências de Crescimento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-neon-green" />
                  <span className="text-neon-green font-bold text-lg">+{data.spending.trends.weeklyGrowth}%</span>
                </div>
                <p className="text-cyber-400 text-sm">Crescimento Semanal</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-neon-blue" />
                  <span className="text-neon-blue font-bold text-lg">+{data.spending.trends.monthlyGrowth}%</span>
                </div>
                <p className="text-cyber-400 text-sm">Crescimento Mensal</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-neon-purple" />
                  <span className="text-neon-purple font-bold text-lg">+{data.spending.trends.yearlyGrowth}%</span>
                </div>
                <p className="text-cyber-400 text-sm">Crescimento Anual</p>
              </div>
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Recomendações Personalizadas</h3>
            <div className="space-y-4">
              {data.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-cyber-800/30 rounded-lg"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${getPriorityColor(rec.priority)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold mb-1">{rec.title}</h4>
                    <p className="text-cyber-400 text-sm mb-2">{rec.description}</p>
                    <Button
                      size="sm"
                      className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      {rec.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Spending Tab */}
      {activeTab === 'spending' && (
        <div className="space-y-6">
          {/* Monthly Spending Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Gastos Mensais</h3>
            <div className="space-y-4">
              {data.spending.monthly.map((month, index) => (
                <div key={month.month} className="flex items-center gap-4">
                  <div className="w-12 text-cyber-400 text-sm font-medium">{month.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{formatPrice(month.amount)}</span>
                      <span className="text-cyber-400 text-sm">{month.orders} pedido{month.orders !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="w-full bg-cyber-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all"
                        style={{ width: `${(month.amount / Math.max(...data.spending.monthly.map(m => m.amount))) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Spending */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Gastos por Categoria</h3>
            <div className="space-y-4">
              {data.spending.categories.map((category, index) => (
                <div key={category.name} className="flex items-center gap-4">
                  <div className="w-24 text-cyber-400 text-sm font-medium">{category.name}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{formatPrice(category.amount)}</span>
                      <span className="text-cyber-400 text-sm">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-cyber-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Behavior Tab */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          {/* Most Viewed Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Produtos Mais Visualizados</h3>
            <div className="space-y-3">
              {data.behavior.mostViewed.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{product.name}</h4>
                    <p className="text-cyber-400 text-sm">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{product.views} visualizações</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Search History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Histórico de Busca</h3>
            <div className="space-y-3">
              {data.behavior.searchHistory.map((search, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-cyber-600 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">"{search.query}"</h4>
                    <p className="text-cyber-400 text-sm">
                      {search.count} buscas • Última: {search.lastSearched.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          {/* Favorite Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Marcas Favoritas</h3>
            <div className="space-y-4">
              {data.preferences.favoriteBrands.map((brand, index) => (
                <div key={brand.name} className="flex items-center gap-4">
                  <div className="w-16 text-cyber-400 text-sm font-medium">{brand.name}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{brand.orders} pedidos</span>
                      <span className="text-cyber-400 text-sm">{formatPrice(brand.spent)}</span>
                    </div>
                    <div className="w-full bg-cyber-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all"
                        style={{ width: `${(brand.spent / Math.max(...data.preferences.favoriteBrands.map(b => b.spent))) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Métodos de Pagamento Preferidos</h3>
            <div className="space-y-4">
              {data.preferences.preferredPaymentMethods.map((method, index) => (
                <div key={method.method} className="flex items-center gap-4">
                  <div className="w-32 text-cyber-400 text-sm font-medium">{method.method}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{method.usage} usos</span>
                      <span className="text-cyber-400 text-sm">{method.percentage}%</span>
                    </div>
                    <div className="w-full bg-cyber-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-green to-cyber-600 h-2 rounded-full transition-all"
                        style={{ width: `${method.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Uso por Dispositivo</h3>
            <div className="space-y-4">
              {data.preferences.deviceUsage.map((device, index) => (
                <div key={device.device} className="flex items-center gap-4">
                  <div className="w-20 text-cyber-400 text-sm font-medium">{device.device}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{device.sessions} sessões</span>
                      <span className="text-cyber-400 text-sm">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-cyber-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-purple to-cyber-600 h-2 rounded-full transition-all"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
