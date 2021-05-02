let canvas; 
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let ctx;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

window.onload = () => {
    init();
}
// canvasタグは1つにしてブラウザサイズでやる