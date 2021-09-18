const timeSpan = document.getElementById("time");

function setTimeSpan() {
    const date = new Date();
    const hours = ("00" + date.getHours()).slice(-2);
    const minutes = ("00" + date.getMinutes()).slice(-2);
    timeSpan.innerText = hours + ':' + minutes;
}
setTimeSpan();
setInterval(setTimeSpan, 1000);