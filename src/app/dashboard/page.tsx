'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Package, 
  Heart, 
  Bell, 
  Settings, 
  CreditCard, 
  MapPin, 
  Shield,
  TrendingUp,
  ShoppingCart,
  Eye,
  Star,
  Calendar,
  Clock,
  Zap,
  Award,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/stripe'

// Mock data - em produção viria do contexto/API
const userStats = {
  totalOrders: 12,
  totalSpent: 45600,
  favoriteItems: 8,
  reviewsWritten: 5,
  memberSince: '2023-06-15'
}

const recentOrders = [
  {
    id: 'EC202401150001',
    date: '2024-01-15',
    status: 'delivered',
    total: 15999,
    items: 1,
    product: 'MacBook Pro 16" M3 Max'
  },
  {
    id: 'EC202401100002',
    date: '2024-01-10',
    status: 'shipped',
    total: 17998,
    items: 2,
    product: 'iPhone 15 Pro Max'
  },
  {
    id: 'EC202401050003',
    date: '2024-01-05',
    status: 'processing',
    total: 7999,
    items: 1,
    product: 'Samsung Galaxy S24 Ultra'
  }
]

const wishlistItems = [
  {
    id: '1',
    name: 'Dell XPS 15',
    price: 12999,
    image: '/images/products/dell-xps.jpg',
    addedDate: '2024-01-14'
  },
  {
    id: '2',
    name: 'AirPods Pro 2',
    price: 2499,
    image: '/images/products/airpods-pro.jpg',
    addedDate: '2024-01-12'
  }
]

const notifications = [
  {
    id: '1',
    type: 'order',
    title: 'Pedido entregue!',
    message: 'Seu MacBook Pro foi entregue com sucesso.',
    date: '2024-01-15T14:30:00Z',
    read: false
  },
  {
    id: '2',
    type: 'promotion',
    title: 'Oferta especial!',
    message: '20% de desconto em todos os smartphones.',
    date: '2024-01-14T10:00:00Z',
    read: true
  },
  {
    id: '3',
    type: 'review',
    title: 'Avalie sua compra',
    message: 'Que tal avaliar seu iPhone 15 Pro Max?',
    date: '2024-01-12T16:45:00Z',
    read: true
  }
]

const quickActions = [
  { name: 'Meus Pedidos', icon: Package, href: '/meus-pedidos', color: 'text-neon-blue' },
  { name: 'Favoritos', icon: Heart, href: '/favoritos', color: 'text-neon-pink' },
  { name: 'Endereços', icon: MapPin, href: '/enderecos', color: 'text-neon-green' },
  { name: 'Pagamentos', icon: CreditCard, href: '/pagamentos', color: 'text-neon-purple' },
  { name: 'Notificações', icon: Bell, href: '/notificacoes', color: 'text-neon-yellow' },
  { name: 'Configurações', icon: Settings, href: '/configuracoes', color: 'text-cyber-400' }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-neon-green/20 text-neon-green border-neon-green/30'
      case 'shipped':
        return 'bg-neon-blue/20 text-neon-blue border-neon-blue/30'
      case 'processing':
        return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30'
      default:
        return 'bg-cyber-400/20 text-cyber-400 border-cyber-400/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue'
      case 'shipped':
        return 'Enviado'
      case 'processing':
        return 'Processando'
      default:
        return status
    }
  }

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: BarChart3 },
    { id: 'orders', name: 'Pedidos', icon: Package },
    { id: 'wishlist', name: 'Favoritos', icon: Heart },
    { id: 'notifications', name: 'Notificações', icon: Bell }
  ]

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
            <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Meu Dashboard
              </h1>
              <p className="text-cyber-300">Bem-vindo de volta! Aqui está um resumo da sua conta.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {quickActions.map((action, index) => (
            <motion.a
              key={action.name}
              href={action.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-4 hover:border-neon-blue/50 transition-all group cursor-pointer"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <h3 className="text-white font-medium text-sm">{action.name}</h3>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">{userStats.totalOrders}</h3>
                <p className="text-cyber-300 text-sm">Pedidos Realizados</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">{formatPrice(userStats.totalSpent)}</h3>
                <p className="text-cyber-300 text-sm">Total Gasto</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-purple rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">{userStats.favoriteItems}</h3>
                <p className="text-cyber-300 text-sm">Favoritos</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-yellow to-neon-orange rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">{userStats.reviewsWritten}</h3>
                <p className="text-cyber-300 text-sm">Avaliações</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-cyber-500/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-all ${
                  activeTab === tab.id
                    ? 'bg-neon-blue/10 text-neon-blue border-b-2 border-neon-blue'
                    : 'text-cyber-400 hover:text-neon-blue hover:bg-dark-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Orders */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Pedidos Recentes</h3>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 3).map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{order.product}</h4>
                            <p className="text-cyber-400 text-sm">
                              {order.id} • {new Date(order.date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{formatPrice(order.total)}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Wishlist Preview */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Favoritos Recentes</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {wishlistItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-neon-pink" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-cyber-400 text-sm">
                            Adicionado em {new Date(item.addedDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{formatPrice(item.price)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{order.product}</h3>
                        <p className="text-cyber-400 text-sm">
                          Pedido #{order.id} • {order.items} {order.items === 1 ? 'item' : 'itens'}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-cyber-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(order.date).toLocaleTimeString('pt-BR')}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{formatPrice(order.total)}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-dark-700/50 rounded-lg p-4 hover:bg-dark-700/70 transition-colors"
                  >
                    <div className="w-full h-32 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-lg flex items-center justify-center mb-4">
                      <Heart className="w-12 h-12 text-neon-pink" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                    <p className="text-cyber-400 text-sm mb-3">
                      Adicionado em {new Date(item.addedDate).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-bold">{formatPrice(item.price)}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                      >
                        Ver Produto
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.read
                        ? 'bg-dark-700/30 border-cyber-500/20'
                        : 'bg-neon-blue/10 border-neon-blue/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notification.type === 'order' ? 'bg-neon-green/20' :
                        notification.type === 'promotion' ? 'bg-neon-purple/20' :
                        'bg-neon-yellow/20'
                      }`}>
                        {notification.type === 'order' && <Package className="w-5 h-5 text-neon-green" />}
                        {notification.type === 'promotion' && <Zap className="w-5 h-5 text-neon-purple" />}
                        {notification.type === 'review' && <Star className="w-5 h-5 text-neon-yellow" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{notification.title}</h4>
                        <p className="text-cyber-300 text-sm mb-2">{notification.message}</p>
                        <p className="text-cyber-400 text-xs">
                          {new Date(notification.date).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}