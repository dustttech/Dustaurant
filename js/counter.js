document.addEventListener('DOMContentLoaded',function(){
    //get element
    const counters = document.querySelectorAll('.counter');

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
    
    
            //using with scroll animation (in wrapper of counter)
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


},false)