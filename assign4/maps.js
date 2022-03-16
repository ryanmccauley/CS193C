document.addEventListener('mousemove', (e) => {
    e.preventDefault();

    if (e.target !== mapImage) return;
    if (!isDragging) return;

    const { clientX, clientY } = e;

    const currX = initialX - clientX;
    const currY = initialY - clientY;

    initialX = clientX;
    initialY = clientY;

    mapImage.style.left = (mapImage.offsetLeft - currX) + 'px';
    mapImage.style.top = (mapImage.offsetTop - currY) + 'px';
})

const mapFrame = document.getElementById('map-frame');
const mapImage = document.getElementById('map-img');
let currentTop = mapImage.clientHeight, currentLeft = mapImage.clientWidth;
let initialX, initialY;
let isDragging = false;
const maps = ['map-s.gif', 'map-m.gif', 'map-l.gif', 'map-xl.gif'];
let currentIndex = 0;

document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.target !== mapImage) return;

    const { clientX, clientY } = e;

    initialX = clientX;
    initialY = clientY;

    isDragging = true;

    mapFrame.classList.toggle('cursor-pointer');
})

document.addEventListener('mouseup', (e) => {
    e.preventDefault();

    if (e.target !== mapImage) return;

    const { clientX, clientY } = e;

    const currX = initialX - clientX;
    const currY = initialY - clientY;

    initialX = clientX;
    initialY = clientY;

    mapImage.style.left = (mapImage.offsetLeft - currX) + 'px';
    mapImage.style.top = (mapImage.offsetTop - currY) + 'px';

    isDragging = false;

    mapFrame.classList.toggle('cursor-pointer');
})

document.addEventListener('dblclick', (e) => {
    e.preventDefault();

    if (e.target !== mapImage) return;

    const { offsetX, offsetY } = e;

    const dX = 400 - offsetX;
    const dY = 400 - offsetY;

    mapImage.style.left = dX + 'px';
    mapImage.style.top = dY + 'px';
})

let lastInnerHeight = window.innerHeight, lastInnerWidth = window.innerWidth;
let lastFrameHeight = mapFrame.clientHeight;

window.addEventListener("resize", (e) => {
    const pX = window.innerWidth / lastInnerWidth;
    const pY = window.innerHeight / lastInnerHeight
    const dX = lastInnerWidth - window.innerWidth;
    const dY = lastInnerHeight - window.innerHeight;

    mapImage.style.top = mapImage.offsetTop - dY + 'px'
    mapImage.style.left = mapImage.offsetLeft - dX + 'px'

    //mapImage.style.top = dY + 'px'

    mapFrame.style.height = (mapFrame.clientHeight * pY) + 'px';
    mapFrame.style.width = (mapFrame.clientWidth * pX) + 'px';

    lastInnerHeight = window.innerHeight;
    lastInnerWidth = window.innerWidth;
});

const scrollUp = document.getElementById('scrollUp'), scrollDown = document.getElementById('scrollDown'),
    scrollLeft = document.getElementById('scrollLeft'), scrollRight = document.getElementById('scrollRight');

const zoomOut = document.getElementById('zoomOut'), zoomIn = document.getElementById('zoomIn');

scrollUp.onclick = (e) => {
    mapImage.style.top = mapImage.offsetTop + (mapImage.clientHeight / 2) + 'px';
}

scrollDown.onclick = (e) => {
    mapImage.style.top = mapImage.offsetTop - (mapImage.clientHeight / 2) + 'px';
}

scrollLeft.onclick = (e) => {
    mapImage.style.left = mapImage.offsetLeft + (mapImage.clientWidth / 2) + 'px';
}

scrollRight.onclick = (e) => {
    mapImage.style.left = mapImage.offsetLeft - (mapImage.clientWidth / 2) + 'px';
}

zoomOut.onclick = (e) => {
    if (currentIndex - 1 >= 0) {
        currentIndex--;
        mapImage.src = maps[currentIndex];
    }
}

zoomIn.onclick = (e) => {
    if (currentIndex + 1 < maps.length) {
        currentIndex++;
        mapImage.src = maps[currentIndex];
    }
}