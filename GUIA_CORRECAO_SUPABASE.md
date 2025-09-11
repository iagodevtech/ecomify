# 🔧 GUIA DE CORREÇÃO - SUPABASE

## ❌ **PROBLEMAS IDENTIFICADOS:**

1. **Erro de chave duplicada**: `duplicate key value violates unique constraint "categories_name_key"`
2. **Falta de políticas RLS**: Row Level Security não configurado
3. **Dados duplicados**: Tentativa de inserir dados que já existem
4. **Tabelas inexistentes**: `ERROR: 42P01: relation "payments" does not exist`

## ✅ **SOLUÇÕES IMPLEMENTADAS:**

### **1. Script de Dados Corrigido**
- ✅ **`insert-sample-data-fixed.sql`** - Usa `ON CONFLICT DO NOTHING`
- ✅ **Evita duplicatas** automaticamente
- ✅ **Inserção segura** de dados

### **2. Políticas RLS Configuradas**
- ✅ **`fix-rls-policies-corrected.sql`** - Políticas apenas para tabelas existentes
- ✅ **RLS habilitado** em todas as tabelas que existem
- ✅ **Políticas específicas** para cada tipo de usuário

### **3. Script de Verificação**
- ✅ **`verify-supabase-setup-corrected.sql`** - Verifica apenas tabelas existentes
- ✅ **Testa conexões** e políticas
- ✅ **Mostra estatísticas** do banco

## 🚀 **PASSO A PASSO PARA CORRIGIR:**

### **PASSO 1: Executar Políticas RLS**
```sql
-- No SQL Editor do Supabase, execute:
-- Copie e cole o conteúdo de fix-rls-policies-corrected.sql
```

### **PASSO 2: Inserir Dados Corrigidos**
```sql
-- No SQL Editor do Supabase, execute:
-- Copie e cole o conteúdo de insert-sample-data-fixed.sql
```

### **PASSO 3: Verificar Setup**
```sql
-- No SQL Editor do Supabase, execute:
-- Copie e cole o conteúdo de verify-supabase-setup-corrected.sql
```

### **PASSO 4: Testar Conexão Local**
```bash
# No terminal do projeto:
node test-supabase.js
```

## 📋 **CHECKLIST DE VERIFICAÇÃO:**

- [ ] ✅ Políticas RLS executadas sem erro
- [ ] ✅ Dados inseridos sem duplicatas
- [ ] ✅ Verificação mostra status "✅ RLS Habilitado"
- [ ] ✅ Teste local conecta com sucesso
- [ ] ✅ Tabelas têm dados (categories, brands, products)
- [ ] ✅ Configurações do sistema inseridas

## 🔍 **VERIFICAÇÕES IMPORTANTES:**

### **1. Status RLS**
```sql
SELECT table_name, row_security 
FROM information_schema.tables 
WHERE table_schema = 'public';
```
**Resultado esperado**: Todas as tabelas com `row_security = YES`

### **2. Políticas Ativas**
```sql
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public';
```
**Resultado esperado**: Múltiplas políticas por tabela

### **3. Dados Inseridos**
```sql
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM brands;
SELECT COUNT(*) FROM products;
```
**Resultado esperado**: Contadores > 0

## 🚨 **SE AINDA HOUVER PROBLEMAS:**

### **Problema 1: Erro de Permissão**
```sql
-- Execute como superuser:
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
```

### **Problema 2: Tabelas Não Existem**
```sql
-- Execute o schema completo primeiro:
-- Copie e cole o conteúdo de supabase-schema.sql
```

### **Problema 3: RLS Bloqueando Consultas**
```sql
-- Temporariamente desabilitar RLS para teste:
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
-- (Re-habilitar depois com o script fix-rls-policies-corrected.sql)
```

### **Problema 4: Tabelas Inexistentes**
```sql
-- Se aparecer erro "relation does not exist":
-- 1. Execute primeiro o supabase-schema.sql
-- 2. Depois execute fix-rls-policies-corrected.sql
-- 3. Use apenas os scripts "corrected" que têm apenas tabelas existentes
```

## 📞 **SUPORTE:**

Se ainda houver problemas:
1. **Verifique** se executou os scripts na ordem correta
2. **Confirme** que as credenciais estão corretas no `.env.local`
3. **Execute** o script de verificação para diagnóstico
4. **Entre em contato** se precisar de ajuda adicional

## 🎯 **RESULTADO FINAL:**

Após executar todos os scripts:
- ✅ **Banco funcionando** sem erros
- ✅ **Políticas de segurança** ativas
- ✅ **Dados de exemplo** inseridos
- ✅ **Conexão local** funcionando
- ✅ **Projeto pronto** para desenvolvimento

**O Supabase estará 100% configurado e funcional!** 🚀
