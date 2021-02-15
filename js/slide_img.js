document.addEventListener('DOMContentLoaded',function(){
            //SLIDE
        //AUTO SLIDE
        var cur_pos = 0; //position of active slide , changing continuity

        function autoSlide(ele) {

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
            var wait_animation = false;
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

    //PAGE ENTRY
    //SLIDE
    const slide_item = document.querySelectorAll('.slide__item');
    const prev_btn = document.querySelector('.previous');
    const next_btn = document.querySelector('.next');

    // AUTO SLIDE
    var autoslide = autoSlide(slide_item);
    var auto = setInterval(autoslide, 3000);
    //MANUAL SLIDE

    var next =  manualSlide('next', slide_item, auto);
    var prev =  manualSlide('prev', slide_item, auto);
    next_btn.addEventListener('click', next);
    prev_btn.addEventListener('click', prev);

},false)