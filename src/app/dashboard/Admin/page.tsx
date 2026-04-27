"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0 });
  const router = useRouter();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Verificar sesión
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();

        // Validar que la respuesta sea exitosa
        if (!authRes.ok || !authData.success) {
          router.push("/login");
          return;
        }

        // Ahora sí podemos usar setUser porque ya existe
        setUser(authData.user);

        // 2. Cargar documentos (Asegúrate que esta ruta devuelva todos los docs para el admin)
        const docsRes = await fetch("/api/document", { 
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache' } 
        });
        const docsData = await docsRes.json();

        if (docsData.success && Array.isArray(docsData.data)) {
          const total = docsData.data.length;
          const pending = docsData.data.filter((d: any) => d.status === "PENDING").length;
          setStats({ total, pending });
        }

      } catch (error) {
        console.error("Error cargando datos administrativos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [router]);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sky-500 font-mono text-xs uppercase tracking-widest animate-pulse">
      Sincronizando Base de Datos...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Admin */}
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

        {/* Stats Dinámicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Documentos Totales</p>
            <p className="text-7xl font-black text-white tracking-tighter">{stats.total}</p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">En Proceso</p>
            <p className="text-7xl font-black text-sky-500 tracking-tighter">{stats.pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
}