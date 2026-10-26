import { Skeleton } from "@/components/ui/feedback";
import type { Card } from "@/lib/types";
import { BalanceCard } from "./balance-card";

// Cada tarjeta deja ver el borde de la siguiente, como en el diseño.
const CARD_WIDTH = "w-[calc(100%-18px)]";

export function CardsCarousel({ cards }: { cards: Card[] }) {
  return (
    <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-2.5 overflow-x-auto px-6">
      {cards.map((card) => (
        <div key={card.id} className={`${CARD_WIDTH} shrink-0 snap-start`}>
          <BalanceCard card={card} />
        </div>
      ))}
    </div>
  );
}

export function CardsCarouselSkeleton() {
  return <Skeleton className={`h-[189px] ${CARD_WIDTH} rounded-[22px]`} />;
}
