"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0 }); // Usaremos esto para los cuadros
  const router = useRouter();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 1. Verificar sesión
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();

        if (!authRes.ok || !authData.success) {
          router.push("/login");
          return;
        }
        setUser(authData.user);

        // 2. Cargar documentos desde la API que ya trae las estadísticas
        const docsRes = await fetch("/api/document", { 
          cache: 'no-store'
        });
        const docsData = await docsRes.json();

        // LOG CLAVE: Abre la consola (F12) y mira si llegan los stats
        console.log("Respuesta de API Admin:", docsData);

        if (docsData.success && docsData.stats) {
          // MAPEO DE DATOS: Usamos los nombres que pusiste en la API (total, inProcess)
          setStats({
            total: docsData.stats.total, 
            pending: docsData.stats.inProcess // Mapeamos inProcess a nuestro estado pending
          });
        }

      } catch (error) {
        console.error("Error cargando datos administrativos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [router]);

  // ... (El resto del renderizado se queda igual, ya que usa stats.total y stats.pending)
  
  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sky-500 font-mono text-xs uppercase tracking-widest animate-pulse">
      Sincronizando Base de Datos...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-[#020617] border border-white/5 p-12 mb-12 shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase leading-none">
              Panel de Control Admin
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Vista global de procesamiento de C.A.N.D.Y.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Documentos Totales</p>
            {/* Se mostrará docsData.stats.total */}
            <p className="text-7xl font-black text-white tracking-tighter">{stats.total}</p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">En Proceso</p>
            {/* Se mostrará docsData.stats.inProcess */}
            <p className="text-7xl font-black text-sky-500 tracking-tighter">{stats.pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
}