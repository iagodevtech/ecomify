'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  Bell,
  Zap,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers'
import { useCart } from '@/components/providers'
import { MobileNav } from './mobile-nav'
import { formatPrice } from '@/lib/utils'

const categories = [
  { name: 'Laptops & Notebooks', href: '/categoria/laptops' },
  { name: 'Smartphones', href: '/categoria/smartphones' },
  { name: 'Áudio & Som', href: '/categoria/audio' },
  { name: 'Gaming', href: '/categoria/gaming' },
  { name: 'Componentes', href: '/categoria/componentes' },
  { name: 'Monitores', href: '/categoria/monitores' },
  { name: 'Câmeras', href: '/categoria/cameras' },
  { name: 'Armazenamento', href: '/categoria/armazenamento' }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-900/95 backdrop-blur-md border-b border-cyber-500/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-cyber cyber-text">
              Ecomify
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <motion.a
              href="/produtos"
              className="text-cyber-300 hover:text-neon-blue transition-colors font-medium relative group"
            >
              Produtos
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full" />
            </motion.a>
            
            <motion.a
              href="/promocoes"
              className="text-cyber-300 hover:text-neon-blue transition-colors font-medium relative group"
            >
              Promoções
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full" />
            </motion.a>
            
            <motion.a
              href="/sobre"
              className="text-cyber-300 hover:text-neon-blue transition-colors font-medium relative group"
            >
              Sobre
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full" />
            </motion.a>
            
            <motion.a
              href="/contato"
              className="text-cyber-300 hover:text-neon-blue transition-colors font-medium relative group"
            >
              Contato
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full" />
            </motion.a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
              <input
                type="text"
                placeholder="Buscar produtos, marcas..."
                className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-cyber-400 hover:text-neon-blue"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-cyber-400 hover:text-neon-blue"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-neon-pink">
                3
              </Badge>
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-cyber-400 hover:text-neon-pink"
            >
              <Heart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-neon-pink">
                5
              </Badge>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-cyber-400 hover:text-neon-green"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-neon-green">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-cyber-400 hover:text-neon-blue"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="w-5 h-5" />
              </Button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-dark-800/95 backdrop-blur-md border border-cyber-500/30 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {user ? (
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                            <span className="text-white font-bold">
                              {user.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-cyber-400 text-sm">{user.email}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <a
                            href="/dashboard"
                            className="flex items-center gap-3 px-3 py-2 text-cyber-300 hover:text-neon-blue hover:bg-cyber-800/50 rounded-lg transition-all"
                          >
                            <Package className="w-4 h-4" />
                            Dashboard
                          </a>
                          <a
                            href="/perfil"
                            className="flex items-center gap-3 px-3 py-2 text-cyber-300 hover:text-neon-blue hover:bg-cyber-800/50 rounded-lg transition-all"
                          >
                            <User className="w-4 h-4" />
                            Meu Perfil
                          </a>
                          <a
                            href="/favoritos"
                            className="flex items-center gap-3 px-3 py-2 text-cyber-300 hover:text-neon-blue hover:bg-cyber-800/50 rounded-lg transition-all"
                          >
                            <Heart className="w-4 h-4" />
                            Favoritos
                          </a>
                          <a
                            href="/alertas"
                            className="flex items-center gap-3 px-3 py-2 text-cyber-300 hover:text-neon-blue hover:bg-cyber-800/50 rounded-lg transition-all"
                          >
                            <Bell className="w-4 h-4" />
                            Alertas
                          </a>
                          <a
                            href="/suporte"
                            className="flex items-center gap-3 px-3 py-2 text-cyber-300 hover:text-neon-blue hover:bg-cyber-800/50 rounded-lg transition-all"
                          >
                            <Bell className="w-4 h-4" />
                            Suporte
                          </a>
                          <hr className="border-cyber-700 my-2" />
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            Sair
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="space-y-3">
                          <Button className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                            Entrar
                          </Button>
                          <Button variant="outline" className="w-full border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                            Criar Conta
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-cyber-400 hover:text-neon-blue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                <input
                  type="text"
                  placeholder="Buscar produtos, marcas..."
                  className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  )
}
