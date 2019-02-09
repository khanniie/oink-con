function saveData(obj){
	chrome.storage.sync.set(obj);
}

var alerted = new Array();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  // alert if playing audio on load
  if (tab.audible && !alerted.includes(tabId)){
    window.alert("This tab is playing audio!");
    alerted.push(tabId);
  }
});