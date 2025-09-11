-- Script para corrigir políticas de RLS (Row Level Security) no Supabase
-- Execute este script no SQL Editor do Supabase

-- Habilitar RLS em todas as tabelas principais
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

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

-- Políticas para PAYMENTS (usuários só podem ver/editar seus próprios pagamentos)
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own payments" ON payments;
CREATE POLICY "Users can insert own payments" ON payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

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

-- Políticas para ADDRESSES (usuários só podem ver/editar seus próprios endereços)
DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
CREATE POLICY "Users can view own addresses" ON addresses
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own addresses" ON addresses;
CREATE POLICY "Users can insert own addresses" ON addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own addresses" ON addresses;
CREATE POLICY "Users can update own addresses" ON addresses
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own addresses" ON addresses;
CREATE POLICY "Users can delete own addresses" ON addresses
    FOR DELETE USING (auth.uid() = user_id);

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

-- Políticas para COUPONS (público - todos podem ler)
DROP POLICY IF EXISTS "Coupons are viewable by everyone" ON coupons;
CREATE POLICY "Coupons are viewable by everyone" ON coupons
    FOR SELECT USING (true);

-- Políticas para ANALYTICS (apenas usuários autenticados podem inserir)
DROP POLICY IF EXISTS "Authenticated users can insert analytics" ON analytics;
CREATE POLICY "Authenticated users can insert analytics" ON analytics
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Políticas para SUPPORT_TICKETS (usuários só podem ver/editar seus próprios tickets)
DROP POLICY IF EXISTS "Users can view own support tickets" ON support_tickets;
CREATE POLICY "Users can view own support tickets" ON support_tickets
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own support tickets" ON support_tickets;
CREATE POLICY "Users can insert own support tickets" ON support_tickets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own support tickets" ON support_tickets;
CREATE POLICY "Users can update own support tickets" ON support_tickets
    FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para BLOG_POSTS (público - todos podem ler)
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON blog_posts;
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (true);

-- Políticas para NEWSLETTER_SUBSCRIBERS (público - todos podem inserir)
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Políticas para PRODUCT_VIEWS (apenas usuários autenticados podem inserir)
DROP POLICY IF EXISTS "Authenticated users can insert product views" ON product_views;
CREATE POLICY "Authenticated users can insert product views" ON product_views
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Políticas para SEARCH_HISTORY (usuários só podem ver/editar seu próprio histórico)
DROP POLICY IF EXISTS "Users can view own search history" ON search_history;
CREATE POLICY "Users can view own search history" ON search_history
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own search history" ON search_history;
CREATE POLICY "Users can insert own search history" ON search_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own search history" ON search_history;
CREATE POLICY "Users can delete own search history" ON search_history
    FOR DELETE USING (auth.uid() = user_id);
