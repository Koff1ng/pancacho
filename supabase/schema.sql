-- ============================================
-- La Comitiva Inventarios — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Areas table
CREATE TABLE IF NOT EXISTS public.areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'service_manager', 'kitchen_manager', 'bar_manager')),
  area_id UUID REFERENCES public.areas(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area_id UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'unidades',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Inventory items table
CREATE TABLE IF NOT EXISTS public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  area_id UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
  quantity NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES public.profiles(id)
);

-- 5. Inventory updates (audit log)
CREATE TABLE IF NOT EXISTS public.inventory_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID NOT NULL REFERENCES public.inventory_items(id) ON DELETE CASCADE,
  previous_qty NUMERIC NOT NULL,
  new_qty NUMERIC NOT NULL,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_updates ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Helper function to get current user's area_id
CREATE OR REPLACE FUNCTION public.get_user_area_id()
RETURNS UUID AS $$
  SELECT area_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ---- Areas: everyone can read ----
CREATE POLICY "areas_select" ON public.areas
  FOR SELECT TO authenticated USING (true);

-- ---- Profiles ----
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.get_user_role() = 'admin');

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- ---- Products ----
CREATE POLICY "products_select" ON public.products
  FOR SELECT TO authenticated
  USING (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

CREATE POLICY "products_insert" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

CREATE POLICY "products_update" ON public.products
  FOR UPDATE TO authenticated
  USING (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

CREATE POLICY "products_delete" ON public.products
  FOR DELETE TO authenticated
  USING (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

-- ---- Inventory Items ----
CREATE POLICY "inventory_items_select" ON public.inventory_items
  FOR SELECT TO authenticated
  USING (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

CREATE POLICY "inventory_items_insert" ON public.inventory_items
  FOR INSERT TO authenticated
  WITH CHECK (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

CREATE POLICY "inventory_items_update" ON public.inventory_items
  FOR UPDATE TO authenticated
  USING (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

CREATE POLICY "inventory_items_delete" ON public.inventory_items
  FOR DELETE TO authenticated
  USING (area_id = public.get_user_area_id() OR public.get_user_role() = 'admin');

-- ---- Inventory Updates (audit) ----
CREATE POLICY "inventory_updates_insert" ON public.inventory_updates
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "inventory_updates_select" ON public.inventory_updates
  FOR SELECT TO authenticated
  USING (
    public.get_user_role() = 'admin'
    OR inventory_item_id IN (
      SELECT id FROM public.inventory_items WHERE area_id = public.get_user_area_id()
    )
  );
