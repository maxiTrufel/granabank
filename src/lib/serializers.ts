import type { Card as DbCard, Transaction as DbTransaction } from "@/generated/prisma/client";
import type { Card, Transaction } from "./types";

// Prisma devuelve los montos como Decimal: los pasamos a number para el JSON.
// Con 2 decimales y montos de este orden no hay pérdida de precisión.

export function serializeCard(card: DbCard): Card {
  return {
    id: card.id,
    brand: card.brand,
    holderName: card.holderName,
    lastFour: card.lastFour,
    expMonth: card.expMonth,
    expYear: card.expYear,
    balance: card.balance.toNumber(),
    currency: card.currency,
  };
}

export function serializeTransaction(transaction: DbTransaction): Transaction {
  return {
    id: transaction.id,
    type: transaction.type,
    counterparty: transaction.counterparty,
    description: transaction.description,
    amount: transaction.amount.toNumber(),
    date: transaction.date.toISOString(),
  };
}
