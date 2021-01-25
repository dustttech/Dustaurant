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
    // default style for form background
    window.addEventListener('load', function () {
        var pos = window.pageYOffset;
        var form_bg = document.querySelector('.page-reservation');//get section reservation
        var pos_formBg = form_bg.offsetTop-30;

        // EFFECT FOR FORM BG
        if (form_bg.style.backgroundPosition) { // if the user've already scroll
            form_bg.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";  
        } else { // when first load the page 
            form_bg.style.backgroundPosition = "50% 50%";
        }

    });
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

    // SCROLL ANIMATION (header menu,background reservation)
    window.addEventListener('scroll',function () {
        var pos = window.pageYOffset;
        var scrolling = header.classList.contains('scrolldown');
        
        var form_bg = document.querySelector('.page-reservation');//get section reservation
        var pos_formBg = form_bg.offsetTop-30;
        // EFFECT FOR FORM BG
        form_bg.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";

        // HEADER TOGGLE 
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
    // END SCROLL

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
    // END SLIDE PAGE ENTRY

    // COUNTER NUMBER ANIMATION
    const counters = document.querySelectorAll('.counter');

    // for each element in counters array (quite similar with loop)
    counters.forEach(counter => { //each counter element in DOM
        //create a function for update counter in website (need to passed a argument count-which is the value after each increment)
        function updateCount(count) {
            const target = +counter.getAttribute('data-target');//get max value for each counter (declare in html data-target)
            var count = count || +counter.innerText;//create a count variable to hold innerText in each counter element(only at the first time the function is called because at that time there's no argument to pass ) or the arguament which is passed to updateCount function at the second time forwards the function get called

            const speed = target / 2000;//the increament speed-the smaller it gets the slower the counter counts because this will get add to in count value each time this function get call , need it to make all the counter finish couting in the same time (big value will get a faster speed count than small value)

            if (count < target) { //keep counting if the count value smaller than the max value (target)
                counter.innerText = parseInt(count + speed, 10);//update to display new counting in the web , parseInt to convert decimal (10) to integer because speed sometime is decimal
                setTimeout(updateCount, 4, count + speed); //call updateCount function and passing a argument (count+speed) after 4ms (which is the smallest amount setTimeout can provide) , now you see why the first time this function get call there's no argument 
            } else {
                counter.innerText = parseInt(target, 10);//if count > target then set count = target (parseInt for safety)
            }
        }
        updateCount();//call updateCount for the FIRST TIME .
    });
    // END COUNTER

    // SLIDE CUSTOMER LIST
    // var customerList = document.querySelector('.page-customers__slide'),
    //     customerListBtn = document.querySelectorAll('.page-customers__controls li');
    
    // for (let i = 0; i < customerListBtn.length; i++) {
    //     customerListBtn[i].addEventListener('click',function () {
    //         for (let j = 0; j < customerListBtn.length; j++) {
    //             customerListBtn[j].classList.remove('active');
    //         }

    //         this.classList.add('active');
    //         var classDelete = customerList.classList[1];
    //         if (classDelete) {
    //             customerList.classList.remove(classDelete);
    //         }
    //         customerList.classList.add('show' + i);

    //     })
    // }
    // ADD WIDTH FOR SLIDE CUSTOMER 
    var customerList = document.querySelector('.page-customers__slide');
    var customerItem = document.querySelectorAll('.page-customers__slide-item');
    

    function adjustWidth() {
        var viewArea = document.querySelector('.page-customers__slide-wrapper'); //list view window
        var viewWidth = viewArea.offsetWidth; //list view window width

        var screenW = window.innerWidth; //screen/browser width

        var listWidth = 0;
        var itemWidth = 0;
        var centerPos = findCenter();
        var centerList ;
        if (screenW < 750) {
            for (let i = 0; i < customerItem.length; i++) {
                itemWidth = viewWidth;
                customerItem[i].style.width = itemWidth + "px";
    
                customerItem[i].style.marginRight = "30px";
                listWidth += itemWidth + 30;
            }
            centerList = (itemWidth + 30) *centerPos;
            customerList.style.transform = "translateX(" + -centerList + "px)";
        }
        else if (screenW >= 750 && screenW < 1000) {
            for (let i = 0; i < customerItem.length; i++) {
                itemWidth = viewWidth/2;
                customerItem[i].style.width = itemWidth + "px";
    
                customerItem[i].style.marginRight = "30px";
                listWidth += itemWidth + 30;
            }
            centerList = (itemWidth + 30) * (centerPos - 0.46);
            customerList.style.transform = "translateX(" + -centerList + "px)";
        }
        else if (screenW >= 1000 && screenW < 1200) {
            for (let i = 0; i < customerItem.length; i++) {
                itemWidth = 290;
                customerItem[i].style.width = itemWidth + "px";
    
                customerItem[i].style.marginRight = "30px";
                listWidth += itemWidth + 30;
            }
            centerList = (itemWidth + 30) * (centerPos-1);
            customerList.style.transform = "translateX(" + -centerList + "px)";
        } else {
            for (let i = 0; i < customerItem.length; i++) {
                itemWidth = (viewWidth-60)/3;
                customerItem[i].style.width = itemWidth + "px";
    
                customerItem[i].style.marginRight = "30px";
                listWidth += itemWidth + 30;
            }
            centerList = (itemWidth + 30) * (centerPos-1);
            customerList.style.transform = "translateX(" + -centerList + "px)";
        }
        
        customerList.style.width = listWidth + "px";

    }
    function findCenter() {
        var centerItem = document.querySelector('.page-customers__slide-item.center');
        for (var pos = 0; centerItem = centerItem.previousElementSibling; pos++) {}
        return pos;
    }

    customerList.addEventListener('mousedown', function () {
       customerList.style.cursor = "grab"; 
    });
    customerList.addEventListener('mouseup', function () {
       customerList.style.cursor = "unset"; 
    });
    window.addEventListener('load', adjustWidth);
    window.addEventListener('resize', adjustWidth);



},false)