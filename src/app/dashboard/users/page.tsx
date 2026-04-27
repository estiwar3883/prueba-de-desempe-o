"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // NUEVOS ESTADOS PARA LAS ESTADÍSTICAS
    const [stats, setStats] = useState({ total: 0, pending: 0 });
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

                // 2. Cargar documentos para calcular estadísticas
                const docsRes = await fetch("/api/document");
                const docsData = await docsRes.json();

                if (docsData.success) {
                    const total = docsData.data.length;
                    const pending = docsData.data.filter((d: any) => d.status === "PENDING").length;
                    setStats({ total, pending });
                }

            } catch (error) {
                console.error("Error cargando datos del dashboard");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }
        loadDashboardData();
    }, [router]);

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sky-500 font-mono text-xs uppercase tracking-[0.3em]">
            Sincronizando Panel...
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-[#020617] border border-white/5 p-12 mb-12 shadow-2xl">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">
                            Bienvenido a C.A.N.D.Y.
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Tu asistente inteligente para el procesamiento y análisis de documentos clínicos en tiempo real.
                        </p>
                        <Link
                            href="/dashboard/users/report"
                            className="inline-block bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
                        >
                            Ver mis reportes
                        </Link>
                    </div>
                </div>

                {/* Stats Grid - AHORA DINÁMICO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Documentos Totales</p>
                        <p className="text-4xl font-black text-white tracking-tighter">{stats.total}</p>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">En Proceso</p>
                        <p className="text-4xl font-black text-sky-500 tracking-tighter">{stats.pending}</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Última Actividad</p>
                        <p className="text-4xl font-black text-white tracking-tighter">Hoy</p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold uppercase tracking-widest">
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex justify-between items-center">
                        <span className="text-slate-400">Motor de análisis online</span>
                        <span className="text-emerald-400 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" /> Estable
                        </span>
                    </div>
                    <Link href="/dashboard/users/report" className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex justify-between items-center hover:bg-white/[0.05] transition-all group">
                        <span className="text-slate-400">Ir al historial detallado</span>
                        <span className="text-sky-500 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}