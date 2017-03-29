// Get Lorem Ipsum from the text file
var ipsumText;
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", chrome.runtime.getURL("ipsum.txt"));
oReq.send();

function reqListener() {
    ipsumText = this.responseText;
}

// Make ipsumText available on Chrome tab and run
// generate script on callback
function onClickHandler() {
    chrome.tabs.executeScript(null, {
        code: 'var text = "' + ipsumText + '";'
    }, function () {
        chrome.tabs.executeScript(null, {
            file: "generate.js"
        });
    });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Setup context menu item on install
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "main",
        "title": "Ipsum Me!",
        "contexts": ["editable"]
    });
});
