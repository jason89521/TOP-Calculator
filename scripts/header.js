const timeSpan = document.getElementById("time");

function setTimeSpan() {
    const date = new Date();
    timeSpan.innerText = date.getHours() + ':' + date.getMinutes();
}
setTimeSpan();
setInterval(setTimeSpan, 1000);