var t;
var t2;

chrome.runtime.onInstalled.addListener(function() {
        localStorage.date= new Date();
        localStorage.hour=0;
        localStorage.minute=0;
        localStorage.second=0;

        localStorage.lhour=0;
        localStorage.lminute=1;
        localStorage.lsecond=0;
        
        localStorage.flag=0;
        });

function checkdate() {
    if(Date() != localStorage.date()) {
        localStorage.second = 0;
        localStorage.minute = 0;
        localStorage.hour = 0;
    }
    t2 = setTimeout(function() {interval();},1000);
}

function show() {
    var notification = webkitNotifications.createNotification(
        'icon.png',  // url of icon
        'Notice',  // title of the notice
        'Time you used on twitter is over toady >_<'  // the text of notice
    );
    notification.show();
}

function interval() {
    localStorage.second ++;
    if(localStorage.second == 60) {
        localStorage.second = 0;
        localStorage.minute ++;
    }
    if(localStorage.minute == 60) {
        localStorage.minute = 0;
        localStorage.hour ++;
    }
    if(localStorage.flag == 0 && parseInt(localStorage.second) >= parseInt(localStorage.lsecond) && parseInt(localStorage.minute) >= parseInt(localStorage.lminute) && parseInt(localStorage.hour) >= parseInt(localStorage.lhour)) {
        localStorage.flag = 1;
        show();
    }
    t = setTimeout(function() {interval();},1000);
}

function stopTimer() {
    clearTimeout(t);
}

function startTimer() {
    interval();
}

//Check the tab is twitter or not
function checkByTabid(tabId) { 
	 chrome.tabs.get(tabId, function(tab) { 
	 if(tab.url.indexOf("twitter.com") > 0) 
		startTimer(); 
	 else 
		stopTimer(); 
	 }); 
} 

//Check when create new tab 
chrome.tabs.onCreated.addListener(function(tab) {
    stopTimer(); 
    if(tab.url.indexOf("twitter.com") > 0) 	 
	    startTimer(); 
}); 

//Check when select tab  
chrome.tabs.onSelectionChanged.addListener(function(tabId, changeInfo) { 
    stopTimer(); 
    checkByTabid(tabId); 
}); 

//Check when change tab 
chrome.tabs.onRemoved.addListener(function(tabId) { 
    stopTimer(); 
}); 

//Check when update tab 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) { 
    stopTimer(); 
    checkByTabid(tabId); 
}); 

//Check when window change
chrome.windows.onFocusChanged.addListener(function(windowId) {
	stopTimer();
    chrome.tabs.getSelected(windowId,function(tab){
        if(tab.url.indexOf("twitter.com") > 0)
			startTimer();
	});
});
