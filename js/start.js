document.querySelector("#main").classList.add("invisible");
setTimeout(() => {
    document.querySelector("#main").classList.remove("invisible");
    document.querySelector(".containerblack").remove();
    startSnow();
}, 5000);


var script1 = document.createElement("script");
script1.src = "js/zepto.js";

var script3 = document.createElement("script");
script3.src = "js/tagcanvas.js";
var script4 = document.createElement("script");
script4.src = "js/member.js";
var script5 = document.createElement("script");
script5.src = "js/index.js";
var script6 = document.createElement("script");
script6.src = "js/snow3d.js";

var body = document.body;
body.appendChild(script1);

body.appendChild(script3);
body.appendChild(script4);
body.appendChild(script5);
body.appendChild(script6);


