"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BackHeader } from "@/components/layout/back-header";
import { TransactionIcon } from "@/components/transactions/transaction-icon";
import { BrandLogo } from "@/components/ui/brand-logo";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback";
import { useApi } from "@/hooks/use-api";
import { formatAmount, formatLongDate } from "@/lib/format";
import { TRANSACTION_TYPE_CONFIG } from "@/lib/transaction-types";
import type { TransactionDetail } from "@/lib/types";

export function TransactionDetailView() {
  const { id } = useParams<{ id: string }>();
  const transaction = useApi<TransactionDetail>(`/api/transactions/${encodeURIComponent(id)}`);

  return (
    <>
      <BackHeader title="Detalle del movimiento" fallbackHref="/movimientos" />

      {transaction.status === "loading" && <DetailSkeleton />}

      {transaction.status === "error" &&
        (transaction.error.status === 404 ? (
          <EmptyState
            title="Movimiento no encontrado"
            description={transaction.error.message}
            action={
              <Link href="/movimientos" className="text-sm font-medium text-granate underline-offset-4 hover:underline">
                Ver todos los movimientos
              </Link>
            }
          />
        ) : (
          <ErrorState message={transaction.error.message} onRetry={transaction.retry} />
        ))}

      {transaction.status === "success" && <Detail transaction={transaction.data} />}
    </>
  );
}

function Detail({ transaction }: { transaction: TransactionDetail }) {
  const config = TRANSACTION_TYPE_CONFIG[transaction.type];

  return (
    <div className="space-y-4">
      <section className="flex flex-col items-center rounded-3xl bg-white px-6 py-8 text-center shadow-soft">
        <TransactionIcon type={transaction.type} size="lg" />
        <h2 className="mt-4 text-lg font-medium">{transaction.counterparty}</h2>
        <p className="text-xs text-muted">{config.label}</p>
        <p className={`mt-4 text-3xl font-semibold ${config.amountClass}`}>
          {config.sign}
          {formatAmount(transaction.amount)}
        </p>
      </section>

      <dl className="divide-y divide-line rounded-3xl bg-white px-5 shadow-soft">
        <Row label="Fecha">
          <span className="first-letter:uppercase">{formatLongDate(transaction.date)}</span>
        </Row>
        <Row label="Tipo">{config.filterLabel}</Row>
        {transaction.description && <Row label="Descripción">{transaction.description}</Row>}
        {transaction.card && (
          <Row label="Tarjeta">
            <span className="inline-flex items-center gap-2">
              <BrandLogo brand={transaction.card.brand} />
              •••• {transaction.card.lastFour}
            </span>
          </Row>
        )}
        <Row label="N° de operación">
          <span className="font-mono text-xs uppercase">{transaction.id.slice(-10)}</span>
        </Row>
      </dl>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 text-sm">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right text-ink">{children}</dd>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Cargando movimiento">
      <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-8 shadow-soft">
        <Skeleton className="size-16 rounded-2xl" />
        <Skeleton className="mt-4 h-5 w-32" />
        <Skeleton className="mt-2 h-3 w-24" />
        <Skeleton className="mt-5 h-8 w-28" />
      </div>
      <div className="space-y-5 rounded-3xl bg-white p-5 shadow-soft">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex justify-between">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3.5 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
