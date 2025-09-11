module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/lib': './src/lib',
          '@/hooks': './src/hooks',
          '@/types': './src/types',
          '@/utils': './src/utils',
          '@/data': './src/data',
        },
      },
    ],
  ],
}
