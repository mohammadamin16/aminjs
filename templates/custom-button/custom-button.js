function main() {
  // this script is loaded in a shadow dom
  // get the shadow root
  console.log("main")
  alert("main")
  const shadowRoot = document.currentScript;
}
// event.target.getRootNode().host;

// console.log("button", document.currentScript);
// console.log("button", event.target.getRootNode().host);

// export default main;

console.log(document);