const Label = "AminJs";

export function createComponent(tagName) {
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
      // this.loadJS();
    }
    // async loadJS() {
    //   const jsFileUrl = `./templates/${tagName}/${tagName}.js`;
    //   const scriptElement = document.createElement("script");
    //   scriptElement.src = jsFileUrl;
    //   const m = await import(jsFileUrl);
    //   console.log(m.main())
    //   // import main function from jsFileUrl and execute it

    //   //   scriptElement.innerHTML = `
    //   //     console.log("button2", document.currentScript);
    //   // `;
    //   // make scriptElement not be module

    //   //   scriptElement.type = "module";
    //   //   scriptElement.defer = true;
    //   this.shadowRoot.appendChild(scriptElement);
    // }
  }
  customElements.define(tagName, Component);
}

const Amin = {
  init: function () {
    console.log(Label, "init");
    window.addEventListener("DOMContentLoaded", function () {
      console.log(Label, "DOMContentLoaded");
    });
  },

  router: {
    routes: [{ "/": "home-page" }],
    createRouter: function (routes) {
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
    },
    navigate: function (url) {
      console.log(Label, "navigate to " + url);
      window.history.pushState({}, "", url);
      const pageContainer = document.getElementById("page-container");
      let pageElement;
      Amin.router.routes.forEach((route) => {
        if (route[url]) {
          pageElement = document.createElement(route[url]);
        }
      });
      console.log("pageElement", pageElement, Amin.router.routes);
      pageContainer.children[0].remove();
      if (pageElement) {
        pageContainer.appendChild(pageElement);
      } else {
        pageContainer.appendChild(document.createElement("h1", "404"));
      }
    },
  },
};

export default Amin;
