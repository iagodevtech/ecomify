'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock, 
  Server, 
  Database, 
  Globe, 
  Zap,
  RefreshCw,
  Activity,
  TrendingUp,
  Users,
  ShoppingCart,
  Heart,
  Bell
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ServiceStatus {
  id: string
  name: string
  status: 'operational' | 'degraded' | 'outage'
  uptime: number
  responseTime: number
  lastIncident?: {
    title: string
    date: string
    resolved: boolean
  }
}

interface Incident {
  id: string
  title: string
  description: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  severity: 'minor' | 'major' | 'critical'
  startTime: string
  endTime?: string
  affectedServices: string[]
}

const services: ServiceStatus[] = [
  {
    id: 'website',
    name: 'Website Principal',
    status: 'operational',
    uptime: 99.9,
    responseTime: 245
  },
  {
    id: 'api',
    name: 'API Backend',
    status: 'operational',
    uptime: 99.8,
    responseTime: 156
  },
  {
    id: 'database',
    name: 'Banco de Dados',
    status: 'operational',
    uptime: 99.95,
    responseTime: 89
  },
  {
    id: 'payments',
    name: 'Sistema de Pagamentos',
    status: 'operational',
    uptime: 99.7,
    responseTime: 312
  },
  {
    id: 'notifications',
    name: 'Sistema de Notificações',
    status: 'degraded',
    uptime: 98.2,
    responseTime: 1200,
    lastIncident: {
      title: 'Latência elevada nas notificações push',
      date: '2024-01-15T10:30:00Z',
      resolved: false
    }
  },
  {
    id: 'search',
    name: 'Sistema de Busca',
    status: 'operational',
    uptime: 99.6,
    responseTime: 198
  }
]

const incidents: Incident[] = [
  {
    id: '1',
    title: 'Latência elevada nas notificações push',
    description: 'Alguns usuários estão relatando atrasos no recebimento de notificações push. Nossa equipe está investigando.',
    status: 'investigating',
    severity: 'minor',
    startTime: '2024-01-15T10:30:00Z',
    affectedServices: ['notifications']
  },
  {
    id: '2',
    title: 'Manutenção programada do banco de dados',
    description: 'Manutenção de rotina para otimização de performance. Esperamos 15 minutos de indisponibilidade.',
    status: 'resolved',
    severity: 'minor',
    startTime: '2024-01-14T02:00:00Z',
    endTime: '2024-01-14T02:15:00Z',
    affectedServices: ['database', 'api']
  }
]

const systemMetrics = [
  { label: 'Usuários Online', value: '12,847', icon: Users, trend: '+5.2%' },
  { label: 'Pedidos/Minuto', value: '234', icon: ShoppingCart, trend: '+12.1%' },
  { label: 'Favoritos/Minuto', value: '89', icon: Heart, trend: '+8.7%' },
  { label: 'Notificações/Minuto', value: '1,456', icon: Bell, trend: '+3.4%' }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="w-5 h-5 text-neon-green" />
    case 'degraded':
      return <AlertCircle className="w-5 h-5 text-neon-yellow" />
    case 'outage':
      return <XCircle className="w-5 h-5 text-red-400" />
    default:
      return <Clock className="w-5 h-5 text-cyber-400" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'bg-neon-green/20 text-neon-green border-neon-green/30'
    case 'degraded':
      return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30'
    case 'outage':
      return 'bg-red-400/20 text-red-400 border-red-400/30'
    default:
      return 'bg-cyber-400/20 text-cyber-400 border-cyber-400/30'
  }
}

const getIncidentColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-400/20 text-red-400 border-red-400/30'
    case 'major':
      return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30'
    case 'minor':
      return 'bg-neon-blue/20 text-neon-blue border-neon-blue/30'
    default:
      return 'bg-cyber-400/20 text-cyber-400 border-cyber-400/30'
  }
}

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simular refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const overallStatus = services.every(s => s.status === 'operational') 
    ? 'operational' 
    : services.some(s => s.status === 'outage') 
    ? 'outage' 
    : 'degraded'

  const activeIncidents = incidents.filter(i => i.status !== 'resolved')

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              {getStatusIcon(overallStatus)}
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Status do Sistema
                </span>
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className={getStatusColor(overallStatus)}>
                {overallStatus === 'operational' && 'Todos os Sistemas Operacionais'}
                {overallStatus === 'degraded' && 'Degradação de Performance'}
                {overallStatus === 'outage' && 'Indisponibilidade Parcial'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshData}
                disabled={isRefreshing}
                className="text-cyber-400 hover:text-neon-blue"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
            
            <p className="text-xl text-cyber-300 mb-8 leading-relaxed">
              Acompanhe o status de todos os nossos serviços em tempo real. 
              Última atualização: {lastUpdated.toLocaleString('pt-BR')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                <Activity className="w-4 h-4 mr-2" />
                Monitoramento 24/7
              </Badge>
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                <Zap className="w-4 h-4 mr-2" />
                Atualizações em Tempo Real
              </Badge>
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                <CheckCircle className="w-4 h-4 mr-2" />
                99.9% de Uptime
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* System Metrics */}
      <section className="py-16 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Métricas do Sistema
            </h2>
            <p className="text-cyber-300 text-lg">
              Estatísticas em tempo real de uso e performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{metric.label}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-neon-blue">{metric.value}</span>
                      <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.trend}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Status dos Serviços
            </h2>
            <p className="text-cyber-300 text-lg">
              Monitoramento em tempo real de todos os nossos serviços
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="text-white font-semibold text-lg">{service.name}</h3>
                      {service.lastIncident && (
                        <p className="text-cyber-400 text-sm">
                          Último incidente: {service.lastIncident.title}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-cyber-400 text-sm">Uptime</p>
                      <p className="text-white font-semibold">{service.uptime}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyber-400 text-sm">Tempo de Resposta</p>
                      <p className="text-white font-semibold">{service.responseTime}ms</p>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status === 'operational' && 'Operacional'}
                      {service.status === 'degraded' && 'Degradado'}
                      {service.status === 'outage' && 'Indisponível'}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <section className="py-16 bg-dark-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Incidentes Ativos
              </h2>
              <p className="text-cyber-300 text-lg">
                Problemas conhecidos que estamos investigando
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {activeIncidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <AlertCircle className="w-6 h-6 text-neon-yellow" />
                      <div>
                        <h3 className="text-white font-semibold text-lg">{incident.title}</h3>
                        <p className="text-cyber-400 text-sm">
                          Iniciado em: {new Date(incident.startTime).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <Badge className={getIncidentColor(incident.severity)}>
                      {incident.severity === 'critical' && 'Crítico'}
                      {incident.severity === 'major' && 'Maior'}
                      {incident.severity === 'minor' && 'Menor'}
                    </Badge>
                  </div>
                  
                  <p className="text-cyber-300 mb-4">{incident.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-cyber-400 text-sm">Status:</p>
                      <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                        {incident.status === 'investigating' && 'Investigando'}
                        {incident.status === 'identified' && 'Identificado'}
                        {incident.status === 'monitoring' && 'Monitorando'}
                        {incident.status === 'resolved' && 'Resolvido'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-cyber-400 text-sm">Serviços Afetados:</p>
                      <div className="flex gap-2 mt-1">
                        {incident.affectedServices.map((service, idx) => (
                          <Badge key={idx} className="bg-cyber-800/50 text-cyber-300 border-cyber-500/30">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Historical Incidents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Histórico de Incidentes
            </h2>
            <p className="text-cyber-300 text-lg">
              Registro de problemas anteriores e suas resoluções
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {incidents.filter(i => i.status === 'resolved').map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-neon-green" />
                    <div>
                      <h3 className="text-white font-semibold text-lg">{incident.title}</h3>
                      <p className="text-cyber-400 text-sm">
                        {new Date(incident.startTime).toLocaleString('pt-BR')} - 
                        {incident.endTime && ` ${new Date(incident.endTime).toLocaleString('pt-BR')}`}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    Resolvido
                  </Badge>
                </div>
                
                <p className="text-cyber-300">{incident.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
