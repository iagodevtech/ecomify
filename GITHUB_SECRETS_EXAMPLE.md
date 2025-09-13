# 🔐 GITHUB SECRETS - EXEMPLO DE CONFIGURAÇÃO

## 📋 **VARIÁVEIS QUE VOCÊ PRECISA CONFIGURAR NO GITHUB:**

### 🔗 **URL para Configurar:**
```
https://github.com/iagodevtech/ecomify/settings/secrets/actions
```

---

## 🔑 **SECRETS OBRIGATÓRIOS:**

### 1. **NEXT_PUBLIC_SUPABASE_URL**
```
Nome: NEXT_PUBLIC_SUPABASE_URL
Valor: https://seu-projeto-id.supabase.co
Exemplo: https://abcdefghijklmnop.supabase.co
```

### 2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
Nome: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2ODAwMCwiZXhwIjoyMDE0MzQ0MDAwfQ.exemplo
```

### 3. **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
```
Nome: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Valor: pk_test_...
Exemplo: pk_test_51ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ567890
```

### 4. **STRIPE_SECRET_KEY**
```
Nome: STRIPE_SECRET_KEY
Valor: sk_test_...
Exemplo: sk_test_51ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ567890
```

### 5. **STRIPE_WEBHOOK_SECRET**
```
Nome: STRIPE_WEBHOOK_SECRET
Valor: whsec_...
Exemplo: whsec_1234567890abcdef1234567890abcdef12345678
```

### 6. **NEXT_PUBLIC_APP_URL**
```
Nome: NEXT_PUBLIC_APP_URL
Valor: https://iagodevtech.github.io/ecomify
```

---

## 🔍 **ONDE ENCONTRAR OS VALORES:**

### **Supabase Dashboard:**
1. Acesse: `https://supabase.com/dashboard`
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie os valores

### **Stripe Dashboard:**
1. Acesse: `https://dashboard.stripe.com`
2. Vá em **Developers** → **API keys**
3. Copie as chaves de teste

---

## ⚠️ **IMPORTANTE:**

- ✅ Use sempre as chaves de **TESTE** (pk_test_, sk_test_)
- ✅ Nunca compartilhe as chaves secretas
- ✅ Configure todas as variáveis antes do deploy
- ✅ Verifique se os valores estão corretos

---

## 🚀 **APÓS CONFIGURAR:**

1. **Faça um push** para acionar o deploy
2. **Verifique o build** em Actions
3. **Acesse o site** em: `https://iagodevtech.github.io/ecomify`
4. **Teste as funcionalidades** (login, carrinho, pagamentos)

---

**🎯 CONFIGURAÇÃO COMPLETA = E-COMMERCE FUNCIONAL!**
