let gradienBlue = document.querySelectorAll(".gradienBlue"),
shadow_ = document.querySelectorAll(".shadow_")

gradienBlue.forEach((el, i) => {
    el.addEventListener("click", () => {
        // Simpan status shadow sebelum diubah
        const hadShadow = shadow_[i].classList.contains("shadow");
        
        // Hapus shadow dari semua elemen kecuali yang sedang diklik
        shadow_.forEach((shadowEl, idx) => {
            if (idx !== i) {
                shadowEl.classList.remove("shadow");
            }
        });
        
        // Toggle shadow pada elemen yang diklik
        shadow_[i].classList.toggle("shadow");
        
        // Jika elemen lain di-click saat ini aktif, matikan shadow-nya
        if (!hadShadow) {
            shadow_.forEach((shadowEl, idx) => {
                if (idx !== i) {
                    shadowEl.classList.remove("shadow");
                }
            });
        }
    });
});


const titik1 = document.querySelector(".titik1")
const titik2 = document.querySelector(".titik2")
const titik3 = document.querySelector(".titik3")
const titik4 = document.querySelector(".titik4")
const titik5 = document.querySelector(".titik5")
const titik6 = document.querySelector(".titik6")


CreateConnectPath(titik1, titik2, "var(--kiri-triangle)", "path", "mid", "right", "2")
CreateConnectPath(titik3, titik4, "var(--kanan-triangle)", "path", "mid", "left", "2")
CreateConnectPath(titik5, titik6, "var(--bawah-triangle)", "path", "mid", "top", "2")


const titik7 = document.querySelector(".titik7")
const titik8 = document.querySelector(".titik8")
const titik9 = document.querySelector(".titik9")
const titik10 = document.querySelector(".titik10")
const titik11 = document.querySelector(".titik11")
const titik12 = document.querySelector(".titik12")

const titik13 = document.querySelector(".titik13")
const titik14 = document.querySelector(".titik14")
const titik15 = document.querySelector(".titik15")
const titik16 = document.querySelector(".titik16")
const titik17 = document.querySelector(".titik17")
const titik18 = document.querySelector(".titik18")


CreateStraightPath(titik7, titik8, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik7, titik9, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik7, titik10, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik7, titik11, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik7, titik12, "black", "dash", "mid", "mid", "-1")

CreateStraightPath(titik13, titik14, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik13, titik15, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik13, titik16, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik13, titik17, "black", "dash", "mid", "mid", "-1")
CreateStraightPath(titik13, titik18, "black", "dash", "mid", "mid", "-1")
