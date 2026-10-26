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
      className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-granate active:scale-[0.99]"
    >
      <TransactionIcon type={transaction.type} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ink">{transaction.counterparty}</p>
        <p className="text-[11px] font-light text-muted">{config.label}</p>
      </div>
      <span className={`text-xs font-medium ${config.amountClass}`}>{formatAmount(transaction.amount)}</span>
    </Link>
  );
}
