let string = "Always away \nfrom keyboard =/";
let str = string.split("");
let el = document.getElementById('typing-h1');
(function animate() {
str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running); 
let running = setTimeout(animate, 90);
})();