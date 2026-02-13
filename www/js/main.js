"use strict";

/*
* Get elements from html
* */
const timeZone = document.getElementById("time");
const greetingZone = document.getElementById("greeting");
const clocks = document.querySelectorAll(".clock");

let ix = 0;

updateClock();
setInterval(updateClock, 1_000);

const timerId = setInterval(highlightRandomCard, 5_000);

/*
* updating time zone, getting Date
* */
function updateClock() {
    let time = new Date();

    getGreeting(time);

    time = String(time.getHours()).padStart(2, "0") + ":" + String(time.getMinutes()).padStart(2, "0") + ":" + String(time.getSeconds()).padStart(2, "0");
    timeZone.innerText = String(time);
}

/*
* updating greeting zone, according to time and day of the week
*/
function getGreeting(_date) {
    let day;

    if(_date.getDay() === 0 || _date.getDay() === 6) {
        day = "schönes Wochenende!"
    } else{
        day = "viel Glück beim Studium!"
    }

    const h = _date.getHours();
    if(h >= 0 && h < 10) {
        greetingZone.innerText = "Guten Morgen und " + day;
    } else if(h >= 10 && h < 18) {
        greetingZone.innerText = "Guten Tag und " + day;
    } else if(h >= 18 &&h <= 23) {
        greetingZone.innerText = "Guten Abend und " + day;
    }
}

function highlightRandomCard(){
    highlightSetter(ix);
    let nextIx = ix;
    while(nextIx === ix){
        nextIx = Math.floor(Math.random() * clocks.length);
    }
    ix = nextIx;
}

function highlightSetter(_ix){
    clocks.forEach(c => c.classList.remove("highlight"));
    clocks[_ix].classList.add("highlight");
}