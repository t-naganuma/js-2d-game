let canvas; 
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let ctx;
const spW = 768;
// character info
let charW, charH, charX, charY, charJumpPower, charDrawSize, charDistanceX, charDistanceY;
const charObj = {
    pc: [240, 460, 64, 64, -15, 64, 30, 40],
    sp: [50, canvasHeight - 130, 64, 64, -10, 48, 30, 30]
}
// tree info
let treeW, treeH, treeX, treeY;
const treeObj = {
    pc: [200, 500, 128, 128],
    sp: [10, canvasHeight - 100, 128, 128]
}
// countdown
let countdownX, countdownY;
// 無敵アイテム
let invincibleItemX, invincibleItemY, invincibleItemW, invincibleItemH;
const invincibleItemObj = {
    pc: [1500, 400 * Math.random(), 50, 50],
    sp: [700, 500 * Math.random(), 40, 40]
} 
if (window.innerWidth < spW) {
    // sp canvas size
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    // character
    [charX, charY, charW, charH, charJumpPower, charDrawSize, charDistanceX, charDistanceY] = charObj.sp;
    // tree
    [treeX, treeY, treeW, treeH] = treeObj.sp;
    // 無敵アイテム
    [invincibleItemX, invincibleItemY, invincibleItemW, invincibleItemH] = invincibleItemObj.sp;
    // カウントダウン
    countdownX = canvasWidth / 2;
    countdownY = canvasHeight / 2;
    
} else {
    // pc canvas size
    canvasWidth = 1000;
    canvasHeight = 600;
    // character
    [charX, charY, charW, charH, charJumpPower, charDrawSize, charDistanceX, charDistanceY] = charObj.pc;
    // tree
    [treeX, treeY, treeW, treeH] = treeObj.pc;
    // 無敵アイテム
    [invincibleItemX, invincibleItemY, invincibleItemW, invincibleItemH] = invincibleItemObj.pc;
    // カウントダウン
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
