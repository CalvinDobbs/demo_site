import { useMemo } from "react";
import { useCartLines } from "@/hooks/useCart";

// Orders of $100 or more ship free. Everything else pays a flat rate.
const FREE_SHIPPING_THRESHOLD_CENTS = 10000;
const STANDARD_SHIPPING_CENTS = 800;

export function useCartTotal() {
  const lines = useCartLines();

  return useMemo(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const itemCount = lines.reduce((count, line) => count + line.quantity, 0);
    const shipping =
      subtotal > FREE_SHIPPING_THRESHOLD_CENTS ? 0 : STANDARD_SHIPPING_CENTS;

    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
      itemCount,
    };
  }, [lines]);
}

export type CartTotals = ReturnType<typeof useCartTotal>;
