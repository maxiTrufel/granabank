"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/ui/icons";

interface BackHeaderProps {
  title: string;
  fallbackHref: string;
}

export function BackHeader({ title, fallbackHref }: BackHeaderProps) {
  const router = useRouter();

  function handleBack() {
    // Si se entró directo por URL no hay historial dentro de la app.
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  }

  return (
    <header className="flex items-center gap-3 pt-10 pb-6">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Volver"
        className="flex size-9 items-center justify-center rounded-full bg-white text-ink shadow-soft transition-colors hover:bg-granate-soft"
      >
        <ChevronLeftIcon className="size-5" />
      </button>
      <h1 className="text-lg font-medium">{title}</h1>
    </header>
  );
}
