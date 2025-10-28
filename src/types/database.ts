export type Database = {
  public: {
    Tables: {
      datos_config: {
        Row: {
          id: string;
          empresa: string;
          mes: string;
          fecha_corte: string;
          dias_mes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          empresa: string;
          mes: string;
          fecha_corte: string;
          dias_mes: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          empresa?: string;
          mes?: string;
          fecha_corte?: string;
          dias_mes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      empleados: {
        Row: {
          id: string;
          nombres: string;
          apellidos: string;
          cedula: string;
          cargo: string;
          asignacion: string;
          fecha_ingreso: string;
          fecha_salida: string | null;
          sueldo_nominal: number;
          activo: boolean;
          tiene_fondo_reserva: boolean;
          acumula_fondo_reserva: boolean;
          mensualiza_decimos: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nombres: string;
          apellidos: string;
          cedula: string;
          cargo: string;
          asignacion: string;
          fecha_ingreso: string;
          fecha_salida?: string | null;
          sueldo_nominal?: number;
          activo?: boolean;
          tiene_fondo_reserva?: boolean;
          acumula_fondo_reserva?: boolean;
          mensualiza_decimos?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nombres?: string;
          apellidos?: string;
          cedula?: string;
          cargo?: string;
          asignacion?: string;
          fecha_ingreso?: string;
          fecha_salida?: string | null;
          sueldo_nominal?: number;
          activo?: boolean;
          tiene_fondo_reserva?: boolean;
          acumula_fondo_reserva?: boolean;
          mensualiza_decimos?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
