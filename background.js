const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `Images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);

}
function genRandom() {
    return Math.floor(Math.random() * IMG_NUMBER);
}
function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();