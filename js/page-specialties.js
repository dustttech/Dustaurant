document.addEventListener('DOMContentLoaded',function(){
    const links = document.querySelectorAll('.page-specialties__select .select');
    const menu = document.querySelectorAll('.page-specialties__main-wrapper');

    links.forEach((link,index) => {
        link.addEventListener('click',function (e) {
            e.preventDefault();
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
                menu[i].classList.remove('active');
            }
            this.classList.add('active');
            menu[index].classList.add('active');

        })
    });

},false)