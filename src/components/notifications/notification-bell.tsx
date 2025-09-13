'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  X, 
  Check, 
  Trash2, 
  Package, 
  CreditCard, 
  Gift, 
  AlertCircle,
  Star,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotifications } from '@/components/providers/notification-provider'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return Package
      case 'payment':
        return CreditCard
      case 'promotion':
        return Gift
      case 'review':
        return Star
      case 'system':
        return AlertCircle
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-neon-blue'
      case 'payment':
        return 'text-neon-green'
      case 'promotion':
        return 'text-neon-pink'
      case 'review':
        return 'text-neon-yellow'
      case 'system':
        return 'text-cyber-400'
      default:
        return 'text-cyber-400'
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId)
  }

  const handleDelete = async (notificationId: string) => {
    await deleteNotification(notificationId)
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-cyber-400 hover:text-neon-blue relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-neon-pink text-white w-5 h-5 flex items-center justify-center p-0 text-xs">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-80 bg-dark-800/95 backdrop-blur-md border border-cyber-500/30 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-cyber-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Notificações</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      onClick={handleMarkAllAsRead}
                      variant="ghost"
                      size="sm"
                      className="text-cyber-400 hover:text-neon-blue text-xs"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Marcar todas
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-cyber-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-12 h-12 text-cyber-500 mx-auto mb-3" />
                  <p className="text-cyber-400">Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y divide-cyber-500/20">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type)
                    const iconColor = getNotificationColor(notification.type)
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 hover:bg-cyber-800/30 transition-colors ${
                          !notification.read ? 'bg-cyber-800/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full bg-cyber-700 flex items-center justify-center ${iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className={`text-sm font-medium ${notification.read ? 'text-cyber-300' : 'text-white'}`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-xs mt-1 ${notification.read ? 'text-cyber-500' : 'text-cyber-400'}`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Clock className="w-3 h-3 text-cyber-600" />
                                  <span className="text-xs text-cyber-600">
                                    {formatDistanceToNow(new Date(notification.created_at), { 
                                      addSuffix: true, 
                                      locale: ptBR 
                                    })}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1 ml-2">
                                {!notification.read && (
                                  <Button
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-cyber-500 hover:text-neon-blue p-1"
                                  >
                                    <Check className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button
                                  onClick={() => handleDelete(notification.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-cyber-500 hover:text-red-400 p-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-cyber-500/30">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  <a href="/notificacoes">
                    Ver Todas as Notificações
                  </a>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
