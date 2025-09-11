-- Script para corrigir políticas de RLS (Row Level Security) no Supabase
-- Execute este script no SQL Editor do Supabase
-- VERSÃO CORRIGIDA - Apenas tabelas que realmente existem

-- Habilitar RLS em todas as tabelas que existem
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para PROFILES (usuários só podem ver/editar seus próprios perfis)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para USER_ADDRESSES (usuários só podem ver/editar seus próprios endereços)
DROP POLICY IF EXISTS "Users can view own addresses" ON user_addresses;
CREATE POLICY "Users can view own addresses" ON user_addresses
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own addresses" ON user_addresses;
CREATE POLICY "Users can insert own addresses" ON user_addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own addresses" ON user_addresses;
CREATE POLICY "Users can update own addresses" ON user_addresses
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own addresses" ON user_addresses;
CREATE POLICY "Users can delete own addresses" ON user_addresses
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas para PAYMENT_METHODS (usuários só podem ver/editar seus próprios métodos de pagamento)
DROP POLICY IF EXISTS "Users can view own payment methods" ON payment_methods;
CREATE POLICY "Users can view own payment methods" ON payment_methods
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own payment methods" ON payment_methods;
CREATE POLICY "Users can insert own payment methods" ON payment_methods
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own payment methods" ON payment_methods;
CREATE POLICY "Users can update own payment methods" ON payment_methods
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own payment methods" ON payment_methods;
CREATE POLICY "Users can delete own payment methods" ON payment_methods
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas para CATEGORIES (público - todos podem ler)
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON categories;
CREATE POLICY "Categories are insertable by authenticated users" ON categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Categories are updatable by authenticated users" ON categories;
CREATE POLICY "Categories are updatable by authenticated users" ON categories
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para BRANDS (público - todos podem ler)
DROP POLICY IF EXISTS "Brands are viewable by everyone" ON brands;
CREATE POLICY "Brands are viewable by everyone" ON brands
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Brands are insertable by authenticated users" ON brands;
CREATE POLICY "Brands are insertable by authenticated users" ON brands
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Brands are updatable by authenticated users" ON brands;
CREATE POLICY "Brands are updatable by authenticated users" ON brands
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para PRODUCTS (público - todos podem ler)
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Products are insertable by authenticated users" ON products;
CREATE POLICY "Products are insertable by authenticated users" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Products are updatable by authenticated users" ON products;
CREATE POLICY "Products are updatable by authenticated users" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para PRODUCT_VARIATIONS (público - todos podem ler)
DROP POLICY IF EXISTS "Product variations are viewable by everyone" ON product_variations;
CREATE POLICY "Product variations are viewable by everyone" ON product_variations
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Product variations are insertable by authenticated users" ON product_variations;
CREATE POLICY "Product variations are insertable by authenticated users" ON product_variations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Product variations are updatable by authenticated users" ON product_variations;
CREATE POLICY "Product variations are updatable by authenticated users" ON product_variations
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para CART_ITEMS (usuários só podem ver/editar seus próprios itens do carrinho)
DROP POLICY IF EXISTS "Users can view own cart items" ON cart_items;
CREATE POLICY "Users can view own cart items" ON cart_items
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own cart items" ON cart_items;
CREATE POLICY "Users can insert own cart items" ON cart_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own cart items" ON cart_items;
CREATE POLICY "Users can update own cart items" ON cart_items
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own cart items" ON cart_items;
CREATE POLICY "Users can delete own cart items" ON cart_items
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas para ORDERS (usuários só podem ver/editar seus próprios pedidos)
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
CREATE POLICY "Users can insert own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own orders" ON orders;
CREATE POLICY "Users can update own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para ORDER_ITEMS (usuários só podem ver/editar seus próprios itens de pedido)
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can insert own order items" ON order_items;
CREATE POLICY "Users can insert own order items" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Políticas para REVIEWS (público - todos podem ler, usuários podem criar/editar suas próprias)
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone" ON reviews
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own reviews" ON reviews;
CREATE POLICY "Users can insert own reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas para WISHLIST (usuários só podem ver/editar sua própria lista de desejos)
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlist;
CREATE POLICY "Users can view own wishlist" ON wishlist
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own wishlist items" ON wishlist;
CREATE POLICY "Users can insert own wishlist items" ON wishlist
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own wishlist items" ON wishlist;
CREATE POLICY "Users can delete own wishlist items" ON wishlist
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas para COUPONS (público - todos podem ler)
DROP POLICY IF EXISTS "Coupons are viewable by everyone" ON coupons;
CREATE POLICY "Coupons are viewable by everyone" ON coupons
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Coupons are insertable by authenticated users" ON coupons;
CREATE POLICY "Coupons are insertable by authenticated users" ON coupons
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Políticas para COUPON_USAGE (usuários só podem ver/editar seus próprios usos de cupom)
DROP POLICY IF EXISTS "Users can view own coupon usage" ON coupon_usage;
CREATE POLICY "Users can view own coupon usage" ON coupon_usage
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own coupon usage" ON coupon_usage;
CREATE POLICY "Users can insert own coupon usage" ON coupon_usage
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para NOTIFICATIONS (usuários só podem ver/editar suas próprias notificações)
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own notifications" ON notifications;
CREATE POLICY "Users can insert own notifications" ON notifications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para PRICE_ALERTS (usuários só podem ver/editar seus próprios alertas de preço)
DROP POLICY IF EXISTS "Users can view own price alerts" ON price_alerts;
CREATE POLICY "Users can view own price alerts" ON price_alerts
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own price alerts" ON price_alerts;
CREATE POLICY "Users can insert own price alerts" ON price_alerts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own price alerts" ON price_alerts;
CREATE POLICY "Users can update own price alerts" ON price_alerts
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own price alerts" ON price_alerts;
CREATE POLICY "Users can delete own price alerts" ON price_alerts
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas para PRODUCT_VIEWS (apenas usuários autenticados podem inserir)
DROP POLICY IF EXISTS "Authenticated users can insert product views" ON product_views;
CREATE POLICY "Authenticated users can insert product views" ON product_views
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view own product views" ON product_views;
CREATE POLICY "Users can view own product views" ON product_views
    FOR SELECT USING (auth.uid() = user_id);

-- Políticas para ANALYTICS_EVENTS (apenas usuários autenticados podem inserir)
DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON analytics_events;
CREATE POLICY "Authenticated users can insert analytics events" ON analytics_events
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Políticas para SYSTEM_SETTINGS (público - todos podem ler)
DROP POLICY IF EXISTS "System settings are viewable by everyone" ON system_settings;
CREATE POLICY "System settings are viewable by everyone" ON system_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "System settings are insertable by authenticated users" ON system_settings;
CREATE POLICY "System settings are insertable by authenticated users" ON system_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "System settings are updatable by authenticated users" ON system_settings;
CREATE POLICY "System settings are updatable by authenticated users" ON system_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para AUDIT_LOGS (apenas sistema pode inserir)
DROP POLICY IF EXISTS "System can insert audit logs" ON audit_logs;
CREATE POLICY "System can insert audit logs" ON audit_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can view audit logs" ON audit_logs;
CREATE POLICY "Authenticated users can view audit logs" ON audit_logs
    FOR SELECT USING (auth.role() = 'authenticated');
