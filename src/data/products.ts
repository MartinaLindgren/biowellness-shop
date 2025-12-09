import type { Product } from "../types/product";
export const products: Product[] = [
  {
    id: "p-lightpanel-1",
    title: "Ljuspanel Standard",
    slug: "ljuspanel standard",
    price: 7900,
    description: "Energieffektiv ljuspanel för hemmabruk",
    images: ["/ljuspanel.webp", "/ljuspaneldemo.webp"],
  },
  //Lägg till fler produkter här sedan
];

export function getAll() {
  return products.slice();
}

//Hämta en produkt via id
export function getById(id: string) {
  return products.find((p) => p.id === id);
}
