'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Newspaper, 
  Calendar, 
  Download, 
  ExternalLink, 
  Users, 
  TrendingUp, 
  Award, 
  Globe,
  Mail,
  Phone,
  FileText,
  Image,
  Video,
  ChevronRight
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const pressReleases = [
  {
    id: 1,
    title: 'Ecomify anuncia expansão para 5 novos estados brasileiros',
    date: '2024-01-15',
    category: 'Expansão',
    summary: 'A empresa de e-commerce futurístico Ecomify anuncia sua expansão para 5 novos estados, consolidando sua presença nacional.',
    image: '/images/press/expansao.jpg',
    downloadUrl: '/press/expansao-2024.pdf'
  },
  {
    id: 2,
    title: 'Ecomify recebe investimento de R$ 50 milhões em série A',
    date: '2024-01-10',
    category: 'Investimento',
    summary: 'A startup de e-commerce futurístico Ecomify recebeu um investimento de R$ 50 milhões em sua rodada de série A.',
    image: '/images/press/investimento.jpg',
    downloadUrl: '/press/investimento-serie-a.pdf'
  },
  {
    id: 3,
    title: 'Ecomify lança nova tecnologia de IA para recomendações',
    date: '2024-01-05',
    category: 'Tecnologia',
    summary: 'A empresa lança sua nova tecnologia de inteligência artificial para recomendações personalizadas de produtos.',
    image: '/images/press/ia-recomendacoes.jpg',
    downloadUrl: '/press/ia-recomendacoes.pdf'
  },
  {
    id: 4,
    title: 'Ecomify é reconhecida como uma das melhores startups do Brasil',
    date: '2023-12-20',
    category: 'Reconhecimento',
    summary: 'A Ecomify foi reconhecida como uma das 100 melhores startups do Brasil pelo ranking anual da revista Exame.',
    image: '/images/press/reconhecimento.jpg',
    downloadUrl: '/press/reconhecimento-startup.pdf'
  }
]

const mediaKit = [
  {
    name: 'Logo Ecomify',
    type: 'Imagem',
    format: 'PNG, SVG',
    size: '2.5 MB',
    icon: Image
  },
  {
    name: 'Brand Guidelines',
    type: 'Documento',
    format: 'PDF',
    size: '5.2 MB',
    icon: FileText
  },
  {
    name: 'Fotos da Equipe',
    type: 'Imagem',
    format: 'JPG',
    size: '12.8 MB',
    icon: Users
  },
  {
    name: 'Vídeo Institucional',
    type: 'Vídeo',
    format: 'MP4',
    size: '45.3 MB',
    icon: Video
  }
]

const stats = [
  { label: 'Usuários Ativos', value: '500K+', icon: Users },
  { label: 'Produtos Vendidos', value: '1M+', icon: TrendingUp },
  { label: 'Estados Atendidos', value: '15', icon: Globe },
  { label: 'Prêmios Recebidos', value: '8', icon: Award }
]

const contactInfo = {
  email: 'imprensa@ecomify.com',
  phone: '+55 21 95922-0456',
  address: 'São Paulo, SP - Brasil'
}

export default function ImprensaPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Imprensa
              </span>
            </h1>
            <p className="text-xl text-cyber-300 mb-8 leading-relaxed">
              Acompanhe as últimas notícias, releases e informações sobre a Ecomify. 
              Aqui você encontra tudo que precisa para cobrir nossa empresa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                <Newspaper className="w-4 h-4 mr-2" />
                Releases Oficiais
              </Badge>
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                <Download className="w-4 h-4 mr-2" />
                Material de Imprensa
              </Badge>
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                <Mail className="w-4 h-4 mr-2" />
                Contato Direto
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ecomify em Números
            </h2>
            <p className="text-cyber-300 text-lg">
              Dados atualizados sobre nosso crescimento e impacto
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 text-center hover:border-neon-blue/50 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-cyber-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Releases de Imprensa
            </h2>
            <p className="text-cyber-300 text-lg">
              Acompanhe nossas principais notícias e anúncios
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all group"
              >
                <div className="h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                  <Newspaper className="w-16 h-16 text-neon-blue" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                      {release.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-cyber-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(release.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-neon-blue transition-colors">
                    {release.title}
                  </h3>
                  
                  <p className="text-cyber-300 mb-4 line-clamp-3">
                    {release.summary}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-cyber-400 hover:text-neon-blue"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ler Mais
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Material de Imprensa
            </h2>
            <p className="text-cyber-300 text-lg">
              Downloads disponíveis para jornalistas e veículos de comunicação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6 hover:border-neon-blue/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-cyber-400 text-sm">{item.type}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-400">Formato:</span>
                    <span className="text-cyber-300">{item.format}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-400">Tamanho:</span>
                    <span className="text-cyber-300">{item.size}</span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contato com a Imprensa
            </h2>
            <p className="text-cyber-300 text-lg">
              Nossa equipe de comunicação está à disposição para entrevistas e esclarecimentos
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-8"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-cyber-300">{contactInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Telefone</h3>
                    <p className="text-cyber-300">{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Localização</h3>
                    <p className="text-cyber-300">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-cyber-500/30">
                <p className="text-cyber-400 text-sm mb-4">
                  Para solicitações de entrevista, releases ou esclarecimentos, 
                  entre em contato conosco através dos canais acima.
                </p>
                <Button className="w-full cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
