import type { Metadata } from "next";
import { Suspense } from "react";
import { TransactionDetailView } from "@/components/views/transaction-detail-view";

export const metadata: Metadata = {
  title: "Detalle del movimiento",
};

export default function TransactionDetailPage() {
  return (
    <Suspense>
      <TransactionDetailView />
    </Suspense>
  );
}
