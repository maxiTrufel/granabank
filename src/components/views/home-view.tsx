"use client";

import Link from "next/link";
import { CardsCarousel, CardsCarouselSkeleton } from "@/components/cards/cards-carousel";
import { NotificationsButton } from "@/components/layout/notifications-button";
import { TransactionList, TransactionListSkeleton } from "@/components/transactions/transaction-list";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback";
import { SearchIcon } from "@/components/ui/icons";
import { useApi } from "@/hooks/use-api";
import type { Profile, Transaction } from "@/lib/types";

const RECENT_LIMIT = 5;

export function HomeView() {
  const profile = useApi<Profile>("/api/me");
  const recent = useApi<Transaction[]>(`/api/transactions?limit=${RECENT_LIMIT}`);

  return (
    <>
      <header className="flex items-center justify-between pt-12 pb-7">
        <div>
          <p className="text-sm text-subtle">Hola</p>
          {profile.status === "success" ? (
            <h1 className="text-[22px] leading-tight font-semibold">{profile.data.name}</h1>
          ) : (
            profile.status === "loading" && <Skeleton className="mt-1 h-6 w-24" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/movimientos?buscar=1"
            aria-label="Buscar movimientos"
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-white"
          >
            <SearchIcon className="size-[22px]" />
          </Link>
          <NotificationsButton />
        </div>
      </header>

      <section aria-label="Mis tarjetas" className="mb-8">
        {profile.status === "loading" && <CardsCarouselSkeleton />}
        {profile.status === "error" && <ErrorState message={profile.error.message} onRetry={profile.retry} />}
        {profile.status === "success" &&
          (profile.data.cards.length > 0 ? (
            <CardsCarousel cards={profile.data.cards} />
          ) : (
            <EmptyState title="Todavía no tenés tarjetas" description="Cuando des de alta una tarjeta la vas a ver acá." />
          ))}
      </section>

      <section aria-labelledby="recent-title">
        <h2 id="recent-title" className="mb-6 text-xl font-medium">
          Últimos movimientos
        </h2>

        {recent.status === "loading" && <TransactionListSkeleton rows={RECENT_LIMIT} />}
        {recent.status === "error" && <ErrorState message={recent.error.message} onRetry={recent.retry} />}
        {recent.status === "success" &&
          (recent.data.length > 0 ? (
            <TransactionList transactions={recent.data} />
          ) : (
            <EmptyState
              title="Todavía no tenés movimientos"
              description="Cuando pagues o recibas dinero, tus movimientos van a aparecer acá."
            />
          ))}
      </section>
    </>
  );
}
