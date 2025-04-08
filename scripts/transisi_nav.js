var opacity = 0;
let isNavbarOpen = false;
let scrl = 0;


document.addEventListener("scroll", () => {
    if(isNavbarOpen == false){
        let customMaxScroll = 500;
        const currentScroll = window.scrollY;
        scrl = currentScroll;
        let nav = document.querySelector(".navbar");
    
        opacity = Math.min(currentScroll / customMaxScroll, 1);
        if(!(nav.classList).toString().includes("bg-white")) nav.style.backgroundColor = `rgba(255,255,255, ${opacity})`;
        op(opacity)
        nav.style.boxShadow = `0 4px 8px rgba(0,0,0, ${opacity * 0.05})`;
    }
});

function op(opacity){
    if(opacity){
        let bsTheme = document.querySelector("[data-bs-theme]");
        opacity === 1 ? bsTheme.setAttribute('data-bs-theme', "light") : bsTheme.setAttribute('data-bs-theme', "dark")
    }
}

let navbartoggler = document.querySelector(".navbar-toggler"),
navbartogglericon = document.querySelector(".navbar-toggler-icon")

let klik = [navbartoggler, navbartogglericon]

klik.forEach(elemn =>{
    elemn.addEventListener("click", () => {
        isNavbarOpen = !isNavbarOpen;
    
        let nav = document.querySelector(".navbar");
        let bsTheme = document.querySelector("[data-bs-theme]");
    
        
        
        if (isNavbarOpen) {
            nav.classList.add("bg-white")
            nav.classList.add("shadow-sm")
            bsTheme.setAttribute('data-bs-theme', "light")
        } else {
            nav.classList.remove("bg-white")
            nav.classList.remove("shadow-sm")
            bsTheme.setAttribute('data-bs-theme', "dark")
            op(Math.min(currentScroll / customMaxScroll, 1))
        }
    });

})

