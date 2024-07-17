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

async function changeExtensionState() {
    // await chrome.runtime.sendMessage(true)
    //     .catch((e) => console.log(e));
    let MMExtState = await getExtState();
    // inverting the result
    MMExtState = MMExtState === "ON" ? "OFF" : "ON";
    if (await chrome.storage.local.get("MMExtStateStoreType") === "session") {
        await chrome.storage.session.set({"MMExtState": MMExtState});
    } else {
        await chrome.storage.local.set({"MMExtState": MMExtState});
    }
}

// async function setPowerButton() {
//     await chrome.runtime.sendMessage(false)
//         .catch((e) => console.log(e));
// }

// document.getElementsByTagName("body")[0].onload = setPowerButton;

// document.getElementById("stateButton").onclick = changeExtensionState;
document.getElementById("svgWrapper").onclick = changeExtensionState;