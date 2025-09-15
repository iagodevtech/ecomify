# 🚀 Guia de Deploy - Ecomify

Este guia completo te ajudará a colocar o Ecomify em produção, desde a configuração inicial até o deploy final.

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração do Supabase](#configuração-do-supabase)
3. [Configuração do Stripe](#configuração-do-stripe)
4. [Configuração do Ambiente](#configuração-do-ambiente)
5. [Deploy do Frontend](#deploy-do-frontend)
6. [Deploy do Mobile App](#deploy-do-mobile-app)
7. [Configuração de Domínio](#configuração-de-domínio)
8. [Monitoramento](#monitoramento)
9. [Manutenção](#manutenção)

## 🔧 Pré-requisitos

### Contas Necessárias
- [ ] Conta no Supabase
- [ ] Conta no Stripe
- [ ] Conta no Vercel/Netlify (para frontend)
- [ ] Conta no Expo (para mobile)
- [ ] Conta no GitHub
- [ ] Domínio personalizado (opcional)

### Ferramentas
- [ ] Node.js 18+
- [ ] Git
- [ ] Expo CLI
- [ ] EAS CLI

## 🗄️ Configuração do Supabase

### 1. Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha sua organização
4. Nome: `ecomify-production`
5. Senha: Gere uma senha forte
6. Região: Escolha a mais próxima do Brasil

### 2. Configurar Banco de Dados
Execute os seguintes SQLs no editor SQL do Supabase:

```sql
-- Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de perfis
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  payment_fee DECIMAL(10,2) DEFAULT 0,
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_intent_id TEXT,
  shipping_method TEXT,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens do pedido
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de favoritos
CREATE TABLE wishlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Tabela de avaliações
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de alertas de preço
CREATE TABLE price_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  target_price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de notificações
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('order', 'promotion', 'reminder', 'security', 'recommendation', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

### 3. Configurar RLS (Row Level Security)
```sql
-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para order_items
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Políticas para wishlist
CREATE POLICY "Users can manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);

-- Políticas para reviews
CREATE POLICY "Users can manage own reviews" ON reviews FOR ALL USING (auth.uid() = user_id);

-- Políticas para price_alerts
CREATE POLICY "Users can manage own price alerts" ON price_alerts FOR ALL USING (auth.uid() = user_id);

-- Políticas para notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Produtos são públicos para leitura
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (is_active = true);
```

### 4. Configurar Autenticação
1. Vá em Authentication > Settings
2. Configure Site URL: `https://seu-dominio.com`
3. Configure Redirect URLs:
   - `https://seu-dominio.com/auth/callback`
   - `https://seu-dominio.com/dashboard`
4. Ative os providers desejados (Email, Google, etc.)

### 5. Obter Credenciais
1. Vá em Settings > API
2. Copie:
   - Project URL
   - anon public key
   - service_role key (mantenha secreto!)

## 💳 Configuração do Stripe

### 1. Criar Conta
1. Acesse [stripe.com](https://stripe.com)
2. Crie uma conta de negócio
3. Complete a verificação de identidade
4. Ative o modo live

### 2. Configurar Produtos
1. Vá em Products
2. Crie produtos para:
   - Frete padrão
   - Frete expresso
   - Taxa de processamento

### 3. Configurar Webhooks
1. Vá em Developers > Webhooks
2. Adicione endpoint: `https://seu-dominio.com/api/webhooks/stripe`
3. Selecione eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`

### 4. Obter Chaves
1. Vá em Developers > API keys
2. Copie:
   - Publishable key
   - Secret key (mantenha secreto!)

## ⚙️ Configuração do Ambiente

### 1. Criar Arquivo .env.local
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_sua-chave-publica
STRIPE_SECRET_KEY=sk_live_sua-chave-secreta
STRIPE_WEBHOOK_SECRET=whsec_sua-chave-webhook

# App
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
NEXT_PUBLIC_APP_NAME=Ecomify
```

### 2. Configurar Mobile (.env.local)
```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima

# Stripe
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_sua-chave-publica

# API
EXPO_PUBLIC_API_URL=https://seu-dominio.com
```

## 🌐 Deploy do Frontend

### Opção 1: Vercel (Recomendado)
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Opção 2: Netlify
1. Conecte seu repositório ao Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Configure variáveis de ambiente

### Opção 3: VPS/Server
```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Iniciar servidor
npm start
```

## 📱 Deploy do Mobile App

### 1. Configurar EAS
```bash
cd mobile
npm install -g @expo/eas-cli
eas login
eas build:configure
```

### 2. Build para Android
```bash
# Build APK para teste
eas build --platform android --profile preview

# Build AAB para Google Play
eas build --platform android --profile production
```

### 3. Build para iOS
```bash
# Build para TestFlight
eas build --platform ios --profile production
```

### 4. Submeter para Stores
```bash
# Google Play
eas submit --platform android

# App Store
eas submit --platform ios
```

## 🔗 Configuração de Domínio

### 1. Registrar Domínio
- Escolha um provedor (GoDaddy, Namecheap, etc.)
- Registre: `ecomify.com.br` ou similar

### 2. Configurar DNS
```
A     @            IP_DO_SERVIDOR
CNAME www          seu-dominio.com
CNAME api          seu-dominio.com
```

### 3. Configurar SSL
- Vercel/Netlify: Automático
- VPS: Use Let's Encrypt

## 📊 Monitoramento

### 1. Analytics
- Google Analytics 4
- Vercel Analytics
- Supabase Analytics

### 2. Error Tracking
- Sentry
- LogRocket
- Bugsnag

### 3. Performance
- Vercel Speed Insights
- Google PageSpeed
- Lighthouse

## 🔧 Manutenção

### 1. Backup do Banco
```bash
# Backup automático diário
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### 2. Atualizações
- Dependências: `npm update`
- Supabase: Atualizações automáticas
- Stripe: Atualizações automáticas

### 3. Monitoramento
- Uptime: UptimeRobot
- Logs: Vercel Functions Logs
- Performance: Vercel Analytics

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. Erro de CORS
```javascript
// Adicionar no next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
        ],
      },
    ]
  },
}
```

#### 2. Erro de Autenticação
- Verificar URLs de redirect no Supabase
- Verificar chaves de API
- Verificar configuração de domínio

#### 3. Erro de Pagamento
- Verificar chaves do Stripe
- Verificar webhooks
- Verificar logs do Stripe

## 📞 Suporte

- **Documentação**: [docs.ecomify.com](https://docs.ecomify.com)
- **GitHub Issues**: [github.com/iagodevtech/ecomify/issues](https://github.com/iagodevtech/ecomify/issues)
- **Email**: support@ecomify.com

---

**🎉 Parabéns! Seu Ecomify está pronto para produção!**
