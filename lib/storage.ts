// Thin wrappers around sessionStorage. Everything Meridian stores lives under
// the "meridian:" prefix.

const PREFIX = "meridian:";
const CART_KEY = `${PREFIX}cart`;

export type StoredCartItem = {
  slug: string;
  quantity: number;
};

function read(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode, quota). The cart still works
    // for the current page view, it just won't survive a reload.
  }
}

export function readStoredCart(): StoredCartItem[] {
  const raw = read(CART_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is StoredCartItem =>
        typeof item?.slug === "string" &&
        Number.isInteger(item?.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function writeStoredCart(items: StoredCartItem[]) {
  write(CART_KEY, JSON.stringify(items));
}
