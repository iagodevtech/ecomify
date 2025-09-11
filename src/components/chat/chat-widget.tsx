'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Heart,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Bell,
  Settings,
  Star,
  Award,
  Crown,
  Gem,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick_reply' | 'product' | 'order'
  quickReplies?: string[]
  product?: {
    id: string
    name: string
    price: number
    image: string
  }
}

const quickReplies = [
  'Como rastrear meu pedido?',
  'Quero falar com um atendente',
  'Problema com pagamento',
  'Devolução de produto',
  'Informações sobre garantia'
]

const botResponses = {
  greeting: [
    'Olá! Sou o assistente virtual da Ecomify. Como posso ajudá-lo hoje?',
    'Oi! Estou aqui para ajudar você. Em que posso ser útil?',
    'Bem-vindo à Ecomify! Como posso assisti-lo?'
  ],
  order_tracking: 'Para rastrear seu pedido, acesse "Meus Pedidos" no seu perfil ou use o código de rastreamento enviado por email.',
  payment_issue: 'Para problemas com pagamento, verifique se seus dados estão corretos ou entre em contato com seu banco.',
  return: 'Você tem 7 dias para solicitar devolução. Entre em contato conosco através do chat ou email.',
  warranty: 'Produtos físicos têm garantia de 1 ano. Produtos digitais têm garantia de 30 dias.',
  human: 'Vou conectar você com um de nossos atendentes. Aguarde um momento...'
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: botResponses.greeting[0],
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      quickReplies: quickReplies
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type,
        quickReplies: botResponse.quickReplies
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateBotResponse = (userText: string) => {
    const text = userText.toLowerCase()

    if (text.includes('rastrear') || text.includes('pedido')) {
      return {
        text: botResponses.order_tracking,
        type: 'text' as const,
        quickReplies: ['Preciso de mais ajuda', 'Quero falar com atendente']
      }
    }

    if (text.includes('pagamento') || text.includes('pix') || text.includes('cartão')) {
      return {
        text: botResponses.payment_issue,
        type: 'text' as const,
        quickReplies: ['Problema não resolvido', 'Falar com atendente']
      }
    }

    if (text.includes('devolução') || text.includes('devolver')) {
      return {
        text: botResponses.return,
        type: 'text' as const,
        quickReplies: ['Como solicitar devolução?', 'Falar com atendente']
      }
    }

    if (text.includes('garantia') || text.includes('defeito')) {
      return {
        text: botResponses.warranty,
        type: 'text' as const,
        quickReplies: ['Como acionar garantia?', 'Falar com atendente']
      }
    }

    if (text.includes('atendente') || text.includes('humano') || text.includes('pessoa')) {
      return {
        text: botResponses.human,
        type: 'text' as const,
        quickReplies: []
      }
    }

    return {
      text: 'Entendi sua dúvida. Posso ajudá-lo com informações sobre pedidos, pagamentos, devoluções ou conectar você com um atendente.',
      type: 'text' as const,
      quickReplies: quickReplies
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center shadow-2xl z-50 hover:shadow-neon-blue/50 transition-all"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-green rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed bottom-6 right-6 bg-dark-800 border border-cyber-500/30 rounded-2xl shadow-2xl z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyber-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Assistente Ecomify</h3>
                  <p className="text-cyber-400 text-sm">Online agora</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-cyber-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-cyber-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[350px]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-neon-blue to-neon-purple' 
                            : 'bg-gradient-to-br from-neon-green to-neon-blue'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                            : 'bg-cyber-700/50 text-cyber-300'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-cyber-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-cyber-700/50 rounded-2xl p-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Replies */}
                  {messages.length > 0 && messages[messages.length - 1].quickReplies && (
                    <div className="flex flex-wrap gap-2">
                      {messages[messages.length - 1].quickReplies!.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-2 bg-cyber-700/50 text-cyber-300 rounded-lg text-sm hover:bg-cyber-600/50 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-cyber-500/30">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-4 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none"
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim()}
                      className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
