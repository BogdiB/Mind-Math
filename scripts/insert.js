// if you get a "Uncaught SyntaxError: Identifier 'divMM' has already been declared" error, it means the script was injected twice in the same page
// id convention: mind-math-...

// for performance reasons, we try to reduce DOM access as much as possible

let div = document.createElement("div");
div.id = "mind-math-extension-root";
document.body.appendChild(div);

div.innerHTML = "";

// testing
let p = document.createElement("p");
p.innerText = "SOMETHING testing";
document.getElementById("mind-math-extension-root").appendChild(p);
