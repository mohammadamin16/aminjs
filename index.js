import Amin from "./Amin.js";
import { HomePage } from "./home-page.js";
Amin.init();

Amin.router.createRouter([{ "/": "home-page" }, { "/about": "about-page" }]);

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  Amin.router.navigate("/about");
});
