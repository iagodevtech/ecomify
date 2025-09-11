'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Bell,
  Zap,
  ChevronRight,
  LogOut,
  Settings,
  Package,
  CreditCard,
  BarChart3,
  Tag,
  Gift,
  Truck,
  Shield,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad,
  Monitor,
  Camera,
  HardDrive,
  Keyboard,
  Mouse,
  Speaker,
  Wifi,
  Bluetooth,
  Battery,
  Cpu,
  Memory,
  Award,
  TrendingUp,
  Star,
  Eye,
  MapPin,
  Clock,
  DollarSign,
  Percent,
  Target,
  Sparkles,
  Crown,
  Diamond,
  Fire,
  Rocket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers'
import { useCart } from '@/components/providers'

const mainCategories = [
  { 
    name: 'Laptops & Notebooks', 
    href: '/categoria/laptops',
    icon: Laptop,
    color: 'from-neon-blue to-cyber-600',
    subcategories: [
      { name: 'MacBook', href: '/categoria/laptops/macbook' },
      { name: 'Windows', href: '/categoria/laptops/windows' },
      { name: 'Gaming', href: '/categoria/laptops/gaming' },
      { name: 'Ultrabooks', href: '/categoria/laptops/ultrabooks' }
    ]
  },
  { 
    name: 'Smartphones', 
    href: '/categoria/smartphones',
    icon: Smartphone,
    color: 'from-neon-green to-cyber-600',
    subcategories: [
      { name: 'iPhone', href: '/categoria/smartphones/iphone' },
      { name: 'Samsung', href: '/categoria/smartphones/samsung' },
      { name: 'Android', href: '/categoria/smartphones/android' },
      { name: 'Acessórios', href: '/categoria/smartphones/acessorios' }
    ]
  },
  { 
    name: 'Áudio & Som', 
    href: '/categoria/audio',
    icon: Headphones,
    color: 'from-neon-purple to-cyber-600',
    subcategories: [
      { name: 'Fones de Ouvido', href: '/categoria/audio/fones' },
      { name: 'Caixas de Som', href: '/categoria/audio/caixas' },
      { name: 'Microfones', href: '/categoria/audio/microfones' },
      { name: 'Amplificadores', href: '/categoria/audio/amplificadores' }
    ]
  },
  { 
    name: 'Gaming', 
    href: '/categoria/gaming',
    icon: Gamepad,
    color: 'from-neon-pink to-cyber-600',
    subcategories: [
      { name: 'Consoles', href: '/categoria/gaming/consoles' },
      { name: 'PC Gaming', href: '/categoria/gaming/pc' },
      { name: 'Periféricos', href: '/categoria/gaming/perifericos' },
      { name: 'Jogos', href: '/categoria/gaming/jogos' }
    ]
  },
  { 
    name: 'Componentes', 
    href: '/categoria/componentes',
    icon: Cpu,
    color: 'from-neon-orange to-cyber-600',
    subcategories: [
      { name: 'Processadores', href: '/categoria/componentes/processadores' },
      { name: 'Placas de Vídeo', href: '/categoria/componentes/gpu' },
      { name: 'Memória RAM', href: '/categoria/componentes/ram' },
      { name: 'Armazenamento', href: '/categoria/componentes/armazenamento' }
    ]
  },
  { 
    name: 'Monitores', 
    href: '/categoria/monitores',
    icon: Monitor,
    color: 'from-cyan-500 to-cyber-600',
    subcategories: [
      { name: '4K', href: '/categoria/monitores/4k' },
      { name: 'Gaming', href: '/categoria/monitores/gaming' },
      { name: 'Ultrawide', href: '/categoria/monitores/ultrawide' },
      { name: 'Profissionais', href: '/categoria/monitores/profissionais' }
    ]
  }
]

const quickActions = [
  { name: 'Promoções', href: '/promocoes', icon: Tag, color: 'from-red-500 to-orange-500' },
  { name: 'Novidades', href: '/novidades', icon: Sparkles, color: 'from-neon-blue to-neon-purple' },
  { name: 'Mais Vendidos', href: '/mais-vendidos', icon: TrendingUp, color: 'from-neon-green to-cyber-600' },
  { name: 'Frete Grátis', href: '/frete-gratis', icon: Truck, color: 'from-neon-purple to-neon-pink' }
]

const userMenuItems = [
  { name: 'Meu Perfil', href: '/dashboard', icon: User },
  { name: 'Meus Pedidos', href: '/pedidos', icon: Package },
  { name: 'Favoritos', href: '/favoritos', icon: Heart },
  { name: 'Alertas de Preço', href: '/alertas', icon: Bell },
  { name: 'Comparar Produtos', href: '/comparar', icon: BarChart3 },
  { name: 'Cupons', href: '/cupons', icon: Gift },
  { name: 'Pagamentos', href: '/pagamentos', icon: CreditCard },
  { name: 'Configurações', href: '/configuracoes', icon: Settings }
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, signOut } = useAuth()
  const { itemCount } = useCart()

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Navigation Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-dark-900/95 backdrop-blur-md border-r border-cyber-500/30 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyber-500/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-cyber cyber-text">Ecomify</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-cyber-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-cyber-500/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyber-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* User Section */}
            {user ? (
              <div className="p-4 border-b border-cyber-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-cyber-400 text-sm">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-dark-800/30 rounded-lg">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gradient-to-br from-neon-green to-cyber-600 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-cyber-300 text-xs">Carrinho</p>
                    <Badge className="bg-neon-green text-white text-xs mt-1">
                      {itemCount}
                    </Badge>
                  </div>
                  <div className="text-center p-2 bg-dark-800/30 rounded-lg">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gradient-to-br from-neon-pink to-cyber-600 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-cyber-300 text-xs">Favoritos</p>
                    <Badge className="bg-neon-pink text-white text-xs mt-1">
                      5
                    </Badge>
                  </div>
                  <div className="text-center p-2 bg-dark-800/30 rounded-lg">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gradient-to-br from-neon-purple to-cyber-600 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-cyber-300 text-xs">Alertas</p>
                    <Badge className="bg-neon-purple text-white text-xs mt-1">
                      3
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b border-cyber-500/30">
                <div className="space-y-2">
                  <Button className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                    Entrar
                  </Button>
                  <Button variant="outline" className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                    Criar Conta
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="p-4 border-b border-cyber-500/30">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-yellow" />
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <a
                    key={action.name}
                    href={action.href}
                    className="flex items-center gap-2 p-2 bg-dark-800/30 rounded-lg hover:bg-cyber-800/50 transition-all"
                    onClick={onClose}
                  >
                    <div className={`w-6 h-6 rounded bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-cyber-300 text-sm">{action.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="p-4">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Menu className="w-4 h-4 text-neon-blue" />
                Categorias
              </h3>
              <div className="space-y-1">
                {mainCategories.map((category) => (
                  <div key={category.name}>
                    <button
                      onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-cyber-800/50 rounded-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-cyber-300 font-medium">{category.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-cyber-500 transition-transform ${
                        activeCategory === category.name ? 'rotate-90' : ''
                      }`} />
                    </button>

                    <AnimatePresence>
                      {activeCategory === category.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {category.subcategories.map((subcategory) => (
                            <a
                              key={subcategory.name}
                              href={subcategory.href}
                              className="block p-2 text-cyber-400 hover:text-neon-blue hover:bg-cyber-800/30 rounded-lg transition-all text-sm"
                              onClick={onClose}
                            >
                              {subcategory.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* User Menu Items */}
            {user && (
              <div className="p-4 border-t border-cyber-500/30">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-neon-green" />
                  Minha Conta
                </h3>
                <div className="space-y-1">
                  {userMenuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 p-2 text-cyber-300 hover:text-neon-blue hover:bg-cyber-800/50 rounded-lg transition-all"
                      onClick={onClose}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.name}</span>
                    </a>
                  ))}
                  <hr className="border-cyber-700 my-2" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sair</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-4 border-t border-cyber-500/30 mt-auto">
              <div className="text-center">
                <p className="text-cyber-400 text-xs mb-2">
                  © 2024 Ecomify. Todos os direitos reservados.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="/sobre" className="text-cyber-400 hover:text-neon-blue text-xs">
                    Sobre
                  </a>
                  <a href="/contato" className="text-cyber-400 hover:text-neon-blue text-xs">
                    Contato
                  </a>
                  <a href="/ajuda" className="text-cyber-400 hover:text-neon-blue text-xs">
                    Ajuda
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
