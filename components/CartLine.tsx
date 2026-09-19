"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MAX_QUANTITY } from "@/components/CartProvider";
import { useCart, type CartLine as CartLineData } from "@/hooks/useCart";
import { formatPrice, lineTotal } from "@/lib/money";
import { writeStoredCart } from "@/lib/storage";

type CartLineProps = {
  line: CartLineData;
};

export function CartLine({ line }: CartLineProps) {
  const { items, removeItem } = useCart();
  const { product } = line;
  const [quantity, setQuantity] = useState(line.quantity);

  // Update the line straight away so the stepper feels instant, and save the
  // new quantity so it's kept if the page is reloaded.
  function step(delta: number) {
    const next = Math.min(MAX_QUANTITY, Math.max(1, quantity + delta));
    setQuantity(next);
    writeStoredCart(
      items.map((item) => (item.slug === line.slug ? { ...item, quantity: next } : item)),
    );
  }

  return (
    <li data-testid={`cart-line-${line.slug}`} className="flex gap-6 py-8">
      <Link href={`/products/${product.slug}`} className="w-28 shrink-0 bg-surface">
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={1000}
          height={1250}
          loading="eager"
          sizes="112px"
          className="aspect-[4/5] h-auto w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="font-serif text-xl leading-snug text-ink">
            <Link href={`/products/${product.slug}`} className="hover:underline hover:underline-offset-4">
              {product.name}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>
          <p className="mt-1 text-sm text-muted">{formatPrice(product.price)} each</p>
        </div>
        <div className="flex items-start gap-8 sm:flex-col sm:items-end sm:gap-4">
          <p className="font-serif text-lg text-ink">
            {formatPrice(lineTotal(product.price, quantity))}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex h-11 items-center rounded-sm border border-line">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={quantity <= 1}
                aria-label={`Decrease quantity of ${product.name}`}
                className="h-full w-10 text-ink hover:bg-surface disabled:text-muted/50"
              >
                −
              </button>
              <span
                aria-live="polite"
                data-testid={`quantity-${line.slug}`}
                className="w-8 text-center text-sm text-ink tabular-nums"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={quantity >= MAX_QUANTITY}
                aria-label={`Increase quantity of ${product.name}`}
                className="h-full w-10 text-ink hover:bg-surface disabled:text-muted/50"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(line.slug)}
              aria-label={`Remove ${product.name}`}
              className="text-sm text-muted underline underline-offset-4 hover:text-ink"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
