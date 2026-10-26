import type { CardBrand } from "@/lib/types";

export function BrandLogo({ brand }: { brand: CardBrand }) {
  if (brand === "VISA") {
    return (
      <span className="rounded bg-[#1a1f71] px-1.5 py-0.5 text-[11px] font-semibold italic leading-none tracking-wide text-white">
        VISA
      </span>
    );
  }

  return (
    <span className="flex" aria-label="Mastercard">
      <span className="size-5 rounded-full bg-[#eb001b]" />
      <span className="-ml-2 size-5 rounded-full bg-[#f79e1b] opacity-90" />
    </span>
  );
}
