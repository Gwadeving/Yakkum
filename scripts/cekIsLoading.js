(()=>{
    const navigationEntries = performance.getEntriesByType('navigation');
            
    if (navigationEntries.length > 0) {
        const navigationType = navigationEntries[0].type;
        if (navigationType === 'reload') {
            sessionStorage.setItem("loadingScreen", false)
            
        } else if (navigationType === 'navigate') {
            if(!sessionStorage.getItem("loadingScreen")){
                sessionStorage.setItem("loadingScreen", false)
            }
            
        } else if (navigationType === 'back_forward') {
            (sessionStorage.setItem("loadingScreen"), true)
        }
    }
})()



