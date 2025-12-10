import type { Product } from "../types/product";
export interface CartItem {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = "biowellness-cart";

export function getCart(): CartItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  updateCart();
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) existing.quantity++;
  else cart.push({ product, quantity: 1 });
  saveCart(cart);
  alert(`${product.title} lades till i varukorgen`);
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  const idx = cart.findIndex((item) => item.product.id === productId);
  if (idx > -1) cart.splice(idx, 1);
  saveCart(cart);
}

export function updateCart() {
  window.dispatchEvent(new CustomEvent("cart:update"));
}
