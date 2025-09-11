'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Github,
  Heart,
  Shield,
  Award,
  Globe,
  ArrowUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerLinks = {
  company: [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Nossa História', href: '/sobre#historia' },
    { name: 'Equipe', href: '/sobre#equipe' },
    { name: 'Carreiras', href: '/carreiras' },
    { name: 'Imprensa', href: '/imprensa' }
  ],
  products: [
    { name: 'Produtos', href: '/produtos' },
    { name: 'Promoções', href: '/promocoes' },
    { name: 'Novidades', href: '/novidades' },
    { name: 'Mais Vendidos', href: '/mais-vendidos' },
    { name: 'Categorias', href: '/categorias' }
  ],
  support: [
    { name: 'Central de Ajuda', href: '/suporte' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contato', href: '/contato' },
    { name: 'Chat Online', href: '/contato#chat' },
    { name: 'Status do Site', href: '/status' }
  ],
  legal: [
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Política de Privacidade', href: '/politica-privacidade' },
    { name: 'Política de Cookies', href: '/politica-cookies' },
    { name: 'LGPD', href: '/lgpd' },
    { name: 'Código de Conduta', href: '/codigo-conduta' }
  ]
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-400' },
  { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
  { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-400' },
  { name: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-400' },
  { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'hover:text-blue-400' },
  { name: 'GitHub', href: '#', icon: Github, color: 'hover:text-white' }
]

const paymentMethods = [
  { name: 'PIX', icon: '⚡', description: 'Pagamento instantâneo' },
  { name: 'Visa', icon: '💳', description: 'Cartão de crédito' },
  { name: 'Mastercard', icon: '💳', description: 'Cartão de crédito' },
  { name: 'Elo', icon: '💳', description: 'Cartão de crédito' },
  { name: 'PayPal', icon: '🅿️', description: 'Pagamento online' },
  { name: 'Boleto', icon: '📄', description: 'Boleto bancário' },
  { name: 'Depósito', icon: '🏦', description: 'Transferência bancária' }
]

const certifications = [
  { name: 'SSL', icon: Shield, description: 'Site Seguro' },
  { name: 'LGPD', icon: Award, description: 'Conformidade' },
  { name: 'ISO', icon: Globe, description: 'Qualidade' }
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark-900 border-t border-cyber-500/30">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-bold font-cyber cyber-text">
                    ECOMIFY
                  </span>
                </div>
                <p className="text-cyber-400 leading-relaxed mb-6">
                  A plataforma de e-commerce mais avançada para produtos de tecnologia. 
                  Oferecemos uma experiência futurística com IA, realidade aumentada e 
                  pagamentos instantâneos.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3 text-cyber-400">
                  <Mail className="w-5 h-5 text-neon-blue" />
                  <span>iagodevtech@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-cyber-400">
                  <Phone className="w-5 h-5 text-neon-green" />
                  <span>+55 21 95922-0456</span>
                </div>
                <div className="flex items-center gap-3 text-cyber-400">
                  <MapPin className="w-5 h-5 text-neon-purple" />
                  <span>Av. Paulista, 1000 - São Paulo/SP</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <h4 className="text-white font-bold mb-4">Siga-nos</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`w-10 h-10 bg-cyber-800 rounded-lg flex items-center justify-center text-cyber-400 transition-all ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + categoryIndex * 0.1 }}
              >
                <h4 className="text-white font-bold mb-4 capitalize">
                  {category === 'company' && 'Empresa'}
                  {category === 'products' && 'Produtos'}
                  {category === 'support' && 'Suporte'}
                  {category === 'legal' && 'Legal'}
                </h4>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-cyber-400 hover:text-neon-blue transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="py-8 border-t border-cyber-500/30"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold mb-3">Formas de Pagamento</h4>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-cyber-800/50 px-3 py-2 rounded-lg border border-cyber-500/30"
                    title={method.description}
                  >
                    <span className="text-lg">{method.icon}</span>
                    <span className="text-sm text-cyber-300">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 text-cyber-400">
                  <cert.icon className="w-5 h-5 text-neon-green" />
                  <div className="text-sm">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-xs">{cert.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="py-6 border-t border-cyber-500/30"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-cyber-400 text-sm">
              <span>© 2024 Ecomify. Desenvolvido por <a href="https://iagodev.online" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:text-neon-purple transition-colors">Iago Alves</a>. Todos os direitos reservados.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Feito com</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">no Brasil</span>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Voltar ao Topo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
