import { getCart, saveCart } from "./cart-store";

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
        <button class="remove">Ta bort</>
        `;
    div.querySelector(".minus")!.addEventListener("click", () => {
      if (item.quantity > 1) item.quantity--;
      else cart.splice(index, 1);
      saveCart(cart);
      renderCart(container);
    });
    div.querySelector(".plus")!.addEventListener("click", () => {
      item.quantity++;
      saveCart(cart);
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
