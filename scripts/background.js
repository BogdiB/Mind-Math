// extState - extension state
// either "ON" or "OFF"
// await chrome.storage.session.set({"extState": "ON"});
// let {extState} = await chrome.storage.session.get("extState");

// function visualUpdateByState(extState) {
    // chrome.action.setBadgeText({
    //     text: extState,
    // });
    // visually update the powerButton
    // chrome.runtime.sendMessage(extState)
    //     .catch((e) => console.log(e));
// }

chrome.runtime.onInstalled.addListener(async () => {
    await chrome.storage.session.set({"extState": "ON"});
    // visualUpdateByState("ON");
});

chrome.runtime.onStartup.addListener(async () => {
    await chrome.storage.session.set({"extState": "ON"});
    // visualUpdateByState("ON");
});

/*
    listen to messages regarding the extState -> return the extState
    REQUEST IS A **BOOL**:
        false means requesting the value of extState
        true means requesting the CHANGE of extState
*/
// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//     let {extState} = await chrome.storage.session.get("extState");
//     if (message === true) {
//         extState = extState === "ON" ? "OFF" : "ON";
//         chrome.storage.session.set({"extState": extState})
//     }
//     else if (message !== false) {
//         throw Error("Bad message request for extension state.");
//     }
//     visualUpdateByState(extState);
//     sendResponse(extState);
// });
  
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

// basically took the list of the top 10 worldwide search engines
function searchEngineCheck(url) {
    if (url.includes("www.google.") ||
        url.includes("www.bing.") ||
        url.includes("search.yahoo.") ||
        url.includes("www.baidu.") ||
        url.includes("yandex.") ||
        url.includes("duckduckgo.") ||
        url.includes("www.ask.") ||
        url.includes("www.naver.") ||
        url.includes("www.aol.") ||
        url.includes("www.seznam.")) {
        return true;
    }
    return false;
}

// every time a tab is created, we execute the script which includes the main extension functionality
// we only want to execute said script on web sites that are not google OR OTHER SEARCH ENGINES - TO BE ADDED
chrome.tabs.onCreated.addListener(async (tab) => {
    let {extState} = await chrome.storage.session.get("extState");
    if (extState === "ON") {
        if (!tab.pendingUrl.startsWith("http")) {
            // with this method, if the user reloads the page, the inserts aren't inserted anymore, bypassing the extension functionality
            // I consider the aforementioned behaviour as fine (say you are panicked in an emergency, etc.), so I will not be "fixing" that
            chrome.tabs.onUpdated.addListener(function listener (tabId, changeInfo) {
                // we only want sites that are not google OR OTHER SEARCH ENGINES - TO BE ADDED
                if (extState === "ON" && tabId === tab.id && changeInfo.url !== undefined && changeInfo.url.startsWith("http") && !searchEngineCheck(changeInfo.url)) {
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
