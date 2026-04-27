import Navbar from "@/app/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617]"> 
      {/* Navbar fija arriba */}
      <Navbar />
      
      {/* Contenedor principal con padding-top para que la navbar no tape el contenido */}
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
}