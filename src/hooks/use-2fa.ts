'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/providers'

interface TwoFactorAuth {
  isEnabled: boolean
  secret: string | null
  backupCodes: string[]
  qrCode: string | null
}

export function use2FA() {
  const [twoFactorAuth, setTwoFactorAuth] = useState<TwoFactorAuth>({
    isEnabled: false,
    secret: null,
    backupCodes: [],
    qrCode: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Carregar status do 2FA
  useEffect(() => {
    if (user) {
      load2FAStatus()
    }
  }, [user])

  const load2FAStatus = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('user_security')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setTwoFactorAuth({
          isEnabled: data.two_factor_enabled || false,
          secret: data.two_factor_secret || null,
          backupCodes: data.backup_codes || [],
          qrCode: data.qr_code || null
        })
      }
    } catch (err) {
      setError('Erro ao carregar configurações de segurança')
    } finally {
      setLoading(false)
    }
  }

  const generate2FASecret = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      // Gerar secret e QR code
      const response = await fetch('/api/2fa/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar código 2FA')
      }

      const data = await response.json()

      setTwoFactorAuth(prev => ({
        ...prev,
        secret: data.secret,
        qrCode: data.qrCode
      }))

      return data
    } catch (err) {
      setError('Erro ao gerar código 2FA')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const enable2FA = async (token: string) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/2fa/enable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          token,
          secret: twoFactorAuth.secret
        })
      })

      if (!response.ok) {
        throw new Error('Código 2FA inválido')
      }

      const data = await response.json()

      // Salvar no banco de dados
      const { error: dbError } = await supabase
        .from('user_security')
        .upsert({
          user_id: user.id,
          two_factor_enabled: true,
          two_factor_secret: twoFactorAuth.secret,
          backup_codes: data.backupCodes,
          qr_code: twoFactorAuth.qrCode,
          updated_at: new Date().toISOString()
        })

      if (dbError) {
        throw dbError
      }

      setTwoFactorAuth(prev => ({
        ...prev,
        isEnabled: true,
        backupCodes: data.backupCodes
      }))

      return data
    } catch (err) {
      setError('Erro ao ativar 2FA')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const disable2FA = async (token: string) => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/2fa/disable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          token,
          secret: twoFactorAuth.secret
        })
      })

      if (!response.ok) {
        throw new Error('Código 2FA inválido')
      }

      // Remover do banco de dados
      const { error: dbError } = await supabase
        .from('user_security')
        .update({
          two_factor_enabled: false,
          two_factor_secret: null,
          backup_codes: [],
          qr_code: null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (dbError) {
        throw dbError
      }

      setTwoFactorAuth({
        isEnabled: false,
        secret: null,
        backupCodes: [],
        qrCode: null
      })

      return true
    } catch (err) {
      setError('Erro ao desativar 2FA')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const verify2FA = async (token: string) => {
    if (!user || !twoFactorAuth.secret) return false

    try {
      const response = await fetch('/api/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: twoFactorAuth.secret,
          token
        })
      })

      return response.ok
    } catch (err) {
      return false
    }
  }

  const generateBackupCodes = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/2fa/backup-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar códigos de backup')
      }

      const data = await response.json()

      // Atualizar no banco de dados
      const { error: dbError } = await supabase
        .from('user_security')
        .update({
          backup_codes: data.backupCodes,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (dbError) {
        throw dbError
      }

      setTwoFactorAuth(prev => ({
        ...prev,
        backupCodes: data.backupCodes
      }))

      return data.backupCodes
    } catch (err) {
      setError('Erro ao gerar códigos de backup')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    twoFactorAuth,
    loading,
    error,
    generate2FASecret,
    enable2FA,
    disable2FA,
    verify2FA,
    generateBackupCodes,
    load2FAStatus
  }
}