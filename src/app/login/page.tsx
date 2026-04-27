"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Asegura que las cookies se envíen con la solicitud
      });
      // IMPORTANTE: Obtenemos el JSON para leer el "success: true"
      const data = await res.json();

      if (res.ok && data.success) {
        // Usamos href para que el navegador "limpie" los errores 401 que ves en tu foto
        window.location.href = "/dashboard";
        return;
      }

      setError(data.error || "Credenciales inválidas.");
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] text-slate-200">

      {/* Fondo Decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-sky-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 flex flex-col items-center">
          <Link href="/" className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 shadow-xl shadow-sky-500/20">
            <span className="text-2xl font-bold text-white">C</span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Bienvenido</h1>
          <p className="mt-2 text-sm text-slate-400">
            Portal de acceso para especialistas <span className="text-sky-400 font-semibold">C.A.N.D.Y</span>
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Correo Electrónico</label>
              <input
                type="email"
                placeholder="doctor@clinica.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Contraseña</label>
                <Link href="#" className="text-[10px] font-semibold text-sky-500/70 hover:text-sky-400">¿Olvidó su clave?</Link>
              </div>
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
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-sky-500 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Autenticando..." : "Ingresar al sistema →"}
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            ¿No tienes acceso todavía?{" "}
            <Link href="/register" className="font-semibold text-sky-400 transition hover:text-sky-300">Solicitar cuenta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}