'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Star,
  Clock,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Award,
  Gift,
  Truck,
  Shield,
  Smartphone,
  Laptop,
  Headphones
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { AdvancedAnalytics } from '@/components/analytics/advanced-analytics'
import { SmartNotifications } from '@/components/notifications/smart-notifications'
import { AdvancedSettings } from '@/components/settings/advanced-settings'

// Mock data - in real app this would come from API
const userStats = {
  totalOrders: 24,
  totalSpent: 45680,
  averageOrderValue: 1903,
  favoriteCategories: [
    { name: 'Laptops', count: 8, percentage: 33 },
    { name: 'Smartphones', count: 6, percentage: 25 },
    { name: 'Áudio', count: 4, percentage: 17 },
    { name: 'Gaming', count: 3, percentage: 12 },
    { name: 'Outros', count: 3, percentage: 13 }
  ],
  monthlySpending: [
    { month: 'Jan', amount: 3200 },
    { month: 'Fev', amount: 2800 },
    { month: 'Mar', amount: 4200 },
    { month: 'Abr', amount: 3800 },
    { month: 'Mai', amount: 5100 },
    { month: 'Jun', amount: 4800 }
  ],
  recentActivity: [
    { type: 'order', message: 'Pedido #ECM2024001 entregue', time: '2 horas atrás', icon: Package },
    { type: 'review', message: 'Avaliação de 5 estrelas para MacBook Pro', time: '1 dia atrás', icon: Star },
    { type: 'wishlist', message: 'iPhone 15 Pro adicionado aos favoritos', time: '2 dias atrás', icon: Heart },
    { type: 'price_alert', message: 'Alerta de preço: Sony WH-1000XM5', time: '3 dias atrás', icon: Bell }
  ]
}

const recentOrders = [
  {
    id: 'ECM2024001',
    date: '2024-01-15',
    status: 'delivered',
    total: 15999,
    items: ['MacBook Pro M3 Max'],
    tracking: 'BR123456789'
  },
  {
    id: 'ECM2024002',
    date: '2024-01-10',
    status: 'shipped',
    total: 17998,
    items: ['iPhone 15 Pro Max', 'AirPods Pro'],
    tracking: 'BR987654321'
  },
  {
    id: 'ECM2024003',
    date: '2024-01-05',
    status: 'processing',
    total: 8999,
    items: ['Sony WH-1000XM5'],
    tracking: null
  }
]

const wishlistItems = [
  {
    id: '1',
    name: 'RTX 4090 Gaming PC',
    price: 18999,
    originalPrice: 21999,
    image: '/images/products/rtx-4090-pc.jpg',
    addedAt: '2024-01-12',
    priceHistory: [21999, 19999, 18999]
  },
  {
    id: '2',
    name: 'Samsung Odyssey G9',
    price: 3999,
    originalPrice: 4499,
    image: '/images/products/samsung-g9.jpg',
    addedAt: '2024-01-08',
    priceHistory: [4499, 4299, 3999]
  },
  {
    id: '3',
    name: 'DJI Air 3 Drone',
    price: 5999,
    originalPrice: 6999,
    image: '/images/products/dji-air3.jpg',
    addedAt: '2024-01-03',
    priceHistory: [6999, 6499, 5999]
  }
]

const priceAlerts = [
  {
    id: '1',
    productName: 'MacBook Pro M3 Max',
    currentPrice: 15999,
    targetPrice: 14000,
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    productName: 'iPhone 15 Pro Max',
    currentPrice: 8999,
    targetPrice: 8000,
    isActive: true,
    createdAt: '2024-01-08'
  },
  {
    id: '3',
    productName: 'Sony WH-1000XM5',
    currentPrice: 1299,
    targetPrice: 1000,
    isActive: false,
    createdAt: '2024-01-05'
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('6m')

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: BarChart3 },
    { id: 'orders', name: 'Pedidos', icon: Package },
    { id: 'wishlist', name: 'Favoritos', icon: Heart },
    { id: 'alerts', name: 'Alertas', icon: Bell },
    { id: 'analytics', name: 'Analytics', icon: Activity },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'settings', name: 'Configurações', icon: Settings }
  ]

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-cyber-400">
              Gerencie sua conta e acompanhe suas atividades
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-cyber-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                  +12%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{userStats.totalOrders}</h3>
              <p className="text-cyber-400 text-sm">Pedidos Totais</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-green to-cyber-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                  +8%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{formatPrice(userStats.totalSpent)}</h3>
              <p className="text-cyber-400 text-sm">Total Gasto</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple to-cyber-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                  +5%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{formatPrice(userStats.averageOrderValue)}</h3>
              <p className="text-cyber-400 text-sm">Ticket Médio</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-pink to-cyber-600 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/50">
                  {wishlistItems.length}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{wishlistItems.length}</h3>
              <p className="text-cyber-400 text-sm">Favoritos</p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-white mb-6">Menu</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                          : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-cyber-700">
                  <h3 className="text-cyber-300 font-medium mb-4">Ações Rápidas</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </Button>
                    <Button variant="outline" className="w-full border-cyber-500 text-cyber-400 hover:border-neon-green hover:text-neon-green">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Dados
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Spending Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Gastos Mensais</h2>
                      <div className="flex items-center gap-2">
                        <select
                          value={timeRange}
                          onChange={(e) => setTimeRange(e.target.value)}
                          className="px-3 py-2 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
                        >
                          <option value="3m">3 meses</option>
                          <option value="6m">6 meses</option>
                          <option value="1y">1 ano</option>
                        </select>
                      </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2">
                      {userStats.monthlySpending.map((item, index) => (
                        <div key={item.month} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-neon-blue to-neon-purple rounded-t-lg transition-all hover:opacity-80"
                            style={{ height: `${(item.amount / 6000) * 200}px` }}
                          />
                          <span className="text-cyber-400 text-xs mt-2">{item.month}</span>
                          <span className="text-white text-xs font-medium">{formatPrice(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Categories */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-6">Categorias Favoritas</h2>
                    <div className="space-y-4">
                      {userStats.favoriteCategories.map((category, index) => (
                        <div key={category.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                              {category.name === 'Laptops' && <Laptop className="w-4 h-4 text-white" />}
                              {category.name === 'Smartphones' && <Smartphone className="w-4 h-4 text-white" />}
                              {category.name === 'Áudio' && <Headphones className="w-4 h-4 text-white" />}
                              {category.name === 'Gaming' && <Zap className="w-4 h-4 text-white" />}
                              {category.name === 'Outros' && <Package className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-white font-medium">{category.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-cyber-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all"
                                style={{ width: `${category.percentage}%` }}
                              />
                            </div>
                            <span className="text-cyber-400 text-sm w-12 text-right">{category.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-6">Atividade Recente</h2>
                    <div className="space-y-4">
                      {userStats.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-dark-700/30 rounded-lg">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                            <activity.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.message}</p>
                            <p className="text-cyber-400 text-sm">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Pedidos Recentes</h2>
                    <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                      Ver Todos
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="p-4 bg-dark-700/30 rounded-lg border border-cyber-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                              <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">{order.id}</h3>
                              <p className="text-cyber-400 text-sm">{order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">{formatPrice(order.total)}</p>
                            <Badge className={`text-xs ${
                              order.status === 'delivered' ? 'bg-neon-green/20 text-neon-green border-neon-green/50' :
                              order.status === 'shipped' ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50' :
                              'bg-neon-orange/20 text-neon-orange border-neon-orange/50'
                            }`}>
                              {order.status === 'delivered' ? 'Entregue' :
                               order.status === 'shipped' ? 'Enviado' : 'Processando'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-cyber-300 text-sm mb-1">Itens:</p>
                            <p className="text-white text-sm">{order.items.join(', ')}</p>
                          </div>
                          {order.tracking && (
                            <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                              <Truck className="w-4 h-4 mr-2" />
                              Rastrear
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Lista de Desejos</h2>
                    <Button className="cyber-button bg-gradient-to-r from-neon-pink to-neon-purple text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Gerenciar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="bg-dark-700/30 rounded-lg p-4 border border-cyber-500/20">
                        <div className="w-full h-32 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2">
                              <Package className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-cyber-400 text-xs">Imagem do Produto</p>
                          </div>
                        </div>
                        
                        <h3 className="text-white font-bold mb-2 line-clamp-2">{item.name}</h3>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-white font-bold">{formatPrice(item.price)}</p>
                            <p className="text-cyber-500 text-sm line-through">{formatPrice(item.originalPrice)}</p>
                          </div>
                          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm">
                            Comprar
                          </Button>
                          <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-red-500 hover:text-red-400">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Price Alerts Tab */}
              {activeTab === 'alerts' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Alertas de Preço</h2>
                    <Button className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                      <Bell className="w-4 h-4 mr-2" />
                      Novo Alerta
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {priceAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 bg-dark-700/30 rounded-lg border border-cyber-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-white font-bold">{alert.productName}</h3>
                            <p className="text-cyber-400 text-sm">Criado em {alert.createdAt}</p>
                          </div>
                          <Badge className={`text-xs ${
                            alert.isActive 
                              ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                              : 'bg-cyber-500/20 text-cyber-500 border-cyber-500/50'
                          }`}>
                            {alert.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-cyber-400 text-sm">Preço Atual</p>
                              <p className="text-white font-bold">{formatPrice(alert.currentPrice)}</p>
                            </div>
                            <div>
                              <p className="text-cyber-400 text-sm">Preço Alvo</p>
                              <p className="text-neon-green font-bold">{formatPrice(alert.targetPrice)}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                              Editar
                            </Button>
                            <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-red-500 hover:text-red-400">
                              Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <AdvancedAnalytics />
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <SmartNotifications />
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <AdvancedSettings />
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
