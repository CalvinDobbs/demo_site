// All amounts are integer cents. Only convert to a display string at the edge.

export function lineTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

/** Cents taken off an amount by a percentage discount, rounded to the nearest cent. */
export function discountAmount(cents: number, percentOff: number): number {
  return Math.round((cents * percentOff) / 100);
}

/** Formats cents as a dollar string. */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
