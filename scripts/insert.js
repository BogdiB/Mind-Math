// if you get a "Uncaught SyntaxError: Identifier 'divMM' has already been declared" error, it means the script was injected twice in the same page
// id/class name convention: mind-math-...

// for performance reasons, we try to reduce DOM access as much as possible

let div = document.createElement("div");
div.id = "mind-math-extension-root";
document.body.appendChild(div);

div.innerHTML = "<div id=\"mind-math-modal\"><h2>Mind Math</h2></div>";

// when setting the background click for exit event:
// document.getElementById("mind-math-extension-root").className = "mind-math-no-display";

// testing
// let p = document.createElement("p");
// p.innerText = "SOMETHING testing";
// document.getElementById("mind-math-extension-root").appendChild(p);
