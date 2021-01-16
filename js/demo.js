document.addEventListener('DOMContentLoaded',function(){
    // NAV MENU
    var btn_showNav = document.querySelector('.header__nav-icon'),
        nav_menu = document.querySelector('.header__nav-menu'),
        header = document.querySelector('.header');
    
        // change NAV menu height to zero/auto when resize window (<>1000px) to show/hide nav with the page style
    function heightAdjust() {
        var screenWidth = window.innerWidth; //get screen width
        if (screenWidth >= 1000) {
            nav_menu.style.height = "auto";
        } else {
            nav_menu.style.height = 0;
        }
    }
    // window resize and load event listener
    window.addEventListener('load', heightAdjust);
    window.addEventListener('resize',heightAdjust);

    // show/hide nav with button
    function toggleNav() {
        var menuHeight = nav_menu.offsetHeight;
        if (menuHeight) {
            nav_menu.style.height = 0;
        } else {
            nav_menu.style.height = nav_menu.scrollHeight + "px";
        }
    }
    btn_showNav.onclick = toggleNav;

    
    window.addEventListener('scroll',function () {
        var pos = window.pageYOffset,
            scrolling = header.classList.contains('scrolldown');
            // console.log(scrolling);
        if (pos > 500) {
            header.classList.add('scrollstyle');
            header.classList.add('scrolldown');
            header.classList.remove('scrollup');
        } else if (pos > 300 && pos < 500 && scrolling) {
            header.classList.add('scrollup');
            header.classList.remove('scrolldown');
        }   else if (pos < 200) {
            header.classList.remove('scrollup');
            header.classList.remove('scrollstyle');
        }
    })

        // SLIDE PAGE ENTRY
    
    var slide_item = document.querySelectorAll('.slide__item'),
        prev_btn = document.querySelector('.previous'),
        next_btn = document.querySelector('.next'),
        cur_pos = 0,
        wait_animation = false;

    // AUTO SLIDE
    var auto = setInterval(function () {
        autoSlide();
    }, 3000);
    function autoSlide() {
        var cur_act = slide_item[cur_pos];
        cur_act.classList.remove('active');
        if (cur_pos < slide_item.length -1) {
            cur_pos++;
        } else {cur_pos=0;}
        var next_act = slide_item[cur_pos];
        cur_act.classList.add('hide');
        next_act.classList.add('show');
        cur_act.addEventListener('webkitAnimationEnd', function () {
            cur_act.classList.remove('hide');
            cur_act.classList.remove('active');
        });
        next_act.addEventListener('webkitAnimationEnd', function () {
            next_act.classList.add('active');
            next_act.classList.remove('show');
        });
    }


    function manualSlide(direction) {

        // STOP AUTO SLIDE WHEN USER CLICK
        clearInterval(auto);

        var wait2 = 0;
        if (wait_animation) {
            return false;
        }
        wait_animation = true;

        var cur_act = slide_item[cur_pos];
        cur_act.classList.remove('active');
        if (direction == "next") {
            if (cur_pos < slide_item.length -1) {
                cur_pos++;
            }   else {cur_pos = 0;}
        } else {
            if (cur_pos > 0) {
                cur_pos--;
            } else {cur_pos = slide_item.length -1;}
        }
        var next_act = slide_item[cur_pos];
        cur_act.classList.add('hide');
        next_act.classList.add('show');

        function waitHidden() {
            cur_act.classList.remove('hide');
            cur_act.classList.remove('active');
            wait2 = wait2 + 1;
            if (wait2 == 2) {
                wait_animation = false;
            }
        }
        function waitShow() {
            next_act.classList.add('active');
            next_act.classList.remove('show');
            wait2 = wait2 + 1;
            if (wait2 == 2) {
                wait_animation = false;
            }
        }
        cur_act.addEventListener('webkitAnimationEnd', waitHidden);
        next_act.addEventListener('webkitAnimationEnd', waitShow);

    }

    next_btn.addEventListener('click', function () {
        manualSlide('next');
    });
    prev_btn.addEventListener('click', function () {
        manualSlide('previous');
    });


    
},false)