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
        if (browserWidth >= sp) {
            ctx.font = '48px serif';
        } else {
            ctx.font = '24px serif';
        }
        ctx.fillText(this.time, this.x, this.y);
    }
}
document.getElementById('startButton').addEventListener('click', gameStart);
let countdown;
if (browserWidth >= sp) {
    countdown = new CountDown(500, 300);
} else {
    countdown = new CountDown(180, 200);
}

let gameStartFlag = false; //ゲームスタートしているか
let currentStage = 1; // 現在のステージ
let interval;
let increasedEnemyFlag = true;

function gameStart() {
    document.getElementById('gameInfo').classList.add('is-hide');
    canvas.style.opacity = 1;
    countdown.start();
    requestAnimationFrame(draw);

    window.onkeydown = (event) => {
        if (event.code === 'KeyJ') {
            character.jump();
            jumpFlag = true;
        }
    };
}

function draw() {
    if(browserWidth >= sp) {
        ctx.clearRect(0, 0, 1000, 600); // canvasエリアを白紙にする
        ctx.drawImage(stage.stageBg, 0, 0, 1000, 600); // 背景を描く
    } else {
        ctx.clearRect(0, 0, browserWidth, canvasHeight); // canvasエリアを白紙にする
        ctx.drawImage(stage.stageBg, 0, 0, browserWidth, canvasHeight); // 背景を描く
    }

    // if (currentStage === 1 || currentStage === 3) {
    //     ctx.drawImage(moon, 800, 50, 64, 64);
    // }

    enemies.forEach((enemy) => { // 敵キャラを描画し動かす
        enemy.move();
    });

    items.forEach((item) => {
        item.move();
    });

    invincibleItem.move();
    if (jumpFlag === false) {
        tree.draw();
    } else {
        tree.move()
    };

    countdown.update();

    if (character.score >= 5 && increasedEnemyFlag) {
        stage.addEnemies();
        increasedEnemyFlag = false;
    }


    interval = requestAnimationFrame(draw);
    character.update(); // キャラクターを描画し続ける。
}