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

function CreateConnectPath(from, to, color, type, anchorStart, anchorEnd, zI) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.style.position = "absolute";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = zI ? zI : "-1";

    console.log(zI)

    document.body.appendChild(svg);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "3");
    if (type === "dash") path.setAttribute("stroke-dasharray", "5");
    path.setAttribute("fill", "none");
    svg.appendChild(path);

    function getOffset(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
        };
    }

    function calculateAnchorPoint(elementOffset, anchor, minX, minY) {
        let x, y;
        switch (anchor) {
            case "mid":
                x = elementOffset.x - minX + elementOffset.width / 2;
                y = elementOffset.y - minY + elementOffset.height / 2;
                break;
            case "side":
                const startCenterX = elementOffset.x + elementOffset.width / 2;
                const startCenterY = elementOffset.y + elementOffset.height / 2;
                const deltaX = startCenterX - (minX + (svg.clientWidth / 2));
                const deltaY = startCenterY - (minY + (svg.clientHeight / 2));
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    x = deltaX > 0 ? elementOffset.x - minX : elementOffset.x - minX + elementOffset.width;
                    y = elementOffset.y - minY + elementOffset.height / 2;
                } else {
                    y = deltaY > 0 ? elementOffset.y - minY : elementOffset.y - minY + elementOffset.height;
                    x = elementOffset.x - minX + elementOffset.width / 2;
                }
                break;
            case "top":
                x = elementOffset.x - minX + elementOffset.width / 2;
                y = elementOffset.y - minY;
                break;
            case "right":
                x = elementOffset.x - minX + elementOffset.width;
                y = elementOffset.y - minY + elementOffset.height / 2;
                break;
            case "bottom":
                x = elementOffset.x - minX + elementOffset.width / 2;
                y = elementOffset.y - minY + elementOffset.height;
                break;
            case "left":
                x = elementOffset.x - minX;
                y = elementOffset.y - minY + elementOffset.height / 2;
                break;
            default:
                x = elementOffset.x - minX + elementOffset.width / 2;
                y = elementOffset.y - minY + elementOffset.height / 2;
                break;
        }
        return { x, y };
    }

    function updatePath() {
        const startOffset = getOffset(from);
        const endOffset = getOffset(to);

        const minX = Math.min(startOffset.x, endOffset.x);
        const minY = Math.min(startOffset.y, endOffset.y);
        const maxX = Math.max(startOffset.x + startOffset.width, endOffset.x + endOffset.width);
        const maxY = Math.max(startOffset.y + startOffset.height, endOffset.y + endOffset.height);

        svg.style.top = `${minY}px`;
        svg.style.left = `${minX}px`;
        svg.style.width = `${maxX - minX}px`;
        svg.style.height = `${maxY - minY}px`;

        const startPoint = calculateAnchorPoint(startOffset, anchorStart, minX, minY);
        const endPoint = calculateAnchorPoint(endOffset, anchorEnd, minX, minY);

        const startX = startPoint.x;
        const startY = startPoint.y;
        const endX = endPoint.x;
        const endY = endPoint.y;

        const isHorizontal = Math.abs(startY - endY) < 5;
        const isVertical = Math.abs(startX - endX) < 5;

        let pathData;
        if (isHorizontal || isVertical) {
            pathData = `M${startX},${startY} L${endX},${endY}`;
        } else {
            const midX = startX;
            const midY = endY;
            pathData = `M${startX},${startY} L${midX},${midY} L${endX},${endY}`;
        }

        path.setAttribute("d", pathData);
    }

    updatePath();

    window.addEventListener("resize", updatePath);
}

    
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
