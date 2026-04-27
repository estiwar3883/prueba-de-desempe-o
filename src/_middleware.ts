import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Normalizamos a minúsculas para evitar saltos por mayúsculas (ej: /dashboard/Admin)
  const pathLower = pathname.toLowerCase();

  const isProtected = pathLower.startsWith("/dashboard");
  const isAuthPage = pathLower === "/login" || pathLower === "/register";

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // 1. Redirigir si no hay token en rutas protegidas
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const decoded = payload as { userId: number; role: string };

      // 2. Si ya está logueado e intenta ir a login/register
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // 3. PROTECCIÓN DE RUTA ADMIN (detecta /dashboard/admin o /dashboard/Admin)
      if (pathLower.startsWith("/dashboard/admin") || pathLower.startsWith("/dashboard/users")) {
        if (decoded.role !== "ADMIN") {
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
      }

    } catch (error) {
      // Si el token es inválido, borrar cookie y mandar a login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};