const axios = require('axios');
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

        if (this.x < -100) {
            this.x = 1100;
        }
    }
}

for (let i = 0; i < 3; i++) {
    new Item(300 * Math.random() * i + 1000, 400 * Math.random());
}

let stones = [];
class Stone extends GameObject {
    constructor(x, y) {
        super(x, y, 100, 100, './image/stone.png');
        this.speed = Math.random() * 3 + 2;
        stones.push(this);
    }

    move() {
        this.x = this.x - this.speed;
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

        if (this.x < -100) {
            this.x = 1100;
        }
    }
}

for (let i = 1; i <= 4; i++) {
    new Stone(400 * Math.random() * i + 500, 400 * Math.random());
}

function addStone() {
    for (let i = 1; i <= 3; i++) {
        new Stone(200 * Math.random() + 1000, 500 * Math.random());
    }
}

class Character extends GameObject {
    constructor() {
        super(300, 440, 64, 64, './image/64.png');
        this.vy = 0; // 重力
        this.jumpPower = -15;
        this.jumping = false; // ジャンプしているか
        this.walking = false;
        this.column = 1;
        this.row = 1;
        this.hitStone = false;
        this.frameCount = 6; // フレームのカウント
        this.score = 0;
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
        this.jumping = false;
        this.hitStone = true;
        this.column = 3; // 倒れているキャラクター
        this.row = 1; // 倒れているキャラクター
    }

    hit() {
        // 石に当たったかどうか
        if (this.hitStone) {
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
            addStone();
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
    }

    
    update() {

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

        // 石
        stones.forEach((stone, i) => { // 石とキャラの距離を測り0になったらゲームオーバー
            const distanceX = this.x - stone.x;
            const distanceY = this.y - stone.y;
            // 横の距離と縦の距離が20以下ならゲームオーバー
            if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
                this.hitObstacle();
            }
        });

        // アイテム
        items.forEach((item, i) => { // itemを取ったか
            const distanceX = this.x - item.x;
            const distanceY = this.y - item.y;
            if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
                this.getItem(item);
                this.scoreCount();
            }
        });

        this.draw();
    }
}

const character = new Character;

let interval;
function draw() {
    ctx.clearRect(0, 0, 1000, 600); // canvasエリアを白紙にする
    ctx.drawImage(bg, 0, 0, 1000, 600); // 背景を描く
    ctx.drawImage(moon, 800, 50, 64, 64);
    stones.forEach((stone, i) => { // 石を描画し動かす
        stone.move();
    });

    items.forEach((item, i) => {
        item.move();
    });

    interval = requestAnimationFrame(draw);
    
    character.update(); // ユニコーンを描画し続ける。
}

// ゲームスタート
document.getElementById('startButton').addEventListener('click', gameStart);
function gameStart() {
    canvas.style.opacity = 1;
    requestAnimationFrame(draw);

    window.onkeydown = (event) => {
        if (event.code === 'ArrowUp') {
            character.jump();
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

// XMLHttpRequestインスタンス作成
const xhr = new XMLHttpRequest();
// 初期化
xhr.open("GET", "./test.json");
// リクエストの送信
// loadstart: リクエスト送信時, progress: データ送受信している途中
// load: リクエスト成功時, error: リクエストエラー時
xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    }
});
xhr.addEventListener("error", () => {
    console.log("error");
});
xhr.send();

axios.get('./test.json')
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });