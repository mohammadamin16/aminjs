import Amin from "./Amin.js";
import { createComponent } from "./Amin.js";

Amin.init();
window.Amin = Amin;
Amin.state.init();

Amin.router.createRouter([{ "/": "home-page" }, { "/about": "about-page" }]);
createComponent("home-page");

createComponent("custom-button", (shadowRoot) => {
  const btn = shadowRoot.querySelector("button");
  btn.addEventListener("click", () => {
    alert("I got your click");
  });
});

createComponent(
  "timer-display",
  (shadowRoot) => {
    const timer = shadowRoot.querySelector("#timer");
    Amin.state.data.timer = 0;

    setInterval(() => {
      Amin.state.data.timer++;
    }, 1000);

    return () => {
      timer.textContent = Amin.state.data.timer;
    };
  },
  ["timer"]
);

createComponent(
  "score-counter",
  (shadowRoot) => {
    const scoreDisplayer = shadowRoot.querySelector("#score");
    const posBtn = shadowRoot.querySelector("#pos");
    const negBtn = shadowRoot.querySelector("#neg");
    posBtn.addEventListener("click", () => {
      Amin.state.data.score++;
    });

    negBtn.addEventListener("click", () => {
      Amin.state.data.score--;
    });
    scoreDisplayer.textContent = Amin.state.data.score;
    if (Amin.state.data.score == null) {
      // Amin.state.data.score = 1;
    }
    return () => {
      console.log("re-render function");
      scoreDisplayer.textContent = Amin.state.data.score;
    };
  },

  ["score"]
);

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  Amin.router.navigate("/about");
});
