import Link from "next/link";
import { formatAmount } from "@/lib/format";
import { TRANSACTION_TYPE_CONFIG } from "@/lib/transaction-types";
import type { Transaction } from "@/lib/types";
import { TransactionIcon } from "./transaction-icon";

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const config = TRANSACTION_TYPE_CONFIG[transaction.type];

  return (
    <Link
      href={`/movimientos/${transaction.id}`}
      className="flex h-[90px] items-center gap-4 rounded-[18px] bg-white px-4 shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-granate active:scale-[0.99]"
    >
      <TransactionIcon type={transaction.type} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-base text-ink-soft">{transaction.counterparty}</p>
        <p className="text-xs text-muted">{config.label}</p>
      </div>
      <span className={`pr-0.5 text-sm font-medium ${config.amountClass}`}>{formatAmount(transaction.amount)}</span>
    </Link>
  );
}
