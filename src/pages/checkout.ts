import { getCart, saveCart } from "./cart-store";

export function renderCheckout(container: HTMLElement) {
  const cart = getCart();
  container.innerHTML = "<h1>Kassa</h1>";

  if (cart.length === 0) {
    container.innerHTML += "<p>Ingen beställning att betala</p>";
    return;
  }

  let total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const summary = document.createElement("div");
  summary.innerHTML = cart
    .map(
      (item) =>
        `<p>${item.product.title}*${item.quantity}=${
          item.product.price * item.quantity
        } SEK</p>`
    )
    .join("");
  summary.innerHTML += `<p><strong>Totalt: ${total} SEK</strong></p>`;

  const payBtn = document.createElement("button");
  payBtn.textContent = "Slutför köp (simulera)";
  payBtn.addEventListener("click", () => {
    alert(`Köpet är genomfört! Totalt: ${total} SEK`);
    saveCart([]);
    location.hash = "#/";
    window.dispatchEvent(new CustomEvent("cart:update"));
  });

  container.appendChild(summary);
  container.appendChild(payBtn);
}
