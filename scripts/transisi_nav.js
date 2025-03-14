document.addEventListener("scroll", () => {
    const customMaxScroll = 500;
    const currentScroll = window.scrollY;
    let nav = document.querySelector(".navbar"),
    bsTheme = document.querySelector("[data-bs-theme]"),
    dropDownBg = document.querySelector(".dropDownBg")

    const opacity = Math.min(currentScroll / customMaxScroll, 1);

    if(!(nav.classList).toString().includes("bg-white")) nav.style.backgroundColor = `rgba(255,255,255, ${opacity})`;

    if(opacity === 1){
        dropDownBg.classList.add("bg-white")
        dropDownBg.classList.remove("bg-transparent")
        dropDownBg.classList.remove("bg-blueYakkum")
    } else {
        dropDownBg.classList.add("bg-blueYakkum")
        dropDownBg.classList.remove("bg-dark")
        dropDownBg.classList.remove("bg-white")

    }
    opacity === 1 ? bsTheme.setAttribute('data-bs-theme', "light") : bsTheme.setAttribute('data-bs-theme', "dark")
    nav.style.boxShadow = `0 4px 8px rgba(0,0,0, ${opacity * 0.05})`;
});
