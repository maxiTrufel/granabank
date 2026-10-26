import { z } from "zod";

export const TRANSACTION_TYPES = ["SUBSCRIPTION", "CASH_IN", "CASH_OUT"] as const;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Ingresá tu email")
    .pipe(z.email("El email no tiene un formato válido")),
  password: z.string().min(1, "Ingresá tu contraseña"),
  remember: z.boolean().default(false),
});

export type LoginInput = z.input<typeof loginSchema>;

export const transactionFiltersSchema = z.object({
  q: z.string().trim().max(60, "La búsqueda es demasiado larga").optional(),
  type: z.enum(TRANSACTION_TYPES, "Tipo de movimiento inválido").optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

/** Devuelve el primer mensaje de error por campo, listo para mostrar en un form. */
export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path.join(".");
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
