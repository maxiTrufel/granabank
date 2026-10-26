export type TransactionType = "SUBSCRIPTION" | "CASH_IN" | "CASH_OUT";

export type CardBrand = "MASTERCARD" | "VISA";

export interface Card {
  id: string;
  brand: CardBrand;
  holderName: string;
  lastFour: string;
  expMonth: number;
  expYear: number;
  balance: number;
  currency: string;
}

export interface Profile {
  name: string;
  email: string;
  cards: Card[];
}

export interface Transaction {
  id: string;
  type: TransactionType;
  counterparty: string;
  description: string | null;
  amount: number;
  date: string;
}

export interface TransactionDetail extends Transaction {
  card: Pick<Card, "brand" | "lastFour"> | null;
}

export interface ApiErrorBody {
  error: { message: string; fields?: Record<string, string> };
}
