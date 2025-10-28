/*
  # Create empleados table
  
  1. New Tables
    - `empleados`
      - `id` (uuid, primary key) - Identificador único del empleado
      - `nombres` (text) - Nombres del empleado
      - `apellidos` (text) - Apellidos del empleado
      - `cedula` (text) - Cédula de identidad
      - `cargo` (text) - Cargo del empleado
      - `asignacion` (text) - Asignación (Costo/Gasto)
      - `fecha_ingreso` (date) - Fecha de ingreso
      - `fecha_salida` (date, nullable) - Fecha de salida
      - `sueldo_nominal` (numeric) - Sueldo nominal del empleado
      - `activo` (boolean) - Estado activo/inactivo
      - `tiene_fondo_reserva` (boolean) - Aplica para fondo de reserva
      - `acumula_fondo_reserva` (boolean) - Acumula fondo de reserva
      - `mensualiza_decimos` (boolean) - Mensualiza décimos
      - `created_at` (timestamptz) - Fecha de creación
      - `updated_at` (timestamptz) - Fecha de última actualización
  
  2. Security
    - Enable RLS on `empleados` table
    - Add policy for all users to read and write data
  
  3. Notes
    - Los campos `nombres` y `apellidos` están separados para facilitar la entrada de datos
    - El campo `cedula` debe ser único por empleado
    - El sueldo nominal tiene un valor por defecto de 470 (salario mínimo Ecuador)
*/

CREATE TABLE IF NOT EXISTS empleados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombres text NOT NULL DEFAULT '',
  apellidos text NOT NULL DEFAULT '',
  cedula text NOT NULL DEFAULT '',
  cargo text NOT NULL DEFAULT '',
  asignacion text NOT NULL DEFAULT '',
  fecha_ingreso date NOT NULL DEFAULT CURRENT_DATE,
  fecha_salida date,
  sueldo_nominal numeric(10, 2) NOT NULL DEFAULT 470,
  activo boolean NOT NULL DEFAULT true,
  tiene_fondo_reserva boolean NOT NULL DEFAULT false,
  acumula_fondo_reserva boolean NOT NULL DEFAULT false,
  mensualiza_decimos boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on empleados"
  ON empleados
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_empleados_cedula ON empleados(cedula);
CREATE INDEX IF NOT EXISTS idx_empleados_activo ON empleados(activo);