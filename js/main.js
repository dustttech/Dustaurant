document.addEventListener('DOMContentLoaded',function(){
    //HEADER
    // NAV MENU
    const btn_showNav = document.querySelector('.header__nav-icon'); //BAR ICON
    const nav_menu = document.querySelector('.header__nav-menu'); 
    const header = document.querySelector('.header');

    //PAGE ENTRY
    //SLIDE
    const slide_item = document.querySelectorAll('.slide__item');
    const prev_btn = document.querySelector('.previous');
    const next_btn = document.querySelector('.next');

    //PAGE ABOUT
    //COUNTING NUMBER ANIMATION
    const counterWrapper = document.querySelectorAll('.counters');
    const counters = document.querySelectorAll('.counter');



    // PAGE RESERVATION
    const form_bg = document.querySelector('.page-reservation');//get section reservation

    //PAGE CUSTOMER
    //CUSTOMER SLIDE
    const customerList = document.querySelector('.page-customers__slide');
    const customerItem = document.querySelectorAll('.page-customers__slide-item');
    const dots = document.querySelectorAll('.page-customers__controls li');

    // sp const
    const customer_noClone = document.querySelectorAll('.page-customers__slide-item.real');
    const centerItem = document.querySelector('.page-customers__slide-item.center');


    // NAV MENU
    // window resize and load event listener
    window.addEventListener('load', function () {
        heightAdjust(nav_menu);
    });
    window.addEventListener('resize', function () {
        heightAdjust(nav_menu);
    });
    //TOGGLE NAV MENU
    btn_showNav.onclick = function () {
        toggleMenu(nav_menu);
    };
    // END NAV MENU

    // PAGE ENTRY

    // AUTO SLIDE
    var autoslide = autoSlide(slide_item);
    var auto = setInterval(autoslide, 3000);
    //MANUAL SLIDE

    var next =  manualSlide('next', slide_item, auto);
    var prev =  manualSlide('prev', slide_item, auto);
    next_btn.addEventListener('click', next);
    prev_btn.addEventListener('click', prev);
    //END PAGE ENTRY

    //PAGE ABOUT
    //COUNTER ANIMATION
    counters.forEach(counter => {
        function updateCount(count) {
            const target = +counter.getAttribute('data-target');
            var count = count || +counter.innerText;
            const speed = target / 2000;
            if (count < target) { 
                counter.innerText = parseInt(count + speed, 10);
                setTimeout(updateCount, 4, count + speed); 
            } else {
                counter.innerText = parseInt(target, 10);
            }
        }
        function checkload() {
            counterWrapper.forEach(wrapper => {
                if (wrapper.classList.contains('show')) {
                    setTimeout(() => {
                    updateCount();
                    }, 500);
                    window.removeEventListener('load',checkload,true);
                }
            });
        }
        window.addEventListener('load',checkload,true); 

               
    });
    // END COUNTER


    // SCROLL ANIMATION (header menu,background reservation)
    //THROTTLING SCROLL
    var scrolling = false;
    window.addEventListener('scroll', function () {
        scrolling = true;
    })
    setInterval(() => {
        if (scrolling) {
            scrolling = false;
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
        }
    }, 300);

    //PAGE RESERVATION
    //adjust page reservation background ???
    var adjustBg = moveBg(form_bg);
    window.addEventListener('load', adjustBg);

    //END PAGE RESERVATION

},false)