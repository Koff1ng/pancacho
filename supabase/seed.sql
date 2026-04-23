-- ============================================
-- La Comitiva Inventarios — Seed Data
-- Run this AFTER schema.sql and AFTER creating
-- the auth users in Supabase Dashboard or via API
-- ============================================

-- STEP 1: Create auth users first via Supabase Dashboard:
--   admin@comitiva.com      / demo1234
--   servicio@comitiva.com   / demo1234
--   cocina@comitiva.com     / demo1234
--   bar@comitiva.com        / demo1234

-- STEP 2: Insert areas
INSERT INTO public.areas (id, name, slug) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Servicio', 'servicio'),
  ('a0000000-0000-0000-0000-000000000002', 'Cocina', 'cocina'),
  ('a0000000-0000-0000-0000-000000000003', 'Bar', 'bar')
ON CONFLICT (slug) DO NOTHING;

-- STEP 3: Insert profiles (replace UUIDs with actual auth.users IDs)
-- After creating the 4 users in Supabase Auth, get their UUIDs and run:
--
-- INSERT INTO public.profiles (id, full_name, role, area_id) VALUES
--   ('<admin-uuid>', 'Admin La Comitiva', 'admin', NULL),
--   ('<servicio-uuid>', 'Jefe de Servicio', 'service_manager', 'a0000000-0000-0000-0000-000000000001'),
--   ('<cocina-uuid>', 'Jefe de Cocina', 'kitchen_manager', 'a0000000-0000-0000-0000-000000000002'),
--   ('<bar-uuid>', 'Jefe de Bar', 'bar_manager', 'a0000000-0000-0000-0000-000000000003');

-- STEP 4: Sample products and inventory (run after profiles are set)
-- Service area products
INSERT INTO public.products (id, area_id, name, unit, notes) VALUES
  ('p0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Servilletas', 'paquetes', 'Paquetes de 100 unidades'),
  ('p0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Vasos Cristal', 'unidades', 'Vasos de 350ml'),
  ('p0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Platos Principales', 'unidades', NULL)
ON CONFLICT DO NOTHING;

-- Kitchen area products
INSERT INTO public.products (id, area_id, name, unit, notes) VALUES
  ('p0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'Tomates', 'kg', 'Tomate chonto'),
  ('p0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'Pollo', 'kg', 'Pechuga deshuesada'),
  ('p0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'Arroz', 'kg', 'Arroz Diana'),
  ('p0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 'Aceite Vegetal', 'litros', NULL)
ON CONFLICT DO NOTHING;

-- Bar area products
INSERT INTO public.products (id, area_id, name, unit, notes) VALUES
  ('p0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000003', 'Aguardiente', 'botellas', 'Antioqueño 750ml'),
  ('p0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000003', 'Cerveza Club Colombia', 'unidades', 'Botella 330ml'),
  ('p0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000003', 'Limones', 'kg', 'Para cócteles')
ON CONFLICT DO NOTHING;

-- Inventory items (link products to stock)
-- NOTE: Replace 'updated_by' UUIDs with actual user UUIDs after creating profiles
-- For now, updated_by is left as NULL since we don't have the user IDs yet

INSERT INTO public.inventory_items (product_id, area_id, quantity, updated_by) VALUES
  ('p0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 50, NULL),
  ('p0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 120, NULL),
  ('p0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 80, NULL),
  ('p0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 15, NULL),
  ('p0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 8, NULL),
  ('p0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 25, NULL),
  ('p0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 3, NULL),
  ('p0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000003', 12, NULL),
  ('p0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000003', 48, NULL),
  ('p0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000003', 4, NULL)
ON CONFLICT DO NOTHING;
