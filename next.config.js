/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Configurações de imagem
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configurações de compilação
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Desabilitar verificação de tipos durante o build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Configurações de headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? 'https://ecomify.com' 
              : 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },

  // Configurações de redirecionamento
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/produtos',
        permanent: true,
      },
    ]
  },

  // Configurações de rewrites
  async rewrites() {
    return [
      {
        source: '/api/stripe/webhook',
        destination: '/api/webhooks/stripe',
      },
    ]
  },

  // Configurações de output para GitHub Pages (apenas em produção)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'out',
    assetPrefix: '/ecomify',
    basePath: '/ecomify',
  }),

  // Configurações de trailing slash
  trailingSlash: false,

  // Configurações de powered by header
  poweredByHeader: false,

  // Configurações de compressão
  compress: true,

  // Configurações de SWC
  swcMinify: true,

  // Configurações de env
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Configurações de i18n removidas para compatibilidade com export estático
  // i18n: {
  //   locales: ['pt-BR', 'en-US'],
  //   defaultLocale: 'pt-BR',
  //   localeDetection: false,
  // },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Excluir arquivos mobile do build
    config.module.rules.push({
      test: /mobile\/.*\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader'
    })

    // Otimizações para produção
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }

    return config
  },
}

module.exports = nextConfig