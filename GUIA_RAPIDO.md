# 🚀 Guia Rápido - Ecomify

## ✅ **PROJETO FUNCIONANDO!**

O servidor está rodando em: **http://localhost:3000**

## 🔧 **Configuração Necessária**

### **1. Criar arquivo .env.local**
```bash
# Copie o arquivo de exemplo
copy env.local.example .env.local
```

### **2. Configurar chaves de API**
Edite o arquivo `.env.local` com suas chaves:

```env
# Supabase (opcional para desenvolvimento)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe (opcional para desenvolvimento)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎯 **Como Executar**

### **Desenvolvimento**
```bash
npm run dev
```

### **Build para Produção**
```bash
npm run build
npm start
```

### **Verificar Código**
```bash
npm run lint
npm run format
```

## 📱 **Mobile App**
```bash
cd mobile
npm install
npm start
```

## 🌐 **Acessar o Site**

1. Abra seu navegador
2. Acesse: **http://localhost:3000**
3. Explore o Ecomify!

## 🎨 **Funcionalidades Disponíveis**

- ✅ Interface futurística cyberpunk
- ✅ Catálogo de produtos
- ✅ Sistema de carrinho
- ✅ Páginas de autenticação
- ✅ Dashboard do usuário
- ✅ Sistema de busca
- ✅ Notificações
- ✅ Design responsivo

## ⚠️ **Notas Importantes**

1. **Variáveis de Ambiente**: Configure as chaves de API para funcionalidades completas
2. **Supabase**: Necessário para autenticação e banco de dados
3. **Stripe**: Necessário para pagamentos
4. **TypeScript**: Alguns erros de tipo foram desabilitados temporariamente

## 🚨 **Problemas Comuns**

### **Erro de Porta**
```bash
# Se a porta 3000 estiver ocupada
npm run dev -- -p 3001
```

### **Erro de Dependências**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### **Erro de Build**
```bash
# Limpar build
npm run clean
npm run build
```

## 📞 **Suporte**

- **GitHub**: [github.com/iagodevtech/ecomify](https://github.com/iagodevtech/ecomify)
- **Documentação**: Consulte os arquivos `.md` no projeto

---

## 🎉 **Sucesso!**

O Ecomify está rodando localmente! Acesse **http://localhost:3000** para ver o projeto funcionando.

**Desenvolvido com ❤️ pela equipe Ecomify**
