var bgp = chrome.extension.getBackgroundPage();

lh.value=bgp.localStorage.lhour;
lm.value=bgp.localStorage.lminute;
ls.value=bgp.localStorage.lsecond;

function save_options() {
    localStorage.lhour = lh.value;
    localStorage.lminute = lm.value;
    localStorage.lsecond = ls.value;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#saveset').addEventListener('click', save_options);
});


function showtime() {
    document.getElementById('txt').innerHTML="Time used on twitter: "+bgp.localStorage.hour+":"+bgp.localStorage.minute+":"+bgp.localStorage.second
    t = setTimeout(function() {showtime();}, 100)
}

showtime();
