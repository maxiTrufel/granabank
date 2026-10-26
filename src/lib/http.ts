import { NextResponse } from "next/server";
import type { ApiErrorBody } from "./types";

export function jsonError(status: number, message: string, fields?: Record<string, string>) {
  return NextResponse.json<ApiErrorBody>({ error: { message, fields } }, { status });
}

export const unauthorized = () => jsonError(401, "Tu sesión expiró. Volvé a iniciar sesión.");

export function serverError(error: unknown) {
  console.error(error);
  return jsonError(500, "Tuvimos un problema al procesar la solicitud. Probá de nuevo en unos minutos.");
}
