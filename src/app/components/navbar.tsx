"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/Badge";

// Definimos qué datos necesita la Navbar
interface NavbarProps {
  user?: {
    email: string;
    name?: string | null;
    role: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Error al cerrar sesion", error);
    }
  };

  const roleBadgeVariant =
    user?.role === "ADMIN" ? "danger" : user?.role === "user" ? "warning" : "neutral";

  const navLinks = [
    { href: "/dashboard", label: "PANEL" },
    ...(user?.role === "ADMIN" ? [{ href: "/dashboard/users", label: "PERSONAL" }] : []),
    ...(user?.role === "ADMIN" || user?.role === "user"
      ? [{ href: "/dashboard/audit", label: "BITÁCORA" }]
      : []),
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between border-b border-white/5 bg-[#020617]/80 px-8 py-4 backdrop-blur-xl">
      <Link href="/dashboard" className="flex items-center gap-3 transition-transform hover:scale-105">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 shadow-lg shadow-sky-500/20">
          <span className="text-sm font-bold text-white">C</span>
        </div>
        <span className="text-lg font-black tracking-tighter text-white">C.A.N.D.Y</span>
      </Link>

      <div className="flex items-center gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all ${
              pathname === link.href
                ? "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/30"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3 rounded-full bg-white/5 pl-4 pr-2 py-1 border border-white/5">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-medium leading-none text-slate-400">Especialista</span>
              <span className="text-xs font-bold text-slate-200">{user.name || user.email.split('@')[0]}</span>
            </div>
            <Badge label={user.role} variant={roleBadgeVariant} />
          </div>
        )}
        
        <div className="h-6 w-px bg-white/10" />

        <button
          onClick={handleLogout}
          className="group flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-400 transition-all hover:bg-red-500 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
  );
}