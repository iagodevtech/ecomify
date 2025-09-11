'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Smartphone, 
  Copy, 
  Check, 
  AlertCircle,
  Download,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { use2FA } from '@/hooks/use-2fa'

interface TwoFactorSetupProps {
  onComplete?: () => void
}

export function TwoFactorSetup({ onComplete }: TwoFactorSetupProps) {
  const [step, setStep] = useState<'setup' | 'verify' | 'backup'>('setup')
  const [token, setToken] = useState('')
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const {
    twoFactorAuth,
    loading,
    error,
    generate2FASecret,
    enable2FA,
    generateBackupCodes
  } = use2FA()

  const handleGenerateSecret = async () => {
    try {
      await generate2FASecret()
    } catch (err) {
      console.error('Error generating secret:', err)
    }
  }

  const handleEnable2FA = async () => {
    if (!token) return

    try {
      const result = await enable2FA(token)
      setStep('backup')
    } catch (err) {
      console.error('Error enabling 2FA:', err)
    }
  }

  const handleCopyBackupCodes = async () => {
    const codes = twoFactorAuth.backupCodes.join('\n')
    await navigator.clipboard.writeText(codes)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadBackupCodes = () => {
    const codes = twoFactorAuth.backupCodes.join('\n')
    const blob = new Blob([codes], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ecomify-backup-codes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 border border-cyber-500/30 rounded-xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Configurar Autenticação de Dois Fatores
          </h2>
          <p className="text-cyber-400">
            Adicione uma camada extra de segurança à sua conta
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </motion.div>
        )}

        {/* Step 1: Setup */}
        {step === 'setup' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Passo 1: Configurar App Autenticador
              </h3>
              <p className="text-cyber-400 mb-6">
                Instale um app autenticador como Google Authenticator, Authy ou Microsoft Authenticator
              </p>
            </div>

            {!twoFactorAuth.secret ? (
              <div className="text-center">
                <Button
                  onClick={handleGenerateSecret}
                  disabled={loading}
                  className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                >
                  {loading ? 'Gerando...' : 'Gerar Código QR'}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className="inline-block p-4 bg-white rounded-lg">
                    <img 
                      src={twoFactorAuth.qrCode!} 
                      alt="QR Code para 2FA" 
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-cyber-400 text-sm mt-4">
                    Escaneie este QR code com seu app autenticador
                  </p>
                </div>

                {/* Manual Entry */}
                <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Ou digite manualmente:</h4>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-dark-800 px-3 py-2 rounded text-cyber-300 font-mono text-sm">
                      {twoFactorAuth.secret}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(twoFactorAuth.secret!)}
                      className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setStep('verify')}
                    className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Verify */}
        {step === 'verify' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Passo 2: Verificar Código
              </h3>
              <p className="text-cyber-400 mb-6">
                Digite o código de 6 dígitos do seu app autenticador
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-3 bg-dark-700 border border-cyber-500/30 rounded-lg text-white text-center text-2xl font-mono tracking-widest focus:border-neon-blue focus:outline-none"
                maxLength={6}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setStep('setup')}
                className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
              >
                Voltar
              </Button>
              <Button
                onClick={handleEnable2FA}
                disabled={loading || token.length !== 6}
                className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
              >
                {loading ? 'Verificando...' : 'Ativar 2FA'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Backup Codes */}
        {step === 'backup' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                2FA Ativado com Sucesso!
              </h3>
              <p className="text-cyber-400 mb-6">
                Salve estes códigos de backup em local seguro. Eles podem ser usados para acessar sua conta caso perca o acesso ao app autenticador.
              </p>
            </div>

            <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Códigos de Backup</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBackupCodes(!showBackupCodes)}
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    {showBackupCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyBackupCodes}
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadBackupCodes}
                    className="border-cyber-500 text-cyber-400 hover:border-neon-blue hover:text-neon-blue"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {twoFactorAuth.backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="bg-dark-800 px-3 py-2 rounded text-cyber-300 font-mono text-sm text-center"
                  >
                    {showBackupCodes ? code : '••••••'}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-medium mb-1">Importante</h4>
                  <p className="text-amber-300 text-sm">
                    Cada código de backup só pode ser usado uma vez. Mantenha-os em local seguro e não compartilhe com ninguém.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={onComplete}
                className="cyber-button bg-gradient-to-r from-neon-green to-neon-blue text-white"
              >
                Concluir Configuração
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
