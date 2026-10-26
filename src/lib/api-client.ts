import type { ApiErrorBody } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const NETWORK_ERROR = "No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.";

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(NETWORK_ERROR, 0);
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiErrorBody | null;
    throw new ApiError(
      body?.error.message ?? "Ocurrió un error inesperado.",
      response.status,
      body?.error.fields,
    );
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
