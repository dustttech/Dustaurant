document.addEventListener('DOMContentLoaded',function(){
    //FUNCTION BLOCK 
        // slide display
        function updateDots(array,center) {
            var dot_act;
            for (let i = 0; i < array.length; i++) {
                if (array[i].classList.contains('active')) {
                    dot_act = array[i];
                }
            }
            dot_act.classList.remove('active');
            array[center].classList.add('active');
        }
        function findCenter() {
            var centerItem = document.querySelector('.center');
            for (var pos = 0; centerItem = centerItem.previousElementSibling; pos++) {}
            return pos;
        }
        function adjustWidth(viewArea, customerList, customerItem) {
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
        function moveSlide(array,direction,dots) {
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

        //control 
        //drag
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
        //touch
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


    //CONST DOM ELEMENT
        //CUSTOMER SLIDE
        const customerList = document.querySelector('.page-customers__slide');
        const customerItem = document.querySelectorAll('.page-customers__slide-item');
        const dots = document.querySelectorAll('.page-customers__controls li');
    
        // sp const
        const customer_noClone = document.querySelectorAll('.page-customers__slide-item.real');
    
        const viewArea = document.querySelector('.page-customers__slide-wrapper'); //list view window




        //controls click
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
    
        //initial state
        window.addEventListener('load' , function () {
            adjustWidth(viewArea, customerList, customerItem);
        },false);
        window.addEventListener('resize', function () {
            adjustWidth(viewArea, customerList, customerItem);
        });
    

        customerList.addEventListener("touchstart", startTouch, false);
        customerList.addEventListener("touchmove", moveTouch, false); 
        customerList.addEventListener('mousedown', startDrag, false);
        customerList.addEventListener('mousemove', moveDrag, false);
        customerList.addEventListener('mouseup', function () {
            customerList.style.cursor = "unset"; 
        });
},false)