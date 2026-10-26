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
      className={`flex h-[189px] flex-col rounded-[22px] px-6 pt-[17px] pb-4 shadow-soft ${THEMES[card.brand]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm">Balance</span>
        <BrandLogo brand={card.brand} />
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        <span className="flex h-7 w-12 items-center justify-center rounded-md bg-linear-to-r from-[#e8cb6f] to-[#efe2fc] text-xs text-white">
          {card.currency}
        </span>
        <p className="text-[22px] leading-none">{formatBalance(card.balance)}</p>
      </div>

      <p className="mt-[18px] flex items-center gap-3.5 leading-none" aria-label={`Número terminado en ${card.lastFour}`}>
        {["****", "****", "****"].map((group, index) => (
          <span key={index} aria-hidden="true" className="pt-1.5 text-xl tracking-[0.1em]">
            {group}
          </span>
        ))}
        <span className="text-[22px]">{card.lastFour}</span>
      </p>

      <div className="mt-auto flex items-end justify-between">
        <span className="text-base">{card.holderName}</span>
        <div className="text-right leading-tight">
          <span className="block text-[10px]">Exp. Date</span>
          <span className="text-sm">{formatExpiration(card.expMonth, card.expYear)}</span>
        </div>
      </div>
    </article>
  );
}
