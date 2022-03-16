var photoArray = [
    {filename: "memchu.jpg",
        caption: "Stanford Memorial Church - the church used to have an 80' bell tower, which fell in the 1906 earthquake."},
    {filename: "quad.jpg",
        caption: "The Stanford Quad"},
    {filename: "hoop.jpg",
        caption: "The <i>Red Hoop Fountain</i> with Green Library in the background."},
    {filename: "memorial-court.jpg",
        caption: "Memorial Court (in the front of the Quad) with Rodin's <i>Burghers of Calais</i> statues."},
    {filename: "gates.jpg",
        caption: "The Gates Building - home of Stanford Computer Science."},
    {filename: "stone-river.jpg",
        caption: "The Stone River statue near the Cantor Arts Center (Stanford's own art museum)."},
];

const img = document.getElementById('img');
const caption = document.getElementById('caption');
const captionText = document.getElementById('caption-text');

let arrayIndex = 0;

img.onclick = (e) => {
    const clickX = e.clientX;

    if (clickX/800 >= 0.5) {
        next(arrayIndex === photoArray.length - 1 ? 0 : arrayIndex + 1);
    } else if (clickX/800 < 0.5) {
        next(arrayIndex === 0 ? photoArray.length - 1 : arrayIndex - 1);
    }
}

function setImageUrl(url) {
    img.style.backgroundImage = `url('${url}')`;

}

function next(toIndex) {
    arrayIndex = toIndex
    setImageUrl(photoArray[toIndex].filename);
    captionText.innerHTML = photoArray[toIndex].caption
}