-- Script para inserir dados de exemplo no Supabase (VERSÃO CORRIGIDA)
-- Execute este script no SQL Editor do Supabase

-- Primeiro, vamos verificar se os dados já existem e limpar se necessário
-- (Execute apenas se quiser recriar os dados)

-- Limpar dados existentes (CUIDADO: isso apaga todos os dados!)
-- DELETE FROM products WHERE id IS NOT NULL;
-- DELETE FROM brands WHERE id IS NOT NULL;
-- DELETE FROM categories WHERE id IS NOT NULL;
-- DELETE FROM system_settings WHERE id IS NOT NULL;

-- Inserir categorias (usando ON CONFLICT para evitar duplicatas)
INSERT INTO categories (name, slug, description) VALUES
('Laptops & Notebooks', 'laptops-notebooks', 'Laptops e notebooks para trabalho e entretenimento'),
('Smartphones', 'smartphones', 'Smartphones e acessórios'),
('Áudio & Som', 'audio-som', 'Fones, caixas de som e equipamentos de áudio'),
('Gaming', 'gaming', 'Produtos para jogos e entretenimento'),
('Componentes', 'componentes', 'Peças e componentes para computadores'),
('Monitores', 'monitores', 'Monitores e displays'),
('Câmeras', 'cameras', 'Câmeras e equipamentos fotográficos'),
('Armazenamento', 'armazenamento', 'HDs, SSDs e dispositivos de armazenamento')
ON CONFLICT (name) DO NOTHING;

-- Inserir marcas (usando ON CONFLICT para evitar duplicatas)
INSERT INTO brands (name, slug, description, country) VALUES
('Apple', 'apple', 'Tecnologia inovadora e design elegante', 'Estados Unidos'),
('Samsung', 'samsung', 'Eletrônicos e tecnologia avançada', 'Coreia do Sul'),
('Dell', 'dell', 'Computadores e soluções empresariais', 'Estados Unidos'),
('ASUS', 'asus', 'Hardware e componentes de alta qualidade', 'Taiwan'),
('Lenovo', 'lenovo', 'Laptops e desktops confiáveis', 'China'),
('HP', 'hp', 'Tecnologia e impressão', 'Estados Unidos'),
('Sony', 'sony', 'Eletrônicos e entretenimento', 'Japão'),
('NVIDIA', 'nvidia', 'Placas de vídeo e IA', 'Estados Unidos'),
('Intel', 'intel', 'Processadores e chipsets', 'Estados Unidos'),
('AMD', 'amd', 'Processadores e GPUs', 'Estados Unidos')
ON CONFLICT (name) DO NOTHING;

-- Inserir produtos de exemplo (usando ON CONFLICT para evitar duplicatas)
INSERT INTO products (name, slug, description, price, original_price, category_id, brand_id, images, specifications, stock, is_featured, is_active, rating, review_count) VALUES
(
  'MacBook Pro M3 Max 16"',
  'macbook-pro-m3-max-16',
  'O mais poderoso MacBook Pro com chip M3 Max, 16GB de RAM unificada e 512GB SSD.',
  15999,
  17999,
  (SELECT id FROM categories WHERE slug = 'laptops-notebooks' LIMIT 1),
  (SELECT id FROM brands WHERE slug = 'apple' LIMIT 1),
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center'],
  '{"processor": "Apple M3 Max", "memory": "16GB RAM unificada", "storage": "512GB SSD", "display": "16.2\" Liquid Retina XDR"}',
  15,
  true,
  true,
  4.9,
  127
),
(
  'iPhone 15 Pro Max',
  'iphone-15-pro-max',
  'O iPhone mais avançado com chip A17 Pro, câmera de 48MP, tela Super Retina XDR de 6.7" e design em titânio.',
  8999,
  9999,
  (SELECT id FROM categories WHERE slug = 'smartphones' LIMIT 1),
  (SELECT id FROM brands WHERE slug = 'apple' LIMIT 1),
  ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop&crop=center'],
  '{"processor": "Apple A17 Pro", "memory": "8GB RAM", "storage": "256GB", "display": "6.7\" Super Retina XDR"}',
  25,
  true,
  true,
  4.8,
  892
),
(
  'Samsung Galaxy S24 Ultra',
  'samsung-galaxy-s24-ultra',
  'Smartphone Android premium com Snapdragon 8 Gen 3, câmera de 200MP, S Pen e tela Dynamic AMOLED 2X de 6.8".',
  6999,
  7999,
  (SELECT id FROM categories WHERE slug = 'smartphones' LIMIT 1),
  (SELECT id FROM brands WHERE slug = 'samsung' LIMIT 1),
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center'],
  '{"processor": "Snapdragon 8 Gen 3", "memory": "12GB RAM", "storage": "256GB", "display": "6.8\" Dynamic AMOLED 2X"}',
  20,
  true,
  true,
  4.7,
  634
)
ON CONFLICT (slug) DO NOTHING;

-- Inserir configurações do sistema (usando ON CONFLICT para evitar duplicatas)
INSERT INTO system_settings (key, value, description, is_public) VALUES
('site_name', '"Ecomify"', 'Nome do site', true),
('site_description', '"E-commerce futurístico para produtos digitais e tecnologia"', 'Descrição do site', true),
('currency', '"BRL"', 'Moeda padrão', true),
('timezone', '"America/Sao_Paulo"', 'Fuso horário padrão', true),
('language', '"pt-BR"', 'Idioma padrão', true),
('maintenance_mode', 'false', 'Modo de manutenção', false),
('registration_enabled', 'true', 'Registro de usuários habilitado', false),
('two_factor_required', 'false', '2FA obrigatório', false)
ON CONFLICT (key) DO NOTHING;
