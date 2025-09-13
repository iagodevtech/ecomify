# 🔧 CONFIGURAÇÃO SUPABASE + GITHUB PAGES

## 🚨 **IMPORTANTE: Configuração Necessária**

Para que o GitHub Pages funcione corretamente com o Supabase, você precisa configurar as **variáveis de ambiente** no GitHub.

---

## 📋 **PASSO A PASSO - CONFIGURAR SECRETS NO GITHUB:**

### 1. **Acesse as Configurações do Repositório:**
```
https://github.com/iagodevtech/ecomify/settings/secrets/actions
```

### 2. **Adicione os Seguintes Secrets:**

#### 🔑 **SUPABASE CONFIGURATION:**
```
NEXT_PUBLIC_SUPABASE_URL
Valor: https://seu-projeto.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 💳 **STRIPE CONFIGURATION:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Valor: pk_test_...
```

```
STRIPE_SECRET_KEY
Valor: sk_test_...
```

```
STRIPE_WEBHOOK_SECRET
Valor: whsec_...
```

#### 🌐 **APP CONFIGURATION:**
```
NEXT_PUBLIC_APP_URL
Valor: https://iagodevtech.github.io/ecomify
```

---

## 🔍 **COMO ENCONTRAR OS VALORES:**

### **Supabase:**
1. Acesse: `https://supabase.com/dashboard`
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### **Stripe:**
1. Acesse: `https://dashboard.stripe.com`
2. Vá em **Developers** → **API keys**
3. Copie:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
4. Para Webhook: **Developers** → **Webhooks** → **Add endpoint**

---

## ⚙️ **CONFIGURAR GITHUB PAGES:**

### 1. **Ativar GitHub Pages:**
```
1. Vá para: https://github.com/iagodevtech/ecomify/settings/pages
2. Source: "GitHub Actions"
3. Salve as configurações
```

### 2. **Verificar Deploy:**
```
1. Vá para: https://github.com/iagodevtech/ecomify/actions
2. Verifique se o workflow "Deploy to GitHub Pages" está rodando
3. Aguarde o build completar
```

---

## 🎯 **URLS FINAIS:**

- **GitHub Pages:** `https://iagodevtech.github.io/ecomify`
- **Domínio Personalizado:** `https://ecomify.iagodev.online` (opcional)

---

## 🔄 **FLUXO DE FUNCIONAMENTO:**

1. **Push para master** → GitHub Actions acionado
2. **Build com Secrets** → Variáveis de ambiente carregadas
3. **Conexão Supabase** → Banco de dados acessível
4. **Deploy GitHub Pages** → Site online e funcional

---

## 🚨 **PROBLEMAS COMUNS:**

### **Erro: "Supabase URL not found"**
- ✅ Verifique se `NEXT_PUBLIC_SUPABASE_URL` está configurado
- ✅ Certifique-se que a URL está correta

### **Erro: "Invalid API key"**
- ✅ Verifique se `NEXT_PUBLIC_SUPABASE_ANON_KEY` está correto
- ✅ Certifique-se que a chave é a "anon public"

### **Erro: "Stripe not configured"**
- ✅ Verifique se as chaves do Stripe estão configuradas
- ✅ Certifique-se que são as chaves de teste (pk_test_, sk_test_)

---

## 📱 **TESTE APÓS CONFIGURAÇÃO:**

1. **Acesse:** `https://iagodevtech.github.io/ecomify`
2. **Teste Login:** Crie uma conta
3. **Teste Produtos:** Adicione ao carrinho
4. **Teste Pagamento:** Simule um pagamento
5. **Verifique Banco:** Dados salvos no Supabase

---

## 🎉 **RESULTADO ESPERADO:**

Após configurar tudo:
- ✅ Site online no GitHub Pages
- ✅ Conexão com Supabase funcionando
- ✅ Autenticação de usuários
- ✅ Carrinho e favoritos salvos
- ✅ Pagamentos via Stripe
- ✅ Chat em tempo real
- ✅ Notificações funcionando

---

**🚀 CONFIGURAÇÃO COMPLETA = E-COMMERCE FUNCIONAL!**
