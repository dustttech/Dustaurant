document.addEventListener('DOMContentLoaded',function(){//this load before window.load event
 // get all element need to add animation
var item = document.querySelectorAll('.sleep'); 
//hide all element before apply style 
hideItem();



// SCROLL ANIMATION
var scroll = window.requestAnimationFrame || function (callback) {
    setTimeout(callback, 1000/60);
    }




    // IF ELEMENT'S IN VIEW , ADD ANIMATION
    function loop() {
    item.forEach(function (element,index) {
        if (isElementInViewport(element)) {
            setTimeout(() => {
            element.style.opacity = null;
            element.classList.remove('sleep');
            element.classList.add('show');
            }, index*10);
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

    function hideItem() {
        item.forEach(element => {
            element.style.opacity = "0"; 
        });
    }
    // RUN FUNCTION WHEN WINDOW IS LOADED
    window.addEventListener('load', function () {
        scroll(loop);
    })



},false)