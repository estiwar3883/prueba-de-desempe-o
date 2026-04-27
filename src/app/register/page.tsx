"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Error al registrar");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] text-slate-200">
      
      {/* Fondo Decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-sky-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo y Encabezado */}
        <div className="mb-10 flex flex-col items-center">
          <Link href="/" className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 shadow-xl shadow-sky-500/20">
            <span className="text-2xl font-bold text-white">C</span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Únete a la plataforma clínica <span className="text-sky-400 font-semibold">C.A.N.D.Y</span>
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleRegister}
          className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@clinica.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-sky-500 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Procesando registro..." : "Empezar ahora →"}
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            ¿Ya eres miembro?{" "}
            <Link href="/login" className="font-semibold text-sky-400 transition hover:text-sky-300">
              Inicia sesión aquí
            </Link>
          </p>
        </form>

        <p className="mt-10 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
          C.A.N.D.Y v2.0 — Sistema de Gestión Médica
        </p>
      </div>
    </div>
  );
}