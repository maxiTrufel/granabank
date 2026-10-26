import type { Metadata } from "next";
import { Suspense } from "react";
import { TransactionListSkeleton } from "@/components/transactions/transaction-list";
import { MovementsView } from "@/components/views/movements-view";

export const metadata: Metadata = {
  title: "Movimientos",
};

export default function MovementsPage() {
  return (
    // MovementsView lee los filtros de la URL (useSearchParams), por eso va en Suspense.
    <Suspense fallback={<TransactionListSkeleton rows={6} />}>
      <MovementsView />
    </Suspense>
  );
}
