import React from 'react'
import { ProductPageClient } from './product-page-client'

// Generate static params for static export
export async function generateStaticParams() {
  // Return a list of product slugs to pre-generate
  return [
    { slug: 'macbook-pro-16-m3-max' },
    { slug: 'iphone-15-pro-max' },
    { slug: 'samsung-galaxy-s24-ultra' },
    { slug: 'dell-xps-13' },
    { slug: 'ipad-pro-12-9' }
  ]
}

export default function ProductPage() {
  return <ProductPageClient />
}
