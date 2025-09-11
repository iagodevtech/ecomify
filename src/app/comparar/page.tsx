'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  X, 
  Search, 
  BarChart3, 
  Star, 
  Check, 
  X as XIcon,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Shield,
  Truck,
  Award,
  Smartphone,
  Laptop,
  Headphones,
  Monitor,
  Keyboard,
  Mouse,
  Camera,
  Gamepad,
  Speaker,
  Wifi,
  Bluetooth,
  Battery,
  Cpu,
  Memory,
  HardDrive,
  Eye,
  Heart,
  ShoppingCart
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

// Mock products data
const availableProducts = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    price: 15999,
    originalPrice: 17999,
    image: '/images/products/macbook-pro.jpg',
    brand: 'Apple',
    category: 'Laptops',
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    stockCount: 5,
    specifications: {
      processor: 'Apple M3 Max',
      ram: '32GB',
      storage: '1TB SSD',
      display: '14.2" Liquid Retina XDR',
      graphics: 'M3 Max GPU',
      battery: 'Up to 18 hours',
      weight: '1.6 kg',
      os: 'macOS Sonoma',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'Thunderbolt 4'],
      ports: ['3x Thunderbolt 4', '1x HDMI', '1x SDXC', '1x MagSafe 3'],
      warranty: '1 ano',
      shipping: 'Frete grátis'
    },
    features: [
      'Chip M3 Max com 16-core CPU',
      'Display Liquid Retina XDR',
      'Até 18 horas de bateria',
      'Sistema de som de 6 alto-falantes',
      'Câmera FaceTime HD 1080p',
      'Touch ID integrado'
    ],
    pros: [
      'Performance excepcional',
      'Display de alta qualidade',
      'Bateria de longa duração',
      'Design premium',
      'Ecosystem Apple integrado'
    ],
    cons: [
      'Preço elevado',
      'Limitado a macOS',
      'Poucas opções de personalização'
    ]
  },
  {
    id: '2',
    name: 'Dell XPS 15',
    price: 12999,
    originalPrice: 14999,
    image: '/images/products/dell-xps15.jpg',
    brand: 'Dell',
    category: 'Laptops',
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockCount: 8,
    specifications: {
      processor: 'Intel Core i7-13700H',
      ram: '16GB',
      storage: '512GB SSD',
      display: '15.6" 4K OLED',
      graphics: 'NVIDIA RTX 4050',
      battery: 'Up to 12 hours',
      weight: '1.8 kg',
      os: 'Windows 11',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.2', 'Thunderbolt 4'],
      ports: ['2x Thunderbolt 4', '1x USB-C', '1x SD card reader'],
      warranty: '1 ano',
      shipping: 'Frete grátis'
    },
    features: [
      'Display 4K OLED touchscreen',
      'Processador Intel 13ª geração',
      'Placa de vídeo RTX 4050',
      'Design premium em alumínio',
      'Teclado retroiluminado',
      'Webcam 720p com IR'
    ],
    pros: [
      'Display OLED impressionante',
      'Performance gráfica',
      'Design elegante',
      'Boa conectividade',
      'Windows 11 nativo'
    ],
    cons: [
      'Bateria limitada',
      'Aquecimento sob carga',
      'Preço alto'
    ]
  },
  {
    id: '3',
    name: 'ASUS ROG Zephyrus G14',
    price: 8999,
    originalPrice: 10999,
    image: '/images/products/asus-rog-g14.jpg',
    brand: 'ASUS',
    category: 'Laptops',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    stockCount: 12,
    specifications: {
      processor: 'AMD Ryzen 7 7735HS',
      ram: '16GB',
      storage: '1TB SSD',
      display: '14" QHD 165Hz',
      graphics: 'NVIDIA RTX 4060',
      battery: 'Up to 10 hours',
      weight: '1.7 kg',
      os: 'Windows 11',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.2', 'USB-C'],
      ports: ['2x USB-C', '2x USB-A', '1x HDMI', '1x 3.5mm'],
      warranty: '2 anos',
      shipping: 'Frete grátis'
    },
    features: [
      'Display QHD 165Hz',
      'Processador AMD Ryzen 7',
      'RTX 4060 para gaming',
      'Design compacto e leve',
      'Teclado RGB per-key',
      'Sistema de resfriamento avançado'
    ],
    pros: [
      'Excelente para gaming',
      'Display de alta taxa de atualização',
      'Compacto e portátil',
      'Boa relação preço/performance',
      'Garantia estendida'
    ],
    cons: [
      'Bateria limitada para gaming',
      'Aquecimento intenso',
      'Teclado pode ser pequeno'
    ]
  },
  {
    id: '4',
    name: 'iPhone 15 Pro Max',
    price: 8999,
    originalPrice: 9999,
    image: '/images/products/iphone-15-pro.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockCount: 15,
    specifications: {
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      display: '6.7" Super Retina XDR',
      graphics: 'A17 Pro GPU',
      battery: 'Up to 29 hours',
      weight: '221g',
      os: 'iOS 17',
      connectivity: ['5G', 'Wi-Fi 6E', 'Bluetooth 5.3', 'NFC'],
      ports: ['USB-C'],
      warranty: '1 ano',
      shipping: 'Frete grátis'
    },
    features: [
      'Chip A17 Pro com 3nm',
      'Câmera de 48MP com zoom óptico',
      'Titanium design premium',
      'Action Button personalizável',
      'USB-C com Thunderbolt',
      'Face ID avançado'
    ],
    pros: [
      'Performance excepcional',
      'Câmera profissional',
      'Design premium',
      'Ecosystem iOS',
      'Bateria de longa duração'
    ],
    cons: [
      'Preço muito alto',
      'Limitado a iOS',
      'Sem carregador incluído'
    ]
  }
]

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addProduct = (productId: string) => {
    if (selectedProducts.length < 4 && !selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId))
  }

  const getProductById = (id: string) => {
    return availableProducts.find(product => product.id === id)
  }

  const selectedProductsData = selectedProducts.map(getProductById).filter(Boolean)

  const getSpecIcon = (spec: string) => {
    const iconMap: { [key: string]: any } = {
      processor: Cpu,
      ram: Memory,
      storage: HardDrive,
      display: Monitor,
      graphics: Zap,
      battery: Battery,
      weight: Package,
      os: Laptop,
      connectivity: Wifi,
      ports: Bluetooth,
      warranty: Shield,
      shipping: Truck
    }
    return iconMap[spec] || Package
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Laptops': Laptop,
      'Smartphones': Smartphone,
      'Áudio': Headphones,
      'Gaming': Gamepad,
      'Monitores': Monitor,
      'Periféricos': Keyboard
    }
    return iconMap[category] || Package
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-cyber mb-4">
              <span className="cyber-text bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                Comparador de Produtos
              </span>
            </h1>
            <p className="text-cyber-400">
              Compare produtos lado a lado e encontre a melhor opção para você
            </p>
          </div>

          {/* Selected Products */}
          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Produtos Selecionados ({selectedProducts.length}/4)
                </h2>
                <Button
                  onClick={() => setShowAddModal(true)}
                  disabled={selectedProducts.length >= 4}
                  className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedProductsData.map((product) => (
                  <div key={product!.id} className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                          {React.createElement(getCategoryIcon(product!.category), { className: "w-4 h-4 text-white" })}
                        </div>
                        <span className="text-cyber-300 text-sm">{product!.brand}</span>
                      </div>
                      <button
                        onClick={() => removeProduct(product!.id)}
                        className="text-cyber-400 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="w-full h-24 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-1">
                          <span className="text-white font-bold text-sm">
                            {product!.brand.charAt(0)}
                          </span>
                        </div>
                        <p className="text-cyber-400 text-xs">Imagem</p>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{product!.name}</h3>
                    <p className="text-white font-bold">{formatPrice(product!.price)}</p>
                  </div>
                ))}

                {/* Add Product Slot */}
                {selectedProducts.length < 4 && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-dark-800/30 border-2 border-dashed border-cyber-500/50 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-neon-blue hover:bg-neon-blue/5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-700 to-cyber-800 flex items-center justify-center mb-3">
                      <Plus className="w-6 h-6 text-cyber-400" />
                    </div>
                    <p className="text-cyber-400 text-sm">Adicionar Produto</p>
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Comparison Table */}
          {selectedProducts.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6 overflow-x-auto"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-neon-purple" />
                Comparação Detalhada
              </h2>

              <div className="min-w-full">
                {/* Header Row */}
                <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${selectedProductsData.length}, 1fr)` }}>
                  <div className="text-cyber-300 font-medium">Especificações</div>
                  {selectedProductsData.map((product) => (
                    <div key={product!.id} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {product!.brand.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{product!.name}</h3>
                      <p className="text-neon-green font-bold">{formatPrice(product!.price)}</p>
                    </div>
                  ))}
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selectedProductsData.length}, 1fr)` }}>
                    <div className="text-cyber-300 font-medium flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Avaliação
                    </div>
                    {selectedProductsData.map((product) => (
                      <div key={product!.id} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${
                              i < Math.floor(product!.rating) ? 'text-neon-yellow' : 'text-cyber-600'
                            }`}>★</span>
                          ))}
                        </div>
                        <p className="text-cyber-400 text-xs">({product!.reviewCount})</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selectedProductsData.length}, 1fr)` }}>
                    <div className="text-cyber-300 font-medium flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Estoque
                    </div>
                    {selectedProductsData.map((product) => (
                      <div key={product!.id} className="text-center">
                        <Badge className={`text-xs ${
                          product!.inStock 
                            ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                            : 'bg-red-500/20 text-red-500 border-red-500/50'
                        }`}>
                          {product!.inStock ? `${product!.stockCount} disponível` : 'Fora de estoque'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="mt-8">
                  <h3 className="text-white font-bold mb-4">Especificações Técnicas</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedProductsData[0]!.specifications).map(([spec, value]) => (
                      <div key={spec} className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selectedProductsData.length}, 1fr)` }}>
                        <div className="text-cyber-300 font-medium flex items-center gap-2">
                          {React.createElement(getSpecIcon(spec), { className: "w-4 h-4" })}
                          {spec.charAt(0).toUpperCase() + spec.slice(1)}
                        </div>
                        {selectedProductsData.map((product) => (
                          <div key={product!.id} className="text-center">
                            <p className="text-white text-sm">
                              {Array.isArray(product!.specifications[spec as keyof typeof product!.specifications]) 
                                ? (product!.specifications[spec as keyof typeof product!.specifications] as string[]).join(', ')
                                : product!.specifications[spec as keyof typeof product!.specifications]
                              }
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8">
                  <h3 className="text-white font-bold mb-4">Principais Recursos</h3>
                  <div className="space-y-3">
                    {selectedProductsData[0]!.features.map((feature, index) => (
                      <div key={index} className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selectedProductsData.length}, 1fr)` }}>
                        <div className="text-cyber-300 font-medium">
                          Recurso {index + 1}
                        </div>
                        {selectedProductsData.map((product) => (
                          <div key={product!.id} className="text-center">
                            <div className="flex items-center justify-center">
                              {product!.features[index] ? (
                                <Check className="w-4 h-4 text-neon-green" />
                              ) : (
                                <XIcon className="w-4 h-4 text-cyber-500" />
                              )}
                            </div>
                            <p className="text-white text-xs mt-1 line-clamp-2">
                              {product!.features[index] || '-'}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-neon-green" />
                      Vantagens
                    </h3>
                    <div className="space-y-4">
                      {selectedProductsData.map((product) => (
                        <div key={product!.id} className="bg-dark-700/30 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">{product!.name}</h4>
                          <ul className="space-y-1">
                            {product!.pros.map((pro, index) => (
                              <li key={index} className="text-cyber-300 text-sm flex items-center gap-2">
                                <Check className="w-3 h-3 text-neon-green flex-shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-red-400" />
                      Desvantagens
                    </h3>
                    <div className="space-y-4">
                      {selectedProductsData.map((product) => (
                        <div key={product!.id} className="bg-dark-700/30 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">{product!.name}</h4>
                          <ul className="space-y-1">
                            {product!.cons.map((con, index) => (
                              <li key={index} className="text-cyber-300 text-sm flex items-center gap-2">
                                <XIcon className="w-3 h-3 text-red-400 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedProductsData.map((product) => (
                    <div key={product!.id} className="space-y-2">
                      <Button className="w-full cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar
                      </Button>
                      <Button variant="outline" className="w-full border-cyber-500 text-cyber-400 hover:border-neon-pink hover:text-neon-pink">
                        <Heart className="w-4 h-4 mr-2" />
                        Favoritar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {selectedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-full flex items-center justify-center">
                <BarChart3 className="w-16 h-16 text-cyber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nenhum produto selecionado</h3>
              <p className="text-cyber-400 mb-8">
                Adicione pelo menos 2 produtos para começar a comparação
              </p>
              <Button
                onClick={() => setShowAddModal(true)}
                className="cyber-button bg-gradient-to-r from-neon-purple to-neon-pink text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Primeiro Produto
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border border-cyber-500/30 rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Adicionar Produto para Comparação</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-cyber-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredProducts
                .filter(product => !selectedProducts.includes(product.id))
                .map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      addProduct(product.id)
                      setShowAddModal(false)
                    }}
                    className="p-4 bg-dark-700/30 rounded-lg border border-cyber-500/20 hover:border-neon-purple/50 transition-all text-left"
                  >
                    <div className="w-full h-24 bg-gradient-to-br from-cyber-800 to-cyber-900 rounded-lg mb-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-1">
                          <span className="text-white font-bold text-sm">
                            {product.brand.charAt(0)}
                          </span>
                        </div>
                        <p className="text-cyber-400 text-xs">Imagem</p>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-cyber-400 text-xs mb-2">{product.brand} • {product.category}</p>
                    <p className="text-white font-bold text-sm">{formatPrice(product.price)}</p>
                  </button>
                ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
