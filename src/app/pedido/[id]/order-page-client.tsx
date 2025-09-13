'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  CreditCard,
  Calendar,
  Hash,
  ArrowLeft,
  Download,
  RefreshCw
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

export function OrderPageClient() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const loadOrder = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call - in real app, this would fetch from your API
      const mockOrder = {
        id: orderId,
        order_number: `ECM${orderId.padStart(6, '0')}`,
        status: 'processing',
        total: 15999,
        subtotal: 14500,
        shipping_cost: 0,
        payment_fee: 499,
        payment_method: 'credit_card',
        payment_status: 'paid',
        shipping_address: {
          name: 'João Silva',
          street: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zip: '01234-567',
          country: 'Brasil'
        },
        billing_address: {
          name: 'João Silva',
          street: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zip: '01234-567',
          country: 'Brasil'
        },
        items: [
          {
            id: '1',
            product_id: '1',
            name: 'MacBook Pro 16" M3 Max',
            price: 14500,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200'
          }
        ],
        tracking_number: 'BR123456789SP',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T14:20:00Z',
        estimated_delivery: '2024-01-20T18:00:00Z'
      }
      
      setOrder(mockOrder)
    } catch (err) {
      setError('Erro ao carregar pedido')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'processing': return 'Processando'
      case 'shipped': return 'Enviado'
      case 'delivered': return 'Entregue'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'refunded': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'paid': return 'Pago'
      case 'failed': return 'Falhou'
      case 'refunded': return 'Reembolsado'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-cyber-300">Carregando pedido...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Pedido Não Encontrado</h1>
            <p className="text-cyber-400 mb-6">{error || 'O pedido solicitado não foi encontrado'}</p>
            <Button asChild className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
              <Link href="/pedidos">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Pedidos
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-cyber-400 hover:text-neon-blue">
              Início
            </Link>
            <span className="text-cyber-600">/</span>
            <Link href="/pedidos" className="text-cyber-400 hover:text-neon-blue">
              Pedidos
            </Link>
            <span className="text-cyber-600">/</span>
            <span className="text-white">Pedido #{order.order_number}</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Pedido #{order.order_number}
              </h1>
              <p className="text-cyber-300">
                Realizado em {new Date(order.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
              <Badge className={getPaymentStatusColor(order.payment_status)}>
                {getPaymentStatusText(order.payment_status)}
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-neon-blue" />
                Itens do Pedido
              </h2>
              
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-dark-700/30 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-cyber-300 text-sm">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-neon-green font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-neon-blue" />
                Endereço de Entrega
              </h2>
              
              <div className="text-cyber-300">
                <p className="font-medium text-white">{order.shipping_address.name}</p>
                <p>{order.shipping_address.street}</p>
                <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</p>
                <p>{order.shipping_address.country}</p>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-cyber-300">
                  <span>Subtotal:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-cyber-300">
                  <span>Frete:</span>
                  <span>{order.shipping_cost > 0 ? formatPrice(order.shipping_cost) : 'Grátis'}</span>
                </div>
                <div className="flex justify-between text-cyber-300">
                  <span>Taxa de pagamento:</span>
                  <span>{formatPrice(order.payment_fee)}</span>
                </div>
                <div className="border-t border-cyber-500/30 pt-3">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-neon-green">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neon-blue" />
                Informações de Pagamento
              </h2>
              
              <div className="space-y-3 text-cyber-300">
                <div className="flex justify-between">
                  <span>Método:</span>
                  <span className="text-white">Cartão de Crédito</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge className={getPaymentStatusColor(order.payment_status)}>
                    {getPaymentStatusText(order.payment_status)}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Tracking Info */}
            {order.tracking_number && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-neon-blue" />
                  Rastreamento
                </h2>
                
                <div className="space-y-3 text-cyber-300">
                  <div className="flex justify-between">
                    <span>Código de rastreamento:</span>
                    <span className="text-white font-mono">{order.tracking_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Previsão de entrega:</span>
                    <span className="text-white">
                      {new Date(order.estimated_delivery).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Truck className="w-4 h-4 mr-2" />
                  Rastrear Pedido
                </Button>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <Button className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                <Download className="w-4 h-4 mr-2" />
                Baixar Nota Fiscal
              </Button>
              
              <Button variant="outline" className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar Status
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
