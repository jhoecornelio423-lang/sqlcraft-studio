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

-- 6. Tabla auditada para intentos de examen de certificación
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  seccion_id INT NOT NULL,
  puntaje_total INT NOT NULL CHECK (puntaje_total >= 0 AND puntaje_total <= 100),
  puntos_teoria INT NOT NULL CHECK (puntos_teoria >= 0 AND puntos_teoria <= 40),
  puntos_practica INT NOT NULL CHECK (puntos_practica >= 0 AND puntos_practica <= 60),
  aprobado BOOLEAN NOT NULL,
  respuestas_teoria JSONB,
  retos_practicos JSONB,
  token_verificacion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Los usuarios pueden consultar sus propios intentos de examen" ON public.exam_attempts;
CREATE POLICY "Los usuarios pueden consultar sus propios intentos de examen"
  ON public.exam_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 7. Función PostgreSQL con validación e integridad matemática del lado servidor
CREATE OR REPLACE FUNCTION public.registrar_intento_examen(
  p_seccion_id INT,
  p_respuestas_teoria JSONB,
  p_retos_practicos JSONB,
  p_token_verificacion TEXT,
  p_puntaje_total INT,
  p_puntos_teoria INT,
  p_puntos_practica INT,
  p_aprobado BOOLEAN
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_nuevo_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuario no autenticado para registrar certificación';
  END IF;

  -- Validación matemática estricta: suma de puntos y congruencia de aprobación
  IF p_puntaje_total < 0 OR p_puntaje_total > 100 THEN
    RAISE EXCEPTION 'Puntaje fuera de rango permitido (0-100)';
  END IF;

  IF (p_puntos_teoria + p_puntos_practica) <> p_puntaje_total THEN
    RAISE EXCEPTION 'Inconsistencia en la sumatoria de puntajes del examen';
  END IF;

  IF (p_puntaje_total >= 70 AND NOT p_aprobado) OR (p_puntaje_total < 70 AND p_aprobado) THEN
    RAISE EXCEPTION 'Estado de aprobación inconsistente con el umbral requerido (70 pts)';
  END IF;

  INSERT INTO public.exam_attempts (
    user_id,
    seccion_id,
    puntaje_total,
    puntos_teoria,
    puntos_practica,
    aprobado,
    respuestas_teoria,
    retos_practicos,
    token_verificacion
  ) VALUES (
    v_user_id,
    p_seccion_id,
    p_puntaje_total,
    p_puntos_teoria,
    p_puntos_practica,
    p_aprobado,
    p_respuestas_teoria,
    p_retos_practicos,
    p_token_verificacion
  ) RETURNING id INTO v_nuevo_id;

  RETURN jsonb_build_object('success', true, 'attempt_id', v_nuevo_id, 'aprobado', p_aprobado);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
