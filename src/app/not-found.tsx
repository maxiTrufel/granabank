import Link from "next/link";
import { EmptyState } from "@/components/ui/feedback";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <EmptyState
        title="Página no encontrada"
        description="La página que buscás no existe o fue movida."
        action={
          <Link href="/home" className="rounded-full bg-granate px-5 py-2 text-sm font-medium text-white">
            Ir al inicio
          </Link>
        }
      />
    </main>
  );
}
