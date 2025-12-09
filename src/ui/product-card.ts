import type { Product } from "../types/product";
import { addToCart } from "../pages/cart-store";

export function createProductCard(product: Product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const img = document.createElement("img");
  img.src = product.images[0];
  img.alt = product.title;
  img.loading = "lazy";
  article.appendChild(img);

  const h2 = document.createElement("h2");
  h2.textContent = product.title;
  article.appendChild(h2);

  const p = document.createElement("p");
  p.className = "price";
  p.textContent = `${product.price} kr`;
  article.appendChild(p);

  const btnDetails = document.createElement("a");
  btnDetails.href = `#/product/${product.id}`;
  btnDetails.textContent = "Se produkt";
  btnDetails.className = "btn btn-link";
  article.appendChild(btnDetails);

  const btnAdd = document.createElement("button");
  btnAdd.type = "button";
  btnAdd.textContent = "Lägg i varukorg";
  btnAdd.className = "btn btn-primary";

  btnAdd.addEventListener("click", () => addToCart(product));
  article.appendChild(btnAdd);

  return article;
}
