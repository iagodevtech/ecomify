'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  ThumbsUp, 
  User, 
  Calendar, 
  Filter, 
  SortAsc, 
  SortDesc,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useReviews } from '@/components/providers'
import { useAuth } from '@/components/providers'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ReviewListProps {
  productId: string
  productName: string
  onEditReview?: (review: any) => void
}

export function ReviewList({ productId, productName, onEditReview }: ReviewListProps) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful'>('newest')
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [userReview, setUserReview] = useState<any>(null)
  
  const { getProductReviews, getUserReview, markHelpful } = useReviews()
  const { user } = useAuth()

  useEffect(() => {
    loadReviews()
    if (user) {
      loadUserReview()
    }
  }, [productId, user])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const productReviews = await getProductReviews(productId)
      setReviews(productReviews)
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserReview = async () => {
    if (!user) return
    
    try {
      const review = await getUserReview(productId)
      setUserReview(review)
    } catch (error) {
      console.error('Error loading user review:', error)
    }
  }

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      await markHelpful(reviewId)
      // Update local state
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful_count: review.helpful_count + 1 }
          : review
      ))
    } catch (error) {
      console.error('Error marking review as helpful:', error)
    }
  }

  const getSortedReviews = () => {
    let sorted = [...reviews]

    // Filter by rating
    if (filterRating) {
      sorted = sorted.filter(review => review.rating === filterRating)
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'oldest':
        sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'helpful':
        sorted.sort((a, b) => b.helpful_count - a.helpful_count)
        break
    }

    return sorted
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.length
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? 'text-neon-yellow fill-current'
                : 'text-cyber-600'
            }`}
          />
        ))}
      </div>
    )
  }

  const ReviewCard = ({ review }: { review: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {review.user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <p className="text-white font-medium">{review.user?.name || 'Usuário'}</p>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-cyber-400 text-sm">
                {formatDistanceToNow(new Date(review.created_at), { 
                  addSuffix: true, 
                  locale: ptBR 
                })}
              </span>
            </div>
          </div>
        </div>
        
        {user && user.id === review.user_id && onEditReview && (
          <Button
            onClick={() => onEditReview(review)}
            variant="ghost"
            size="sm"
            className="text-cyber-400 hover:text-neon-blue"
          >
            Editar
          </Button>
        )}
      </div>

      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">{review.title}</h4>
        <p className="text-cyber-300 leading-relaxed">{review.comment}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={() => handleMarkHelpful(review.id)}
          variant="ghost"
          size="sm"
          className="text-cyber-400 hover:text-neon-green"
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          Útil ({review.helpful_count})
        </Button>
      </div>
    </motion.div>
  )

  const averageRating = getAverageRating()
  const ratingDistribution = getRatingDistribution()
  const sortedReviews = getSortedReviews()

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Avaliações dos Clientes</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-yellow mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <p className="text-cyber-400 text-sm mt-2">
              Baseado em {reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution]
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-cyber-400 text-sm w-8">{rating}</span>
                  <Star className="w-4 h-4 text-neon-yellow fill-current" />
                  <div className="flex-1 bg-cyber-700 rounded-full h-2">
                    <div
                      className="bg-neon-yellow h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-cyber-400 text-sm w-8">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Filters and Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
            {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </Button>

          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            >
              <option value="newest">Mais Recentes</option>
              <option value="oldest">Mais Antigas</option>
              <option value="rating">Melhor Avaliadas</option>
              <option value="helpful">Mais Úteis</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-cyber-500/30"
          >
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterRating(null)}
                variant={filterRating === null ? 'default' : 'outline'}
                size="sm"
                className={filterRating === null ? 'bg-neon-blue text-white' : 'border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue'}
              >
                Todas
              </Button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  variant={filterRating === rating ? 'default' : 'outline'}
                  size="sm"
                  className={filterRating === rating ? 'bg-neon-blue text-white' : 'border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue'}
                >
                  <Star className="w-3 h-3 mr-1 text-neon-yellow fill-current" />
                  {rating}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-cyber-300">Carregando avaliações...</p>
        </div>
      ) : sortedReviews.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-cyber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhuma avaliação encontrada
          </h3>
          <p className="text-cyber-400">
            {filterRating ? `Nenhuma avaliação com ${filterRating} estrelas` : 'Seja o primeiro a avaliar este produto!'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}
