document.addEventListener('DOMContentLoaded',function(){
    //get element
    const form_bg = document.querySelector('.page-reservation');
    const title_bg = document.querySelector('.page-title');

    //function block
    function requestAF() {
        if (!scrolling) {
            requestAnimationFrame(adjustBg);
        }
        scrolling = true;
    }
    function adjustBg() {
        var win_w = window.innerWidth;
        var pos = window.pageYOffset;
        var pos_formBg = form_bg.offsetTop-30;
        // EFFECT FOR FORM BG
        if (win_w < 1000) {
            title_bg.style.backgroundPosition = "50% 0%";
        } else {
            title_bg.style.backgroundPosition = "50%" + pos +"px";
        }

        form_bg.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";

        scrolling = false;

    }
    function moveBg(ele) {
        var pos = window.pageYOffset;
        var pos_formBg = ele.offsetTop-30;
        // EFFECT FOR FORM BG
        if (ele.style.backgroundPosition) { // if the user've already scroll
            ele.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";  
        } else { // when first load the page 
            ele.style.backgroundPosition = "50% 0%";
        }
    }

    // execution
    let scrolling = false;
    window.addEventListener('load' , function () {
        moveBg(form_bg);
        moveBg(title_bg);
    },false);
    window.addEventListener('scroll',function () {
        requestAF();
    })
},false)