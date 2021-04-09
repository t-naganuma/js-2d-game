// const pool = require('pg');
// const bodyParser = require("body-parser");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bg = new Image(); // 背景
const moon = new Image();
bg.src = './image/bg.png';
moon.src = './image/moon.png';

class GameObject {
    constructor(x, y, w, h, src) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        if (src) {
            this.image = new Image();
            this.image.src = src;
        }
    }
}

class Tree extends GameObject {
    constructor() {
        super(200, 500, 128, 128, './image/tree.png')
        this.flag = false; // キャラがジャンプしたらtrueになる。
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    move() {
        this.x -= 2;
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
}
const tree = new Tree();

let items = [];
class Item extends GameObject {
    constructor(x, y) {
        super(x, y, 36, 36, './image/fruit_grape.png');
        this.speed = Math.random() * 3 + 2;
        items.push(this);
    }

    move() {
        this.x = this.x - this.speed;
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

        if (this.x < -100) this.x = 1100;
    }
}

for (let i = 0; i < 3; i++) {
    new Item(300 * Math.random() * i + 1000, 400 * Math.random());
}

class InvincibleItem extends GameObject {
    constructor(x, y) {
        super(x, y, 50, 50, './image/star.png')
        this.speed = 10;
    }

    move() {
        this.x = this.x - this.speed;
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        if (this.x < -1000) this.x = 2000;
    }
}
const invincibleItem = new InvincibleItem(1500, 400 * Math.random());

let enemies = [];
class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y, 70, 70, './image/enemy.png');
        this.speed = Math.random() * 3 + 2;
        enemies.push(this);
    }

    move() {
        this.x = this.x - this.speed;
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

        if (this.x < -100) this.x = 1100;
    }
}

for (let i = 1; i <= 4; i++) {
    new Enemy(400 * Math.random() * i + 500, 400 * Math.random());
}

function addEnemy() {
    for (let i = 1; i <= 3; i++) {
        new Enemy(200 * Math.random() + 1000, 500 * Math.random());
    }
}

class Character extends GameObject {
    constructor() {
        super(240, 460, 64, 64, './image/64.png');
        this.vy = 0; // 重力
        this.jumpPower = -15;
        this.jumping = false; // ジャンプしているか
        this.walking = false;
        this.column = 1;
        this.row = 1;
        this.hitEnemy = false;
        this.frameCount = 6; // フレームのカウント
        this.score = 0;
        this.invincibleFlag = false;
        this.invincibleTime = 0;
        this.fireImage = new Image();
        this.fireImage.src = './image/fire.png';
    }

    draw() {
        ctx.drawImage(
            this.image, // スプライト画像
            this.column * 64, // スプライト画像から切り抜く列
            this.row * 64, // スプライト画像から切り抜く行
            this.w, // 切り出すサイズ 幅
            this.h, // 切り出すサイズ 高さ
            this.x, // 書き出すx座標
            this.y, // 書き出すy座標
            64, // 表示サイズ 幅
            64 // 表示サイズ 高さ
        );

        // 無敵状態だったら
        if(this.invincibleFlag) {
            ctx.drawImage(
                this.fireImage, // スプライト画像
                0,
                0,
                400,
                400,
                this.x - 70,
                this.y - 130,
                200, // 表示サイズ 幅
                200 // 表示サイズ 高さ
            );
        }
        let text = "スコア: " + this.score;
        ctx.font = "24px serif";
        ctx.fillStyle = "#fff";
        ctx.fillText(text, 0, 24);
    }

    walkRight() { // 右に歩く
        if (this.x < 872) {
            this.walking = true;
            this.row = 0;
            this.x += 10;
        }
    }

    walkLeft() { // 左に歩く
        if (this.x > 0) {
            this.walking = true;
            this.row = 0;
            this.x -= 10;
        }
    }

    jump() {
        this.vy = this.jumpPower;
        this.jumping = true;
        this.column = 0;
        this.row = 0;
    }

    // 障害物に当たった場合
    hitObstacle() {
        if (!this.invincibleFlag) {
            this.jumping = false;
            this.hitEnemy = true;
            this.column = 3; // 倒れているキャラクター
            this.row = 1; // 倒れているキャラクター
        }
    }

    hit() {
        // 石に当たったかどうか
        if (this.hitEnemy) {
            this.y += 16; // キャラクターをcanvas外に移動させる。
        }

        // canvasの外側に落ちたらゲームオーバー
        if (this.y >= canvas.height || this.y < -50) {
            this.gameOver();
        }
    }

    // アイテムを手に入れたか
    getItem(item) {
        // itemのxを再設定
        item.x = 1100;
        // y座標を再設定
        item.y = 400 * Math.random();
    }

    scoreCount() {
        this.score += 1;
        if (this.score === 10) {
            addEnemy();
        }
    }

    isInvincible() {
        if (this.invincibleFlag) {
            this.invincibleTime++;
            if (this.invincibleTime > 180) {
                this.invincibleFlag = false;
                this.invincibleTime = 0;
            }
        }
    }

    getInvincible() {
        const distanceX = this.x - invincibleItem.x;
        const distanceY = this.y - invincibleItem.y;
        if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
            this.invincibleFlag = true;
            invincibleItem.x = 5000;
            invincibleItem.y = 400 * Math.random;
        }
    }

    gameOver() {
        cancelAnimationFrame(interval);
        alert('ゲームオーバー')
        let text = "手に入れたぶどう: " + this.score + "個";
        let ele = document.getElementsByClassName("score")[0];
        ele.innerHTML = text;
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('restartButton').style.display = 'inline-block';

        document.getElementById('form').style.opacity = 1;
        document.getElementById('playerScore').append(this.score + '個');
    }

    update() {
        // 無敵化判定
        this.isInvincible();
        console.log(invincibleItem.x);
        // jumpしたら
        if (this.jumping) {
            this.y += this.vy;
            this.vy += 1;
            // 羽ばたくようにスプレッド画像の位置を変更
            // frameCountが6になったら羽ばたくようにする
            if (this.frameCount === 6) {
                if (this.column === 1) {
                    this.column = 2;
                } else if(this.column === 2) {
                    this.column = 3;
                } else if (this.column === 3) {
                    this.column = 2;
                } else {
                    this.column = 1;
                }
                // frameCountをリセットする
                this.frameCount = 0;
            }
            this.frameCount += 1;
        }

        // 石に当たったか。
        this.hit();

        // 敵
        enemies.forEach((enemy) => { // 石とキャラの距離を測り0になったらゲームオーバー
            const distanceX = this.x - enemy.x;
            const distanceY = this.y - enemy.y;
            // 横の距離と縦の距離が20以下ならゲームオーバー
            if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
                this.hitObstacle();
            }
        });

        // アイテム
        items.forEach((item) => { // itemを取ったか
            const distanceX = this.x - item.x;
            const distanceY = this.y - item.y;
            if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
                this.getItem(item);
                this.scoreCount();
            }
        });

        this.getInvincible();

        this.draw();
    }
}

const character = new Character;

let interval;
let jumpFlag = false;
function draw() {
    ctx.clearRect(0, 0, 1000, 600); // canvasエリアを白紙にする
    ctx.drawImage(bg, 0, 0, 1000, 600); // 背景を描く
    ctx.drawImage(moon, 800, 50, 64, 64);
    enemies.forEach((enemy) => { // 石を描画し動かす
        enemy.move();
    });

    items.forEach((item) => {
        item.move();
    });

    invincibleItem.move();

    if (jumpFlag === false) tree.draw()
    else tree.move();

    interval = requestAnimationFrame(draw);
    character.update(); // キャラクターを描画し続ける。
}

// ゲームスタート
document.getElementById('startButton').addEventListener('click', gameStart);
function gameStart() {
    canvas.style.opacity = 1;
    requestAnimationFrame(draw);

    window.onkeydown = (event) => {
        if (event.code === 'ArrowUp') {
            character.jump();
            jumpFlag = true;
        }
    };
}

document.getElementById('restartButton').addEventListener('click', reStart);
function reStart() {
    location.reload();
}

window.onload = () => {
    ctx.drawImage(bg, 0, 0, 1000, 600);
    ctx.drawImage(moon, 800, 50, 64, 64);
}

// 通信処理
function getRanking() {
    // axios.get('https://xhid6nw6ka.execute-api.ap-northeast-1.amazonaws.com/default/hello')
    axios.get('http://localhost:5000/ranking')
        .then((response) => {
            // console.log("-----");
            // console.log(response);
            // console.log("-----");
            let data = response.data;
            // scoreが大きい順にソート
            data.sort((a, b) => { return b.score - a.score; });
            let scoreData = [];
            for(let i = 0; i < 5; i++) {
                scoreData.push(data[i]);
            }
            let rankText = document.getElementsByClassName('js-rank');
            let index = 0;
            scoreData.forEach((data) => {
                let html = `
                    <span class="ranking_score">${data.score}個</span>
                    <span class="ranking_name">${data.name}</span>
                `;
                rankText[index].innerHTML = html;
                index++
            });

            document.getElementById("ranking").classList.add("is-show");
        })
        .catch((error) => {
            console.log(error);
        });
}

// スコア送信
function sendData() {
    const FD = new FormData(form);
    const name = FD.get('name');
    const score = character.score;

    // axios.post('https://xhid6nw6ka.execute-api.ap-northeast-1.amazonaws.com/default/hello', FD)
    axios.post('http://localhost:5000/post', {name: name, score: score})
    .then((response) => {
        document.getElementById('form').style.opacity = 0;
        getRanking();
    })
    .catch((error) => {
        console.log(error);
    });
}

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendData();
});
