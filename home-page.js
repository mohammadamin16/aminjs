export class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        h1{
            color: red;
        }
    </style>
    <h1>Home Page</h1>
    <a href="/about">About</a>
    `;
  }
  connectedCallback() {
    console.log("home-page connected");
  }
  disconnectedCallback() {
    console.log("home-page disconnected");
  }
}
customElements.define("home-page", HomePage);
