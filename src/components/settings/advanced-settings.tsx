'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Globe, 
  Palette, 
  Zap, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Package, 
  Truck, 
  Heart, 
  Star, 
  Target, 
  Award, 
  Crown, 
  Gem, 
  Sparkles, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List, 
  Search, 
  Calendar, 
  Clock, 
  DollarSign, 
  Percent, 
  Users, 
  MousePointer, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Wifi, 
  Bluetooth, 
  Battery, 
  Cpu, 
  Memory, 
  HardDrive, 
  Camera, 
  Gamepad, 
  Speaker, 
  Headphones, 
  Keyboard, 
  Mouse, 
  Save, 
  RefreshCw, 
  Trash2, 
  Download, 
  Upload, 
  Copy, 
  Share2, 
  ExternalLink, 
  Info, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  ToggleLeft, 
  ToggleRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SettingsData {
  profile: {
    name: string
    email: string
    phone: string
    avatar: string
    bio: string
    location: string
    birthDate: string
    gender: string
  }
  preferences: {
    theme: 'dark' | 'light' | 'auto'
    language: string
    currency: string
    timezone: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
      marketing: boolean
      orderUpdates: boolean
      promotions: boolean
      security: boolean
    }
    privacy: {
      profileVisibility: 'public' | 'private' | 'friends'
      showEmail: boolean
      showPhone: boolean
      showLocation: boolean
      allowTracking: boolean
      dataSharing: boolean
    }
  }
  security: {
    twoFactor: boolean
    biometric: boolean
    sessionTimeout: number
    loginAlerts: boolean
    deviceTrust: boolean
    passwordExpiry: number
  }
  payment: {
    defaultMethod: string
    savedCards: Array<{
      id: string
      last4: string
      brand: string
      expiry: string
    }>
    billingAddress: {
      street: string
      city: string
      state: string
      zip: string
      country: string
    }
  }
  shipping: {
    defaultAddress: {
      street: string
      city: string
      state: string
      zip: string
      country: string
    }
    preferences: {
      expressShipping: boolean
      weekendDelivery: boolean
      signatureRequired: boolean
      leaveAtDoor: boolean
    }
  }
}

const mockSettingsData: SettingsData = {
  profile: {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 11 99999-9999',
    avatar: '/avatars/joao.jpg',
    bio: 'Entusiasta de tecnologia e gaming',
    location: 'São Paulo, SP',
    birthDate: '1990-05-15',
    gender: 'Masculino'
  },
  preferences: {
    theme: 'dark',
    language: 'pt-BR',
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true,
      orderUpdates: true,
      promotions: true,
      security: true
    },
    privacy: {
      profileVisibility: 'private',
      showEmail: false,
      showPhone: false,
      showLocation: false,
      allowTracking: true,
      dataSharing: false
    }
  },
  security: {
    twoFactor: true,
    biometric: true,
    sessionTimeout: 30,
    loginAlerts: true,
    deviceTrust: true,
    passwordExpiry: 90
  },
  payment: {
    defaultMethod: 'pix',
    savedCards: [
      { id: '1', last4: '1234', brand: 'Visa', expiry: '12/25' },
      { id: '2', last4: '5678', brand: 'Mastercard', expiry: '08/26' }
    ],
    billingAddress: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zip: '01234-567',
      country: 'Brasil'
    }
  },
  shipping: {
    defaultAddress: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zip: '01234-567',
      country: 'Brasil'
    },
    preferences: {
      expressShipping: true,
      weekendDelivery: false,
      signatureRequired: true,
      leaveAtDoor: false
    }
  }
}

export function AdvancedSettings() {
  const [settings, setSettings] = useState<SettingsData>(mockSettingsData)
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'payment' | 'shipping'>('profile')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['profile']))

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'preferences', name: 'Preferências', icon: Settings },
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'payment', name: 'Pagamento', icon: CreditCard },
    { id: 'shipping', name: 'Entrega', icon: Truck }
  ]

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev }
      const keys = path.split('.')
      let current = newSettings as any
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newSettings
    })
  }

  const ToggleSwitch = ({ enabled, onChange, label }: { enabled: boolean, onChange: (enabled: boolean) => void, label: string }) => (
    <div className="flex items-center justify-between">
      <span className="text-cyber-400">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-neon-blue' : 'bg-cyber-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Configurações Avançadas</h2>
          <p className="text-cyber-400">
            Personalize sua experiência e gerencie suas preferências
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="cyber-button border-cyber-500/30 text-cyber-400 hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
          <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'text-cyber-400 hover:text-white hover:bg-cyber-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">{settings.profile.name}</h3>
                <p className="text-cyber-400">{settings.profile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => updateSetting('profile.name', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => updateSetting('profile.email', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Telefone</label>
                <input
                  type="tel"
                  value={settings.profile.phone}
                  onChange={(e) => updateSetting('profile.phone', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Localização</label>
                <input
                  type="text"
                  value={settings.profile.location}
                  onChange={(e) => updateSetting('profile.location', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-cyber-400 text-sm font-medium mb-2">Bio</label>
              <textarea
                value={settings.profile.bio}
                onChange={(e) => updateSetting('profile.bio', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="Conte um pouco sobre você..."
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          {/* Theme & Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Aparência</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Tema</label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => updateSetting('preferences.theme', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="dark">Escuro</option>
                  <option value="light">Claro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Idioma</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => updateSetting('preferences.language', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Notificações</h3>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.preferences.notifications.email}
                onChange={(enabled) => updateSetting('preferences.notifications.email', enabled)}
                label="Notificações por Email"
              />
              <ToggleSwitch
                enabled={settings.preferences.notifications.push}
                onChange={(enabled) => updateSetting('preferences.notifications.push', enabled)}
                label="Notificações Push"
              />
              <ToggleSwitch
                enabled={settings.preferences.notifications.sms}
                onChange={(enabled) => updateSetting('preferences.notifications.sms', enabled)}
                label="Notificações por SMS"
              />
              <ToggleSwitch
                enabled={settings.preferences.notifications.marketing}
                onChange={(enabled) => updateSetting('preferences.notifications.marketing', enabled)}
                label="Marketing e Promoções"
              />
              <ToggleSwitch
                enabled={settings.preferences.notifications.orderUpdates}
                onChange={(enabled) => updateSetting('preferences.notifications.orderUpdates', enabled)}
                label="Atualizações de Pedidos"
              />
              <ToggleSwitch
                enabled={settings.preferences.notifications.security}
                onChange={(enabled) => updateSetting('preferences.notifications.security', enabled)}
                label="Alertas de Segurança"
              />
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Privacidade</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Visibilidade do Perfil</label>
                <select
                  value={settings.preferences.privacy.profileVisibility}
                  onChange={(e) => updateSetting('preferences.privacy.profileVisibility', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="public">Público</option>
                  <option value="private">Privado</option>
                  <option value="friends">Apenas Amigos</option>
                </select>
              </div>
              <ToggleSwitch
                enabled={settings.preferences.privacy.showEmail}
                onChange={(enabled) => updateSetting('preferences.privacy.showEmail', enabled)}
                label="Mostrar Email no Perfil"
              />
              <ToggleSwitch
                enabled={settings.preferences.privacy.showPhone}
                onChange={(enabled) => updateSetting('preferences.privacy.showPhone', enabled)}
                label="Mostrar Telefone no Perfil"
              />
              <ToggleSwitch
                enabled={settings.preferences.privacy.allowTracking}
                onChange={(enabled) => updateSetting('preferences.privacy.allowTracking', enabled)}
                label="Permitir Rastreamento"
              />
              <ToggleSwitch
                enabled={settings.preferences.privacy.dataSharing}
                onChange={(enabled) => updateSetting('preferences.privacy.dataSharing', enabled)}
                label="Compartilhar Dados com Parceiros"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Configurações de Segurança</h3>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.security.twoFactor}
                onChange={(enabled) => updateSetting('security.twoFactor', enabled)}
                label="Autenticação de Dois Fatores"
              />
              <ToggleSwitch
                enabled={settings.security.biometric}
                onChange={(enabled) => updateSetting('security.biometric', enabled)}
                label="Login Biométrico"
              />
              <ToggleSwitch
                enabled={settings.security.loginAlerts}
                onChange={(enabled) => updateSetting('security.loginAlerts', enabled)}
                label="Alertas de Login"
              />
              <ToggleSwitch
                enabled={settings.security.deviceTrust}
                onChange={(enabled) => updateSetting('security.deviceTrust', enabled)}
                label="Confiança em Dispositivos"
              />
            </div>
          </motion.div>

          {/* Session Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Configurações de Sessão</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">
                  Timeout de Sessão (minutos)
                </label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSetting('security.sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">
                  Expiração de Senha (dias)
                </label>
                <input
                  type="number"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => updateSetting('security.passwordExpiry', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Payment Tab */}
      {activeTab === 'payment' && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Métodos de Pagamento</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Método Padrão</label>
                <select
                  value={settings.payment.defaultMethod}
                  onChange={(e) => updateSetting('payment.defaultMethod', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="pix">PIX</option>
                  <option value="credit">Cartão de Crédito</option>
                  <option value="debit">Cartão de Débito</option>
                  <option value="boleto">Boleto</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Saved Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Cartões Salvos</h3>
            <div className="space-y-3">
              {settings.payment.savedCards.map((card) => (
                <div key={card.id} className="flex items-center justify-between p-4 bg-cyber-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-cyber-400" />
                    <div>
                      <p className="text-white font-medium">{card.brand} ****{card.last4}</p>
                      <p className="text-cyber-400 text-sm">Expira em {card.expiry}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="cyber-button border-red-500/30 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Shipping Tab */}
      {activeTab === 'shipping' && (
        <div className="space-y-6">
          {/* Default Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Endereço Padrão</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-cyber-400 text-sm font-medium mb-2">Rua</label>
                <input
                  type="text"
                  value={settings.shipping.defaultAddress.street}
                  onChange={(e) => updateSetting('shipping.defaultAddress.street', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Cidade</label>
                <input
                  type="text"
                  value={settings.shipping.defaultAddress.city}
                  onChange={(e) => updateSetting('shipping.defaultAddress.city', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">Estado</label>
                <input
                  type="text"
                  value={settings.shipping.defaultAddress.state}
                  onChange={(e) => updateSetting('shipping.defaultAddress.state', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">CEP</label>
                <input
                  type="text"
                  value={settings.shipping.defaultAddress.zip}
                  onChange={(e) => updateSetting('shipping.defaultAddress.zip', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cyber-400 text-sm font-medium mb-2">País</label>
                <input
                  type="text"
                  value={settings.shipping.defaultAddress.country}
                  onChange={(e) => updateSetting('shipping.defaultAddress.country', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Shipping Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-4">Preferências de Entrega</h3>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.shipping.preferences.expressShipping}
                onChange={(enabled) => updateSetting('shipping.preferences.expressShipping', enabled)}
                label="Entrega Expressa (quando disponível)"
              />
              <ToggleSwitch
                enabled={settings.shipping.preferences.weekendDelivery}
                onChange={(enabled) => updateSetting('shipping.preferences.weekendDelivery', enabled)}
                label="Entrega nos Fins de Semana"
              />
              <ToggleSwitch
                enabled={settings.shipping.preferences.signatureRequired}
                onChange={(enabled) => updateSetting('shipping.preferences.signatureRequired', enabled)}
                label="Assinatura Obrigatória"
              />
              <ToggleSwitch
                enabled={settings.shipping.preferences.leaveAtDoor}
                onChange={(enabled) => updateSetting('shipping.preferences.leaveAtDoor', enabled)}
                label="Deixar na Porta (se seguro)"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
