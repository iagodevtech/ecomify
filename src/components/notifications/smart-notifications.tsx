'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  BellRing, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  Gift, 
  Star, 
  Clock, 
  MapPin, 
  CreditCard, 
  Package, 
  Truck, 
  Shield, 
  Zap, 
  Crown, 
  Gem, 
  Sparkles, 
  Heart, 
  ShoppingCart, 
  Target, 
  Award, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Calendar, 
  Eye, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Send, 
  Plus, 
  Minus, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List, 
  Search, 
  Settings, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Globe, 
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
  Mouse, 
  Monitor, 
  Smartphone, 
  Tablet
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

interface Notification {
  id: string
  type: 'order' | 'promotion' | 'reminder' | 'security' | 'recommendation' | 'system'
  priority: 'high' | 'medium' | 'low'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    url: string
  }
  metadata?: {
    orderId?: string
    amount?: number
    productId?: string
    category?: string
  }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    priority: 'high',
    title: 'Pedido Confirmado',
    message: 'Seu pedido #12345 foi confirmado e está sendo preparado para envio.',
    timestamp: new Date('2024-01-15T10:30:00'),
    read: false,
    action: {
      label: 'Acompanhar Pedido',
      url: '/orders/12345'
    },
    metadata: {
      orderId: '12345',
      amount: 15999
    }
  },
  {
    id: '2',
    type: 'promotion',
    priority: 'high',
    title: 'Oferta Especial - 20% OFF',
    message: 'Aproveite 20% de desconto em todos os produtos Apple. Válido até 31/01.',
    timestamp: new Date('2024-01-15T09:15:00'),
    read: false,
    action: {
      label: 'Ver Ofertas',
      url: '/promotions/apple'
    },
    metadata: {
      category: 'Apple'
    }
  },
  {
    id: '3',
    type: 'reminder',
    priority: 'medium',
    title: 'Carrinho Abandonado',
    message: 'Você tem 3 itens no seu carrinho. Complete sua compra e ganhe 5% de desconto.',
    timestamp: new Date('2024-01-15T08:45:00'),
    read: true,
    action: {
      label: 'Finalizar Compra',
      url: '/cart'
    }
  },
  {
    id: '4',
    type: 'security',
    priority: 'high',
    title: 'Login Detectado',
    message: 'Novo login detectado em São Paulo, SP. Se não foi você, altere sua senha.',
    timestamp: new Date('2024-01-14T22:30:00'),
    read: false,
    action: {
      label: 'Verificar Segurança',
      url: '/security'
    }
  },
  {
    id: '5',
    type: 'recommendation',
    priority: 'medium',
    title: 'Produto Recomendado',
    message: 'Baseado no seu histórico, você pode gostar do MacBook Air M3.',
    timestamp: new Date('2024-01-14T16:20:00'),
    read: true,
    action: {
      label: 'Ver Produto',
      url: '/products/macbook-air-m3'
    },
    metadata: {
      productId: 'macbook-air-m3'
    }
  },
  {
    id: '6',
    type: 'system',
    priority: 'low',
    title: 'Atualização do Sistema',
    message: 'Nova versão do app disponível com melhorias de performance.',
    timestamp: new Date('2024-01-14T14:00:00'),
    read: true,
    action: {
      label: 'Atualizar',
      url: '/update'
    }
  },
  {
    id: '7',
    type: 'order',
    priority: 'medium',
    title: 'Pedido Enviado',
    message: 'Seu pedido #12340 foi enviado. Código de rastreamento: BR123456789.',
    timestamp: new Date('2024-01-14T11:15:00'),
    read: true,
    action: {
      label: 'Rastrear',
      url: '/track/BR123456789'
    },
    metadata: {
      orderId: '12340'
    }
  },
  {
    id: '8',
    type: 'promotion',
    priority: 'medium',
    title: 'Cashback Disponível',
    message: 'Você tem R$ 150,00 de cashback disponível para resgate.',
    timestamp: new Date('2024-01-13T18:30:00'),
    read: true,
    action: {
      label: 'Resgatar',
      url: '/cashback'
    },
    metadata: {
      amount: 150
    }
  }
]

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'promotion' | 'reminder' | 'security' | 'recommendation' | 'system'>('all')
  const [showAll, setShowAll] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return Package
      case 'promotion': return Gift
      case 'reminder': return Clock
      case 'security': return Shield
      case 'recommendation': return Star
      case 'system': return Settings
      default: return Bell
    }
  }

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') {
      switch (type) {
        case 'order': return 'from-neon-blue to-cyber-600'
        case 'promotion': return 'from-neon-green to-cyber-600'
        case 'reminder': return 'from-neon-yellow to-cyber-600'
        case 'security': return 'from-red-500 to-orange-500'
        case 'recommendation': return 'from-neon-purple to-cyber-600'
        case 'system': return 'from-cyber-500 to-cyber-600'
        default: return 'from-cyber-500 to-cyber-600'
      }
    } else if (priority === 'medium') {
      switch (type) {
        case 'order': return 'from-blue-500 to-blue-600'
        case 'promotion': return 'from-green-500 to-green-600'
        case 'reminder': return 'from-yellow-500 to-yellow-600'
        case 'security': return 'from-orange-500 to-orange-600'
        case 'recommendation': return 'from-purple-500 to-purple-600'
        case 'system': return 'from-gray-500 to-gray-600'
        default: return 'from-gray-500 to-gray-600'
      }
    } else {
      return 'from-gray-400 to-gray-500'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    return notification.type === filter
  })

  const displayedNotifications = showAll ? filteredNotifications : filteredNotifications.slice(0, 5)

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m atrás`
    if (hours < 24) return `${hours}h atrás`
    return `${days}d atrás`
  }

  const filters = [
    { id: 'all', name: 'Todas', count: notifications.length },
    { id: 'unread', name: 'Não Lidas', count: unreadCount },
    { id: 'order', name: 'Pedidos', count: notifications.filter(n => n.type === 'order').length },
    { id: 'promotion', name: 'Promoções', count: notifications.filter(n => n.type === 'promotion').length },
    { id: 'reminder', name: 'Lembretes', count: notifications.filter(n => n.type === 'reminder').length },
    { id: 'security', name: 'Segurança', count: notifications.filter(n => n.type === 'security').length },
    { id: 'recommendation', name: 'Recomendações', count: notifications.filter(n => n.type === 'recommendation').length },
    { id: 'system', name: 'Sistema', count: notifications.filter(n => n.type === 'system').length }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-neon-blue" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{unreadCount}</span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Notificações Inteligentes</h2>
            <p className="text-cyber-400">
              {unreadCount > 0 ? `${unreadCount} notificação${unreadCount !== 1 ? 'ões' : ''} não lida${unreadCount !== 1 ? 's' : ''}` : 'Todas as notificações foram lidas'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              size="sm"
              className="cyber-button border-cyber-500/30 text-cyber-400 hover:text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Marcar Todas como Lidas
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filterItem) => (
          <button
            key={filterItem.id}
            onClick={() => setFilter(filterItem.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              filter === filterItem.id
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
            }`}
          >
            {filterItem.name}
            {filterItem.count > 0 && (
              <Badge 
                variant="secondary" 
                className={`text-xs ${
                  filter === filterItem.id 
                    ? 'bg-neon-blue/20 text-neon-blue' 
                    : 'bg-cyber-700 text-cyber-300'
                }`}
              >
                {filterItem.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {displayedNotifications.map((notification, index) => {
            const Icon = getNotificationIcon(notification.type)
            const colorClass = getNotificationColor(notification.type, notification.priority)
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 transition-all ${
                  !notification.read ? 'ring-2 ring-neon-blue/20' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-bold text-lg">{notification.title}</h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-neon-blue rounded-full" />
                          )}
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              notification.priority === 'high' 
                                ? 'bg-red-500/20 text-red-400' 
                                : notification.priority === 'medium'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            {notification.priority === 'high' ? 'Alta' : 
                             notification.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                        </div>
                        
                        <p className="text-cyber-400 mb-3">{notification.message}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-cyber-500">
                          <span>{formatTimeAgo(notification.timestamp)}</span>
                          {notification.metadata?.orderId && (
                            <span>Pedido #{notification.metadata.orderId}</span>
                          )}
                          {notification.metadata?.amount && (
                            <span>{formatPrice(notification.metadata.amount)}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            size="sm"
                            variant="outline"
                            className="cyber-button border-cyber-500/30 text-cyber-400 hover:text-white"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        
                        {notification.action && (
                          <Button
                            size="sm"
                            className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                          >
                            {notification.action.label}
                          </Button>
                        )}
                        
                        <Button
                          onClick={() => deleteNotification(notification.id)}
                          size="sm"
                          variant="outline"
                          className="cyber-button border-red-500/30 text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Nenhuma notificação</h3>
            <p className="text-cyber-400">
              {filter === 'all' 
                ? 'Você não tem notificações no momento.' 
                : `Nenhuma notificação do tipo "${filters.find(f => f.id === filter)?.name}" encontrada.`}
            </p>
          </motion.div>
        )}

        {filteredNotifications.length > 5 && !showAll && (
          <div className="text-center">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="cyber-button border-cyber-500/30 text-cyber-400 hover:text-white"
            >
              Ver Todas ({filteredNotifications.length})
            </Button>
          </div>
        )}

        {showAll && filteredNotifications.length > 5 && (
          <div className="text-center">
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              className="cyber-button border-cyber-500/30 text-cyber-400 hover:text-white"
            >
              Ver Menos
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
