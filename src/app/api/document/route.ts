import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const documents = await prisma.document.findMany({
            where: { userId: decoded.userId },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: documents });
    } catch (error) {
        return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
    }
}