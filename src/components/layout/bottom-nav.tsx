'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home,
  Search,
  ShoppingCart,
  Heart,
  User,
  Bell,
  Package,
  BarChart3,
  Tag,
  Gift,
  Truck,
  Zap
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/providers'

const navItems = [
  {
    name: 'Início',
    href: '/',
    icon: Home,
    color: 'from-neon-blue to-cyber-600'
  },
  {
    name: 'Buscar',
    href: '/busca',
    icon: Search,
    color: 'from-neon-green to-cyber-600'
  },
  {
    name: 'Carrinho',
    href: '/carrinho',
    icon: ShoppingCart,
    color: 'from-neon-purple to-cyber-600',
    badge: true
  },
  {
    name: 'Favoritos',
    href: '/favoritos',
    icon: Heart,
    color: 'from-neon-pink to-cyber-600',
    badge: true
  },
  {
    name: 'Perfil',
    href: '/dashboard',
    icon: User,
    color: 'from-neon-orange to-cyber-600'
  }
]

const quickActions = [
  {
    name: 'Promoções',
    href: '/promocoes',
    icon: Tag,
    color: 'from-red-500 to-orange-500'
  },
  {
    name: 'Alertas',
    href: '/alertas',
    icon: Bell,
    color: 'from-neon-purple to-neon-pink',
    badge: true
  },
  {
    name: 'Comparar',
    href: '/comparar',
    icon: BarChart3,
    color: 'from-neon-blue to-neon-purple'
  },
  {
    name: 'Pedidos',
    href: '/pedidos',
    icon: Package,
    color: 'from-neon-green to-cyber-600'
  }
]

interface BottomNavProps {
  currentPath?: string
}

export function BottomNav({ currentPath = '/' }: BottomNavProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { itemCount } = useCart()

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/'
    return currentPath.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Quick Actions Panel */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: isExpanded ? 0 : 100, 
          opacity: isExpanded ? 1 : 0 
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-full left-0 right-0 bg-dark-900/95 backdrop-blur-md border-t border-cyber-500/30 p-4"
      >
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <a
              key={action.name}
              href={action.href}
              className="flex flex-col items-center gap-2 p-3 bg-dark-800/50 rounded-lg hover:bg-cyber-800/50 transition-all"
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                {action.badge && action.name === 'Alertas' && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-neon-pink">
                    3
                  </Badge>
                )}
              </div>
              <span className="text-cyber-300 text-xs text-center">{action.name}</span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Main Navigation */}
      <div className="bg-dark-900/95 backdrop-blur-md border-t border-cyber-500/30">
        <div className="flex items-center justify-between px-2 py-2">
          {/* Navigation Items */}
          <div className="flex items-center justify-around flex-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  isActive(item.href) 
                    ? 'bg-neon-blue/20 text-neon-blue' 
                    : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
                }`}
              >
                <div className="relative">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive(item.href) 
                      ? `bg-gradient-to-br ${item.color}` 
                      : 'bg-cyber-800/50'
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  {item.badge && item.name === 'Carrinho' && itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs bg-neon-green">
                      {itemCount}
                    </Badge>
                  )}
                  {item.badge && item.name === 'Favoritos' && (
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs bg-neon-pink">
                      5
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Expand Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`ml-2 p-2 rounded-lg transition-all ${
              isExpanded 
                ? 'bg-neon-blue/20 text-neon-blue' 
                : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
            }`}
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Zap className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
