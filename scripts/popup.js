async function changeExtensionState() {
    await chrome.runtime.sendMessage(true)
        .catch((e) => console.log(e));
}

async function setPowerButton() {
    await chrome.runtime.sendMessage(false)
        .catch((e) => console.log(e));
}

document.getElementsByTagName("body")[0].onload = setPowerButton;

document.getElementById("stateButton").onclick = changeExtensionState;
document.getElementById("svgWrapper").onclick = changeExtensionState;