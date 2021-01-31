        //NAV MENU
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
        // END NAV MENU




        //PAGE ENTRY
        //SLIDE
        //AUTO SLIDE
        function autoSlide(ele) {
            var cur_pos = 0; 

            function runSlide() {
                var cur_act = ele[cur_pos];
                cur_act.classList.remove('active');
                if (cur_pos < ele.length -1) {
                    cur_pos++;
                } else {cur_pos=0;}
                var next_act = ele[cur_pos];
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
            return runSlide; //CLOSURE , return runSlide with autoSlide enviroment (which has cur_pos var)
        }
        // MANUAL SLIDE 
        function manualSlide(direction,ele,auto) {

            // STOP AUTO SLIDE WHEN USER CLICK
            var cur_pos = 0, 
                wait_animation = false;
            function runSlide() {
                clearInterval(auto);

                var wait2 = 0;
                if (wait_animation) {
                    return false;
                }
                wait_animation = true;
        
                var cur_act = ele[cur_pos];
                cur_act.classList.remove('active');
                if (direction == "next") {
                    if (cur_pos < ele.length -1) {
                        cur_pos++;
                    }   else {cur_pos = 0;}
                } else {
                    if (cur_pos > 0) {
                        cur_pos--;
                    } else {cur_pos = ele.length -1;}
                }
                var next_act = ele[cur_pos];
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
            return runSlide;
        }


        // END PAGE ENTRY



        //PAGE RESERVATION 
        //BACKGROUND
        function moveBg(ele) {
            var pos = window.pageYOffset;
            var pos_formBg = ele.offsetTop-30;
            // EFFECT FOR FORM BG
            if (ele.style.backgroundPosition) { // if the user've already scroll
                ele.style.backgroundPosition = "50%" + (pos - pos_formBg) +"px";  
            } else { // when first load the page 
                ele.style.backgroundPosition = "50% 50%";
            }
        }