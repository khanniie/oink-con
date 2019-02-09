function saveData(obj){
	chrome.storage.sync.set(obj);
}

var c6 = false;
chrome.storage.local.get('c6', function(items){
    c6 = items.c6;
});

var alerted = new Array();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  // alert if playing audio on load
  if (c6 && tab.audible && !alerted.includes(tabId)){
    window.alert("This tab is playing audio!");
    alerted.push(tabId);
  }
});