import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
        const role = (decoded.role || "USER").toUpperCase();

        let documents;

        // Si es ADMIN, ve todo. Si no, solo lo suyo.
        if (role === "ADMIN") {
            documents = await prisma.document.findMany({ orderBy: { createdAt: 'desc' } });
        } else {
            documents = await prisma.document.findMany({
                where: { userId: decoded.userId },
                orderBy: { createdAt: 'desc' }
            });
        }

        // Estadísticas
        const total = documents.length;
        const pending = documents.filter(d => d.status?.toUpperCase() === "PENDING").length;

        return NextResponse.json({
            success: true,
            data: documents,
            stats: { total, pending }
        });
    } catch (error) {
        return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
    }
}