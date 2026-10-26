import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, SESSION_COOKIE } from "@/lib/session";
import { jsonError, serverError } from "@/lib/http";
import { fieldErrors, loginSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(400, "Revisá los datos ingresados", fieldErrors(parsed.error));
  }

  const { email, password, remember } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    const validPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;

    // Mismo mensaje para email inexistente y contraseña incorrecta,
    // así no se puede averiguar qué emails están registrados.
    if (!user || !validPassword) {
      return jsonError(401, "El email o la contraseña son incorrectos");
    }

    const { token, cookie } = await createSession(user.id, remember);
    const response = NextResponse.json({ name: user.name });
    response.cookies.set(SESSION_COOKIE, token, cookie);
    return response;
  } catch (error) {
    return serverError(error);
  }
}
