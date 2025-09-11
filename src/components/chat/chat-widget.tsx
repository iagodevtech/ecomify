'use client'

import React, { useState, useEffect } from 'react'
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
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const quickReplies = [
  'Como posso ajudar?',
  'Precisa de suporte?',
  'Dúvidas sobre produtos?',
  'Problemas com pedido?'
]

const botResponses = {
  'oi': 'Olá! Como posso ajudar você hoje? 😊',
  'olá': 'Olá! Como posso ajudar você hoje? 😊',
  'ajuda': 'Claro! Posso ajudar com:\n• Informações sobre produtos\n• Status do pedido\n• Problemas técnicos\n• Suporte geral\n\nO que você precisa?',
  'produto': 'Posso ajudar com informações sobre nossos produtos! Qual produto você gostaria de saber mais?',
  'pedido': 'Para verificar seu pedido, preciso do número do pedido ou seu email cadastrado.',
  'preço': 'Posso ajudar com informações de preços! Qual produto você gostaria de consultar?',
  'estoque': 'Posso verificar a disponibilidade dos produtos. Qual produto você está procurando?',
  'entrega': 'Nossos prazos de entrega são:\n• Entrega padrão: 5-7 dias úteis\n• Entrega expressa: 2-3 dias úteis\n• Entrega no mesmo dia: disponível em algumas regiões',
  'pagamento': 'Aceitamos:\n• PIX (processamento instantâneo)\n• Cartão de crédito/débito\n• Boleto bancário\n\nTodos os pagamentos são 100% seguros!',
  'garantia': 'Oferecemos garantia estendida em todos os produtos:\n• Garantia padrão do fabricante\n• Garantia estendida Ecomify\n• Suporte técnico especializado',
  'contato': 'Você pode nos contatar por:\n• Email: iagodevtech@gmail.com\n• Telefone: +55 21 95922-0456\n• Chat online (como agora!)\n• WhatsApp: +55 21 95922-0456'
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! 👋 Bem-vindo à Ecomify! Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = generateBotResponse(text.toLowerCase())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateBotResponse = (userInput: string): string => {
    // Buscar resposta baseada em palavras-chave
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (userInput.includes(keyword)) {
        return response
      }
    }

    // Respostas padrão baseadas no contexto
    if (userInput.includes('obrigado') || userInput.includes('obrigada')) {
      return 'De nada! Fico feliz em ajudar! 😊 Se precisar de mais alguma coisa, é só chamar!'
    }

    if (userInput.includes('tchau') || userInput.includes('até logo')) {
      return 'Até logo! Foi um prazer ajudar você! 👋 Volte sempre à Ecomify!'
    }

    // Resposta padrão
    return 'Entendi! Para te ajudar melhor, você pode:\n\n• Falar com um atendente humano\n• Enviar um email para iagodevtech@gmail.com\n• Ligar para +55 21 95922-0456\n\nOu me diga mais especificamente o que você precisa! 😊'
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chat-messages')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-green to-neon-blue text-white shadow-lg hover:shadow-neon-green/50 transition-all duration-300 relative"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center text-xs font-bold">
              1
            </div>
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 bg-dark-800 border border-cyber-500/30 rounded-xl shadow-2xl ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyber-500/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Suporte Ecomify</h3>
                  <p className="text-cyber-400 text-xs">Online agora</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 p-0 text-cyber-400 hover:text-neon-blue"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 p-0 text-cyber-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div
                  id="chat-messages"
                  className="flex-1 p-4 space-y-4 overflow-y-auto h-[320px]"
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-neon-blue to-neon-purple' 
                            : 'bg-gradient-to-r from-neon-green to-neon-blue'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-3 h-3 text-white" />
                          ) : (
                            <Bot className="w-3 h-3 text-white" />
                          )}
                        </div>
                        
                        <div className={`rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                            : 'bg-dark-700 text-cyber-300'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-200' : 'text-cyber-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-dark-700 rounded-lg p-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Replies */}
                {messages.length <= 1 && (
                  <div className="p-4 border-t border-cyber-500/30">
                    <p className="text-cyber-400 text-xs mb-2">Respostas rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs border-cyber-500/30 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-cyber-500/30">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-3 py-2 bg-dark-700 border border-cyber-500/30 rounded-lg text-white placeholder-cyber-500 focus:border-neon-blue focus:outline-none text-sm"
                    />
                    <Button
                      onClick={() => handleSendMessage(inputMessage)}
                      disabled={!inputMessage.trim()}
                      className="px-3 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:opacity-90 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-cyber-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>+55 21 95922-0456</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>iagodevtech@gmail.com</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>24/7</span>
                    </div>
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