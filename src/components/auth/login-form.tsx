"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SpinnerIcon } from "@/components/ui/icons";
import { ApiError, apiFetch } from "@/lib/api-client";
import { fieldErrors, loginSchema, type LoginInput } from "@/lib/validations";

type Errors = Partial<Record<"email" | "password", string>>;

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<Required<LoginInput>>({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof LoginInput>(field: K, value: Required<LoginInput>[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    // El error del campo se limpia apenas el usuario lo corrige.
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(parsed.data) });
      router.replace("/home");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.fields) setErrors(error.fields);
      setFormError(error instanceof ApiError ? error.message : "Ocurrió un error inesperado.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
      <div className="space-y-5">
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Ingresa tu email"
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
        />
        <Field
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          placeholder="Ingresa tu contraseña"
          value={values.password}
          error={errors.password}
          onChange={(value) => update("password", value)}
        />

        <label className="flex w-fit cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={values.remember}
            onChange={(event) => update("remember", event.target.checked)}
            className="size-4 cursor-pointer rounded accent-granate"
          />
          Recordarme
        </label>

        {formError && (
          <p role="alert" className="rounded-xl bg-granate-soft px-4 py-3 text-sm text-granate">
            {formError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-auto flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-granate font-medium text-white transition-colors hover:bg-granate-dark disabled:cursor-not-allowed disabled:opacity-80"
      >
        {submitting && <SpinnerIcon className="size-5 animate-spin" />}
        {submitting ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type: "email" | "password";
  autoComplete: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

function Field({ id, label, error, onChange, ...inputProps }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 w-full rounded-xl bg-white px-4 text-sm text-ink shadow-soft outline-none ring-1 transition-shadow placeholder:text-xs placeholder:text-muted focus:ring-2 ${
          error ? "ring-granate" : "ring-transparent focus:ring-granate/30"
        }`}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-granate">
          {error}
        </p>
      )}
    </div>
  );
}
