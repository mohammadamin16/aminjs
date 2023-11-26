const Label = "AminJs";

const TEMPLATE_DEFAULT_PATH = "/templates";

const Amin = {
  init: function (home_page) {
    console.log(Label, "start...");
    // window.addEventListener("DOMContentLoaded", function () {});
    if (home_page != null) {
      Amin.router.home_page = home_page;
    }
  },

  router: {
    home_page: "",
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
      window.history.pushState({}, "", Amin.router.home_page + url);
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
    data: {},
    init: function (init_data = {}) {
      Amin.state.data = new Proxy(init_data, {
        set: function (target, key, value) {
          window.dispatchEvent(
            new CustomEvent("appstateupdate", { detail: { key, value } })
          );
          target[key] = value;
          return true;
        },
        get: function (target, key) {
          return target[key];
        },
      });
    },
  },
};

export function createComponent(tagName, jsCallback, dependencies) {
  class Component extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      fetch(
        `${
          Amin.router.home_page + TEMPLATE_DEFAULT_PATH
        }/${tagName}/${tagName}.html`
      )
        .then((response) => response.text())
        .then((html) => {
          this.shadowRoot.innerHTML = html;
          this.loadCSS();
        });
    }

    disconnectedCallback() {
      this.cleanupFn?.();
    }

    async loadCSS() {
      const request = await fetch(
        `${
          Amin.router.home_page + TEMPLATE_DEFAULT_PATH
        }/${tagName}/${tagName}.css`
      );
      const text = await request.text();
      const styleElement = document.createElement("style");
      styleElement.innerHTML = text;

      this.shadowRoot.appendChild(styleElement);
      const [reRendererFn, cleanupFn] = jsCallback?.(this.shadowRoot) || [];
      this.cleanupFn = cleanupFn;

      if (jsCallback != null) {
        window.addEventListener("appstateupdate", (event) => {
          if (!dependencies || dependencies.includes(event.detail.key)) {
            console.log(Label, "rerender", tagName, event.detail.key);
            reRendererFn?.();
          }
        });
      }
    }
  }
  customElements.define(tagName, Component);
}

window.Amin = Amin;
export default Amin;
