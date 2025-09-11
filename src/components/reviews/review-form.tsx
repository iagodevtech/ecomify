'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send, X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReviews } from '@/components/providers'
import { useAuth } from '@/components/providers'

interface ReviewFormProps {
  productId: string
  productName: string
  onSuccess?: () => void
  onCancel?: () => void
  existingReview?: {
    id: string
    rating: number
    title: string
    comment: string
  }
}

export function ReviewForm({ 
  productId, 
  productName, 
  onSuccess, 
  onCancel,
  existingReview 
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [title, setTitle] = useState(existingReview?.title || '')
  const [comment, setComment] = useState(existingReview?.comment || '')
  const [hoveredRating, setHoveredRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { createReview, updateReview } = useReviews()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError('Você precisa estar logado para avaliar')
      return
    }

    if (rating === 0) {
      setError('Por favor, selecione uma avaliação')
      return
    }

    if (!title.trim()) {
      setError('Por favor, adicione um título')
      return
    }

    if (!comment.trim()) {
      setError('Por favor, adicione um comentário')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (existingReview) {
        const result = await updateReview(existingReview.id, rating, title.trim(), comment.trim())
        if (!result.success) {
          setError(result.error || 'Erro ao atualizar avaliação')
          return
        }
      } else {
        const result = await createReview(productId, rating, title.trim(), comment.trim())
        if (!result.success) {
          setError(result.error || 'Erro ao criar avaliação')
          return
        }
      }

      onSuccess?.()
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Muito ruim'
      case 2: return 'Ruim'
      case 3: return 'Regular'
      case 4: return 'Bom'
      case 5: return 'Excelente'
      default: return 'Selecione uma avaliação'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          {existingReview ? 'Editar Avaliação' : 'Avaliar Produto'}
        </h3>
        {onCancel && (
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="text-cyber-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="mb-4">
        <p className="text-cyber-300 text-sm mb-2">Produto:</p>
        <p className="text-white font-medium">{productName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-cyber-300 text-sm mb-3">
            Avaliação *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'text-neon-yellow fill-current'
                      : 'text-cyber-600'
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-cyber-400 text-sm">
              {getRatingText(hoveredRating || rating)}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-cyber-300 text-sm mb-2">
            Título da Avaliação *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Excelente produto, recomendo!"
            className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
            maxLength={100}
          />
          <p className="text-cyber-500 text-xs mt-1">
            {title.length}/100 caracteres
          </p>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-cyber-300 text-sm mb-2">
            Comentário *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte sua experiência com este produto..."
            rows={4}
            className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none resize-none"
            maxLength={500}
          />
          <p className="text-cyber-500 text-xs mt-1">
            {comment.length}/500 caracteres
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={loading || rating === 0 || !title.trim() || !comment.trim()}
            className="flex-1 cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
          >
            {loading ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {existingReview ? 'Atualizar Avaliação' : 'Enviar Avaliação'}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  )
}
