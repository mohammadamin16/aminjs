import Amin from "./Amin.js";
import { createComponent } from "./Amin.js";
Amin.init();

Amin.router.createRouter([{ "/": "home-page" }, { "/about": "about-page" }]);
createComponent("custom-button");

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  Amin.router.navigate("/about");
});
