'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  TrendingDown, 
  TrendingUp,
  Smartphone,
  Mail,
  MessageSquare,
  Settings,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Zap,
  Target,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock data
const products = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    currentPrice: 15999,
    originalPrice: 17999,
    image: '/images/products/macbook-pro.jpg',
    brand: 'Apple',
    category: 'Laptops',
    rating: 4.9,
    reviewCount: 127,
    priceHistory: [
      { date: '2024-01-01', price: 17999 },
      { date: '2024-01-10', price: 16999 },
      { date: '2024-01-15', price: 15999 }
    ]
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    currentPrice: 8999,
    originalPrice: 9999,
    image: '/images/products/iphone-15-pro.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviewCount: 89,
    priceHistory: [
      { date: '2024-01-01', price: 9999 },
      { date: '2024-01-08', price: 9499 },
      { date: '2024-01-15', price: 8999 }
    ]
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    currentPrice: 1299,
    originalPrice: 1499,
    image: '/images/products/sony-wh1000xm5.jpg',
    brand: 'Sony',
    category: 'Áudio',
    rating: 4.7,
    reviewCount: 203,
    priceHistory: [
      { date: '2024-01-01', price: 1499 },
      { date: '2024-01-05', price: 1399 },
      { date: '2024-01-15', price: 1299 }
    ]
  }
]

const existingAlerts = [
  {
    id: '1',
    productId: '1',
    productName: 'MacBook Pro M3 Max',
    currentPrice: 15999,
    targetPrice: 14000,
    isActive: true,
    notificationMethods: ['email', 'whatsapp'],
    createdAt: '2024-01-10',
    lastTriggered: null,
    priceChange: -2000
  },
  {
    id: '2',
    productId: '2',
    productName: 'iPhone 15 Pro Max',
    currentPrice: 8999,
    targetPrice: 8000,
    isActive: true,
    notificationMethods: ['email', 'sms'],
    createdAt: '2024-01-08',
    lastTriggered: null,
    priceChange: -1000
  },
  {
    id: '3',
    productId: '3',
    productName: 'Sony WH-1000XM5',
    currentPrice: 1299,
    targetPrice: 1000,
    isActive: false,
    notificationMethods: ['email'],
    createdAt: '2024-01-05',
    lastTriggered: '2024-01-12',
    priceChange: -200
  }
]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('create')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [alerts, setAlerts] = useState(existingAlerts)

  const [newAlert, setNewAlert] = useState({
    targetPrice: '',
    notificationMethods: [] as string[],
    isActive: true
  })

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateAlert = () => {
    if (!selectedProduct || !newAlert.targetPrice) return

    const alert = {
      id: Date.now().toString(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      currentPrice: selectedProduct.currentPrice,
      targetPrice: parseFloat(newAlert.targetPrice),
      isActive: newAlert.isActive,
      notificationMethods: newAlert.notificationMethods,
      createdAt: new Date().toISOString().split('T')[0],
      lastTriggered: null,
      priceChange: 0
    }

    setAlerts([...alerts, alert])
    setShowCreateModal(false)
    setSelectedProduct(null)
    setNewAlert({ targetPrice: '', notificationMethods: [], isActive: true })
  }

  const toggleNotificationMethod = (method: string) => {
    setNewAlert(prev => ({
      ...prev,
      notificationMethods: prev.notificationMethods.includes(method)
        ? prev.notificationMethods.filter(m => m !== method)
        : [...prev.notificationMethods, method]
    }))
  }

  const toggleAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ))
  }

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                Alertas de Preço
              </span>
            </h1>
            <p className="text-cyber-400">
              Configure alertas para ser notificado quando seus produtos favoritos baixarem de preço
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'create'
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                  : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
              }`}
            >
              <Plus className="w-4 h-4 mr-2 inline" />
              Criar Alerta
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'manage'
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                  : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
              }`}
            >
              <Bell className="w-4 h-4 mr-2 inline" />
              Meus Alertas ({alerts.length})
            </button>
          </div>

          {/* Create Alert Tab */}
          {activeTab === 'create' && (
            <div className="space-y-8">
              {/* Search Products */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-white mb-6">Buscar Produto</h2>
                
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Digite o nome do produto ou marca..."
                    className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all"
                  />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dark-700/30 rounded-lg p-4 border border-cyber-500/20 hover:border-neon-green/50 transition-all cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="w-full h-32 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-2">
                            <span className="text-white font-bold text-lg">
                              {product.brand.charAt(0)}
                            </span>
                          </div>
                          <p className="text-cyber-400 text-xs">Imagem do Produto</p>
                        </div>
                      </div>
                      
                      <h3 className="text-white font-bold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-cyber-400 text-sm mb-3">{product.brand} • {product.category}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-white font-bold">{formatPrice(product.currentPrice)}</p>
                          <p className="text-cyber-500 text-sm line-through">{formatPrice(product.originalPrice)}</p>
                        </div>
                        <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                          -{Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)}%
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-cyber-400 text-sm">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${
                              i < Math.floor(product.rating) ? 'text-neon-yellow' : 'text-cyber-600'
                            }`}>★</span>
                          ))}
                        </div>
                        <span>({product.reviewCount})</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Create Alert Modal */}
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Criar Alerta de Preço</h2>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-cyber-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Selected Product */}
                  <div className="bg-dark-700/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {selectedProduct.brand.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{selectedProduct.name}</h3>
                        <p className="text-cyber-400 text-sm">{selectedProduct.brand}</p>
                        <p className="text-white font-bold">{formatPrice(selectedProduct.currentPrice)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Alert Configuration */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-2">
                        Preço Alvo *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                        <input
                          type="number"
                          value={newAlert.targetPrice}
                          onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                          placeholder="Digite o preço desejado"
                          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                      <p className="text-cyber-400 text-xs mt-1">
                        Você será notificado quando o preço baixar para este valor ou menos
                      </p>
                    </div>

                    <div>
                      <label className="block text-cyber-300 text-sm font-medium mb-3">
                        Métodos de Notificação
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'email', name: 'Email', icon: Mail, color: 'from-neon-blue to-cyber-600' },
                          { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'from-neon-green to-cyber-600' },
                          { id: 'sms', name: 'SMS', icon: Smartphone, color: 'from-neon-purple to-cyber-600' }
                        ].map((method) => (
                          <button
                            key={method.id}
                            onClick={() => toggleNotificationMethod(method.id)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              newAlert.notificationMethods.includes(method.id)
                                ? 'border-neon-green bg-neon-green/10'
                                : 'border-cyber-500/30 hover:border-cyber-400'
                            }`}
                          >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                              <method.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-white font-medium">{method.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="active"
                        checked={newAlert.isActive}
                        onChange={(e) => setNewAlert({ ...newAlert, isActive: e.target.checked })}
                        className="w-4 h-4 text-neon-green bg-dark-700 border-cyber-500 rounded focus:ring-neon-green"
                      />
                      <label htmlFor="active" className="text-cyber-300 text-sm">
                        Ativar alerta imediatamente
                      </label>
                    </div>

                    <Button
                      onClick={handleCreateAlert}
                      disabled={!newAlert.targetPrice || newAlert.notificationMethods.length === 0}
                      className="w-full cyber-button bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white py-3 font-cyber"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      Criar Alerta
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Manage Alerts Tab */}
          {activeTab === 'manage' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {alerts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                    <Bell className="w-16 h-16 text-cyber-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Nenhum alerta criado</h3>
                  <p className="text-cyber-400 mb-8">
                    Crie alertas para ser notificado quando seus produtos favoritos baixarem de preço
                  </p>
                  <Button
                    onClick={() => setActiveTab('create')}
                    className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Criar Primeiro Alerta
                  </Button>
                </div>
              ) : (
                alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
                          <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{alert.productName}</h3>
                          <p className="text-cyber-400 text-sm">Criado em {alert.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${
                          alert.isActive 
                            ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                            : 'bg-cyber-500/20 text-cyber-500 border-cyber-500/50'
                        }`}>
                          {alert.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                        <button
                          onClick={() => toggleAlert(alert.id)}
                          className={`p-2 rounded-lg transition-all ${
                            alert.isActive 
                              ? 'text-neon-green hover:bg-neon-green/10' 
                              : 'text-cyber-500 hover:bg-cyber-500/10'
                          }`}
                        >
                          {alert.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-cyber-400 text-sm mb-1">Preço Atual</p>
                        <p className="text-white font-bold text-lg">{formatPrice(alert.currentPrice)}</p>
                      </div>
                      <div>
                        <p className="text-cyber-400 text-sm mb-1">Preço Alvo</p>
                        <p className="text-neon-green font-bold text-lg">{formatPrice(alert.targetPrice)}</p>
                      </div>
                      <div>
                        <p className="text-cyber-400 text-sm mb-1">Diferença</p>
                        <p className={`font-bold text-lg ${
                          alert.currentPrice <= alert.targetPrice ? 'text-neon-green' : 'text-cyber-400'
                        }`}>
                          {formatPrice(alert.currentPrice - alert.targetPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-cyber-400 text-sm mb-1">Notificações</p>
                          <div className="flex items-center gap-2">
                            {alert.notificationMethods.map((method) => (
                              <div key={method} className="flex items-center gap-1">
                                {method === 'email' && <Mail className="w-4 h-4 text-neon-blue" />}
                                {method === 'whatsapp' && <MessageSquare className="w-4 h-4 text-neon-green" />}
                                {method === 'sms' && <Smartphone className="w-4 h-4 text-neon-purple" />}
                                <span className="text-cyber-300 text-sm capitalize">{method}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-cyber-500 text-cyber-400 hover:border-red-500 hover:text-red-400"
                          onClick={() => deleteAlert(alert.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>

                    {alert.lastTriggered && (
                      <div className="mt-4 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-neon-green" />
                          <span className="text-neon-green text-sm font-medium">
                            Alerta acionado em {alert.lastTriggered}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
