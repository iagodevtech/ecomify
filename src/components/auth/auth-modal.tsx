'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  Check,
  AlertCircle,
  Zap,
  Google,
  Facebook,
  Apple
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers'
import { validateEmail } from '@/lib/utils'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register' | 'forgot'
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { signIn, signUp, signInWithGoogle, signInWithFacebook, signInWithApple, resetPassword } = useAuth()

  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })

  const [forgotData, setForgotData] = useState({
    email: ''
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (mode === 'login') {
      if (!loginData.email) newErrors.email = 'Email é obrigatório'
      else if (!validateEmail(loginData.email)) newErrors.email = 'Email inválido'
      if (!loginData.password) newErrors.password = 'Senha é obrigatória'
    }

    if (mode === 'register') {
      if (!registerData.name) newErrors.name = 'Nome é obrigatório'
      if (!registerData.email) newErrors.email = 'Email é obrigatório'
      else if (!validateEmail(registerData.email)) newErrors.email = 'Email inválido'
      if (!registerData.phone) newErrors.phone = 'Telefone é obrigatório'
      if (!registerData.password) newErrors.password = 'Senha é obrigatória'
      else if (registerData.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
      if (registerData.password !== registerData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem'
      }
      if (!registerData.acceptTerms) newErrors.acceptTerms = 'Você deve aceitar os termos'
    }

    if (mode === 'forgot') {
      if (!forgotData.email) newErrors.email = 'Email é obrigatório'
      else if (!validateEmail(forgotData.email)) newErrors.email = 'Email inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await signIn(loginData.email, loginData.password)
      if (result.error) {
        setErrors({ general: 'Email ou senha incorretos' })
      } else {
        onClose()
      }
    } catch (error) {
      setErrors({ general: 'Erro ao fazer login' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await signUp(registerData.email, registerData.password, registerData.name)
      if (result.error) {
        setErrors({ general: 'Erro ao criar conta' })
      } else {
        onClose()
      }
    } catch (error) {
      setErrors({ general: 'Erro ao criar conta' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await resetPassword(forgotData.email)
      if (result.error) {
        setErrors({ general: 'Erro ao enviar email de recuperação' })
      } else {
        setMode('login')
        setErrors({})
      }
    } catch (error) {
      setErrors({ general: 'Erro ao enviar email de recuperação' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true)
    try {
      let result
      switch (provider) {
        case 'google':
          result = await signInWithGoogle()
          break
        case 'facebook':
          result = await signInWithFacebook()
          break
        case 'apple':
          result = await signInWithApple()
          break
      }
      
      if (result?.error) {
        setErrors({ general: 'Erro ao fazer login com ' + provider })
      } else {
        onClose()
      }
    } catch (error) {
      setErrors({ general: 'Erro ao fazer login com ' + provider })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-dark-800/95 backdrop-blur-md border border-cyber-500/30 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-cyber-500/30">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-cyber-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-cyber text-white">
                  {mode === 'login' && 'Entrar'}
                  {mode === 'register' && 'Criar Conta'}
                  {mode === 'forgot' && 'Recuperar Senha'}
                </h2>
                <p className="text-cyber-400 text-sm">
                  {mode === 'login' && 'Acesse sua conta Ecomify'}
                  {mode === 'register' && 'Junte-se à revolução tecnológica'}
                  {mode === 'forgot' && 'Enviaremos um link de recuperação'}
                </p>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setMode('login')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === 'login'
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                    : 'text-cyber-400 hover:text-white'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setMode('register')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === 'register'
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                    : 'text-cyber-400 hover:text-white'
                }`}
              >
                Criar Conta
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* General Error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm mb-4"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.general}
              </motion.div>
            )}

            {/* Login Form */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`w-full pl-10 pr-12 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={loginData.rememberMe}
                      onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                      className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue"
                    />
                    <span className="text-cyber-400 text-sm">Lembrar de mim</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-neon-blue hover:text-neon-blue/80 text-sm transition-colors"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-3 font-cyber"
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            )}

            {/* Register Form */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={`w-full pl-10 pr-12 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="Confirme sua senha"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={registerData.acceptTerms}
                      onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                      className="w-4 h-4 text-neon-blue bg-dark-700 border-cyber-500 rounded focus:ring-neon-blue mt-0.5"
                    />
                    <span className="text-cyber-400 text-sm">
                      Eu aceito os{' '}
                      <a href="/termos" className="text-neon-blue hover:text-neon-blue/80">
                        Termos de Uso
                      </a>{' '}
                      e{' '}
                      <a href="/privacidade" className="text-neon-blue hover:text-neon-blue/80">
                        Política de Privacidade
                      </a>
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="text-red-400 text-xs mt-1">{errors.acceptTerms}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-3 font-cyber"
                >
                  {isLoading ? 'Criando Conta...' : 'Criar Conta'}
                </Button>
              </form>
            )}

            {/* Forgot Password Form */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-cyber-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                    <input
                      type="email"
                      value={forgotData.email}
                      onChange={(e) => setForgotData({ ...forgotData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-lg text-white placeholder-cyber-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-cyber-500/30 focus:border-neon-blue focus:ring-neon-blue/20'
                      }`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-3 font-cyber"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                </Button>
              </form>
            )}

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cyber-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-800 text-cyber-400">Ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  <Google className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                >
                  <Apple className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
