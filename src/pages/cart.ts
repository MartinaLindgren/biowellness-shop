import { getCart, saveCart } from "./cart-store";

function updateCart() {
  window.dispatchEvent(new CustomEvent("cart:update"));
}

export function renderCart(container: HTMLElement) {
  const cart = getCart();
  container.innerHTML = "<h1>Varukorg</h1>";

  if (cart.length === 0) {
    container.innerHTML += "<p>Din varukorg är tom</p>";
    return;
  }

  let total = 0;
  const list = document.createElement("div");

  cart.forEach((item, index) => {
    total += item.product.price * item.quantity;
    const div = document.createElement("div");
    div.innerHTML = `
        <p>${item.product.title}-${item.product.price} SEK x ${item.quantity}=${
      item.product.price * item.quantity
    } SEK</p>
        <button class="minus">-</button>
        <button class="plus">+</button>
        <button class="remove">Ta bort</button>
        `;

    div.querySelector(".minus")!.addEventListener("click", () => {
      const existing = cart.find((i) => i.product.id === item.product.id);
      if (!existing) return;
      if (existing.quantity > 1) existing.quantity--;
      else {
        const idx = cart.findIndex((i) => i.product.id === item.product.id);
        if (idx > -1) cart.splice(idx, 1);
      }

      saveCart(cart);
      updateCart();
      renderCart(container);
    });

    div.querySelector(".plus")!.addEventListener("click", () => {
      const existing = cart.find((i) => i.product.id === item.product.id);
      if (!existing) return;

      existing.quantity++;
      saveCart(cart);
      updateCart();
      renderCart(container);
    });

    div.querySelector(".remove")!.addEventListener("click", () => {
      const idx = cart.findIndex((i) => i.product.id === item.product.id);
      if (idx > -1) cart.splice(idx, 1);
      saveCart(cart);
      updateCart();
      renderCart(container);
    });

    list.appendChild(div);
  });

  const totalDiv = document.createElement("p");
  totalDiv.textContent = `Totalt: ${total} SEK`;

  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "Gå till kassan";
  checkoutBtn.addEventListener("click", () => (location.hash = "#/checkout"));

  container.appendChild(list);
  container.appendChild(totalDiv);
  container.appendChild(checkoutBtn);
}
