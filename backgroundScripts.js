/*
Name: Akshath Jain
Date: 11/4/18
Purpose: background script for saving data
*/

function saveData(obj){
	chrome.storage.sync.set(obj);
}