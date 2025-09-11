'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Star,
  Heart,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Zap,
  Award,
  Crown,
  Gem,
  Sparkles,
  Clock,
  Eye,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'promotion' | 'order' | 'price_alert'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    href: string
  }
  product?: {
    id: string
    name: string
    price: number
    image: string
  }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Pedido Confirmado',
    message: 'Seu pedido #ECM2024001 foi confirmado e está sendo preparado.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    action: {
      label: 'Rastrear Pedido',
      href: '/dashboard'
    }
  },
  {
    id: '2',
    type: 'price_alert',
    title: 'Alerta de Preço',
    message: 'MacBook Pro M3 Max baixou para R$ 14.999!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    product: {
      id: '1',
      name: 'MacBook Pro M3 Max',
      price: 14999,
      image: '/images/products/macbook-pro.jpg'
    }
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Oferta Especial',
    message: '20% de desconto em todos os fones de ouvido!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    action: {
      label: 'Ver Ofertas',
      href: '/promocoes'
    }
  },
  {
    id: '4',
    type: 'success',
    title: 'Pagamento Aprovado',
    message: 'Seu pagamento via PIX foi processado com sucesso.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Produto Disponível',
    message: 'iPhone 15 Pro está disponível novamente em estoque.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    read: true,
    product: {
      id: '2',
      name: 'iPhone 15 Pro',
      price: 8999,
      image: '/images/products/iphone-15-pro.jpg'
    }
  }
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return AlertCircle
    case 'warning':
      return AlertCircle
    case 'info':
      return Info
    case 'promotion':
      return Star
    case 'order':
      return Package
    case 'price_alert':
      return Bell
    default:
      return Bell
  }
}

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'from-neon-green to-cyber-600'
    case 'error':
      return 'from-red-500 to-cyber-600'
    case 'warning':
      return 'from-neon-yellow to-cyber-600'
    case 'info':
      return 'from-neon-blue to-cyber-600'
    case 'promotion':
      return 'from-neon-pink to-cyber-600'
    case 'order':
      return 'from-neon-purple to-cyber-600'
    case 'price_alert':
      return 'from-neon-green to-cyber-600'
    default:
      return 'from-cyber-500 to-cyber-600'
  }
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read
    return true
  })

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

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes} min atrás`
    } else if (hours < 24) {
      return `${hours}h atrás`
    } else {
      return `${days} dias atrás`
    }
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-cyber-400 hover:text-neon-blue transition-colors"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-green rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </div>
          )}
        </button>

        {/* Notification Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-96 bg-dark-800 border border-cyber-500/30 rounded-2xl shadow-2xl z-50"
            >
              {/* Header */}
              <div className="p-4 border-b border-cyber-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg">Notificações</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-cyber-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      filter === 'all'
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                        : 'text-cyber-400 hover:text-white'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      filter === 'unread'
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                        : 'text-cyber-400 hover:text-white'
                    }`}
                  >
                    Não lidas ({unreadCount})
                  </button>
                </div>

                {unreadCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    variant="outline"
                    size="sm"
                    className="mt-3 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    Marcar todas como lidas
                  </Button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                      <Bell className="w-8 h-8 text-cyber-500" />
                    </div>
                    <p className="text-cyber-400">
                      {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-cyber-500/20">
                    {filteredNotifications.map((notification) => {
                      const Icon = getNotificationIcon(notification.type)
                      const colorClass = getNotificationColor(notification.type)

                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 hover:bg-cyber-800/30 transition-all ${
                            !notification.read ? 'bg-cyber-800/20' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-white font-medium text-sm mb-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-cyber-400 text-sm mb-2 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  
                                  {notification.product && (
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="w-8 h-8 bg-gradient-to-br from-cyber-700 to-cyber-800 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                          {notification.product.name.charAt(0)}
                                        </span>
                                      </div>
                                      <div>
                                        <p className="text-cyber-300 text-xs font-medium">
                                          {notification.product.name}
                                        </p>
                                        <p className="text-neon-green text-xs font-bold">
                                          R$ {notification.product.price.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex items-center gap-3">
                                    <span className="text-cyber-500 text-xs">
                                      {formatTime(notification.timestamp)}
                                    </span>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-neon-blue rounded-full" />
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 ml-2">
                                  {!notification.read && (
                                    <button
                                      onClick={() => markAsRead(notification.id)}
                                      className="p-1 text-cyber-500 hover:text-neon-blue transition-colors"
                                      title="Marcar como lida"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-1 text-cyber-500 hover:text-red-400 transition-colors"
                                    title="Remover"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {notification.action && (
                                <Button
                                  size="sm"
                                  className="mt-2 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                                  onClick={() => window.location.href = notification.action!.href}
                                >
                                  {notification.action.label}
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-cyber-500/30">
                <Button
                  variant="outline"
                  className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Ver Todas as Notificações
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
