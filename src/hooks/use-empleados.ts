import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Empleado } from '@/types/nomina';

export function useEmpleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmpleados();
  }, []);

  const loadEmpleados = async () => {
    try {
      const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const empleadosMapped: Empleado[] = data.map((emp) => ({
          id: emp.id,
          nombres: emp.nombres,
          apellidos: emp.apellidos,
          cedula: emp.cedula,
          cargo: emp.cargo,
          asignacion: emp.asignacion,
          fechaIngreso: emp.fecha_ingreso,
          fechaSalida: emp.fecha_salida || undefined,
          sueldoNominal: Number(emp.sueldo_nominal),
          activo: emp.activo,
          tieneFondoReserva: emp.tiene_fondo_reserva,
          acumulaFondoReserva: emp.acumula_fondo_reserva,
          mensualizaDecimos: emp.mensualiza_decimos,
        }));

        setEmpleados(empleadosMapped);
      }
    } catch (error) {
      console.error('Error loading empleados:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveEmpleado = async (empleado: Empleado) => {
    try {
      const empleadoToSave = {
        id: empleado.id,
        nombres: empleado.nombres,
        apellidos: empleado.apellidos,
        cedula: empleado.cedula,
        cargo: empleado.cargo,
        asignacion: empleado.asignacion,
        fecha_ingreso: empleado.fechaIngreso,
        fecha_salida: empleado.fechaSalida || null,
        sueldo_nominal: empleado.sueldoNominal,
        activo: empleado.activo,
        tiene_fondo_reserva: empleado.tieneFondoReserva,
        acumula_fondo_reserva: empleado.acumulaFondoReserva,
        mensualiza_decimos: empleado.mensualizaDecimos,
        updated_at: new Date().toISOString(),
      };

      const { data: existingData } = await supabase
        .from('empleados')
        .select('id')
        .eq('id', empleado.id)
        .maybeSingle();

      if (existingData) {
        const { error } = await supabase
          .from('empleados')
          .update(empleadoToSave)
          .eq('id', empleado.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('empleados')
          .insert([empleadoToSave]);

        if (error) throw error;
      }

      await loadEmpleados();
    } catch (error) {
      console.error('Error saving empleado:', error);
      throw error;
    }
  };

  const deleteEmpleado = async (id: string) => {
    try {
      const { error } = await supabase
        .from('empleados')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadEmpleados();
    } catch (error) {
      console.error('Error deleting empleado:', error);
      throw error;
    }
  };

  return { empleados, setEmpleados, saveEmpleado, deleteEmpleado, loading };
}
