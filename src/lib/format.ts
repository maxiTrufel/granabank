function fractionDigits(value: number) {
  return Number.isInteger(value) ? 0 : 2;
}

/** $125 · $11.99 (sin decimales cuando el monto es entero, como en el diseño). */
export function formatAmount(value: number, currency = "USD") {
  const digits = fractionDigits(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** 978.85 — el saldo de la tarjeta siempre con dos decimales y sin símbolo. */
export function formatBalance(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatExpiration(month: number, year: number) {
  return `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;
}

/** "lunes, 26 de octubre de 2026" */
export function formatLongDate(iso: string) {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "full" }).format(new Date(iso));
}

/** "14:30" */
export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(iso));
}
