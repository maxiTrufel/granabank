import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-20 pb-10">
      <div className="mb-14 flex flex-col items-center text-center">
        <div className="mb-5 size-14 rounded-xl bg-granate" aria-hidden="true" />
        <h1 className="text-[2rem] font-medium text-granate">GranaBank</h1>
        <p className="mt-3 text-sm font-light text-muted">Con cada compra, sumás orgullo granate</p>
      </div>
      <LoginForm />
    </main>
  );
}
