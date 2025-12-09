import { getById } from "../data/products";
import { addToCart } from "./cart-store";

export function renderProduct(container: HTMLElement, id: string) {
  const product = getById(id);
  if (!product) {
    container.textContent = "Produkten hittades inte";
    return;
  }

  //Rensa sidan
  container.innerHTML = "";

  //Wrapper, 2 kolumner
  const layout = document.createElement("div");
  layout.className = "product-layout";
  container.appendChild(layout);

  //Vänster kolumn, bilder
  const gallery = document.createElement("div");
  gallery.className = "product-gallery";

  product.images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = product.title;
    img.loading = "lazy";
    gallery.appendChild(img);
  });

  layout.appendChild(gallery);

  //Höger kolumn, info
  const info = document.createElement("div");
  info.className = "product-info";

  //Titel
  const title = document.createElement("h1");
  title.textContent = product.title;
  info.appendChild(title);

  //Beskrivning
  const desc = document.createElement("p");
  desc.textContent = product.description ?? "";
  info.appendChild(desc);

  //Pris
  const price = document.createElement("p");
  price.textContent = `Pris: ${product.price} SEK`;
  info.appendChild(price);

  //Lägg i korg
  const addBtn = document.createElement("button");
  addBtn.textContent = "Lägg i varukorg";
  addBtn.addEventListener("click", () => addToCart(product));
  info.appendChild(addBtn);

  //Tillbaka
  const backBtn = document.createElement("button");
  backBtn.textContent = "Tillbaka";
  backBtn.addEventListener("click", () => (location.hash = "#/"));
  info.appendChild(backBtn);

  layout.appendChild(info);
}
