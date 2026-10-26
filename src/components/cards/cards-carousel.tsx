import { Skeleton } from "@/components/ui/feedback";
import type { Card } from "@/lib/types";
import { BalanceCard } from "./balance-card";

export function CardsCarousel({ cards }: { cards: Card[] }) {
  return (
    <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6">
      {cards.map((card) => (
        <div key={card.id} className="w-[88%] shrink-0 snap-center">
          <BalanceCard card={card} />
        </div>
      ))}
    </div>
  );
}

export function CardsCarouselSkeleton() {
  return <Skeleton className="h-44 w-[88%] rounded-2xl" />;
}
