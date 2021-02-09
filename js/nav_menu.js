document.addEventListener('DOMContentLoaded',function(){
    //get element
        // NAV MENU
        const btn_showNav = document.querySelector('.header__nav-icon'); //BAR ICON
        const nav_menu = document.querySelector('.header__nav-menu'); 
        const header = document.querySelector('.header');
     
    //function block
        // change NAV menu height to zero/auto when resize window (<>1000px) to show/hide nav with the page style
        function heightAdjust(ele) {
        var screenWidth = window.innerWidth; //get screen width
        if (screenWidth >= 1000) {
            ele.style.height = "auto";
        } else {
            ele.style.height = 0;
        }
        }
        // show/hide nav with button
        function toggleMenu(ele) {
            var menuHeight = ele.offsetHeight;
            if (menuHeight) {
                ele.style.height = 0;
            } else {
                ele.style.height = ele.scrollHeight + "px";
            }
        }
        //request animation frame
        function requestAF() {
            if (!scrolling) {
                requestAnimationFrame(adjustNav);
            }
            scrolling = true;
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

    //execution
        //THROTTLING SCROLL
        let scrolling = false;
        //control 
        btn_showNav.onclick = function () {
            toggleMenu(nav_menu);
        };


        //initial
        window.addEventListener('load' , function () {
            heightAdjust(nav_menu); 
        },false);
        window.addEventListener('resize', function () {
            heightAdjust(nav_menu);
        });
        window.addEventListener('scroll',function () {
            requestAF();
        })


},false)