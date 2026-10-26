"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api-client";

type Result<T> =
  | { key: string; status: "success"; data: T }
  | { key: string; status: "error"; error: ApiError };

export type ApiState<T> =
  | { status: "loading"; data?: undefined; error?: undefined }
  | { status: "success"; data: T; error?: undefined }
  | { status: "error"; data?: undefined; error: ApiError };

/**
 * GET a una API route con estados de loading / success / error y retry.
 *
 * Cada request se identifica con una key (url + intento). Mientras el último
 * resultado guardado no corresponda a la key actual, el estado es "loading";
 * así no hace falta resetear el estado a mano cuando cambia la url.
 */
export function useApi<T>(url: string) {
  const router = useRouter();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result<T> | null>(null);
  const key = `${url}#${attempt}`;

  useEffect(() => {
    const controller = new AbortController();

    apiFetch<T>(url, { signal: controller.signal })
      .then((data) => setResult({ key, status: "success", data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        // La sesión venció mientras la app estaba abierta.
        if (error instanceof ApiError && error.status === 401) {
          router.replace("/login");
          return;
        }
        const apiError = error instanceof ApiError ? error : new ApiError("Ocurrió un error inesperado.", 0);
        setResult({ key, status: "error", error: apiError });
      });

    // Si cambia la url antes de que responda, descartamos la respuesta vieja.
    return () => controller.abort();
  }, [url, key, router]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const state: ApiState<T> =
    result?.key !== key
      ? { status: "loading" }
      : result.status === "success"
        ? { status: "success", data: result.data }
        : { status: "error", error: result.error };

  return { ...state, retry };
}
