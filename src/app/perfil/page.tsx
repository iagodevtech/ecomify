'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera,
  Shield,
  Bell,
  CreditCard,
  Package,
  Heart,
  Star,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad,
  Award,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  Zap
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock user data
const userData = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '+55 11 99999-9999',
  avatar: '/images/avatar.jpg',
  joinDate: '2023-06-15',
  level: 'Gold',
  points: 2450,
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
  addresses: [
    {
      id: '1',
      type: 'Casa',
      street: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      isDefault: true
    },
    {
      id: '2',
      type: 'Trabalho',
      street: 'Av. Paulista, 1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'credit',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: '2',
      type: 'pix',
      name: 'PIX',
      isDefault: false
    }
  ],
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: true
    },
    privacy: {
      profilePublic: false,
      showActivity: true,
      showWishlist: false
    }
  }
}

const recentActivity = [
  { type: 'order', message: 'Pedido #ECM2024001 entregue', time: '2 horas atrás', icon: Package },
  { type: 'review', message: 'Avaliação de 5 estrelas para MacBook Pro', time: '1 dia atrás', icon: Star },
  { type: 'wishlist', message: 'iPhone 15 Pro adicionado aos favoritos', time: '2 dias atrás', icon: Heart },
  { type: 'price_alert', message: 'Alerta de preço: Sony WH-1000XM5', time: '3 dias atrás', icon: Bell }
]

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState(userData)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: User },
    { id: 'personal', name: 'Dados Pessoais', icon: Edit },
    { id: 'addresses', name: 'Endereços', icon: MapPin },
    { id: 'payments', name: 'Pagamentos', icon: CreditCard },
    { id: 'preferences', name: 'Preferências', icon: Settings },
    { id: 'activity', name: 'Atividade', icon: Clock }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setIsEditing(false)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'from-amber-600 to-amber-800'
      case 'Silver': return 'from-gray-400 to-gray-600'
      case 'Gold': return 'from-yellow-500 to-yellow-700'
      case 'Platinum': return 'from-purple-500 to-purple-700'
      case 'Diamond': return 'from-blue-500 to-blue-700'
      default: return 'from-cyber-500 to-cyber-700'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Bronze': return Award
      case 'Silver': return Award
      case 'Gold': return Award
      case 'Platinum': return Award
      case 'Diamond': return Award
      default: return Award
    }
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Meu Perfil
              </span>
            </h1>
            <p className="text-cyber-400">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 sticky top-24">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{user.name}</h3>
                  <p className="text-cyber-400 text-sm">{user.email}</p>
                  
                  <div className="mt-4">
                    <Badge className={`bg-gradient-to-r ${getLevelColor(user.level)} text-white border-0`}>
                      <Award className="w-4 h-4 mr-1" />
                      {user.level}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-400 text-sm">Pontos</span>
                    <span className="text-white font-bold">{user.points.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-400 text-sm">Pedidos</span>
                    <span className="text-white font-bold">{user.totalOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-400 text-sm">Total Gasto</span>
                    <span className="text-white font-bold">{formatPrice(user.totalSpent)}</span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                          : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-cyber-500/30">
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:border-red-500 hover:text-red-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-cyber-600 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-cyber-400 text-sm">Total de Pedidos</p>
                          <p className="text-white font-bold text-2xl">{user.totalOrders}</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-cyber-600 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-cyber-400 text-sm">Total Gasto</p>
                          <p className="text-white font-bold text-2xl">{formatPrice(user.totalSpent)}</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-cyber-600 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-cyber-400 text-sm">Ticket Médio</p>
                          <p className="text-white font-bold text-2xl">{formatPrice(user.averageOrderValue)}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Favorite Categories */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                  >
                    <h3 className="text-white font-bold text-lg mb-4">Categorias Favoritas</h3>
                    <div className="space-y-4">
                      {user.favoriteCategories.map((category, index) => (
                        <div key={category.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyber-600 to-cyber-800 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {category.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-white font-medium">{category.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-cyber-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-1000"
                                style={{ width: `${category.percentage}%` }}
                              />
                            </div>
                            <span className="text-cyber-400 text-sm w-12 text-right">
                              {category.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                  >
                    <h3 className="text-white font-bold text-lg mb-4">Atividade Recente</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyber-600 to-cyber-800 rounded-lg flex items-center justify-center">
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

              {/* Personal Data Tab */}
              {activeTab === 'personal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-lg">Dados Pessoais</h3>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                      {isEditing ? 'Cancelar' : 'Editar'}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Nome completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Telefone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Data de cadastro
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="text"
                          value={new Date(user.joinDate).toLocaleDateString('pt-BR')}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 opacity-50"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="pt-6 border-t border-cyber-500/30">
                        <h4 className="text-white font-bold mb-4">Alterar Senha</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">
                              Senha atual
                            </label>
                            <div className="relative">
                              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.currentPassword}
                                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                placeholder="Digite sua senha atual"
                                className="w-full pl-10 pr-12 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-500 hover:text-white transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">
                              Nova senha
                            </label>
                            <div className="relative">
                              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                placeholder="Digite sua nova senha"
                                className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-cyber-300 text-sm font-medium mb-2">
                              Confirmar nova senha
                            </label>
                            <div className="relative">
                              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                placeholder="Confirme sua nova senha"
                                className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {isEditing && (
                      <div className="flex gap-3 pt-6">
                        <Button
                          onClick={handleSave}
                          className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salvar Alterações
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="border-cyber-500 text-cyber-400 hover:border-red-500 hover:text-red-400"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Other tabs would be implemented similarly */}
              {activeTab === 'addresses' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-white font-bold text-lg mb-6">Endereços</h3>
                  <p className="text-cyber-400">Funcionalidade em desenvolvimento...</p>
                </motion.div>
              )}

              {activeTab === 'payments' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-white font-bold text-lg mb-6">Métodos de Pagamento</h3>
                  <p className="text-cyber-400">Funcionalidade em desenvolvimento...</p>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-white font-bold text-lg mb-6">Preferências</h3>
                  <p className="text-cyber-400">Funcionalidade em desenvolvimento...</p>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-white font-bold text-lg mb-6">Histórico de Atividade</h3>
                  <p className="text-cyber-400">Funcionalidade em desenvolvimento...</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
