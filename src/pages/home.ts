import { getAll } from "../data/products";
import { createProductCard } from "../ui/product-card";

export function renderHome(container: HTMLElement) {
  container.innerHTML = ""; // rensa

  const title = document.createElement("h1");
  title.textContent = "Biowellness - Startsida";
  container.appendChild(title);

  const lead = document.createElement("p");
  lead.textContent = "Välkommen till Biowellness";
  container.appendChild(lead);

  const grid = document.createElement("div");
  grid.className = "product-grid";
  container.appendChild(grid);

  const products = getAll();
  products.forEach((p) => {
    const card = createProductCard(p);
    grid.appendChild(card);
  });
}
