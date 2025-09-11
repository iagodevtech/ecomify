-- Script para verificar se o setup do Supabase está funcionando
-- Execute este script no SQL Editor do Supabase

-- Verificar se as tabelas existem
SELECT 
    table_name,
    CASE 
        WHEN row_security = 'YES' THEN '✅ RLS Habilitado'
        ELSE '❌ RLS Desabilitado'
    END as rls_status
FROM information_schema.tables t
LEFT JOIN pg_class c ON c.relname = t.table_name
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Verificar se as políticas existem
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verificar dados nas tabelas principais
SELECT 'categories' as table_name, COUNT(*) as record_count FROM categories
UNION ALL
SELECT 'brands' as table_name, COUNT(*) as record_count FROM brands
UNION ALL
SELECT 'products' as table_name, COUNT(*) as record_count FROM products
UNION ALL
SELECT 'system_settings' as table_name, COUNT(*) as record_count FROM system_settings;

-- Testar consultas básicas
SELECT 
    c.name as category_name,
    COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY product_count DESC;

-- Verificar configurações do sistema
SELECT key, value, description, is_public 
FROM system_settings 
ORDER BY key;
