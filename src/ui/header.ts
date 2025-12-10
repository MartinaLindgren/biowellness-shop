import { getCart, updateCart } from "../pages/cart-store";

export function renderHeader(container: HTMLElement) {
  container.innerHTML = `
  <h1>Biowellness</h1>
  <nav>
  <a href="#/">Startsida</a>
  <a href="#/cart">Varukorg(<span id="cart-count">0</span>)</a>
  </nav>

  `;

  const countEl = document.getElementById("cart-count")!;

  function updateCartCount() {
    const cart = getCart();
    countEl.textContent = String(
      cart.reduce((sum, item) => sum + item.quantity, 0)
    );
  }

  window.addEventListener("cart:update", updateCartCount);
  updateCartCount();
}
