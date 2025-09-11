'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface TwoFactorAuth {
  isEnabled: boolean
  secret: string | null
  backupCodes: string[]
  qrCode: string | null
}

export function use2FA() {
  const [twoFA, setTwoFA] = useState<TwoFactorAuth>({
    isEnabled: false,
    secret: null,
    backupCodes: [],
    qrCode: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verificar status do 2FA
  const check2FAStatus = async () => {
    try {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('two_factor_enabled, two_factor_secret, backup_codes')
          .eq('id', user.id)
          .single()

        if (error) throw error

        setTwoFA({
          isEnabled: data?.two_factor_enabled || false,
          secret: data?.two_factor_secret || null,
          backupCodes: data?.backup_codes || [],
          qrCode: null
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao verificar 2FA')
    } finally {
      setIsLoading(false)
    }
  }

  // Gerar secret para 2FA
  const generateSecret = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      // Em produção, isso seria feito no backend
      const secret = generateRandomSecret()
      const qrCode = generateQRCode(secret, user.email || 'user@example.com')

      setTwoFA(prev => ({
        ...prev,
        secret,
        qrCode
      }))

      return { secret, qrCode }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar secret')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Ativar 2FA
  const enable2FA = async (token: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      // Verificar token
      if (!verifyToken(twoFA.secret!, token)) {
        throw new Error('Token inválido')
      }

      // Gerar códigos de backup
      const backupCodes = generateBackupCodes()

      // Salvar no banco
      const { error } = await supabase
        .from('profiles')
        .update({
          two_factor_enabled: true,
          two_factor_secret: twoFA.secret,
          backup_codes: backupCodes
        })
        .eq('id', user.id)

      if (error) throw error

      setTwoFA(prev => ({
        ...prev,
        isEnabled: true,
        backupCodes
      }))

      return backupCodes
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao ativar 2FA')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Desativar 2FA
  const disable2FA = async (password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      // Verificar senha
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password
      })

      if (authError) throw new Error('Senha incorreta')

      // Desativar 2FA
      const { error } = await supabase
        .from('profiles')
        .update({
          two_factor_enabled: false,
          two_factor_secret: null,
          backup_codes: []
        })
        .eq('id', user.id)

      if (error) throw error

      setTwoFA({
        isEnabled: false,
        secret: null,
        backupCodes: [],
        qrCode: null
      })

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao desativar 2FA')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Verificar token 2FA
  const verify2FA = async (token: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false

      const { data, error } = await supabase
        .from('profiles')
        .select('two_factor_secret, backup_codes')
        .eq('id', user.id)
        .single()

      if (error || !data) return false

      // Verificar token TOTP
      if (verifyToken(data.two_factor_secret, token)) {
        return true
      }

      // Verificar códigos de backup
      if (data.backup_codes?.includes(token)) {
        // Remover código usado
        const updatedCodes = data.backup_codes.filter((code: string) => code !== token)
        await supabase
          .from('profiles')
          .update({ backup_codes: updatedCodes })
          .eq('id', user.id)
        
        return true
      }

      return false
    } catch (err) {
      console.error('Erro ao verificar 2FA:', err)
      return false
    }
  }

  useEffect(() => {
    check2FAStatus()
  }, [])

  return {
    twoFA,
    isLoading,
    error,
    generateSecret,
    enable2FA,
    disable2FA,
    verify2FA,
    check2FAStatus
  }
}

// Funções auxiliares (em produção, seriam implementadas no backend)
function generateRandomSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function generateQRCode(secret: string, email: string): string {
  const issuer = 'Ecomify'
  const account = email
  const qrData = `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`
}

function verifyToken(secret: string, token: string): boolean {
  // Implementação simplificada - em produção usar biblioteca TOTP
  const now = Math.floor(Date.now() / 1000 / 30)
  const expectedToken = generateTOTP(secret, now)
  return token === expectedToken
}

function generateTOTP(secret: string, time: number): string {
  // Implementação simplificada - em produção usar biblioteca TOTP
  const hash = btoa(secret + time).slice(-6)
  return hash.replace(/[^0-9]/g, '').padStart(6, '0')
}

function generateBackupCodes(): string[] {
  const codes = []
  for (let i = 0; i < 10; i++) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    codes.push(code)
  }
  return codes
}
