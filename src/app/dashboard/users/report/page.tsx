"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Report {
    id: number;
    title: string;
    content: string;
    keywords: string;
    status: string;
    createdAt: string;
}

export default function UserReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    useEffect(() => {
        async function loadReports() {
            try {
                const res = await fetch("/api/document");
                const data = await res.json();
                if (data.success) setReports(data.data);
            } catch (error) {
                console.error("Error al cargar reportes");
            } finally {
                setLoading(false);
            }
        }
        loadReports();
    }, []);

    // FUNCIÓN DE EXPORTACIÓN CORREGIDA
    const exportToPDF = () => {
        if (!selectedReport) return;

        const doc = new jsPDF();

        // Estilo del Header en el PDF
        doc.setFillColor(2, 6, 23);
        doc.rect(0, 0, 210, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("C.A.N.D.Y. CLINICAL INTELLIGENCE", 14, 25);

        doc.setTextColor(100, 116, 139);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`REPORTE ID: #${selectedReport.id} | EMITIDO: ${new Date().toLocaleDateString()}`, 14, 35);

        // Tabla con el contenido del reporte
        autoTable(doc, {
            startY: 50,
            head: [[`ANÁLISIS: ${selectedReport.title.toUpperCase()}`]],
            body: [[selectedReport.content]],
            theme: 'grid',
            headStyles: { fillColor: [14, 165, 233], textColor: [255, 255, 255], fontSize: 12 },
            styles: { fontSize: 11, cellPadding: 8, overflow: 'linebreak' },
            margin: { top: 50 }
        });

        // Firma o pie de página
        const finalY = (doc as any).lastAutoTable.finalY || 150;
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text("Este documento es una síntesis generada por inteligencia artificial clínica.", 14, finalY + 20);

        // Descarga automática
        doc.save(`Reporte_Candy_${selectedReport.id}.pdf`);
    };

    const highlightKeywords = (text: string, keywords: string) => {
        if (!keywords) return text;
        const words = keywords.split(",").map(w => w.trim());
        const regex = new RegExp(`(${words.join("|")})`, "gi");
        return text.split(regex).map((part, i) =>
            words.some(w => w.toLowerCase() === part.toLowerCase()) ? (
                <mark key={i} className="bg-sky-500/30 text-sky-200 rounded px-1 font-bold">{part}</mark>
            ) : part
        );
    };

    const filteredReports = reports.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (dateFilter ? r.createdAt.includes(dateFilter) : true)
    );

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sky-500 font-mono text-xs uppercase tracking-widest animate-pulse">
            Accediendo a la base de datos...
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 bg-[#020617] min-h-screen text-slate-200">

            {/* Cabecera */}
            <div className="flex justify-between items-end">
                <div>
                    <Link href="/dashboard" className="text-slate-500 hover:text-sky-400 transition-colors text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                        ← Volver al Panel General
                    </Link>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Historial de Reportes</h1>
                    <p className="text-slate-500 text-xs mt-2 font-bold uppercase tracking-widest">Gestión de análisis clínicos procesados</p>
                </div>
                <div className="bg-sky-500/10 border border-sky-500/20 px-6 py-2 rounded-2xl">
                    <span className="text-sky-400 text-xs font-black uppercase tracking-widest">Total: {filteredReports.length}</span>
                </div>
            </div>

            {/* Buscador y Fecha */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 shadow-2xl">
                <div className="md:col-span-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 mb-2 block tracking-widest">
                        Buscador Inteligente
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre del documento..."
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:border-sky-500 outline-none transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 mb-2 block tracking-widest text-white">
                        Fecha de Proceso
                    </label>
                    <input
                        type="date"
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:border-sky-500 outline-none transition-all [color-scheme:dark]"
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lista de la izquierda */}
                <div className="lg:col-span-1 space-y-3 h-[600px] overflow-y-auto pr-3 custom-scrollbar">
                    {filteredReports.map((report) => (
                        <Card
                            key={report.id}
                            className={`p-5 cursor-pointer transition-all border-white/5 hover:border-sky-500/50 ${selectedReport?.id === report.id ? 'bg-sky-500/10 border-sky-500 shadow-lg' : 'bg-white/[0.02]'}`}
                            onClick={() => setSelectedReport(report)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-white text-xs uppercase truncate w-32">{report.title}</h3>
                                <Badge label={report.status} variant={report.status === 'COMPLETED' ? 'success' : 'neutral'} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-600 font-mono tracking-tighter">REF: #{report.id}</span>
                                <span className="text-[10px] text-white font-bold">{new Date(report.createdAt).toLocaleDateString()}</span>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Detalle del reporte (Derecha) */}
                <div className="lg:col-span-2">
                    {selectedReport ? (
                        <Card className="p-10 border-white/10 bg-white/[0.03] min-h-[600px] relative rounded-[3rem]">
                            {/* ELIMINADO EL TEXTO "CANDY" DE FONDO QUE ESTABA AQUÍ */}

                            <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{selectedReport.title}</h2>
                                    <p className="text-sky-500 text-[10px] font-black uppercase mt-2 tracking-[0.3em]">Análisis Clínico Detallado</p>
                                </div>
                                <button
                                    onClick={exportToPDF}
                                    className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-[10px] font-black transition-all shadow-lg shadow-sky-500/20 active:scale-95 uppercase tracking-widest"
                                >
                                    Exportar PDF
                                </button>
                            </div>

                            <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                                <p className="text-slate-300 leading-relaxed text-sm italic whitespace-pre-line">
                                    {highlightKeywords(selectedReport.content, selectedReport.keywords)}
                                </p>
                            </div>

                            <div className="mt-10">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Keywords Inteligentes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedReport.keywords.split(",").map((k, i) => (
                                        <span key={i} className="px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full text-[10px] font-bold">
                                            #{k.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] p-12 text-slate-700 bg-white/[0.01]">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Selecciona un análisis para visualizar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}