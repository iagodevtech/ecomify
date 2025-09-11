import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, currency } = await request.json()

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: 'Order ID and amount are required' },
        { status: 400 }
      )
    }

    // Generate PIX payment data
    const pixKey = 'ecomify@pix.com' // This would be your actual PIX key
    const pixCode = generatePixCode(pixKey, amount, orderId)
    const qrCode = await generateQRCode(pixCode)

    // Update order with PIX data
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'pending',
        payment_data: {
          pix_code: pixCode,
          pix_key: pixKey,
          qr_code: qrCode
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Error updating order with PIX data:', updateError)
    }

    return NextResponse.json({
      success: true,
      pixCode,
      qrCode,
      pixUrl: `pix://${pixCode}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    })
  } catch (error) {
    console.error('Error creating PIX payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generatePixCode(pixKey: string, amount: number, orderId: string): string {
  // This is a simplified PIX code generation
  // In production, you would use a proper PIX library
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 15)
  
  return `00020126580014br.gov.bcb.pix0136${pixKey}520400005303986540${amount.toFixed(2)}5802BR5913Ecomify LTDA6009Sao Paulo62070503***6304${randomId}`
}

async function generateQRCode(pixCode: string): Promise<string> {
  // In production, you would use a QR code generation library
  // For now, return a placeholder
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
}
