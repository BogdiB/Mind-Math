// if you get a "Uncaught SyntaxError: Identifier 'divMM' has already been declared" error, it means the script was injected twice in the same page
// id/class name convention: mind-math-...

// for performance reasons, we try to reduce DOM access as much as possible

let div = document.createElement("div");
div.id = "mind-math-extension-root";
document.body.appendChild(div);

function close() {
    div.className = "mind-math-no-display";
}

function getRand(positiveRange, negative = 0) {
    let final = Math.round(Math.random() * positiveRange) - negative;
    while (final === 0 || final === 1 || final === -1) {
        final = Math.round(Math.random() * positiveRange) - negative;
    }
    return final;
}

let randNumber;
let result;
let answerCorrect;
let sign;
let answer;
switch (Math.round(Math.random() * 3)) {
    case 0:
        sign = "+";
        randNumber = getRand(200, 100);
        answerCorrect = getRand(200, 100);
        result = randNumber + answerCorrect;
        break;
    case 1:
        sign = "-";
        randNumber = getRand(200, 100);
        answerCorrect = getRand(200, 100);
        result = randNumber - answerCorrect;
        break;
    case 2:
        sign = "*";
        randNumber = getRand(20, 10);
        answerCorrect = getRand(20, 10);
        result = randNumber * answerCorrect;
        break;
    default:
        sign = "/";
        answerCorrect = getRand(20, 10);
        result = getRand(20, 10);
        randNumber = result * answerCorrect;
        break;
}

// putting the code in the oninput directly instead of figuring out how to get the this.value from it with a document call might seem bad, that's because it is, but I am tired so I will fix it when/if I feel like it
// maxlength=\"3\" oninput=\"if (this.value.charAt(0) === '-' && this.value.length > this.maxLength + 1) {this.value = this.value.slice(0, this.maxLength + 1);} else if (this.value.length > this.maxLength) {this.value = this.value.slice(0, this.maxLength);}\"
// code above also breaks if you input for example 3-3254....
let input = "<input type=\"number\" id=\"mind-math-answer\" name=\"answer\" autocomplete=\"off\" />";
let form = "<p id=\"number_and_sign\">" + randNumber + " " + sign + "</p><form>" + input + "</form><p id=\"result\">= " + result + "</p>";
div.innerHTML = "<span id=\"mind-math-background\"></span><div id=\"mind-math-modal\"><h2>Mind Math</h2><div id=\"mind-math-form\">" + form + "</div><button id=\"mind-math-close\">Close</button></div>";

document.getElementById("mind-math-close").onclick = close;
document.getElementById("mind-math-background").onclick = close;

// some sites also set the focus on something on their page, we don't want to let them hijack our focus
const f = () => document.getElementsByTagName("html")[0].onload = document.getElementById("mind-math-answer").focus();
setTimeout(f, 500);

// when setting the background click for exit event:
// document.getElementById("mind-math-extension-root").className = "mind-math-no-display";

// testing
// let p = document.createElement("p");
// p.innerText = "SOMETHING testing";
// document.getElementById("mind-math-extension-root").appendChild(p);
