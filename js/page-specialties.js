document.addEventListener('DOMContentLoaded',function(){
    const links = document.querySelectorAll('.page-specialties__select .select');
    
    links.forEach(link => {
        link.addEventListener('click',function (e) {
            e.preventDefault();
        })
    });

},false)