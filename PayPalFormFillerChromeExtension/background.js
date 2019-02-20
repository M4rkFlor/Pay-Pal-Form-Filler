var rules = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostEquals: "www.sandbox.paypal.com", pathContains: "/webapps"}, //can't effectively match url 
    css: ["#singlePagePayment",".paypalHeaderWrapper"] //check if it has paypal and paymentForm
  })
  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([rules]);
    });
  });

  chrome.pageAction.onClicked.addListener(function(tab) {
    console.log("tab2");
    chrome.tabs.executeScript(tab.ib, {
      file: 'inject.js'
    });
  });