const Label = "AminJs";
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
