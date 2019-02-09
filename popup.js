//import * as socket from './socket.io.js';


var backgroundPage;
var numImagesChanged = 0;
var numImageChagedView;

//main function -- where everything happens
function main(){
	backgroundPage = chrome.extension.getBackgroundPage();
	numImagesChangedView = document.getElementById('num-images-changed');
	setupInsertButton();
	setupDataSaver();
	setupPopup();

}

//function that adds click behavior to the insert button
function setupInsertButton(){
	//get our button and set on click listener
	
	document.getElementById("insert-button").addEventListener("click", function(){
        //setupSocket();
		chrome.storage.local.set({
    		updateTextTo: 'testurl'
		}, function () {
    		chrome.tabs.executeScript({
        		file: "contentScripts.js"
    		}, function(response){
			console.log(response);
			if(response != null && response != undefined){
				numImagesChangedView.innerHTML = response[0] + " :)";
			} else {
				numImagesChangedView.innerHTML = 'bad response';
			}
		});
		});
	});
}

function setupPopup(){
	//get our button and set on click listener
	
	document.getElementById("popup").addEventListener("click", function(){
        //setupSocket();
		chrome.storage.local.set({
    		updateTextTo: 'testurl'
		}, function () {
			  chrome.windows.create({
			    url: chrome.runtime.getURL("options.html"),
			    type: "popup"
			  });
		});
	});
}

//function that saves data when the extension closes
function setupDataSaver(){
	addEventListener("unload", function(event){
		backgroundPage.saveData({
			"numImagesChanged":numImagesChanged
		});
	});
}

//once all the stuff is loaded, call the main function
document.addEventListener("DOMContentLoaded", function(){
	chrome.storage.sync.get(['numImagesChanged'], function(result){
		main();
		numImagesChanged = result.numImagesChanged;
		numImagesChangedView.innerHTML = numImagesChanged;
	});
	main();
});