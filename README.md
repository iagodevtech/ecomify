# Ecomify - Ecommerce Futurístico

Uma plataforma de ecommerce futurística para produtos digitais, computadores e tecnologia.

## 🚀 Funcionalidades

### 🎨 Design Futurista
- ✅ Design futurístico com tema cyberpunk
- ✅ Animações fluidas com Framer Motion
- ✅ Interface responsiva para todos os dispositivos
- ✅ Tema escuro otimizado com efeitos neon

### 🛍️ E-commerce Completo
- ✅ Catálogo de produtos com filtros avançados
- ✅ Carrinho de compras persistente
- ✅ Sistema de pedidos com rastreamento
- ✅ Lista de desejos e favoritos
- ✅ Sistema de avaliações e reviews
- ✅ Comparador de produtos
- ✅ Busca avançada com sugestões

### 👤 Área do Cliente Avançada
- ✅ Dashboard personalizado com métricas detalhadas
- ✅ Histórico completo de pedidos
- ✅ Perfil do usuário com configurações avançadas
- ✅ Programa de fidelidade com pontos e recompensas
- ✅ Analytics avançado com insights comportamentais
- ✅ Notificações inteligentes personalizadas
- ✅ Configurações de privacidade e segurança

### 📊 Analytics e Insights
- ✅ Métricas de comportamento de compra
- ✅ Tendências de gastos mensais
- ✅ Análise de categorias favoritas
- ✅ Recomendações personalizadas baseadas em IA
- ✅ Padrões de uso por horário e dispositivo
- ✅ Sistema de alertas de preço inteligente

### 🔔 Sistema de Notificações
- ✅ Notificações em tempo real
- ✅ Filtros por tipo e prioridade
- ✅ Histórico completo de notificações
- ✅ Configurações granulares por categoria

### ⚙️ Configurações Avançadas
- ✅ Gerenciamento completo de perfil
- ✅ Configurações de privacidade detalhadas
- ✅ Segurança avançada (2FA, biométrico)
- ✅ Métodos de pagamento e endereços
- ✅ Preferências de entrega personalizadas

### 💳 Pagamentos e Checkout
- ✅ Múltiplas formas de pagamento (PIX, cartão, boleto)
- ✅ Checkout seguro e otimizado
- ✅ Sistema de cupons e promoções
- ✅ Cálculo automático de frete

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Pagamentos**: Stripe
- **UI**: Framer Motion, Lucide React
- **Estado**: React Query, Context API

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/iagodevtech/ecomify.git
cd ecomify
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local na raiz do projeto
cp .env.example .env.local
```

4. Configure as variáveis no arquivo `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Ecomify
```

5. Execute o projeto:
```bash
npm run dev
```

6. Acesse http://localhost:3000

## 🔧 Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings > API
4. Copie a URL e a chave anônima
5. Cole no arquivo `.env.local`

## 💳 Configuração do Stripe

1. Crie uma conta no [Stripe](https://stripe.com)
2. Vá em Developers > API keys
3. Copie as chaves de teste
4. Cole no arquivo `.env.local`

## 📱 Funcionalidades Mobile

- Navegação bottom bar
- Menu lateral responsivo
- Design adaptativo
- Touch gestures

## 🎨 Design System

- **Cores**: Neon blue, purple, green, pink
- **Tipografia**: Orbitron (títulos), Inter (texto)
- **Efeitos**: Glassmorphism, backdrop blur, neon glow
- **Animações**: Framer Motion, Matrix rain

## 📊 Analytics

- Dashboard do usuário
- Histórico de compras
- Alertas de preço
- Recomendações personalizadas

## 🔐 Autenticação

- Email/senha
- Google OAuth
- Facebook OAuth
- Apple OAuth
- Recuperação de senha

## 🛒 E-commerce

- Catálogo de produtos
- Carrinho persistente
- Favoritos
- Comparação de produtos
- Sistema de cupons
- Múltiplas formas de pagamento

## 📈 Próximos Passos

- [ ] Versão mobile app (React Native)
- [ ] Sistema de notificações push
- [ ] Integração com WhatsApp/SMS
- [ ] Realidade aumentada
- [ ] IA para recomendações
- [ ] Sistema de afiliados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Iago DevTech**
- GitHub: [@iagodevtech](https://github.com/iagodevtech)
- LinkedIn: [Iago DevTech](https://linkedin.com/in/iagodevtech)

## 🙏 Agradecimentos

- Supabase pela infraestrutura
- Stripe pelos pagamentos
- Next.js pelo framework
- Tailwind CSS pelo design system
- Framer Motion pelas animações