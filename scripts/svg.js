// MMExtState - extension state
// either "ON" or "OFF"

async function getExtState() {
    let storeType = await chrome.storage.local.get("MMExtStateStoreType");
    if (storeType === "local") {
        return await chrome.storage.local.get("MMExtState");
    } else if (storeType === "session") {
        return await chrome.storage.session.get("MMExtState");
    }
    else {
        await chrome.storage.local.set({"MMExtStateStoreType": "local"})
        await chrome.storage.local.set({"MMExtState": "ON"});
        return "ON";
    }
}

async function getState() {
    let MMExtState = await getExtState();
    if (MMExtState === "ON") {
        document.getElementById("paths").style.color = "green";
    }
    else if (MMExtState === "OFF") {
        document.getElementById("paths").style.color = "crimson";
    }
}

getState();
chrome.storage.onChanged.addListener(() => getState());
