import "./styles/index.css";
import { renderHeader } from "./ui/header";
import { renderHome } from "./pages/home";
import { renderProduct } from "./pages/product";
import { renderCart } from "./pages/cart";
import { renderCheckout } from "./pages/checkout";

function router() {
  const hash = location.hash || "#/";
  const app = document.getElementById("app")!;
  app.innerHTML = "";

  //Startsida
  if (hash === "#/" || hash === "" || hash === "#") {
    renderHome(app);
    return;
  }

  //Produktsida
  if (hash.startsWith("#/product/")) {
    const slug = hash.replace("#/product/", "");
    renderProduct(app, slug);
    return;
  }

  //Varukorg
  if (hash === "#/cart") {
    renderCart(app);
    return;
  }

  //Kassa
  if (hash === "#/checkout") {
    renderCheckout(app);
    return;
  }

  //Felmeddelande
  app.textContent = "Sidan hittades inte";
}

const headerContainer = document.getElementById("site-header")!;
renderHeader(headerContainer);

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
