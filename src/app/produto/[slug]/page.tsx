'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  Eye,
  ThumbsUp,
  MessageCircle,
  ArrowLeft
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ReviewForm } from '@/components/reviews/review-form'
import { ReviewList } from '@/components/reviews/review-list'
import { WishlistButton } from '@/components/ui/wishlist-button'
import { useCart } from '@/components/providers'
import { useAuth } from '@/components/providers'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [editingReview, setEditingReview] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  
  const { addItem } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    if (slug) {
      loadProduct()
    }
  }, [slug])

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call - in real app, this would fetch from your API
      const mockProduct = {
        id: '1',
        slug: slug,
        name: 'MacBook Pro 16" M3 Max',
        description: 'O MacBook Pro mais poderoso já criado. Com o chip M3 Max, oferece performance excepcional para profissionais criativos e desenvolvedores.',
        longDescription: `
          O MacBook Pro 16" com chip M3 Max representa o ápice da tecnologia Apple. 
          Com até 16 núcleos de CPU e 40 núcleos de GPU, oferece performance incomparável 
          para tarefas intensivas como edição de vídeo 8K, renderização 3D e desenvolvimento de software.
          
          A tela Liquid Retina XDR de 16.2 polegadas oferece cores vibrantes e contraste 
          impressionante, perfeita para trabalho profissional. O sistema de som de seis alto-falantes 
          com Spatial Audio proporciona uma experiência imersiva.
          
          Com até 128GB de memória unificada e 8TB de armazenamento SSD, você tem espaço 
          e velocidade para os projetos mais exigentes. A bateria oferece até 22 horas de 
          duração, permitindo trabalho ininterrupto.
        `,
        price: 15999,
        originalPrice: 17999,
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
        ],
        brand: 'Apple',
        category: 'Laptops & Notebooks',
        rating: 4.8,
        reviewCount: 127,
        stockQuantity: 15,
        isFeatured: true,
        isNew: false,
        discount: 11,
        specifications: {
          'Processador': 'Apple M3 Max',
          'Memória': '32GB RAM',
          'Armazenamento': '1TB SSD',
          'Tela': '16.2" Liquid Retina XDR',
          'Resolução': '3456 x 2234 pixels',
          'GPU': '40-core GPU',
          'Bateria': 'Até 22 horas',
          'Peso': '2.16 kg',
          'Sistema': 'macOS Sonoma'
        },
        features: [
          'Chip M3 Max com 16 núcleos de CPU',
          'Tela Liquid Retina XDR de 16.2"',
          'Até 40 núcleos de GPU',
          'Até 128GB de memória unificada',
          'Sistema de som de seis alto-falantes',
          'Bateria de longa duração',
          'Design premium em alumínio',
          'Compatível com Thunderbolt 4'
        ]
      }
      
      setProduct(mockProduct)
    } catch (err) {
      setError('Erro ao carregar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      brand: product.brand
    })
  }

  const handleEditReview = (review: any) => {
    setEditingReview(review)
    setShowReviewForm(true)
  }

  const handleReviewSuccess = () => {
    setShowReviewForm(false)
    setEditingReview(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-cyber-300">Carregando produto...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Produto Não Encontrado</h1>
            <p className="text-cyber-400 mb-6">{error || 'O produto solicitado não foi encontrado'}</p>
            <Button asChild className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à Página Inicial
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-cyber-400 hover:text-neon-blue">
              Início
            </Link>
            <span className="text-cyber-600">/</span>
            <Link href="/categorias" className="text-cyber-400 hover:text-neon-blue">
              Categorias
            </Link>
            <span className="text-cyber-600">/</span>
            <Link href={`/categoria/${product.category.toLowerCase()}`} className="text-cyber-400 hover:text-neon-blue">
              {product.category}
            </Link>
            <span className="text-cyber-600">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-dark-800/50 border border-cyber-500/30">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-neon-blue'
                      : 'border-cyber-500/30 hover:border-cyber-500/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-cyber-700 text-cyber-300">
                  {product.brand}
                </Badge>
                {product.isNew && (
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    Novo
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(product.rating)
                          ? 'text-neon-yellow fill-current'
                          : 'text-cyber-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-cyber-300">
                  {product.rating} ({product.reviewCount} avaliações)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-neon-green">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-cyber-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <p className="text-cyber-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-cyber-300">Quantidade:</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="outline"
                    size="sm"
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-medium w-8 text-center">{quantity}</span>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    variant="outline"
                    size="sm"
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                
                <WishlistButton product={product} />
                
                <Button
                  variant="outline"
                  className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Características:</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-cyber-300">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-neon-green" />
                  <span className="text-cyber-300">Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-neon-blue" />
                  <span className="text-cyber-300">Garantia de 1 ano</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-neon-purple" />
                  <span className="text-cyber-300">Troca em até 30 dias</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="bg-dark-800/50 border border-cyber-500/30 rounded-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-cyber-500/30">
              {[
                { id: 'description', label: 'Descrição', icon: Eye },
                { id: 'specs', label: 'Especificações', icon: ThumbsUp },
                { id: 'reviews', label: 'Avaliações', icon: MessageCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-neon-blue border-b-2 border-neon-blue bg-cyber-800/30'
                      : 'text-cyber-400 hover:text-neon-blue hover:bg-cyber-800/20'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-cyber-300 leading-relaxed whitespace-pre-line">
                    {product.longDescription}
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-cyber-500/20">
                      <span className="text-cyber-400">{key}:</span>
                      <span className="text-white font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {user && (
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Suas Avaliações</h3>
                      <Button
                        onClick={() => setShowReviewForm(true)}
                        className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Avaliar Produto
                      </Button>
                    </div>
                  )}
                  
                  <ReviewList 
                    productId={product.id} 
                    productName={product.name}
                    onEditReview={handleEditReview}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-cyber-500/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              productId={product.id}
              productName={product.name}
              existingReview={editingReview}
              onSuccess={handleReviewSuccess}
              onCancel={() => {
                setShowReviewForm(false)
                setEditingReview(null)
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
