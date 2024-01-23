// extState - extension state
// either "ON" or "OFF"
// await chrome.storage.session.set({"extState": "ON"});
// let {extState} = await chrome.storage.session.get("extState");

async function changeExtensionState() {
    // await chrome.runtime.sendMessage(true)
    //     .catch((e) => console.log(e));
    let {extState} = await chrome.storage.session.get("extState");
    extState = extState === "ON" ? "OFF" : "ON";
    await chrome.storage.session.set({"extState": extState});
}

// async function setPowerButton() {
//     await chrome.runtime.sendMessage(false)
//         .catch((e) => console.log(e));
// }

// document.getElementsByTagName("body")[0].onload = setPowerButton;

// document.getElementById("stateButton").onclick = changeExtensionState;
document.getElementById("svgWrapper").onclick = changeExtensionState;