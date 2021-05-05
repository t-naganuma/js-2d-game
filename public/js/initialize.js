let canvas; 
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let ctx;
const spW = 768;
// character info
let charW, charH, charX, charY, charDrawSize;
const charObj = {
    pc: [240, 460, 64, 64, 64],
    sp: [60, canvasHeight - 130, 64, 64, 48]
}
// tree info
let treeW, treeH, treeX, treeY;
const treeObj = {
    pc: [200, canvasHeight - 100, 128, 128],
    sp: [10, canvasHeight - 100, 128, 128]
}

let countdownX, countdownY;

if (window.innerWidth < spW) {
    // sp canvas size
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    // character
    [charX, charY, charW, charH, charDrawSize] = charObj.sp;
    // tree
    [treeX, treeY, treeW, treeH] = treeObj.sp;
    countdownX = canvasWidth / 2;
    countdownY = canvasHeight / 2;
} else {
    // pc canvas size
    canvasWidth = 1000;
    canvasHeight = 600;
    // character
    [charX, charY, charW, charH, charDrawSize] = charObj.pc;
    // tree
    [treeX, treeY, treeW, treeH] = treeObj.pc;
    countdownX = 500;
    countdownY = 300;
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
