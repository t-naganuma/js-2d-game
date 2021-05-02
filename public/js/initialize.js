let canvas; 
let canvasWidth;
let ctx;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onload = () => {
    init();
}
// canvasタグは1つにしてブラウザサイズでやる