'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Search, 
  Filter, 
  Calendar,
  CreditCard,
  MapPin,
  Eye,
  Download,
  RefreshCw,
  ArrowRight
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useOrders } from '@/components/providers'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

export default function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const { orders, loading, syncOrders } = useOrders()

  useEffect(() => {
    syncOrders()
  }, [syncOrders])

  const getStatusInfo = (status: string) => {
    const statusMap = {
      pending: {
        label: 'Pendente',
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      },
      processing: {
        label: 'Processando',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      },
      shipped: {
        label: 'Enviado',
        color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      },
      delivered: {
        label: 'Entregue',
        color: 'bg-green-500/20 text-green-400 border-green-500/30'
      },
      cancelled: {
        label: 'Cancelado',
        color: 'bg-red-500/20 text-red-400 border-red-500/30'
      }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const getPaymentStatusInfo = (status: string) => {
    const statusMap = {
      pending: {
        label: 'Pendente',
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      },
      paid: {
        label: 'Pago',
        color: 'bg-green-500/20 text-green-400 border-green-500/30'
      },
      failed: {
        label: 'Falhou',
        color: 'bg-red-500/20 text-red-400 border-red-500/30'
      },
      refunded: {
        label: 'Reembolsado',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === '30' && new Date(order.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === '90' && new Date(order.created_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === '365' && new Date(order.created_at) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const OrderCard = ({ order }: { order: any }) => {
    const statusInfo = getStatusInfo(order.status)
    const paymentStatusInfo = getPaymentStatusInfo(order.payment_status)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Pedido #{order.order_number}
            </h3>
            <p className="text-cyber-400 text-sm">
              {new Date(order.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusInfo.color}>
              {statusInfo.label}
            </Badge>
            <Badge className={paymentStatusInfo.color}>
              {paymentStatusInfo.label}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-cyber-400" />
            <div>
              <p className="text-cyber-400 text-sm">Pagamento</p>
              <p className="text-white font-medium capitalize">{order.payment_method}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-cyber-400" />
            <div>
              <p className="text-cyber-400 text-sm">Entrega</p>
              <p className="text-white font-medium">{order.shipping_address.city}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-cyber-400 text-sm">Total</p>
            <p className="text-neon-green font-bold text-lg">
              {formatPrice(order.total)}
            </p>
          </div>
          <div>
            <p className="text-cyber-400 text-sm">Itens</p>
            <p className="text-white font-medium">
              {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            asChild
            className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
          >
            <Link href={`/pedido/${order.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <Download className="w-4 h-4" />
          </Button>
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
                Meus Pedidos
              </h1>
              <p className="text-cyber-300">
                Acompanhe todos os seus pedidos e compras
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
                    placeholder="Buscar por número do pedido ou produto..."
                    className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendente</option>
                  <option value="processing">Processando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="lg:w-48">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="all">Todas as Datas</option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="90">Últimos 90 dias</option>
                  <option value="365">Último ano</option>
                </select>
              </div>

              {/* Refresh Button */}
              <Button
                onClick={syncOrders}
                variant="outline"
                className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </motion.div>

          {/* Orders List */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-cyber-300">Carregando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {orders.length === 0 ? 'Nenhum pedido encontrado' : 'Nenhum pedido corresponde aos filtros'}
              </h3>
              <p className="text-cyber-400 mb-6">
                {orders.length === 0 
                  ? 'Você ainda não fez nenhum pedido. Que tal começar a comprar?'
                  : 'Tente ajustar os filtros ou limpar a busca'
                }
              </p>
              {orders.length === 0 ? (
                <Button
                  asChild
                  className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                >
                  <Link href="/">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Começar a Comprar
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setDateFilter('all')
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
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
