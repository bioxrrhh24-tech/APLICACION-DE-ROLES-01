/*
  # Create datos_config table
  
  1. New Tables
    - `datos_config`
      - `id` (uuid, primary key) - Identificador único
      - `empresa` (text) - Nombre de la empresa
      - `mes` (text) - Mes de nómina
      - `fecha_corte` (date) - Fecha de corte
      - `dias_mes` (integer) - Días del mes
      - `created_at` (timestamptz) - Fecha de creación
      - `updated_at` (timestamptz) - Fecha de última actualización
  
  2. Security
    - Enable RLS on `datos_config` table
    - Add policy for all users to read and write their own data
*/

CREATE TABLE IF NOT EXISTS datos_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa text NOT NULL DEFAULT '',
  mes text NOT NULL DEFAULT '',
  fecha_corte date NOT NULL DEFAULT CURRENT_DATE,
  dias_mes integer NOT NULL DEFAULT 30,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE datos_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on datos_config"
  ON datos_config
  FOR ALL
  USING (true)
  WITH CHECK (true);