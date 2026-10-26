"use client";

import { ErrorState } from "@/components/ui/feedback";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex flex-1 items-center justify-center">
      <ErrorState message="Ocurrió un error inesperado. Probá recargar la página." onRetry={reset} />
    </main>
  );
}
