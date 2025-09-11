'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Smartphone,
  MessageSquare,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  const { signIn, signUp, signInWithGoogle, signInWithFacebook, signInWithApple } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Login realizado com sucesso!')
          router.push('/dashboard')
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('As senhas não coincidem')
          return
        }
        const { error } = await signUp(formData.email, formData.password, formData.name)
        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Conta criada com sucesso!')
          setIsLogin(true)
        }
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setLoading(true)
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
        toast.error(result.error.message)
      } else {
        toast.success('Login realizado com sucesso!')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-cyber mb-2">
            <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              ECOMIFY
            </span>
          </h1>
          <p className="text-cyber-400">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
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
                    placeholder="Seu nome completo"
                    className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

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
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cyber-300 text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Sua senha"
                  className="w-full pl-10 pr-12 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                  required
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

            {!isLogin && (
              <div>
                <label className="block text-cyber-300 text-sm font-medium mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirme sua senha"
                    className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white py-3 font-cyber"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  {isLogin ? 'Entrando...' : 'Criando conta...'}
                </div>
              ) : (
                <div className="flex items-center">
                  {isLogin ? 'Entrar' : 'Criar conta'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyber-500/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-800 text-cyber-400">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="flex items-center justify-center px-4 py-3 border border-cyber-500/30 rounded-lg text-cyber-400 hover:text-white hover:border-cyber-400 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>

              <button
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
                className="flex items-center justify-center px-4 py-3 border border-cyber-500/30 rounded-lg text-cyber-400 hover:text-white hover:border-cyber-400 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              <button
                onClick={() => handleSocialLogin('apple')}
                disabled={loading}
                className="flex items-center justify-center px-4 py-3 border border-cyber-500/30 rounded-lg text-cyber-400 hover:text-white hover:border-cyber-400 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Toggle Login/Register */}
          <div className="mt-8 text-center">
            <p className="text-cyber-400">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-neon-blue hover:text-neon-purple transition-colors font-medium"
              >
                {isLogin ? 'Criar conta' : 'Entrar'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center gap-3 text-cyber-400">
            <Shield className="w-5 h-5 text-neon-green" />
            <span className="text-sm">100% Seguro</span>
          </div>
          <div className="flex items-center gap-3 text-cyber-400">
            <Zap className="w-5 h-5 text-neon-blue" />
            <span className="text-sm">Login Rápido</span>
          </div>
          <div className="flex items-center gap-3 text-cyber-400">
            <Smartphone className="w-5 h-5 text-neon-purple" />
            <span className="text-sm">Multi-dispositivo</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
