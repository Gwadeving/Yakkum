function adjustScroll(event, offset) {
    event.preventDefault(); 
    
    const target = document.querySelector(event.target.getAttribute('href'));

    if (target) {
        const targetPosition = target.offsetTop + offset;


        window.scrollTo({
            top: targetPosition,
        });
    }
}