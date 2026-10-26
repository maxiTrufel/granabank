import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "gb_session";

const REMEMBER_MAX_AGE = 60 * 60 * 24 * 30; // 30 días
const DEFAULT_MAX_AGE = 60 * 60 * 12; // 12 horas

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET no está definido o tiene menos de 32 caracteres");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: string, remember: boolean) {
  const maxAge = remember ? REMEMBER_MAX_AGE : DEFAULT_MAX_AGE;

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSecret());

  return {
    token,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      // Sin "Recordarme" la cookie es de sesión: se borra al cerrar el navegador.
      maxAge: remember ? maxAge : undefined,
    },
  };
}

export async function verifySession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    return payload.sub ? { userId: payload.sub } : null;
  } catch {
    return null;
  }
}

export async function getSessionUserId() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(SESSION_COOKIE)?.value);
  return session?.userId ?? null;
}
