// if you get a "Uncaught SyntaxError: Identifier 'divMM' has already been declared" error, it means the script was injected twice in the same page
// id convention: mind-math-...

let div = document.createElement("div");
div.id = "mind-math-root";
document.body.appendChild(div);

let p = document.createElement("p");
p.innerText = "SOMETHING testing";
document.getElementById("mind-math-root").appendChild(p);
