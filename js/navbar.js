// User is no longer at top of the page
window.onscroll = function () { 
    if (document.documentElement.scrollTop <= 50 ) {
        navBar.classList.remove("nav-scrolled");
    } 
    else {
        navBar.classList.add("nav-scrolled");
    }
};