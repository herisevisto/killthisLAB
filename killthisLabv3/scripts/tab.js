document.addEventListener('DOMContentLoaded',function(){
    let menu_icon = document.querySelector(".header-menu");
    let menu = document.querySelector('.menu');
    let logout_icon = document.querySelector(".header-down");
    let logout_menu = document.querySelector(".logout-dropdown");

    //shows menu tab
    menu_icon.onclick =  function(){
        menu.classList.toggle('show-menu')
    }
    //hides menu tab
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menu_icon.contains(event.target)) {
            menu.classList.remove('show-menu');
        }
    });
    //shows logout tab
    logout_icon.onclick = function(){
        logout_menu.classList.toggle('show-logout-dropdown');
    }
    //hides logout tab
    document.addEventListener('click', function(event) {
        if (!logout_menu.contains(event.target) && !logout_icon.contains(event.target)) {
            logout_menu.classList.remove('show-logout-dropdown');
        }
    });
})
