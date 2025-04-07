
sessionStorage.setItem("loadingScreen", true)

// Loading System Setiing
const durasiAnimasi = 7, //detik
stepTahun = 5, //tahun
awalTahunCowndown = 1950; //dari Tahun
let Videos = [
    "Video/VideoSlider.mp4",
]

let Logos = [
    {
        logo: "./img/Logos/1955.webp",
        muncul: 1955
    },
    {
        logo: "./img/Logos/2009.webp",
        muncul: 2009
    },
    {
        logo: "./img/Logos/2015.webp",
        muncul: 2015
    },

]

let hilangkanSemuaIsi = document.querySelector(".containAll");
let container_loading = document.querySelector(".container_loading")


if(sessionStorage.getItem("loadingScreen").toString().toLowerCase() === "true"){
    hilangkanLoadings()
} else {
    munculkanLoadings()
}


function isLoading() {
    let originalData = JSON.stringify(sessionStorage);

    setInterval(() => {
        let currentData = JSON.stringify(sessionStorage);

        if (currentData !== originalData) {
            if(sessionStorage.getItem("loadingScreen").toString().toLowerCase() === "true"){
                hilangkanLoadings()
            }

            originalData = currentData;
        } 
    }, 1);
}

isLoading();




let h1c = document.querySelector(".count"),
scaleLoading = document.querySelector(".scaleLoading"),
hilangkanLoading = document.querySelector(".hilangkanLoading"),
logo = document.querySelector("#logo"),
VideoLoading = document.querySelector(".VideoLoading");



function countdown(awal, akhir, durasiAnimasi, step) {
    return new Promise((resolve) => {
        let saatIni = awal;
        const totalSteps = Math.ceil((akhir - awal) / step);
        const stepDuration = (durasiAnimasi * 1000) / totalSteps;

        const timer = setInterval(() => {
            if (saatIni < akhir) {
                let currents = saatIni == 1965 || saatIni == 2010 ? saatIni - 1 : saatIni;

                Logos.forEach(items => {
                    if (currents === items.muncul) {
                        logo.src = items.logo;
                        logo.style.animation = `Flicker ${(stepDuration / 1000) * Logos.length}s infinite`;
                    } else if (currents < Logos[0].muncul) {
                        logo.src = "";
                    }
                });

                updateText(currents, stepDuration).then(() => {
                    setTimeout(() => {
                        saatIni += step;
                    }, stepDuration / 2);
                });
            } else {
                updateText(akhir, stepDuration).then(() => {
                    clearInterval(timer);
                    resolve();
                });
            }
        }, stepDuration);
    });
}

function updateText(newText, stepDuration) {
    return new Promise((resolve) => {
        let spans = h1c.querySelectorAll("span");
        let exitDuration = stepDuration / 5;
        spans.forEach((span, index) => {
            span.style.animation = `charExit 0.3s ease ${index * 0.01}s forwards`;
        });

        setTimeout(() => {
            h1c.innerHTML = "";

            newText.toString().split("").forEach((char, index) => {
                let span = document.createElement("span");
                span.textContent = char;
                span.style.animation = `charAppear 0.3s ease ${index * 0.05}s forwards`;
                h1c.appendChild(span);
            });

            resolve();
        }, exitDuration);
    });
}


function TahunSaatini(){
    const d = new Date();
    let year = d.getFullYear();
    return year;
}


countdown(awalTahunCowndown, TahunSaatini(), durasiAnimasi, stepTahun).then(() => {
    setTimeout(()=>{
        hilangkanLoading.style.opacity = 0;
        hilangkanLoading.style.display = "none";
        let videoL = document.createElement("video")
        videoL.src = "Video/LoadingVideo.webm"
        videoL.muted = true
        videoL.autoplay = true
        videoL.loop = false
        videoL.classList.add("object-fit-cover")
        videoL.classList.add("w-100")
        videoL.classList.add("h-100")
        videoL.classList.add("position-absolute")

        VideoLoading.append(videoL)

        videoL.addEventListener("ended", ()=>{
            VideoLoading.style.animation = `opKeluar ${3}s ease-out`;
            videoAwal.style.display = "block"
            videoAwal.style.animation = `opMasuk ${3}s ease-in`;
            setTimeout(()=>{
                VideoLoading.style.display = "none";
                textAwal.classList.remove("d-none")
            }, 1000)
        })
    }, 1000)
});

//Slider System
// Sistem Penyambung Video
let container_Video = document.querySelector(".carousel-item")
let videoPlayer = document.querySelector(".videoPlayer")
let videoAwal = document.querySelector(".videoAwal")
let textAwal = document.querySelector(".textAwal")
let VideoSaatini = 0;


videoAwal.style.display = "none"
textAwal.classList.add("d-none")

Videos.forEach(vid => {
    let source = document.createElement("source");
    source.src = vid;
    source.type = "video/mp4";
    videoPlayer.appendChild(source);
    videoPlayer.load(source);

});



function hilangkanLoadings(){
    container_loading.classList.add("d-none")
    hilangkanSemuaIsi.classList.remove("d-none")
    createPathSejarah()
}

function munculkanLoadings(){
    hilangkanSemuaIsi.classList.add("d-none")
    container_loading.classList.remove("d-none")
}

function GantiVideo(videoPlayers) {
    const sources = videoPlayers.querySelectorAll("source");
    let indexSaatIni = Array.from(sources).findIndex(source => source.src === videoPlayers.currentSrc);
    
    indexSaatIni = (indexSaatIni === -1 || indexSaatIni === sources.length - 1) ? 0 : indexSaatIni + 1;
    videoPlayers.src = sources[indexSaatIni].src;
    videoAwal.src = sources[indexSaatIni].src;
    
    videoPlayer.load(sources);
    videoAwal.load(sources);
    videoAwal.play();            
    videoPlayers.play();
}


videoPlayer.addEventListener('ended', () => {
    GantiVideo(videoPlayer);
});

GantiVideo(videoPlayer);


function createPathSejarah(){  
    let titik1M = document.querySelector(".titik1Mobile")
    let titik2M = document.querySelector(".titik2Mobile")
    let titik3M = document.querySelector(".titik3Mobile")
    let titik4M = document.querySelector(".titik4Mobile")
    let titik5M = document.querySelector(".titik5Mobile")
    let titik6M = document.querySelector(".titik6Mobile")
    let titik7M = document.querySelector(".titik7Mobile")
    let titik8M = document.querySelector(".titik8Mobile")
    let titik9M = document.querySelector(".titik9Mobile")
    
    let titik1 = document.querySelector(".titik1")
    let titik2 = document.querySelector(".titik2")
    let titik3 = document.querySelector(".titik3")
    let titik6 = document.querySelector(".titik6")

    let titik4 = document.querySelector(".titik4")
    let titik5 = document.querySelector(".titik5")


    let titik7 = document.querySelector(".titik7")
    let titik8 = document.querySelector(".titik8")

    let titik9 = document.querySelector(".titik9")
    let titik10 = document.querySelector(".titik10")

    let titik11 = document.querySelector(".titik11")
    let titik12 = document.querySelector(".titik12")

    CreateConnectPath(titik1, titik2, "black", "dash", "mid")
    CreateConnectPath(titik2, titik3, "black", "dash", "mid")
    CreateConnectPath(titik3, titik6, "black", "dash", "mid","right")
    CreateConnectPath(titik4, titik5, "black", "dash", "mid", "bottom")
    CreateConnectPath(titik7, titik8, "black", "dash", "left", "bottom")
    CreateConnectPath(titik9, titik10, "black", "dash", "right", "top")
    CreateConnectPath(titik10, titik10, "black", "dash", "top", "bottom")
    CreateConnectPath(titik11, titik12, "black", "dash", "right", "top")
    CreateConnectPath(titik12, titik12, "black", "dash", "top", "bottom")



    CreateConnectPath(titik1M, titik2M, "black", "dash", "mid")
    CreateConnectPath(titik1M, titik3M, "black", "dash", "mid", "left")
    CreateConnectPath(titik1M, titik4M, "black", "dash", "mid", "left")
    CreateConnectPath(titik1M, titik5M, "black", "dash", "mid", "left")
    CreateConnectPath(titik1M, titik6M, "black", "dash", "mid", "left")
    CreateConnectPath(titik1M, titik7M, "black", "dash", "mid", "left")
    CreateConnectPath(titik1M, titik8M, "black", "dash", "mid", "left")
    CreateConnectPath(titik1M, titik9M, "black", "dash", "mid", "left")

}
