import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DatosConfig } from '@/types/nomina';

export function useDatosConfig() {
  const [datos, setDatos] = useState<DatosConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDatos();
  }, []);

  const loadDatos = async () => {
    try {
      const { data, error } = await supabase
        .from('datos_config')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setDatos({
          id: data.id,
          empresa: data.empresa,
          mes: data.mes,
          fechaCorte: data.fecha_corte,
          diasMes: data.dias_mes,
        });
      }
    } catch (error) {
      console.error('Error loading datos config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveDatos = async (datosConfig: DatosConfig) => {
    try {
      const datosToSave = {
        id: datosConfig.id,
        empresa: datosConfig.empresa,
        mes: datosConfig.mes,
        fecha_corte: datosConfig.fechaCorte,
        dias_mes: datosConfig.diasMes,
        updated_at: new Date().toISOString(),
      };

      const { data: existingData } = await supabase
        .from('datos_config')
        .select('id')
        .eq('id', datosConfig.id)
        .maybeSingle();

      if (existingData) {
        const { error } = await supabase
          .from('datos_config')
          .update(datosToSave)
          .eq('id', datosConfig.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('datos_config')
          .insert([datosToSave]);

        if (error) throw error;
      }

      setDatos(datosConfig);
    } catch (error) {
      console.error('Error saving datos config:', error);
      throw error;
    }
  };

  return { datos, setDatos, saveDatos, loading };
}
