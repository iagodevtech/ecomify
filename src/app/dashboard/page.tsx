'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Bell, 
  TrendingUp,
  Package,
  CreditCard,
  Star,
  ArrowRight,
  LogOut
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { RecommendationSection } from '@/components/recommendations/recommendation-section'
import { useAuth } from '@/components/providers'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const stats = [
    {
      title: 'Pedidos',
      value: '12',
      change: '+2 este mês',
      icon: ShoppingBag,
      color: 'text-neon-blue'
    },
    {
      title: 'Favoritos',
      value: '8',
      change: '+3 esta semana',
      icon: Heart,
      color: 'text-neon-pink'
    },
    {
      title: 'Avaliações',
      value: '4.8',
      change: 'Média geral',
      icon: Star,
      color: 'text-neon-yellow'
    },
    {
      title: 'Gastos',
      value: 'R$ 2.450',
      change: 'Este mês',
      icon: TrendingUp,
      color: 'text-neon-green'
    }
  ]

  const recentOrders = [
    {
      id: '#12345',
      product: 'MacBook Pro M3 Max',
      date: '2024-01-15',
      status: 'Entregue',
      total: 'R$ 15.999'
    },
    {
      id: '#12346',
      product: 'iPhone 15 Pro Max',
      date: '2024-01-10',
      status: 'Em trânsito',
      total: 'R$ 8.999'
    },
    {
      id: '#12347',
      product: 'Samsung Galaxy S24',
      date: '2024-01-05',
      status: 'Processando',
      total: 'R$ 6.999'
    }
  ]

  const quickActions = [
    {
      title: 'Meus Pedidos',
      description: 'Acompanhe seus pedidos',
      icon: Package,
      href: '/pedidos',
      color: 'from-neon-blue to-neon-purple'
    },
    {
      title: 'Favoritos',
      description: 'Produtos salvos',
      icon: Heart,
      href: '/favoritos',
      color: 'from-neon-pink to-neon-purple'
    },
    {
      title: 'Configurações',
      description: 'Perfil e preferências',
      icon: Settings,
      href: '/configuracoes',
      color: 'from-neon-green to-neon-blue'
    },
    {
      title: 'Pagamentos',
      description: 'Métodos de pagamento',
      icon: CreditCard,
      href: '/pagamentos',
      color: 'from-neon-yellow to-neon-orange'
    }
  ]

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
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Olá, {user?.user_metadata?.name || user?.email?.split('@')[0]}! 👋
                </h1>
                <p className="text-cyber-300">
                  Bem-vindo ao seu painel de controle
                </p>
              </div>
              
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-cyber-500 text-cyber-400 hover:border-red-400 hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color.split('-')[1]}-500/20 to-${stat.color.split('-')[1]}-600/20 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30">
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-cyber-400 text-sm">{stat.title}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={index}
                    href={action.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="group bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-neon-blue transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-cyber-300 text-sm mb-3">
                          {action.description}
                        </p>
                        <div className="flex items-center text-neon-blue text-sm font-medium">
                          <span>Acessar</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Pedidos Recentes</h2>
              <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6">
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-cyber-500/20 last:border-b-0"
                    >
                      <div>
                        <p className="text-white font-medium">{order.product}</p>
                        <p className="text-cyber-400 text-sm">#{order.id} • {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{order.total}</p>
                        <Badge 
                          className={`text-xs ${
                            order.status === 'Entregue' 
                              ? 'bg-neon-green/20 text-neon-green border-neon-green/30'
                              : order.status === 'Em trânsito'
                              ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/30'
                              : 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30'
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  Ver Todos os Pedidos
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recommendations Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <RecommendationSection 
              title="Recomendados para Você"
              type="user"
              limit={8}
            />
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}