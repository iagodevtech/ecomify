# Ecomify Mobile App

O aplicativo móvel do Ecomify - uma plataforma de e-commerce futurística para produtos de tecnologia.

## 🚀 Funcionalidades

### 📱 **Interface Futurística**
- Design cyberpunk com cores neon
- Animações fluidas e transições suaves
- Tema escuro com acentos coloridos
- Interface adaptativa para diferentes tamanhos de tela

### 🔐 **Autenticação Avançada**
- Login/Registro com Supabase
- Autenticação biométrica (Face ID/Touch ID)
- Autenticação de dois fatores
- Recuperação de senha segura

### 🛒 **E-commerce Completo**
- Catálogo de produtos com filtros avançados
- Carrinho de compras sincronizado
- Sistema de favoritos
- Histórico de pedidos
- Rastreamento de entregas

### 💳 **Pagamentos Seguros**
- PIX instantâneo
- Cartão de crédito/débito
- Boleto bancário
- Integração com Stripe
- Pagamentos com biometria

### 🔔 **Notificações Inteligentes**
- Push notifications personalizadas
- Alertas de preço
- Notificações de pedidos
- Lembretes de carrinho abandonado

### 📊 **Analytics e Insights**
- Dashboard personalizado
- Histórico de compras
- Recomendações baseadas em IA
- Análise de gastos

## 🛠️ Tecnologias

- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Supabase** - Backend e autenticação
- **Stripe** - Processamento de pagamentos
- **React Navigation** - Navegação
- **React Query** - Gerenciamento de estado
- **Expo Notifications** - Push notifications
- **Expo Local Authentication** - Biometria

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI
- EAS CLI (para builds)
- Conta no Expo
- Conta no Supabase
- Conta no Stripe

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/iagodevtech/ecomify.git
cd ecomify/mobile
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm start
# ou
yarn start
```

## 📱 Executando o App

### Desenvolvimento
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web
npm run web
```

### Build para Produção

#### Android
```bash
# Build APK
eas build --platform android --profile preview

# Build AAB (Google Play)
eas build --platform android --profile production
```

#### iOS
```bash
# Build para TestFlight
eas build --platform ios --profile production
```

## 🏗️ Estrutura do Projeto

```
mobile/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── navigation/          # Configuração de navegação
│   ├── providers/           # Context providers
│   ├── screens/             # Telas do app
│   ├── lib/                 # Utilitários e configurações
│   ├── types/               # Definições TypeScript
│   └── utils/               # Funções auxiliares
├── assets/                  # Imagens, fontes, etc.
├── App.tsx                  # Componente principal
├── app.json                 # Configuração do Expo
├── eas.json                 # Configuração do EAS Build
└── package.json             # Dependências
```

## 🔧 Configuração

### Supabase
1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as tabelas necessárias
3. Ative a autenticação
4. Configure as políticas RLS

### Stripe
1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha as chaves de API
3. Configure webhooks
4. Teste os pagamentos

### Expo
1. Crie uma conta no [Expo](https://expo.dev)
2. Configure o projeto EAS
3. Configure as credenciais de build
4. Configure as stores (App Store/Google Play)

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm start                    # Inicia o servidor de desenvolvimento
npm run ios                  # Executa no iOS
npm run android              # Executa no Android
npm run web                  # Executa no navegador

# Build
npm run build:android        # Build para Android
npm run build:ios            # Build para iOS

# Deploy
npm run submit:android       # Submete para Google Play
npm run submit:ios           # Submete para App Store
```

## 🎨 Temas

O app suporta três temas:
- **Light** - Tema claro tradicional
- **Dark** - Tema escuro moderno
- **Cyber** - Tema futurístico com cores neon

## 🔐 Segurança

- Autenticação com Supabase
- Armazenamento seguro com Expo Secure Store
- Biometria para pagamentos
- Criptografia de dados sensíveis
- Validação de entrada
- Sanitização de dados

## 📊 Performance

- Lazy loading de telas
- Cache inteligente com React Query
- Otimização de imagens
- Bundle splitting
- Animações otimizadas

## 🧪 Testes

```bash
# Testes unitários
npm test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e
```

## 🚀 Deploy

### Google Play Store
1. Configure as credenciais no EAS
2. Execute `eas build --platform android --profile production`
3. Execute `eas submit --platform android`

### Apple App Store
1. Configure as credenciais no EAS
2. Execute `eas build --platform ios --profile production`
3. Execute `eas submit --platform ios`

## 📈 Monitoramento

- **Crashlytics** - Relatórios de crash
- **Analytics** - Métricas de uso
- **Performance** - Monitoramento de performance
- **Logs** - Logs estruturados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

## 🆘 Suporte

- **Documentação**: [docs.ecomify.com](https://docs.ecomify.com)
- **Issues**: [GitHub Issues](https://github.com/iagodevtech/ecomify/issues)
- **Discord**: [Ecomify Community](https://discord.gg/ecomify)
- **Email**: support@ecomify.com

## 🎯 Roadmap

### v1.1
- [ ] Realidade aumentada para produtos
- [ ] Chat com suporte
- [ ] Programa de fidelidade
- [ ] Integração com redes sociais

### v1.2
- [ ] Modo offline
- [ ] Sincronização em tempo real
- [ ] Widgets para iOS/Android
- [ ] Apple Pay / Google Pay

### v2.0
- [ ] IA para recomendações
- [ ] Voice shopping
- [ ] Blockchain para autenticidade
- [ ] Metaverso integration

---

**Desenvolvido com ❤️ pela equipe Ecomify**