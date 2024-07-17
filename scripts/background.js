// MMExtState - extension state
// either "ON" or "OFF"

async function getExtState() {
    let storeType = await chrome.storage.local.get("MMExtStateStoreType");
    if (storeType === "local") {
        return await chrome.storage.local.set({"MMExtState": "ON"});
    } else if (storeType === "session") {
        return await chrome.storage.session.set({"MMExtState": "ON"});
    }
    else {
        await chrome.storage.local.set({"MMExtStateStoreType": "local"})
        await chrome.storage.local.set({"MMExtState": "ON"});
        return "ON";
    }
}

chrome.runtime.onInstalled.addListener(getExtState);
chrome.runtime.onStartup.addListener(getExtState);

async function inserts(id) {
    // chose "nope" on error since I'm not sure what it returns
    let checker = await chrome.scripting.executeScript({
        target: {tabId: id},
        files: ["scripts/insert.js"]
    }).catch(e => "nope");

    if (checker === "nope") {
        return false;
    }

    checker = await chrome.scripting.insertCSS({
        target: {tabId: id},
        files: ["css/insert.css"]
    }).catch(e => "nope");

    if (checker === "nope") {
        return false;
    }
    return true;
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

async function tryInsert(id) {
    let promise = new Promise((resolve, reject) => resolve(inserts(id)));
    return promise.then(result => result);
}

function useUpdated(tab) {
    // with this method, if the user reloads the page, the inserts aren't inserted anymore, bypassing the extension functionality
    // I consider the aforementioned behaviour as fine (say you are panicked in an emergency, etc.), so I will not be "fixing" that
    chrome.tabs.onUpdated.addListener(async function updateListener(tabId, changeInfo) {
        let MMExtState = await getExtState();
        // in case the extension gets turned off while it has not inserted itself on the current tab
        if (MMExtState === "OFF") {
            chrome.tabs.onUpdated.removeListener(updateListener);
        
            // we only want sites that are not google OR OTHER SEARCH ENGINES - TO BE ADDED
        } else if (tabId === tab.id && changeInfo.url !== undefined && changeInfo.url.startsWith("http") && !searchEngineCheck(changeInfo.url)) {
            let done = await tryInsert(tab.id);
            // if it is done we remove the onUpdated listener, so it doesn't keep injecting for every url update on the tab
            if (done === true)
                chrome.tabs.onUpdated.removeListener(updateListener);
        }
    });
}

async function createdListener(tab) {
    let MMExtState = await getExtState();
    if (MMExtState === "ON") {
        let done = await tryInsert(tab.id);
        if (done === false)
            useUpdated(tab);
    }
}

// every time a tab is created, we execute the script which includes the main extension functionality
// we only want to execute said script on web sites that are not GOOGLE OR OTHER SEARCH ENGINES
chrome.tabs.onCreated.addListener(createdListener);
