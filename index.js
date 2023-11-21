import { createComponent } from "./Amin.js";
import Amin from "./Amin.js";

Amin.init();

createComponent("app-wrapper", (shadowRoot) => {
  const pageContainer = shadowRoot.querySelector("#page-container");
  Amin.router.createRouter(
    [
      { "/": "home-page" },
      { "/docs": "docs-page" },
      { "/example": "example-page" },
    ],
    pageContainer
  );
});
createComponent("app-header", (shadowRoot) => {
  const titleBtn = shadowRoot.querySelector("#title");
  const docsBtn = shadowRoot.querySelector("#docs");
  const exampleBtn = shadowRoot.querySelector("#example");
  docsBtn.addEventListener("click", (event) => {
    Amin.router.navigate("/docs");
  });
  exampleBtn.addEventListener("click", (event) => {
    Amin.router.navigate("/example");
  });
  titleBtn.addEventListener("click", (event) => {
    Amin.router.navigate("/");
  });
});
createComponent("docs-page");
createComponent("example-page");
createComponent("home-page");
