// estState - extension state
let extState = "ON";

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: extState,
    });
});

// I could also use the storage API to do this - sync would probably be best
/*
    listen to messages regarding the extState -> return the extState
    REQUEST IS A BOOL:
        false means requesting the value of extState
        true means requesting the change of extState
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === true) {
        extState = extState === "ON" ? "OFF" : "ON";
        chrome.action.setBadgeText({
            text: extState
        });
    }
    else if (message !== false) {
        throw Error("Bad message request for extension state.");
    }
    // visually update the powerButton
    chrome.runtime.sendMessage(extState)
        .catch((e) => console.log(e));
    sendResponse(extState);
});
  
// chrome.action.onClicked.addListener(() => {
//     // Set the action badge to the next state
//     extState = extState === "ON" ? "OFF" : "ON";
//     chrome.action.setBadgeText({
//         text: extState
//     });
// });

function inserts(id) {
    chrome.scripting.executeScript({
        target: {tabId: id},
        files: ["scripts/insert.js"]
    });
    chrome.scripting.insertCSS({
        target: {tabId: id},
        files: ["css/insert.css"]
    });
}

// every time a tab is created, we execute the script which includes the main extension functionality
// we only want to execute said script on web sites that are not google OR OTHER SEARCH ENGINES - TO BE ADDED
chrome.tabs.onCreated.addListener((tab) => {
    if (extState === "ON") {
        if (!tab.pendingUrl.startsWith("http")) {
            // with this method, if the user reloads the page, the inserts aren't inserted anymore, bypassing the extension functionality
            // I consider the aforementioned behaviour as fine (say you are panicked in an emergency, etc.), so I will not be "fixing" that
            chrome.tabs.onUpdated.addListener(function listener (tabId, changeInfo) {
                // we only want sites that are not google OR OTHER SEARCH ENGINES - TO BE ADDED
                if (tabId === tab.id && changeInfo.url !== undefined && changeInfo.url.startsWith("http") && !changeInfo.url.includes("www.google.")) {
                    inserts(tab.id);
                    // we remove the onUpdated listener, so it doesn't keep injecting for every url update on the tab
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        } else {
            inserts(tab.id);
        }
    }
});
