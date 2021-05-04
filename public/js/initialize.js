let canvas; 
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let ctx;
const spW = 768;
let treeW, treeH, treeX, treeY;
if (window.innerWidth < spW) {
    // sp canvas size
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    // tree
    treeW = 128;
    treeH = 128;
    treeX = 10;
    treeY = canvasHeight - 100;
} else {
    // pc canvas size
    canvasWidth = 1000;
    canvasHeight = 600;
    // tree
    treeW = 128;
    treeH = 128;
    treeX = 200;
    treeY = canvasHeight - 100;
}

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