import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-200">
      
      {/* Fondo con Decoración Bio-Medical Futurista */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-sky-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      {/* Navbar Minimalista */}
      <nav className="relative z-10 flex items-center justify-between border-b border-white/5 px-6 py-5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 shadow-lg shadow-sky-500/20">
            <span className="text-lg font-bold text-white">C</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white">C.A.N.D.Y</span>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/login" className="text-sm font-medium text-slate-400 transition hover:text-sky-400">Acceso</Link>
          <Link
            href="/register"
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-sky-400 hover:text-white"
          >
            Empezar ahora
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-32 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1.5 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
            Plataforma Clínica Centralizada
          </span>
        </div>

        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-8xl">
          Gestión inteligente <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            de ayuda clínica
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
          C.A.N.D.Y optimiza el flujo de trabajo clínico, permitiendo un control total sobre pacientes 
          y procesos médicos con seguridad de nivel bancario.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-sky-500 px-10 font-bold text-white transition-all hover:bg-sky-400 hover:ring-4 hover:ring-sky-500/20"
          >
            Crear expediente →
          </Link>
          <Link
            href="/login"
            className="flex h-14 items-center justify-center rounded-full border border-slate-700 px-10 font-bold text-slate-300 transition-all hover:border-sky-400/50 hover:text-white"
          >
            Portal del Especialista
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Gestión Clínica",
              desc: "Control absoluto de expedientes y seguimiento de pacientes en tiempo real.",
              icon: (
                <svg className="h-6 w-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              ),
            },
            {
              title: "Seguridad Privada",
              desc: "Encriptación de datos sensibles y cumplimiento de normativas médicas internacionales.",
              icon: (
                <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8-8v4" />
                </svg>
              ),
            },
            {
              title: "Trazabilidad Total",
              desc: "Bitácora completa de acciones para auditorías y control de calidad asistencial.",
              icon: (
                <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-left transition-all hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-sky-500/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 group-hover:bg-sky-500/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer simple */}
      <footer className="relative z-10 border-t border-white/5 py-10 text-center">
        <p className="text-xs tracking-widest text-slate-600 uppercase">
          &copy; 2026 C.A.N.D.Y Clinical Systems — Acceso Restringido
        </p>
      </footer>
    </div>
  );
}