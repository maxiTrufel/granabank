"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchInput } from "@/components/transactions/search-input";
import { TransactionList, TransactionListSkeleton } from "@/components/transactions/transaction-list";
import { TypeFilter } from "@/components/transactions/type-filter";
import { EmptyState, ErrorState } from "@/components/ui/feedback";
import { useApi } from "@/hooks/use-api";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { TRANSACTION_TYPE_CONFIG } from "@/lib/transaction-types";
import type { Transaction, TransactionType } from "@/lib/types";

function parseType(value: string | null): TransactionType | null {
  return value && value in TRANSACTION_TYPE_CONFIG ? (value as TransactionType) : null;
}

export function MovementsView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Los filtros viven en la URL: se pueden compartir y sobreviven a un refresh
  // o a volver desde el detalle de un movimiento.
  const query = searchParams.get("q") ?? "";
  const type = parseType(searchParams.get("tipo"));

  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebouncedValue(search.trim(), 300);

  function updateUrl(next: { q?: string; tipo?: TransactionType | null }) {
    const params = new URLSearchParams(searchParams);
    params.delete("buscar");
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  useEffect(() => {
    if (debouncedSearch !== query) updateUrl({ q: debouncedSearch });
    // Solo reaccionamos al texto ya "debounceado".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const apiParams = new URLSearchParams();
  if (query) apiParams.set("q", query);
  if (type) apiParams.set("type", type);
  const transactions = useApi<Transaction[]>(`/api/transactions?${apiParams}`);

  const hasFilters = Boolean(query || type);

  function clearFilters() {
    setSearch("");
    updateUrl({ q: "", tipo: null });
  }

  return (
    <>
      <header className="pt-10 pb-5">
        <h1 className="text-lg font-medium">Movimientos</h1>
      </header>

      <div className="mb-6 space-y-4">
        <SearchInput value={search} onChange={setSearch} autoFocus={searchParams.has("buscar")} />
        <TypeFilter value={type} onChange={(tipo) => updateUrl({ tipo })} />
      </div>

      {transactions.status === "loading" && <TransactionListSkeleton rows={6} />}
      {transactions.status === "error" && (
        <ErrorState message={transactions.error.message} onRetry={transactions.retry} />
      )}
      {transactions.status === "success" &&
        (transactions.data.length > 0 ? (
          <TransactionList transactions={transactions.data} />
        ) : hasFilters ? (
          <EmptyState
            title="No encontramos movimientos"
            description={
              query
                ? `No hay resultados para “${query}” con los filtros seleccionados.`
                : "No hay movimientos de este tipo todavía."
            }
            action={
              <button type="button" onClick={clearFilters} className="text-sm font-medium text-granate underline-offset-4 hover:underline">
                Limpiar filtros
              </button>
            }
          />
        ) : (
          <EmptyState
            title="Todavía no tenés movimientos"
            description="Cuando pagues o recibas dinero, tus movimientos van a aparecer acá."
          />
        ))}
    </>
  );
}
