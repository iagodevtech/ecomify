-- Script SIMPLES para verificar se o setup do Supabase está funcionando
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se as tabelas existem
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'profiles', 'user_addresses', 'payment_methods', 'categories', 'brands', 
    'products', 'product_variations', 'cart_items', 'orders', 'order_items', 
    'reviews', 'wishlist', 'coupons', 'coupon_usage', 'notifications', 
    'price_alerts', 'product_views', 'analytics_events', 'system_settings', 'audit_logs'
)
ORDER BY tablename;

-- 2. Verificar se RLS está habilitado (versão simples)
SELECT 
    tablename,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_class c 
            JOIN pg_namespace n ON n.oid = c.relnamespace 
            WHERE c.relname = pg_tables.tablename 
            AND n.nspname = 'public' 
            AND c.relrowsecurity = true
        ) THEN '✅ RLS Habilitado'
        ELSE '❌ RLS Desabilitado'
    END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'profiles', 'user_addresses', 'payment_methods', 'categories', 'brands', 
    'products', 'product_variations', 'cart_items', 'orders', 'order_items', 
    'reviews', 'wishlist', 'coupons', 'coupon_usage', 'notifications', 
    'price_alerts', 'product_views', 'analytics_events', 'system_settings', 'audit_logs'
)
ORDER BY tablename;

-- 3. Verificar políticas existentes
SELECT 
    tablename,
    policyname,
    cmd as operation,
    permissive
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 4. Contar registros nas tabelas principais
SELECT 'categories' as table_name, COUNT(*) as record_count FROM categories
UNION ALL
SELECT 'brands' as table_name, COUNT(*) as record_count FROM brands
UNION ALL
SELECT 'products' as table_name, COUNT(*) as record_count FROM products
UNION ALL
SELECT 'system_settings' as table_name, COUNT(*) as record_count FROM system_settings;

-- 5. Testar consulta básica
SELECT 
    c.name as category_name,
    COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY product_count DESC;

-- 6. Verificar configurações do sistema
SELECT key, value, description, is_public 
FROM system_settings 
ORDER BY key;
