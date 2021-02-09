document.addEventListener('DOMContentLoaded',function(){
    //HEADER
    // NAV MENU
    const btn_showNav = document.querySelector('.header__nav-icon'); //BAR ICON
    const nav_menu = document.querySelector('.header__nav-menu'); 
    const header = document.querySelector('.header');

    //PAGE ABOUT
    //COUNTING NUMBER ANIMATION
    const counters = document.querySelectorAll('.counter');


    //PAGE TITLE
    const title_bg = document.querySelector('.page-title');

    // PAGE RESERVATION
    const form_bg = document.querySelector('.page-reservation');//get section reservation

    //PAGE CUSTOMER
    //CUSTOMER SLIDE
    const customerList = document.querySelector('.page-customers__slide');
    const customerItem = document.querySelectorAll('.page-customers__slide-item');
    const dots = document.querySelectorAll('.page-customers__controls li');

    // sp const
    const customer_noClone = document.querySelectorAll('.page-customers__slide-item.real');

    const viewArea = document.querySelector('.page-customers__slide-wrapper'); //list view window


    
        // SCROLL ANIMATION
        var scroll = window.requestAnimationFrame || function (callback) {
            setTimeout(callback, 1000/60);
          }

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
            scroll(loop);
          }
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


    // INITIAL SETUP
    //load
    window.addEventListener('load' , function () {
        scroll(loop); //scroll animation
        heightAdjust(nav_menu); //nav menu
        adjustWidth(viewArea, customerList, customerItem);//customer Slide adjust
        moveBg(form_bg);
        move2(title_bg);
    },false);
    function move2(ele) {
        var pos = window.pageYOffset;
        // EFFECT FOR FORM BG
        if (ele.style.backgroundPosition) { // if the user've already scroll
            ele.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";  
        } else { // when first load the page 
            ele.style.backgroundPosition = "center center";
        }
    }
    //reisze
    window.addEventListener('resize', function () {
        heightAdjust(nav_menu);
        adjustWidth(viewArea, customerList, customerItem);//customer Slide adjust
    });
    //scroll
    window.addEventListener('scroll',function () {
        requestAF();

    })
        // SCROLL ANIMATION (header menu,background reservation)
    //THROTTLING SCROLL
    var scrolling = false;

    // window.addEventListener('scroll', requestAF, false);

    function requestAF() {
        if (!scrolling) {
            requestAnimationFrame(adjustNav);
            requestAnimationFrame(adjustBg);
        }
        scrolling = true;
    }
    function adjustBg() {
        var win_w = window.innerWidth;
        var pos = window.pageYOffset;
        var pos_formBg = form_bg.offsetTop-30;
        var pos_titleBg = 0;
        // EFFECT FOR FORM BG
        if (win_w < 1000) {
            pos_titleBg = pos - 65;
        } else {
            pos_formBg = pos;
        }
        title_bg.style.backgroundPosition = "50%" + pos_titleBg +"px";
        form_bg.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";

        scrolling = false;

    }
    function adjustNav() {
        var pos = window.pageYOffset;
        var headerCheck = header.classList.contains('scrolldown');
        if (pos > 500) {
            header.classList.add('scrollstyle');
            header.classList.add('scrolldown');
            header.classList.remove('scrollup');
        } else if (pos > 300 && pos < 500 && headerCheck) {
            header.classList.add('scrollup');
            header.classList.remove('scrolldown');
        }   else if (pos < 200) {
            header.classList.remove('scrollup');
            header.classList.remove('scrollstyle');
        }
        scrolling = false;
    }
    //TOGGLE NAV MENU
    btn_showNav.onclick = function () {
        toggleMenu(nav_menu);
    };
    // END NAV MENU

    // PAGE ENTRY



    //PAGE ABOUT
    //COUNTER ANIMATION
    counters.forEach(counter => {
        function addCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

        function updateCount(count) {
            const targetRaw = counter.getAttribute('data-target');
            const target = +targetRaw.replace(/\D/g, "");

            var count = count || +counter.innerText;

            const speed = target / 2000;
 

            if (count < target) {
                var result =  addCommas(parseInt(count + speed, 10));
                counter.innerText = result;
                setTimeout(updateCount, 4, count + speed); 
            } else {
                result = addCommas(target);
                if (targetRaw.match(/\D/g)) {
                    result = result + "+";
                }
                counter.innerText = result;

            }
        }


        
        var wrapper = counter.parentNode;
        function checkScroll() {
                if (wrapper.classList.contains('show')) {
                    setTimeout(() => {
                        updateCount();
                    }, 1000);
                    window.removeEventListener('scroll',checkScroll,true);
                }
        }
        function checkLoad() {
            setTimeout(() => {
                
                if (wrapper.classList.contains('show')) {
                    setTimeout(() => {
                        updateCount();
                    }, 1000);
                    window.removeEventListener('load',checkLoad,true);
                }   
            }, 1000);
        }
        window.addEventListener('load',checkLoad,true); 
        window.addEventListener('scroll',checkScroll,true); 

               
    });
    // END COUNTER



    //PAGE RESERVATION
    //adjust page reservation background ???
    // var adjustBg = moveBg(form_bg);
    // window.addEventListener('load', adjustBg);
    // window.addEventListener('scroll', function () {
    //     var pos = window.pageYOffset;
    //     var pos_formBg = form_bg.offsetTop-30;
    //     // EFFECT FOR FORM BG
    //     form_bg.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";
    // }, false);

    //END PAGE RESERVATION

    // PAGE CUSTOMER SLIDE
    // SLIDE ADJUST
    // var adjustCustomer = adjustWidth(viewArea, customerList, customerItem);
    // window.addEventListener('load', adjustCustomer);
    // window.addEventListener('resize', adjustCustomer);
    //SLIDE CONTROL
    //CLICK DOTS
    dots.forEach(function (dot,index) {
        
        dot.addEventListener('click', function () {
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active');
                customer_noClone[i].classList.remove('center');
            }
            dot.classList.add('active');
            customer_noClone[index].classList.add('center');
            adjustWidth(viewArea, customerList, customerItem);
        })
    });



    var initialX = null;
    var initialY = null;
    function startTouch(e) {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    };
    function moveTouch(e) {
        if (initialX === null || initialY === null){
        return;
        }
        var currentX = e.touches[0].clientX;
        var currentY = e.touches[0].clientY;

        var diffX = initialX - currentX;
        var diffY = initialY - currentY;
    
        if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            moveSlide(customer_noClone,"right",dots);
             adjustWidth(viewArea, customerList, customerItem);
        } else {
            moveSlide(customer_noClone,"left",dots);
             adjustWidth(viewArea, customerList, customerItem);
        }  
        }
        initialX = null;
        initialY = null;
        e.preventDefault();
    }
    customerList.addEventListener("touchstart", startTouch, false);
    customerList.addEventListener("touchmove", moveTouch, false);


    var mousePosX = null;
    var mousePosY = null;
    function startDrag(e) {
        mousePosX = e.clientX;
        mousePosY = e.clientY;
        customerList.style.cursor = "grab"; 
    }
    function moveDrag(e) {
        if (mousePosX === null || mousePosY === null) {
            return;
        }
        var currentX = e.clientX;
        var currentY = e.clientY;
    
        var diffX = mousePosX - currentX;
        var diffY = mousePosY - currentY;
    
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                moveSlide(customer_noClone,"right",dots);
                adjustWidth(viewArea, customerList, customerItem);
            } else {
                moveSlide(customer_noClone,"left",dots);
                adjustWidth(viewArea, customerList, customerItem);
            }  
          }
        
        mousePosX = null;
        mousePosY = null;
       e.preventDefault();  
    }

    customerList.addEventListener('mousedown', startDrag, false);
    customerList.addEventListener('mousemove', moveDrag, false);
    customerList.addEventListener('mouseup', function () {
        customerList.style.cursor = "unset"; 
    });
},false)