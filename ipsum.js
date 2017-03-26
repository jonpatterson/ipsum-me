var ipsumText;

function onClickIpsumMe() {
    chrome.tabs.executeScript(null, {
        code: 'var text = "' + ipsumText + '";'
    }, function () {
        chrome.tabs.executeScript(null, {
            file: "generate.js"
        });
    });
}

function reqListener() {
    ipsumText = this.responseText;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", chrome.runtime.getURL("ipsum.txt"));
oReq.send();

chrome.contextMenus.create({
    "title": "Ipsum Me!",
    "contexts": ["editable"],
    "onclick": onClickIpsumMe
});