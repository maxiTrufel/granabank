import { Skeleton } from "@/components/ui/feedback";
import type { Transaction } from "@/lib/types";
import { TransactionItem } from "./transaction-item";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <ul className="space-y-3">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <TransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  );
}

export function TransactionListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <ul className="space-y-3" aria-label="Cargando movimientos" aria-busy="true">
      {Array.from({ length: rows }, (_, index) => (
        <li key={index} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft">
          <Skeleton className="size-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-2.5 w-20" />
          </div>
          <Skeleton className="h-3 w-10" />
        </li>
      ))}
    </ul>
  );
}
