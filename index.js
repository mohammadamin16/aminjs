import { createComponent } from "./Amin.js";
import Amin from "./Amin.js";

const isProduction = window.location.host.includes("github.io");
Amin.init(isProduction ? "/aminjs" : "");

Amin.state.init();

// wrapper component
createComponent(
  "app-wrapper",
  (shadowRoot) => {
    const pageContainer = shadowRoot.querySelector("#page-container");
    Amin.router.createRouter(
      [
        { "/": "home-page" },
        { "/docs": "docs-page" },
        { "/example": "example-page" },
        { "*": "home-page" },
      ],
      pageContainer,
      "/aminjs"
    );
  },
  []
);

// header component
createComponent(
  "app-header",
  (shadowRoot) => {
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
  },
  []
);

// docs-header component
createComponent("docs-page");

// example-page component
createComponent(
  "example-page",
  (shadowRoot) => {
    const plusBtn = shadowRoot.querySelector("#add");
    const dropBtn = shadowRoot.querySelector("#drop");
    const counter = shadowRoot.querySelector("#counter");
    Amin.state.data.counter = 0;

    plusBtn.addEventListener("click", () => {
      Amin.state.data.counter++;
    });

    dropBtn.addEventListener("click", () => {
      Amin.state.data.counter--;
    });
    const rerender = () => {
      counter.textContent = Amin.state.data.counter;
    };
    return [rerender, null];
  },
  ["counter"]
);

// home-page component
createComponent("home-page", null, []);

// timer component
createComponent(
  "app-timer",
  (shadowRoot) => {
    const timer = shadowRoot.querySelector("#timer");
    Amin.state.data.timer = 0;
    const intervalId = setInterval(() => {
      timer.textContent = `timer: ${Amin.state.data.timer++}`;
    }, 1000);
    return [
      null,
      () => {
        clearInterval(intervalId);
      },
    ];
  },
  ["timer"]
);
