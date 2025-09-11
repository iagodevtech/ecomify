'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Check, 
  Trash2, 
  Package, 
  CreditCard, 
  Gift, 
  AlertCircle,
  Star,
  Clock,
  Filter,
  Search,
  CheckCheck
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useNotifications } from '@/components/providers'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function NotificacoesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const { 
    notifications, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications()

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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order':
        return 'Pedidos'
      case 'payment':
        return 'Pagamentos'
      case 'promotion':
        return 'Promoções'
      case 'review':
        return 'Avaliações'
      case 'system':
        return 'Sistema'
      default:
        return 'Geral'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'read' && notification.read) ||
                         (statusFilter === 'unread' && !notification.read)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId)
  }

  const handleDelete = async (notificationId: string) => {
    await deleteNotification(notificationId)
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
  }

  const NotificationCard = ({ notification }: { notification: any }) => {
    const Icon = getNotificationIcon(notification.type)
    const iconColor = getNotificationColor(notification.type)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all duration-300 ${
          !notification.read ? 'bg-cyber-800/20' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full bg-cyber-700 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-lg font-semibold ${notification.read ? 'text-cyber-300' : 'text-white'}`}>
                    {notification.title}
                  </h3>
                  <Badge className="bg-cyber-700 text-cyber-300 text-xs">
                    {getTypeLabel(notification.type)}
                  </Badge>
                </div>
                <p className={`text-sm ${notification.read ? 'text-cyber-500' : 'text-cyber-400'}`}>
                  {notification.message}
                </p>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {!notification.read && (
                  <Button
                    onClick={() => handleMarkAsRead(notification.id)}
                    variant="ghost"
                    size="sm"
                    className="text-cyber-500 hover:text-neon-blue"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(notification.id)}
                  variant="ghost"
                  size="sm"
                  className="text-cyber-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-cyber-600">
              <Clock className="w-3 h-3" />
              <span>
                {formatDistanceToNow(new Date(notification.created_at), { 
                  addSuffix: true, 
                  locale: ptBR 
                })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Notificações
              </h1>
              <p className="text-cyber-300">
                Acompanhe todas as suas notificações e atualizações
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar notificações..."
                    className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="lg:w-48">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="order">Pedidos</option>
                  <option value="payment">Pagamentos</option>
                  <option value="promotion">Promoções</option>
                  <option value="review">Avaliações</option>
                  <option value="system">Sistema</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="all">Todos os Status</option>
                  <option value="unread">Não Lidas</option>
                  <option value="read">Lidas</option>
                </select>
              </div>

              {/* Mark All as Read */}
              {unreadCount > 0 && (
                <Button
                  onClick={handleMarkAllAsRead}
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Marcar Todas
                </Button>
              )}
            </div>
          </motion.div>

          {/* Notifications List */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-cyber-300">Carregando notificações...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {notifications.length === 0 ? 'Nenhuma notificação encontrada' : 'Nenhuma notificação corresponde aos filtros'}
              </h3>
              <p className="text-cyber-400 mb-6">
                {notifications.length === 0 
                  ? 'Você ainda não recebeu nenhuma notificação'
                  : 'Tente ajustar os filtros ou limpar a busca'
                }
              </p>
              {notifications.length > 0 && (
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setTypeFilter('all')
                    setStatusFilter('all')
                  }}
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
