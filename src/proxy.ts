import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Chequeo optimista: si no hay sesión válida mandamos al login antes de
// renderizar. Las API routes vuelven a validar la sesión por su cuenta.
export async function proxy(request: NextRequest) {
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    return session ? NextResponse.redirect(new URL("/home", request.url)) : NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/home", "/movimientos/:path*"],
};
