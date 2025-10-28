import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatosModule from "@/components/nomina/DatosModule";
import NominaModule from "@/components/nomina/NominaModule";
import RolPagosModule from "@/components/nomina/RolPagosModule";
import { DatosConfig, Empleado } from "@/types/nomina";
import { useDatosConfig } from "@/hooks/use-datos-config";
import { useEmpleados } from "@/hooks/use-empleados";
import { Toaster } from "@/components/ui/toaster";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const getCurrentMonth = () => {
  const monthIndex = new Date().getMonth();
  return MESES[monthIndex];
};

const Index = () => {
  const { datos: datosFromDB, loading: loadingDatos } = useDatosConfig();
  const { empleados: empleadosFromDB, loading: loadingEmpleados } = useEmpleados();

  const [datos, setDatos] = useState<DatosConfig>({
    id: "1",
    empresa: "",
    mes: getCurrentMonth(),
    fechaCorte: new Date().toISOString().split("T")[0],
    diasMes: 30,
  });

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [activeTab, setActiveTab] = useState("datos");

  useEffect(() => {
    if (datosFromDB) {
      setDatos(datosFromDB);
      if (datosFromDB.empresa.trim() !== "") {
        setActiveTab("nomina");
      }
    }
  }, [datosFromDB]);

  useEffect(() => {
    if (empleadosFromDB) {
      setEmpleados(empleadosFromDB);
    }
  }, [empleadosFromDB]);

  const canAccessNomina = datos.empresa.trim() !== "";
  const canAccessRol = canAccessNomina && empleados.length > 0;

  if (loadingDatos || loadingEmpleados) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {activeTab === "datos" ? (
        <main className="min-h-screen flex items-center justify-center px-6 py-12">
          <DatosModule
            datos={datos}
            onUpdate={setDatos}
            onContinue={() => setActiveTab("nomina")}
          />
        </main>
      ) : (
        <>
          <header className="border-b bg-card">
            <div className="container mx-auto px-6 py-4">
              <div>
                <h1 className="text-xl font-bold">{datos.empresa}</h1>
                <p className="text-sm text-muted-foreground">
                  {datos.mes} - Corte: {new Date(datos.fechaCorte).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-12">
                <TabsTrigger value="datos" className="text-sm">Datos</TabsTrigger>
                <TabsTrigger value="nomina" disabled={!canAccessNomina} className="text-sm">Nómina</TabsTrigger>
                <TabsTrigger value="rol" disabled={!canAccessRol} className="text-sm">Rol de Pagos</TabsTrigger>
              </TabsList>

              <TabsContent value="datos" className="space-y-4">
                <DatosModule
                  datos={datos}
                  onUpdate={setDatos}
                  onContinue={() => setActiveTab("nomina")}
                />
              </TabsContent>

              <TabsContent value="nomina" className="space-y-4">
                <NominaModule
                  empleados={empleados}
                  onUpdate={setEmpleados}
                  empresa={datos.empresa}
                />
              </TabsContent>

              <TabsContent value="rol" className="space-y-4">
                <RolPagosModule empleados={empleados} datos={datos} />
              </TabsContent>
            </Tabs>
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
