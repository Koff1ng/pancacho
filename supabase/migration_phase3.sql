-- ============================================
-- Phase 3 Migration: Add category to products
-- Run in Supabase SQL Editor
-- ============================================

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT NULL;

-- Add some categories to existing seed data
UPDATE public.products SET category = 'Suministros' WHERE id IN (
  'p0000000-0000-0000-0000-000000000001',
  'p0000000-0000-0000-0000-000000000002',
  'p0000000-0000-0000-0000-000000000003'
);

UPDATE public.products SET category = 'Alimentos' WHERE id IN (
  'p0000000-0000-0000-0000-000000000004',
  'p0000000-0000-0000-0000-000000000005',
  'p0000000-0000-0000-0000-000000000006'
);

UPDATE public.products SET category = 'Insumos' WHERE id = 'p0000000-0000-0000-0000-000000000007';

UPDATE public.products SET category = 'Bebidas' WHERE id IN (
  'p0000000-0000-0000-0000-000000000008',
  'p0000000-0000-0000-0000-000000000009'
);

UPDATE public.products SET category = 'Frutas' WHERE id = 'p0000000-0000-0000-0000-000000000010';
