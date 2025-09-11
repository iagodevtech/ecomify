import { NextRequest, NextResponse } from 'next/server'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      )
    }

    // Gerar secret
    const secret = authenticator.generateSecret()

    // Criar URL para o app autenticador
    const serviceName = 'Ecomify'
    const otpAuthUrl = authenticator.keyuri(email, serviceName, secret)

    // Gerar QR Code
    const qrCode = await QRCode.toDataURL(otpAuthUrl)

    return NextResponse.json({
      secret,
      qrCode,
      otpAuthUrl
    })
  } catch (error) {
    console.error('Error generating 2FA secret:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
