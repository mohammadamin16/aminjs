const Label = "AminJs";

export function createComponent(tagName, jsCallback, dependencies) {
  class Component extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      fetch(`./templates/${tagName}/${tagName}.html`)
        .then((response) => response.text())
        .then((html) => {
          this.shadowRoot.innerHTML = html;
          this.loadCSS();
        });
    }
    async loadCSS() {
      const request = await fetch(`./templates/${tagName}/${tagName}.css`);
      const text = await request.text();
      const styleElement = document.createElement("style");
      styleElement.innerHTML = text;

      this.shadowRoot.appendChild(styleElement);
      const reRenderer = jsCallback?.(this.shadowRoot);

      if (jsCallback != null) {
        window.addEventListener("appstateupdate", (event) => {
          if (dependencies.includes(event.detail.key)) {
            console.log(
              Label,
              "rerender",
              tagName,
              dependencies,
              event.detail.key
            );

            reRenderer?.();
          }
        });
      }
    }
  }
  customElements.define(tagName, Component);
}

const Amin = {
  init: function () {
    window.addEventListener("DOMContentLoaded", function () {});
  },

  router: {
    routes: [{ "/": "home-page" }],
    container: null,
    createRouter: function (routes, container) {
      if (container == null) {
        const error = new Error();
        error.name = `${Label} Router`;
        error.message = "Container is null";
        throw error;
      }
      Amin.router.container = container;
      document.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", (event) => {
          event.preventDefault();
          const href = event.target.getAttribute("href");
          Amin.router.navigate(href);
        });
      });
      window.addEventListener("popstate", function (event) {
        event.preventDefault();
      });
      Amin.router.routes = routes;
      Amin.router.navigate(window.location.pathname);
    },
    navigate: function (url) {
      window.history.pushState({}, "", url);
      const pageContainer = Amin.router.container;
      let pageElement;
      Amin.router.routes.forEach((route) => {
        if (route[url]) {
          pageElement = document.createElement(route[url]);
        }
      });
      pageContainer.children[0]?.remove();
      if (pageElement) {
        pageContainer.appendChild(pageElement);
      } else {
        pageContainer.appendChild(
          document.createElement("h1", {
            innerHTML: "404",
          })
        );
      }
    },
  },
  state: {
    data: { score: 0 },
    init: function () {
      Amin.state.data = new Proxy(Amin.state.data, {
        set: function (target, key, value) {
          window.dispatchEvent(
            new CustomEvent("appstateupdate", { detail: { key, value } })
          );
          target[key] = value;
          return true;
        },
        get: function (target, key) {
          console.log(Label, "get", key, "from", target);
          return target[key];
        },
      });
    },
  },
};

window.Amin = Amin;
export default Amin;
