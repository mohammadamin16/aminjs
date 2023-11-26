# AminJS
## The ultimate web framework you need.

#### Features:


- Built-in Routing and Global State
- re-usuable components in pure html (web component)
- Modular css
- No build process required.
- Lazy load components by default

### All of that with only *4KB* of javascript! (not minified)


### How to Do Routing then:
```javascript

    Amin.router.createRouter(
      [
        { "/": "home-page" },
        { "/docs": "docs-page" },
        { "/example": "example-page" },
        { "*": "home-page" },
      ],
      pageContainerElement,
      homapage
    );
```

### I like my app to be component based:
```javascript
// define your components in one line:
createComponent("docs-page");

// AminJs will automagically load the associated html and css elements in the /template directory
```
### What about javascript, my components have logic:
```javascript

// shadow root is basically a smaller document for that element, You can still access the original document if you want. 
createComponent("docs-page", (shadowRoot) => {
    const titleBtn = shadowRoot.querySelector("#title");
  
    titleBtn.addEventListener("click", () => alert("Clicked!"))

  },);

```

### But What about States? I want reactivity:

```javascript
    // simply change the Amin.state.data object to apply changes to the ui

    Amin.state.data.counter++
    
    // the components that need to re-render will re-render

    // to pass a function to be called when the component needs to be re-rendered, simply you can return two things in the jsCallback, the re-render function and the clean-up function, the cleanup function will be called when the function is un-mounted


```

### So a more complete definition of the createComopnent will be this:
```javascript
dependecy_array = ["counter", "timer"]
createComponet("tag-name", function jsCallbanck(){
    function re_renderer(){}
    function clean_up(){}
    return [re_renderer, clean_up]
}, dependency_array)

```
