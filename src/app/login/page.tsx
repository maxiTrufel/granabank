import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-[86px] pb-[38px]">
      <div className="mb-[84px] flex flex-col items-center text-center">
        <div className="mb-5 size-12 rounded-xl bg-granate" aria-hidden="true" />
        <h1 className="text-4xl font-medium text-granate">GranaBank</h1>
        <p className="mt-5 text-base text-subtle">Con cada compra, sumás orgullo granate</p>
      </div>
      <LoginForm />
    </main>
  );
}
