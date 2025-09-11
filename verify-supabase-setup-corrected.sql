-- Script para verificar se o setup do Supabase está funcionando
-- Execute este script no SQL Editor do Supabase
-- VERSÃO CORRIGIDA - Apenas tabelas que realmente existem

-- Verificar se as tabelas existem e status RLS
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
AND table_name IN (
    'profiles', 'user_addresses', 'payment_methods', 'categories', 'brands', 
    'products', 'product_variations', 'cart_items', 'orders', 'order_items', 
    'reviews', 'wishlist', 'coupons', 'coupon_usage', 'notifications', 
    'price_alerts', 'product_views', 'analytics_events', 'system_settings', 'audit_logs'
)
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
AND tablename IN (
    'profiles', 'user_addresses', 'payment_methods', 'categories', 'brands', 
    'products', 'product_variations', 'cart_items', 'orders', 'order_items', 
    'reviews', 'wishlist', 'coupons', 'coupon_usage', 'notifications', 
    'price_alerts', 'product_views', 'analytics_events', 'system_settings', 'audit_logs'
)
ORDER BY tablename, policyname;

-- Verificar dados nas tabelas principais
SELECT 'profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'user_addresses' as table_name, COUNT(*) as record_count FROM user_addresses
UNION ALL
SELECT 'payment_methods' as table_name, COUNT(*) as record_count FROM payment_methods
UNION ALL
SELECT 'categories' as table_name, COUNT(*) as record_count FROM categories
UNION ALL
SELECT 'brands' as table_name, COUNT(*) as record_count FROM brands
UNION ALL
SELECT 'products' as table_name, COUNT(*) as record_count FROM products
UNION ALL
SELECT 'product_variations' as table_name, COUNT(*) as record_count FROM product_variations
UNION ALL
SELECT 'cart_items' as table_name, COUNT(*) as record_count FROM cart_items
UNION ALL
SELECT 'orders' as table_name, COUNT(*) as record_count FROM orders
UNION ALL
SELECT 'order_items' as table_name, COUNT(*) as record_count FROM order_items
UNION ALL
SELECT 'reviews' as table_name, COUNT(*) as record_count FROM reviews
UNION ALL
SELECT 'wishlist' as table_name, COUNT(*) as record_count FROM wishlist
UNION ALL
SELECT 'coupons' as table_name, COUNT(*) as record_count FROM coupons
UNION ALL
SELECT 'coupon_usage' as table_name, COUNT(*) as record_count FROM coupon_usage
UNION ALL
SELECT 'notifications' as table_name, COUNT(*) as record_count FROM notifications
UNION ALL
SELECT 'price_alerts' as table_name, COUNT(*) as record_count FROM price_alerts
UNION ALL
SELECT 'product_views' as table_name, COUNT(*) as record_count FROM product_views
UNION ALL
SELECT 'analytics_events' as table_name, COUNT(*) as record_count FROM analytics_events
UNION ALL
SELECT 'system_settings' as table_name, COUNT(*) as record_count FROM system_settings
UNION ALL
SELECT 'audit_logs' as table_name, COUNT(*) as record_count FROM audit_logs;

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

-- Verificar estrutura das tabelas principais
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('categories', 'brands', 'products', 'system_settings')
ORDER BY table_name, ordinal_position;
