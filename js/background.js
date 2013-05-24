var second = 0;
var minute = 0;
var hour = 0;
var t;

function show() {
    var notification = webkitNotifications.createNotification(
        'icon.png',  // 图标 URL，可以是相对路径
        'Notice',  // 通知标题
        '今天浏览Twitter的时间已经到了哦'  // 通知正文文本
    );
    notification.show();
}

function interval() {
    second ++;
    if(second == 60) {
        second = 0;
        minute += 1;
    }
    if(minute == 60) {
        minute = 0;
        hour += 1;
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
	 if(tab.url.indexOf("twitter.com") >0) 
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
