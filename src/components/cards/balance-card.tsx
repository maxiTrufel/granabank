import { BrandLogo } from "@/components/ui/brand-logo";
import { formatBalance, formatExpiration } from "@/lib/format";
import type { Card } from "@/lib/types";

const THEMES = {
  MASTERCARD: "bg-granate text-white",
  VISA: "bg-rose text-granate-dark",
} satisfies Record<Card["brand"], string>;

export function BalanceCard({ card }: { card: Card }) {
  return (
    <article
      aria-label={`Tarjeta terminada en ${card.lastFour}`}
      className={`flex h-44 flex-col justify-between rounded-2xl p-5 shadow-soft ${THEMES[card.brand]}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-light">Balance</span>
        <BrandLogo brand={card.brand} />
      </div>

      <div className="flex items-center gap-3">
        <span className="h-5 w-7 rounded bg-linear-to-br from-[#fbe7a1] via-[#f5d06b] to-[#e8b34a]" aria-hidden="true" />
        <p className="text-xl font-medium">
          <span className="sr-only">{card.currency} </span>
          {formatBalance(card.balance)}
        </p>
      </div>

      <p className="text-lg tracking-wider" aria-label={`Número terminado en ${card.lastFour}`}>
        **** **** **** {card.lastFour}
      </p>

      <div className="flex items-end justify-between">
        <span className="text-sm">{card.holderName}</span>
        <div className="text-right leading-tight">
          <span className="block text-[9px] font-light">Exp. Date</span>
          <span className="text-xs">{formatExpiration(card.expMonth, card.expYear)}</span>
        </div>
      </div>
    </article>
  );
}
