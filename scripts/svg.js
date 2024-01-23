// extState - extension state
// either "ON" or "OFF"
// await chrome.storage.session.set({"extState": "ON"});
// let {extState} = await chrome.storage.session.get("extState");

async function getState() {
    let {extState} = await chrome.storage.session.get("extState");
    if (extState === "ON") {
        document.getElementById("paths").style.color = "green";
    }
    else if (extState === "OFF") {
        document.getElementById("paths").style.color = "crimson";
    }
}

getState();
chrome.storage.onChanged.addListener(() => getState());


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (!sender.url.endsWith("popup.html")) {
//         if (message === "ON") {
//             document.getElementById("paths").style.color = "green";
//         }
//         else if (message === "OFF") {
//             document.getElementById("paths").style.color = "crimson";
//         }
//         else {
//             throw Error("\nBad response in SVG handler: " + message + "\nFrom: " + sender.url + "\n");
//         }
//     }
//     sendResponse();
// });