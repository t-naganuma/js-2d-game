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
const pcOrSpEvent = window.innerWidth < spW ? 'touchstart' : 'click';
document.getElementById('startButton').addEventListener('click', gameStart);

let countdown = new CountDown(countdownX, countdownY);
let gameStartFlag = false; //ゲームスタートしているか
let currentStage = 1; // 現在のステージ
let interval;
let increasedEnemyFlag = true;

function gameStart() {
    document.getElementById('gameInfo').classList.add('is-hide');
    canvas.style.opacity = 1;
    countdown.start();
    requestAnimationFrame(draw);

    handleJump();
}

function handleJump() {
    if (window.innerWidth < spW) {
        window.ontouchstart = () => {
            character.jump();
            jumpFlag = true;
        };
    } else {
        window.onkeydown = (event) => {
            if (event.code === 'KeyJ') {
                character.jump();
                jumpFlag = true;
            }
        };
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // canvasエリアを白紙にする
    ctx.drawImage(stage.stageBg, 0, 0, canvas.width, canvas.height); // 背景を描く

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

    if (character.score >= 6 && increasedEnemyFlag) {
        stage.addEnemies();
        increasedEnemyFlag = false;
    }

    stageBgm.play();

    interval = requestAnimationFrame(draw);
    character.update(); // キャラクターを描画し続ける。
}