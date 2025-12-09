import { getCart } from "../pages/cart-store";

export function renderHeader(container: HTMLElement) {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "header-inner";

  const brand = document.createElement("a");
  brand.href = "#/";
  brand.textContent = "Biowellness";
  brand.className = "brand";
  wrapper.appendChild(brand);

  const cartLink = document.createElement("a");
  cartLink.href = "#/cart";
  cartLink.id = "cart-link";
  cartLink.textContent = "Varukorg (0)";
  wrapper.appendChild(cartLink);

  container.appendChild(wrapper);

  function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartLink.textContent = `Varukorg (${totalQty})`;
  }

  updateCartCount();
  window.addEventListener("cart:add", updateCartCount);
  window.addEventListener("cart:update", updateCartCount);
}
