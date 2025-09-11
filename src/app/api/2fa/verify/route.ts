import { NextRequest, NextResponse } from 'next/server'
import { authenticator } from 'otplib'

export async function POST(request: NextRequest) {
  try {
    const { secret, token } = await request.json()

    if (!secret || !token) {
      return NextResponse.json(
        { error: 'Secret and token are required' },
        { status: 400 }
      )
    }

    // Verificar se o token é válido
    const isValid = authenticator.verify({ token, secret })

    return NextResponse.json({
      valid: isValid
    })
  } catch (error) {
    console.error('Error verifying 2FA token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
