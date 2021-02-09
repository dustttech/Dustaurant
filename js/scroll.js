document.addEventListener('DOMContentLoaded',function(){
    
// SCROLL ANIMATION
var scroll = window.requestAnimationFrame || function (callback) {
    setTimeout(callback, 1000/60);
    }

    // IF ELEMENT'S IN VIEW , ADD ANIMATION
    function loop() {
    var item = document.querySelectorAll('.sleep');
    item.forEach(function (element,index) {
        element.style.opacity = "0";
        if (isElementInViewport(element)) {


            // element.style.opacity = null;
            // element.classList.remove('sleep');
            // element.classList.add('show');
            setTimeout(() => {
            element.style.opacity = null;
            element.classList.remove('sleep');
            element.classList.add('show');
            }, index*50);
        } 
    });
    scroll(loop);//REPEAT
    }
    // CHECK WHEN ELEMENT IN VIEW
    function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();//is the rect around element 
    return (
        (rect.top <= 0
        && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
    }

    // RUN FUNCTION WHEN WINDOW IS LOADED
    window.addEventListener('load', function () {
        scroll(loop);
    })



},false)