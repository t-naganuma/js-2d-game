// ゲームスタート時にカウントダウンする。
class CountDown extends GameObject {
    constructor(x, y) {
        super(x, y, 70, 70);
        this.time = 3;
    }

    start() {
        setInterval(() => {
            this.time -= 1;
            if (this.time === 0) {
                gameStartFlag = true;
            }
        }, 1000);
    }

    update() {
        if (gameStartFlag) {
            return;
        }
        ctx.font = '48px serif';
        ctx.fillText(this.time, this.x, this.y);
    }
}
document.getElementById('startButton').addEventListener('click', gameStart);
let countdown = new CountDown(300, 300);

function gameStart() {
    document.getElementById('gameInfo').classList.add('is-hide');
    canvas.style.opacity = 1;
    countdown.start();
    requestAnimationFrame(draw);
    window.onkeydown = (event) => {
        if (event.code === 'ArrowUp') {
            character.jump();
            jumpFlag = true;
        }
    };
}

const character = new Character;

let interval;
let jumpFlag = false;
function draw() {
    ctx.clearRect(0, 0, 1000, 600); // canvasエリアを白紙にする
    ctx.drawImage(bg, 0, 0, 1000, 600); // 背景を描く
    ctx.drawImage(moon, 800, 50, 64, 64);
    // ステージ1
    enemies.forEach((enemy) => { // 敵キャラを描画し動かす
        enemy.move();
    });

    items.forEach((item) => {
        item.move();
    });

    invincibleItem.move();
    if (jumpFlag === false) tree.draw()
    else tree.move();

    countdown.update();

    interval = requestAnimationFrame(draw);
    character.update(); // キャラクターを描画し続ける。
}