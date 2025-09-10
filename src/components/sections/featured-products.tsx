'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Shield,
  Truck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock data - in real app this would come from API
const featuredProducts = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    slug: 'macbook-pro-m3-max',
    description: 'O mais poderoso MacBook Pro já criado com chip M3 Max',
    price: 15999,
    originalPrice: 17999,
    images: ['/images/products/macbook-pro.jpg'],
    rating: 4.9,
    reviewCount: 127,
    brand: 'Apple',
    isNew: true,
    isFeatured: true,
    tags: ['Novo', 'Premium', 'Profissional'],
    features: ['Chip M3 Max', '32GB RAM', '1TB SSD', 'Tela 16"'],
    inStock: true,
    stock: 15
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'O iPhone mais avançado com chip A17 Pro e câmera de 48MP',
    price: 8999,
    originalPrice: 9999,
    images: ['/images/products/iphone-15-pro.jpg'],
    rating: 4.8,
    reviewCount: 89,
    brand: 'Apple',
    isNew: true,
    isFeatured: true,
    tags: ['Novo', 'Premium', '5G'],
    features: ['Chip A17 Pro', 'Câmera 48MP', '5G', 'Titanium'],
    inStock: true,
    stock: 8
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Fones de ouvido com cancelamento de ruído líder mundial',
    price: 1299,
    originalPrice: 1499,
    images: ['/images/products/sony-wh1000xm5.jpg'],
    rating: 4.7,
    reviewCount: 203,
    brand: 'Sony',
    isNew: false,
    isFeatured: true,
    tags: ['Áudio', 'Wireless', 'Premium'],
    features: ['Cancelamento de Ruído', '30h Bateria', 'Carregamento Rápido'],
    inStock: true,
    stock: 25
  },
  {
    id: '4',
    name: 'RTX 4090 Gaming PC',
    slug: 'rtx-4090-gaming-pc',
    description: 'PC Gamer com RTX 4090 e processador Intel i9-13900K',
    price: 18999,
    originalPrice: 21999,
    images: ['/images/products/rtx-4090-pc.jpg'],
    rating: 4.9,
    reviewCount: 45,
    brand: 'Custom Build',
    isNew: true,
    isFeatured: true,
    tags: ['Gaming', 'RTX 4090', 'High-End'],
    features: ['RTX 4090', 'i9-13900K', '32GB DDR5', '2TB NVMe'],
    inStock: true,
    stock: 3
  },
  {
    id: '5',
    name: 'Samsung Odyssey G9',
    slug: 'samsung-odyssey-g9',
    description: 'Monitor ultrawide 49" 240Hz para gaming e produtividade',
    price: 3999,
    originalPrice: 4499,
    images: ['/images/products/samsung-g9.jpg'],
    rating: 4.6,
    reviewCount: 67,
    brand: 'Samsung',
    isNew: false,
    isFeatured: true,
    tags: ['Monitor', 'Gaming', 'Ultrawide'],
    features: ['49" Curvo', '240Hz', 'QHD', 'HDR1000'],
    inStock: true,
    stock: 12
  },
  {
    id: '6',
    name: 'DJI Air 3 Drone',
    slug: 'dji-air-3-drone',
    description: 'Drone profissional com câmera dupla e 46 minutos de voo',
    price: 5999,
    originalPrice: 6999,
    images: ['/images/products/dji-air3.jpg'],
    rating: 4.8,
    reviewCount: 34,
    brand: 'DJI',
    isNew: true,
    isFeatured: true,
    tags: ['Drone', 'Profissional', 'Câmera'],
    features: ['Câmera Dupla', '46min Voo', '4K/60fps', 'OcuSync 4'],
    inStock: true,
    stock: 7
  }
]

export function FeaturedProducts() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-bg opacity-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/50 px-4 py-2 text-sm font-cyber mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Produtos em Destaque
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-cyber mb-4">
            <span className="cyber-text bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange bg-clip-text text-transparent">
              Tecnologia de Ponta
            </span>
          </h2>
          
          <p className="text-xl text-cyber-400 max-w-2xl mx-auto">
            Descubra os produtos mais inovadores e tecnologicamente avançados do mercado
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-cyber-800 to-cyber-900 overflow-hidden">
                  {/* Placeholder for product image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-cyber-400 text-sm">Imagem do Produto</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                        Novo
                      </Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/50 text-xs">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 hover:border-neon-pink/50 transition-all"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(product.id) 
                          ? 'text-neon-pink fill-neon-pink' 
                          : 'text-cyber-400 hover:text-neon-pink'
                      }`} 
                    />
                  </button>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 hover:border-neon-blue/50 transition-all">
                      <Eye className="w-4 h-4 text-cyber-400 hover:text-neon-blue" />
                    </button>
                    <button className="p-2 rounded-full bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 hover:border-neon-green/50 transition-all">
                      <ShoppingCart className="w-4 h-4 text-cyber-400 hover:text-neon-green" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Brand */}
                  <p className="text-cyber-500 text-sm font-medium mb-2">{product.brand}</p>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-cyber-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-cyber-800/50 text-cyber-300 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-neon-yellow fill-neon-yellow' 
                              : 'text-cyber-600'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-cyber-400 text-sm">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-cyber-500 line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-cyber-400 text-sm">Estoque</p>
                      <p className="text-neon-green text-sm font-medium">{product.stock} unidades</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                    <Button variant="outline" className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button className="cyber-button bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-orange text-white px-8 py-4 text-lg font-cyber">
              Ver Todos os Produtos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="flex items-center gap-4 text-cyber-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-green" />
                <span className="text-sm">Garantia Estendida</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-neon-blue" />
                <span className="text-sm">Frete Grátis</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
