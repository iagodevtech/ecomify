'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Shield, 
  Key, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Download,
  Copy,
  QrCode,
  ArrowLeft,
  Save,
  Trash2
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { use2FA } from '@/hooks/use-2fa'

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('security')
  const [showPassword, setShowPassword] = useState(false)
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFAToken, setTwoFAToken] = useState('')
  const [disablePassword, setDisablePassword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const { twoFA, isLoading, error, generateSecret, enable2FA, disable2FA } = use2FA()

  const tabs = [
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'profile', name: 'Perfil', icon: Settings },
    { id: 'notifications', name: 'Notificações', icon: Mail }
  ]

  const handleGenerateSecret = async () => {
    setIsGenerating(true)
    await generateSecret()
    setIsGenerating(false)
  }

  const handleEnable2FA = async () => {
    if (twoFAToken.length !== 6) {
      alert('Token deve ter 6 dígitos')
      return
    }
    
    const backupCodes = await enable2FA(twoFAToken)
    if (backupCodes) {
      setShowBackupCodes(true)
    }
  }

  const handleDisable2FA = async () => {
    if (!disablePassword) {
      alert('Digite sua senha para desativar o 2FA')
      return
    }
    
    const success = await disable2FA(disablePassword)
    if (success) {
      setDisablePassword('')
      alert('2FA desativado com sucesso')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copiado para a área de transferência!')
  }

  const downloadBackupCodes = () => {
    const codes = twoFA.backupCodes.join('\n')
    const blob = new Blob([codes], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ecomify-backup-codes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-cyber-400 hover:text-neon-blue"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Configurações
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 sticky top-24"
            >
              <h2 className="text-white font-bold text-lg mb-4">Menu</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30'
                        : 'text-cyber-400 hover:text-neon-blue hover:bg-dark-700/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
            >
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-white font-bold text-2xl mb-2">Segurança da Conta</h2>
                    <p className="text-cyber-300">Gerencie as configurações de segurança da sua conta</p>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border border-cyber-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Autenticação de Dois Fatores</h3>
                        <p className="text-cyber-300 text-sm">Adicione uma camada extra de segurança</p>
                      </div>
                    </div>

                    {twoFA.isEnabled ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-neon-green" />
                          <span className="text-neon-green font-medium">2FA Ativado</span>
                        </div>
                        
                        <div className="bg-dark-700/50 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">Desativar 2FA</h4>
                          <p className="text-cyber-300 text-sm mb-4">
                            Digite sua senha para desativar a autenticação de dois fatores
                          </p>
                          <div className="flex gap-3">
                            <input
                              type="password"
                              placeholder="Sua senha atual"
                              value={disablePassword}
                              onChange={(e) => setDisablePassword(e.target.value)}
                              className="flex-1 px-3 py-2 bg-dark-800 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                            />
                            <Button
                              onClick={handleDisable2FA}
                              disabled={isLoading}
                              className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Desativar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-neon-yellow" />
                          <span className="text-neon-yellow font-medium">2FA Desativado</span>
                        </div>

                        {!twoFA.secret ? (
                          <Button
                            onClick={handleGenerateSecret}
                            disabled={isGenerating}
                            className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                          >
                            <Key className="w-4 h-4 mr-2" />
                            {isGenerating ? 'Gerando...' : 'Ativar 2FA'}
                          </Button>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-dark-700/50 rounded-lg p-4">
                              <h4 className="text-white font-medium mb-2">Configurar Aplicativo Autenticador</h4>
                              <p className="text-cyber-300 text-sm mb-4">
                                1. Instale um aplicativo autenticador (Google Authenticator, Authy, etc.)<br/>
                                2. Escaneie o QR Code ou digite a chave secreta<br/>
                                3. Digite o código de 6 dígitos gerado pelo app
                              </p>
                              
                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                  <h5 className="text-white font-medium mb-2">QR Code</h5>
                                  {twoFA.qrCode && (
                                    <div className="bg-white p-2 rounded-lg inline-block">
                                      <img src={twoFA.qrCode} alt="QR Code" className="w-32 h-32" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <h5 className="text-white font-medium mb-2">Chave Secreta</h5>
                                  <div className="flex items-center gap-2 mb-2">
                                    <code className="flex-1 px-3 py-2 bg-dark-800 border border-cyber-500/30 rounded-lg text-cyber-300 text-sm font-mono">
                                      {twoFA.secret}
                                    </code>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(twoFA.secret!)}
                                      className="text-cyber-400 hover:text-neon-blue"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <input
                                type="text"
                                placeholder="Código de 6 dígitos"
                                value={twoFAToken}
                                onChange={(e) => setTwoFAToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="flex-1 px-3 py-2 bg-dark-800 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none text-center text-lg tracking-widest"
                              />
                              <Button
                                onClick={handleEnable2FA}
                                disabled={isLoading || twoFAToken.length !== 6}
                                className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Ativar
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}
                  </div>

                  {/* Change Password */}
                  <div className="border border-cyber-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Alterar Senha</h3>
                        <p className="text-cyber-300 text-sm">Atualize sua senha para manter a conta segura</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-cyber-300 text-sm mb-2 block">Senha Atual</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Digite sua senha atual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-3 py-2 pr-10 bg-dark-800 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-400 hover:text-neon-blue"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-cyber-300 text-sm mb-2 block">Nova Senha</label>
                        <input
                          type="password"
                          placeholder="Digite sua nova senha"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-dark-800 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-cyber-300 text-sm mb-2 block">Confirmar Nova Senha</label>
                        <input
                          type="password"
                          placeholder="Confirme sua nova senha"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-dark-800 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                        />
                      </div>

                      <Button
                        className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                        disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Alterar Senha
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-white font-bold text-2xl mb-2">Perfil</h2>
                    <p className="text-cyber-300">Gerencie suas informações pessoais</p>
                  </div>
                  {/* Profile settings would go here */}
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-white font-bold text-2xl mb-2">Notificações</h2>
                    <p className="text-cyber-300">Configure como você quer receber notificações</p>
                  </div>
                  {/* Notification settings would go here */}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Backup Codes Modal */}
      {showBackupCodes && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border border-cyber-500/30 rounded-xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">2FA Ativado com Sucesso!</h3>
              <p className="text-cyber-300 text-sm">
                Salve estes códigos de backup em um local seguro. Eles podem ser usados para acessar sua conta caso você perca seu dispositivo.
              </p>
            </div>

            <div className="bg-dark-700/50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                {twoFA.backupCodes.map((code, index) => (
                  <div key={index} className="text-cyber-300 text-center py-1">
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={downloadBackupCodes}
                className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar
              </Button>
              <Button
                onClick={() => setShowBackupCodes(false)}
                variant="outline"
                className="flex-1 border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
              >
                Fechar
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}
