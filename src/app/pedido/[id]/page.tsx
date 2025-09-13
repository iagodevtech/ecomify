import React from 'react'
import { OrderPageClient } from './order-page-client'

// Generate static params for static export
export async function generateStaticParams() {
  // Return a list of order IDs to pre-generate
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default function OrderPage() {
  return <OrderPageClient />
}
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
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useOrders } from '@/components/providers'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getOrder } = useOrders()

  useEffect(() => {
    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const loadOrder = async () => {
    try {
      setLoading(true)
      setError(null)
      const orderData = await getOrder(orderId)
      if (orderData) {
        setOrder(orderData)
      } else {
        setError('Pedido não encontrado')
      }
    } catch (err) {
      setError('Erro ao carregar pedido')
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status: string) => {
    const statusMap = {
      pending: {
        label: 'Pendente',
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        icon: Clock,
        description: 'Aguardando confirmação do pagamento'
      },
      processing: {
        label: 'Processando',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Package,
        description: 'Preparando seu pedido'
      },
      shipped: {
        label: 'Enviado',
        color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        icon: Truck,
        description: 'Seu pedido está a caminho'
      },
      delivered: {
        label: 'Entregue',
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle,
        description: 'Pedido entregue com sucesso'
      },
      cancelled: {
        label: 'Cancelado',
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: Clock,
        description: 'Pedido cancelado'
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

  const getTrackingSteps = (status: string) => {
    const steps = [
      { id: 'pending', label: 'Pedido Confirmado', completed: true },
      { id: 'processing', label: 'Preparando', completed: ['processing', 'shipped', 'delivered'].includes(status) },
      { id: 'shipped', label: 'Enviado', completed: ['shipped', 'delivered'].includes(status) },
      { id: 'delivered', label: 'Entregue', completed: status === 'delivered' }
    ]
    return steps
  }

  if (loading) {
    return (
      <ProtectedRoute>
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
      </ProtectedRoute>
    )
  }

  if (error || !order) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-dark-900">
          <Header />
          <div className="pt-24 pb-16 flex items-center justify-center">
            <div className="text-center">
              <Package className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Pedido Não Encontrado</h1>
              <p className="text-cyber-400 mb-6">{error || 'O pedido solicitado não foi encontrado'}</p>
              <Button asChild className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Dashboard
                </Link>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    )
  }

  const statusInfo = getStatusInfo(order.status)
  const paymentStatusInfo = getPaymentStatusInfo(order.payment_status)
  const trackingSteps = getTrackingSteps(order.status)

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
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Rastreamento do Pedido
                </h1>
                <p className="text-cyber-300">
                  Acompanhe o status do seu pedido #{order.order_number}
                </p>
              </div>
              
              <Button
                onClick={loadOrder}
                variant="outline"
                className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusInfo.color}`}>
                    <statusInfo.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Status do Pedido</h2>
                    <p className="text-cyber-400">{statusInfo.description}</p>
                  </div>
                </div>

                {/* Tracking Steps */}
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-neon-green text-white' 
                          : 'bg-cyber-700 text-cyber-500'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          step.completed ? 'text-white' : 'text-cyber-500'
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
              >
                <h2 className="text-xl font-bold text-white mb-6">Itens do Pedido</h2>
                
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-dark-700/50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-cyber-400 text-sm">{item.brand}</p>
                        <p className="text-cyber-400 text-sm">Qtd: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-neon-green font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-cyber-400 text-sm">
                          {formatPrice(item.price)} cada
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
                <h2 className="text-xl font-bold text-white mb-6">Endereço de Entrega</h2>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-neon-blue mt-1" />
                  <div>
                    <p className="text-white font-medium">{order.shipping_address.name}</p>
                    <p className="text-cyber-300">{order.shipping_address.street}</p>
                    <p className="text-cyber-300">
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                    </p>
                    <p className="text-cyber-300">{order.shipping_address.country}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-white mb-6">Detalhes do Pedido</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-cyber-400" />
                    <div>
                      <p className="text-cyber-400 text-sm">Número do Pedido</p>
                      <p className="text-white font-medium">{order.order_number}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-cyber-400" />
                    <div>
                      <p className="text-cyber-400 text-sm">Data do Pedido</p>
                      <p className="text-white font-medium">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-cyber-400" />
                    <div>
                      <p className="text-cyber-400 text-sm">Método de Pagamento</p>
                      <p className="text-white font-medium capitalize">{order.payment_method}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={paymentStatusInfo.color}>
                      {paymentStatusInfo.label}
                    </Badge>
                  </div>
                </div>
                
                <div className="border-t border-cyber-500/30 pt-4 mt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-cyber-300">
                      <span>Subtotal</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-cyber-300">
                      <span>Frete</span>
                      <span>{order.shipping === 0 ? 'Grátis' : formatPrice(order.shipping)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-neon-green">
                        <span>Desconto</span>
                        <span>-{formatPrice(order.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-bold text-lg border-t border-cyber-500/30 pt-2">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button
                    asChild
                    className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                  >
                    <Link href="/dashboard">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar ao Dashboard
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Nota Fiscal
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
