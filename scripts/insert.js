// if you get a "Uncaught SyntaxError: Identifier 'divMM' has already been declared" error, it means the script was injected twice in the same page
// id/class name convention: mind-math-...

// for performance reasons, we try to reduce DOM access as much as possible

let div = document.createElement("div");
div.id = "mind-math-extension-root";
document.body.appendChild(div);

function close() {
    div.className = "mind-math-no-display";
}

let randNumber = Math.round(Math.random() * 100);
let result = 0;
let sign = "+";
switch (Math.round(Math.random() * 3)) {
    case 0:
        sign = "+";
        break;
    case 1:
        sign = "-";
        break;
    case 2:
        sign = "*";
        break;
    default:
        sign = "/";
        break;
}

let form = "<p id=\"number\">" + randNumber + "</p><p id=\"sign\">" + sign + "</p><form><input autofocus type=\"number\" id=\"answer\" name=\"answer\"></form><p>=</p><p id=\"result\">" + result + "</p>";
div.innerHTML = "<div id=\"mind-math-modal\"><h2>Mind Math</h2>" + form + "<button id=\"mind-math-close\">Close</button></div>";
document.getElementById("mind-math-close").onclick = close;

// when setting the background click for exit event:
// document.getElementById("mind-math-extension-root").className = "mind-math-no-display";

// testing
// let p = document.createElement("p");
// p.innerText = "SOMETHING testing";
// document.getElementById("mind-math-extension-root").appendChild(p);
