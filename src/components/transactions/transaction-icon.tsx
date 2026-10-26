import { ArrowDownIcon, ArrowUpIcon, SwapIcon } from "@/components/ui/icons";
import { TRANSACTION_TYPE_CONFIG } from "@/lib/transaction-types";
import type { TransactionType } from "@/lib/types";

const ICONS = {
  SUBSCRIPTION: SwapIcon,
  CASH_IN: ArrowDownIcon,
  CASH_OUT: ArrowUpIcon,
} satisfies Record<TransactionType, unknown>;

interface TransactionIconProps {
  type: TransactionType;
  size?: "md" | "lg";
}

export function TransactionIcon({ type, size = "md" }: TransactionIconProps) {
  const Icon = ICONS[type];
  const box = size === "lg" ? "size-16 rounded-2xl" : "size-11 rounded-[10px]";
  const icon = size === "lg" ? "size-8" : "size-6";

  return (
    <span className={`flex shrink-0 items-center justify-center ${box} ${TRANSACTION_TYPE_CONFIG[type].iconClass}`}>
      <Icon className={icon} />
    </span>
  );
}
