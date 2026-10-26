import { TRANSACTION_TYPE_CONFIG } from "@/lib/transaction-types";
import type { TransactionType } from "@/lib/types";

const OPTIONS: { value: TransactionType | null; label: string }[] = [
  { value: null, label: "Todos" },
  ...(Object.keys(TRANSACTION_TYPE_CONFIG) as TransactionType[]).map((type) => ({
    value: type,
    label: TRANSACTION_TYPE_CONFIG[type].filterLabel,
  })),
];

interface TypeFilterProps {
  value: TransactionType | null;
  onChange: (value: TransactionType | null) => void;
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar por tipo de movimiento"
      className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 py-1"
    >
      {OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              active ? "bg-granate text-white" : "bg-white text-ink shadow-soft hover:bg-granate-soft"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
