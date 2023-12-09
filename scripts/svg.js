chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!sender.url.endsWith("popup.html")) {
        if (message === "ON") {
            document.getElementById("paths").style.color = "green";
        }
        else if (message === "OFF") {
            document.getElementById("paths").style.color = "crimson";
        }
        else {
            throw Error("Bad response in SVG handler.");
        }
    }
    sendResponse();
});