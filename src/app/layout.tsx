import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import { MatrixRain } from '@/components/effects/matrix-rain'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
})

export const metadata: Metadata = {
  title: 'Ecomify - Ecommerce Futurístico de Tecnologia',
  description: 'A plataforma de ecommerce mais avançada para produtos digitais, computadores e tecnologia. Experiência futurística com IA, realidade aumentada e pagamentos instantâneos.',
  keywords: 'ecommerce, tecnologia, produtos digitais, computadores, hardware, software, futurístico, IA, realidade aumentada',
  authors: [{ name: 'Ecomify Team' }],
  creator: 'Ecomify',
  publisher: 'Ecomify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ecomify.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ecomify - Ecommerce Futurístico de Tecnologia',
    description: 'A plataforma de ecommerce mais avançada para produtos digitais e tecnologia',
    url: 'https://ecomify.com',
    siteName: 'Ecomify',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ecomify - Ecommerce Futurístico',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecomify - Ecommerce Futurístico de Tecnologia',
    description: 'A plataforma de ecommerce mais avançada para produtos digitais e tecnologia',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00f5ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${inter.className} antialiased bg-dark-900 text-white overflow-x-hidden`}>
        <MatrixRain />
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#00f5ff',
                border: '1px solid #00f5ff',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
