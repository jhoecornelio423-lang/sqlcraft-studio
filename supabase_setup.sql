-- ====================================================================
-- SQLCraft Studio - Configuración de Supabase
-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase:
-- https://supabase.com/dashboard/project/qrxoporukcrtrtpznpkg/sql
-- ====================================================================

-- 1. Crear tabla de progreso individual por usuario
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  nombre TEXT,
  resueltos JSONB DEFAULT '[]'::jsonb,
  ayudados JSONB DEFAULT '[]'::jsonb,
  codigos_guardados JSONB DEFAULT '{}'::jsonb,
  ultimo_ejercicio INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Seguridad a Nivel de Filas (Row Level Security - RLS)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de RLS: Cada usuario SOLO puede acceder y modificar sus propios datos
DROP POLICY IF EXISTS "Los usuarios pueden consultar su propio progreso" ON public.user_progress;
CREATE POLICY "Los usuarios pueden consultar su propio progreso"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio progreso" ON public.user_progress;
CREATE POLICY "Los usuarios pueden insertar su propio progreso"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio progreso" ON public.user_progress;
CREATE POLICY "Los usuarios pueden actualizar su propio progreso"
  ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. Trigger automático: Cuando un usuario se registra en auth.users, crear su progreso inicial
CREATE OR REPLACE FUNCTION public.handle_new_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_progress (user_id, email, nombre, resueltos, ayudados, codigos_guardados)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1)),
    '[]'::jsonb,
    '[]'::jsonb,
    '{}'::jsonb
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_progress();

-- 5. Índice para consultas ultrarrápidas por user_id
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
