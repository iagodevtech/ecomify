import React from 'react'
import { OrderPageClient } from './order-page-client'

// Server component wrapper + static params for static export
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

export default function OrderPage() {
  return <OrderPageClient />
}
