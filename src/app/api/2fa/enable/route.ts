import { NextRequest, NextResponse } from 'next/server'
import { authenticator } from 'otplib'

export async function POST(request: NextRequest) {
  try {
    const { userId, token, secret } = await request.json()

    if (!userId || !token || !secret) {
      return NextResponse.json(
        { error: 'User ID, token, and secret are required' },
        { status: 400 }
      )
    }

    // Verificar se o token é válido
    const isValid = authenticator.verify({ token, secret })

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      )
    }

    // Gerar códigos de backup
    const backupCodes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    )

    return NextResponse.json({
      success: true,
      backupCodes
    })
  } catch (error) {
    console.error('Error enabling 2FA:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
