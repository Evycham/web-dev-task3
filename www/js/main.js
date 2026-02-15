"use strict";

/**
 * Language-map
 **/
const translations = {
    de: {
        morning: "Guten Morgen und ",
        day: "Guten Tag und ",
        evening: "Guten Abend und ",
        weekend: "schönes Wochenende!",
        weekday: "viel Glück beim Studium!"
    },

    en: {
        morning: "Good Morning and ",
        day: "Good Afternoon and ",
        evening: "Good Evening and ",
        weekend: "have a nice weekend!",
        weekday: "good luck with your studies!"
    }
};

/**
* Get elements from HTML
* */
const timeZone = document.getElementById("time");
const greetingZone = document.getElementById("greeting");
const clocks = document.querySelectorAll(".clock");
const enBtn = document.getElementById("enBtn");
const deBtn = document.getElementById("deBtn");
const scene = document.getElementById("scene");

let ix = 0;
let timerId = null;
let currentLang = "de";

updateClock();
setInterval(updateClock, 1_000);
createBubble();

startAutoHighlight();

clocks.forEach((clock, index) => {
    clock.addEventListener("mouseenter", () => {
        stopAutoHighlight();
        ix = index;
        highlightSetter(ix);
    });

    clock.addEventListener("mouseleave", () => {
        highlightRemove();
        startAutoHighlight();
    })
});


/**
 * Sprachauswahl
 **/
enBtn.addEventListener("click", () => {
    if (currentLang === "en") {
        return;
    }
    currentLang = "en";
    updateClock();
});

deBtn.addEventListener("click", () => {
    if (currentLang === "de") {
        return;
    }
    currentLang = "de";
    updateClock();
})

/**
* updating time zone, getting Date
* */
function updateClock() {
    let time = new Date();

    getGreeting(time);

    time = String(time.getHours()).padStart(2, "0") + ":" + String(time.getMinutes()).padStart(2, "0") + ":" + String(time.getSeconds()).padStart(2, "0");
    timeZone.innerText = String(time);
}


/**
* updating greeting zone, according to time and day of the week
*/
function getGreeting(_time) {
    let day;

    if(_time.getDay() === 0 || _time.getDay() === 6) {
        day = translations[currentLang].weekend;
    } else{
        day = translations[currentLang].weekday;
    }

    const h = _time.getHours();
    if(h >= 0 && h < 10) {
        greetingZone.innerText = translations[currentLang].morning + day;
    } else if(h >= 10 && h < 18) {
        greetingZone.innerText = translations[currentLang].day + day;
    } else if(h >= 18 &&h <= 23) {
        greetingZone.innerText = translations[currentLang].evening + day;
    }
}


/**
* Highlight effect
* */
function startAutoHighlight(){
    if(timerId !== null){
        return;
    }
    timerId = setInterval(highlightRandomCard, 5_000);
}

function stopAutoHighlight(){
    if(timerId === null){
        return;
    }
    clearInterval(timerId);
    timerId = null;
}

function highlightRandomCard(){
    let nextIx = ix;
    while(nextIx === ix){
        nextIx = Math.floor(Math.random() * clocks.length);
    }
    ix = nextIx;
    highlightSetter(ix);
}

function highlightSetter(_ix){
    highlightRemove();
    clocks[_ix].classList.add("highlight");
}

function highlightRemove(){
    clocks.forEach(c => c.classList.remove("highlight"));
}

/**
 * Problem3 (bubbles)
 **/
function generateStats(){
    // Position
    let size = Math.floor(50 + Math.random() * (100 - 50));
    let x = Math.floor(Math.random() * (scene.clientWidth - size));
    let y = Math.floor(Math.random() * (scene.clientHeight- size));
    // Color
    let h = Math.random() * 360;
    let s = Math.floor(60 + Math.random() * (80 - 60));
    let l = Math.floor(60 + Math.random() * (80 - 60));
    let a = 0.2 + Math.random() * (0.5 - 0.2);
    // Timer
    let time = Math.floor(30 + Math.random() * (120 - 30));
    // Result
    return {
        size: size,
        x: x,
        y: y,
        h: h,
        s: s,
        l: l,
        a: a,
        time: time * 1000
    };
}

function createBubble(){
    const values = generateStats();
    const bubble = document.createElement("div");

    scene.appendChild(bubble);

    bubble.classList.add("bubbles");
    bubble.classList.add("create");
    bubble.style.width = values.size + "px";
    bubble.style.height = values.size + "px";
    bubble.style.left = values.x + "px";
    bubble.style.top = values.y + "px";
    bubble.style.backgroundColor = `hsla(${values.h}, ${values.s}%, ${values.l}%, ${values.a})`;
    // set 2 events: if clicked -> animation; if animated -> drop;
    popBubble(bubble);
    // set timer if it's stil not animated and removed -> add animation;
    setTimeout(() => {
        if(!bubble.classList.contains("pop")){
            bubble.classList.add("pop");
        }
    }, values.time);
}

function popBubble(_bubble){
    // if clicked - add animation
    _bubble.addEventListener("click", () => {
        if(!_bubble.classList.contains("bubble")){
            _bubble.classList.add("pop");
        }
    });
    // remove after animation
    _bubble.addEventListener("animationend", (event) => {
        if(event.animationName === "pop"){
            _bubble.remove();
        }
    });
}


























