const body = document.body;
document.querySelector("#main").classList.add("invisible");
setTimeout(() => {
    document.querySelector("#main").classList.remove("invisible");
    document.querySelector(".containerblack").remove();
    startSnow();
    let script7=document.createElement("script");
    script7.src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js";
    body.appendChild(script7);
}, 5000);



let script6 = document.createElement("script");
script6.src = "js/snow3d.js";
body.appendChild(script6);

