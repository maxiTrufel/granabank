import type { TransactionType } from "./types";

interface TransactionTypeConfig {
  /** Subtítulo de cada movimiento en la lista. */
  label: string;
  /** Texto del filtro rápido en la pantalla de movimientos. */
  filterLabel: string;
  /** Signo que se muestra en el detalle. */
  sign: "+" | "-";
  amountClass: string;
  iconClass: string;
}

export const TRANSACTION_TYPE_CONFIG: Record<TransactionType, TransactionTypeConfig> = {
  SUBSCRIPTION: {
    label: "Pago de suscripción",
    filterLabel: "Débito Aut.",
    sign: "-",
    amountClass: "text-violet",
    iconClass: "bg-violet-soft text-violet",
  },
  CASH_IN: {
    label: "Pago recibido",
    filterLabel: "Recibido",
    sign: "+",
    amountClass: "text-granate",
    iconClass: "bg-granate-soft text-granate",
  },
  CASH_OUT: {
    label: "Pago enviado",
    filterLabel: "Enviado",
    sign: "-",
    amountClass: "text-orange",
    iconClass: "bg-orange-soft text-orange",
  },
};
