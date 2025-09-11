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

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error disabling 2FA:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
