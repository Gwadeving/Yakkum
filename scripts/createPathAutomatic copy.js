function CreateConnectPath(from, to, color, type, anchorStart, anchorEnd, zI) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.style.position = "absolute";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = zI ? zI : "-1";

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
