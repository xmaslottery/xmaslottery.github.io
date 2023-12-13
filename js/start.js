const body = document.body;

document.querySelector("#main").classList.add("invisible");
setTimeout(() => {
    document.querySelector("#main").classList.remove("invisible");
    document.querySelector(".containerblack").remove();
    startSnow();
    let script7=document.createElement("script");
    script7.src="js/confetti.js";
    
    body.appendChild(script7);
}, 5000);



let script6 = document.createElement("script");
script6.src = "js/snow3d.js";
body.appendChild(script6);
if(!checkCookieExists("batch")) document.cookie = "batch=4";
if(!checkCookieExists("totalprizes")) document.cookie = "totalprizes=32";

const styleSheet = document.styleSheets[3];
console.log(getCookie("batch"))
if(getCookie("batch")==4){
  styleSheet.insertRule('.result span  { max-width: 22vw; }', 0);
}
else if(getCookie("batch")==5){
  styleSheet.insertRule('.result span  { max-width: 18vw; }', 0);
}




function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if the cookie name matches
      if (cookie.startsWith(name + '=')) {
        // Get the cookie value and convert it to an integer
        const value = parseInt(cookie.substring(name.length + 1), 10);
        return isNaN(value) ? null : value;
      }
    }
    return null; // Return null if cookie not found
  }

  function checkCookieExists(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        return true;
      }
    }
    return false;
  }
