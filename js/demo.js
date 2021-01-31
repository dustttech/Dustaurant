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



    // SLIDE PAGE ENTRY
    
    var slide_item = document.querySelectorAll('.slide__item'),
        prev_btn = document.querySelector('.previous'),
        next_btn = document.querySelector('.next'),
        cur_pos = 0,
        wait_animation = false;

    // AUTO SLIDE
    // var auto = setInterval(function () {
    //     autoSlide();
    // }, 3000);
    var auto = setInterval(autoSlide, 3000);
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
    const counterWrapper = document.querySelectorAll('.counters');

    // need using request animation fram with counter

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
        function checkscroll() {
            counterWrapper.forEach(wrapper => {
                if (wrapper.classList.contains('show')) {
                    setTimeout(() => {
                    updateCount();//call updateCount for the FIRST TIME .
                    }, 500);
                    window.removeEventListener('scroll',checkscroll,true); // and imediately remove the eventlistentner for scroll below (which has the same true argument)
                }
            });
        }
        function checkload() {
            counterWrapper.forEach(wrapper => {
                if (wrapper.classList.contains('show')) {
                    setTimeout(() => {
                    updateCount();//call updateCount for the FIRST TIME .
                    }, 500);
                    window.removeEventListener('load',checkload,true);
                }
            });
        }
        window.addEventListener('scroll',checkscroll,true); //call check whenever window is scrolling to constantly check for class show to be add in the wrapper (only then can call updateCount) , the "true" argument (syntax is useCapture (absent = false)) is for matching the event listener to remove the right one (see remove event listener above)
        window.addEventListener('load',checkload,true); //same with load event

               
    });
    // END COUNTER


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


        // SCROLL DOWN ANIAMTION
        // var sleepItem = document.querySelectorAll('.sleep');
        // for (let i = 0; i < sleepItem.length; i++) {
        //     var itemPos = sleepItem[i].offsetTop - 800;
        //     if (pos >= itemPos) {
        //         for (let j = 0; j < sleepItem.length; j++) {
        //             setTimeout(() => {
        //                 sleepItem[j].classList.remove('sleep');
        //                 sleepItem[j].classList.remove('hidden');
        //                 sleepItem[j].classList.add('show');
        //             }, j*100);
        //         }

        //     }
        // }
        // sleepItem.forEach(item => {
        //     var itemPos = item.offsetTop - 800;
        //     if (pos >= itemPos) {
        //         setTimeout(() => {
        //             item.classList.remove('sleep');
        //             //need this eventlistener so that  element which has animation delay won't show up first before the animation is running (because their initial state is visible)                    
        //             item.classList.remove('hidden');
        //             item.classList.add('show');
        //         }, 200);
        //     }
        // });
    })
    // END SCROLL

    // TEST (SEEM WORKING) no using scroll event on this (because it fire so much event when scroll which can cause browser to overload)
    //  requestAnimationFrame is a much accurate version of setInterval  . requestAn.... limit how often a funtion is call to either window refresh rate or 60 times per second , the fallback is a call back function after 1000/60 s . Notice that requestAni... only run 1 time , so you need to call it again in the function called
    var scroll = window.requestAnimationFrame || function (callback) {
        setTimeout(callback, 1000/60);
      }
    //   var number = 0;

      function loop(time) {
        var item = document.querySelectorAll('.sleep');

        item.forEach(function (element,index) {//for each also return the element (target) and the "index" of the target
            element.style.opacity = "0";
          if (isElementInViewport(element)) {
              setTimeout(() => {
                element.style.opacity = null;
                element.classList.remove('sleep');
                element.classList.add('show');
              }, index*50);
            //   if (time) {
            //       let diff = time - number;
            //       console.log('fram',diff);
            //       number = time;
            //   }
          } 
        });
        scroll(loop);
      }
    //   this function check to see if element is in the viewport (so no need for using window scroll to check element offsetTop)
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
    scroll(loop);



    // END TEST
    // var sleepItem = document.querySelectorAll('.sleep');
    // console.log(sleepItem);


    // ADD WIDTH FOR SLIDE CUSTOMER 
    var customerList = document.querySelector('.page-customers__slide');
    var customerItem = document.querySelectorAll('.page-customers__slide-item');
    var dots = document.querySelectorAll('.page-customers__controls li');

    function updateDots(array,center) {
        var dot_act;
        for (let i = 0; i < array.length; i++) {
            if (array[i].classList.contains('active')) {
                dot_act = array[i];
            }
        }
        dot_act.classList.remove('active');
        dots[center].classList.add('active');
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', (e) => {
            for (let j = 0; j < dots.length; j++) {
                dots[j].classList.remove('active');
                customer_noClone[j].classList.remove('center');
            }
            dots[i].classList.add('active');
            customer_noClone[i].classList.add('center');
            adjustWidth();
        })
    }

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
    var customer_noClone = document.querySelectorAll('.page-customers__slide-item.real');

    function moveSlide(array,direction) {
        var centerPos;
        for (let i = 0; i < array.length; i++) {
            if (array[i].classList.contains('center')) {
                centerPos = i;
            }
        }
        if (direction == "right") {
            var pos = centerPos;
            var cur_center = array[pos];
            if (pos < array.length-1) {
                pos++;
            }else {pos = 0;}
            var next_center = array[pos];
            cur_center.classList.remove('center');
            next_center.classList.add('center');
            updateDots(dots,pos);
        } else if (direction == "left") {
            var pos = centerPos;
            var cur_center = array[pos];
            if (pos > 0) {
                pos--;
            }else {pos = array.length - 1;}
            var next_center = array[pos];
            cur_center.classList.remove('center');
            next_center.classList.add('center');
            updateDots(dots,pos);
        }
    }


    window.addEventListener('load', adjustWidth);
    window.addEventListener('resize', adjustWidth);

    // DRAG SLIDE

    //ONLY ADD TOUCH EVENT LISTENER FOR TOUCH DEVICE/ ELSE USING MOUSE EVENT  

    // if ('ontouchstart' in window) {
    //     var mousePosX = null;
    //     var mousePosY = null;
    //     console.log('touch');
    //     customerList.addEventListener("touchstart", startTouch, false);
    //     customerList.addEventListener("touchmove", moveTouch, false);
    // } else {
    //     var initialX = null;
    //     var initialY = null;
    //     console.log('click');
    //     customerList.addEventListener('mousedown', startDrag, false);
    //     customerList.addEventListener('mousemove', moveDrag, false);
    //     customerList.addEventListener('mouseup', function () {
    //         customerList.style.cursor = "unset"; 
    //      });
    // }
 



     // Swipe Up / Down / Left / Right
     var mousePosX = null;
     var mousePosY = null;
     var initialX = null;
     var initialY = null;

    function startTouch(e) {


        //touches return read-only Touch object (which has many proteties including clientX/clientY-which is position when touch ) and lenght property-which will add 1 touch object for each touch event , use to count the number of finger using when touch )
        initialX = e.touches[0].clientX;//touches[0] get only touchList object
        initialY = e.touches[0].clientY;
        //X Y is position of touch (only true if user touched)
      };
     
    function moveTouch(e) {


        //only run this function if user has already touch
        if (initialX === null) {
        return;
        }
    
        if (initialY === null) {
        return;
        }
    
        //locate the next position of touch (which mean user is swiping)
        var currentX = e.touches[0].clientX;
        var currentY = e.touches[0].clientY;
        //calculate the distance between first touch and second touch(which is swiped position)
        var diffX = initialX - currentX;
        var diffY = initialY - currentY;
    
        if (Math.abs(diffX) > Math.abs(diffY)) {//if position diffX > diffY -> user is swipe horizontally (diffX change , diffY unchange so diffX is always > than diffY)
        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            moveSlide(customer_noClone,"right");
            adjustWidth();
        } else {
            // swiped right
            moveSlide(customer_noClone,"left");
            adjustWidth();
        }  
        }
            //reset the initial touch position
        initialX = null;
        initialY = null;
        e.preventDefault();
    }

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
            // drag horizontally
            if (diffX > 0) {
              // drag to left
              moveSlide(customer_noClone,"right");
              adjustWidth();
            } else {
              // drag to right
              moveSlide(customer_noClone,"left");
              adjustWidth();
            }  
          }
        
        mousePosX = null;
        mousePosY = null;
       e.preventDefault();
    
     }


     customerList.addEventListener("touchstart", startTouch, false);
     customerList.addEventListener("touchmove", moveTouch, false);
     customerList.addEventListener('mousedown', startDrag, false);
     customerList.addEventListener('mousemove', moveDrag, false);
     customerList.addEventListener('mouseup', function () {
         customerList.style.cursor = "unset"; 
      });
},false)