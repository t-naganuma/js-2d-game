const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const stone = new Image(); // 石を複数別の物を表示したい場合、Stoneクラスに入れる。
stone.src = './image/stone.png';
const bg = new Image(); // 背景
bg.src = './image/bg_natural_sougen.jpg';

let stones = [];
class Stone {
    constructor(x) {
        this.x = x;
        this.y = 450;
        this.w = 100;
        this.h = 100;
        stones.push(this);
    }

    move() {
        this.x = this.x - 2;
        ctx.drawImage(stone, this.x, this.y, this.w, this.h);

        if (this.x < -100) {
            this.x = 1100;
        }
    }
}

for (let i = 1; i <= 10; i++) {
    new Stone(300 * Math.random() * i + 1000 + 300 * i);
}

class Character {
    constructor() {
        this.x = 100;
        this.y = 400;
        this.w = 128;
        this.h = 128;
        this.vy = 0; // 重力
        this.jumpPower = -20;
        this.jumping = false; // ジャンプしているか
        this.walking = false;
        this.character = new Image();
        this.character.src = './image/128.png';
        this.column = 1;
        this.row = 1;
        this.hitStone = false;
        this.frameCount = 6; // フレームのカウント
    }

    draw() {
        ctx.drawImage(
            this.character, // スプライト画像
            this.column * 128, // スプライト画像から切り抜く列
            this.row * 128, // スプライト画像から切り抜く行
            this.w, // 切り出すサイズ 幅
            this.h, // 切り出すサイズ 高さ
            this.x, // 書き出すx座標
            this.y, // 書き出すy座標
            128, // 表示サイズ 幅
            128 // 表示サイズ 高さ
        );
    }

    walkRight() {
        if (this.x < 872) {
            this.walking = true;
            this.row = 0;
            this.x += 10;
        }
    }

    walkLeft() {
        if (this.x > 0) {
            this.walking = true;
            this.row = 0;
            this.x -= 10;
        }
    }

    jump() {
        if (this.jumping === false) {
            this.vy = this.jumpPower;
            this.jumping = true;
            this.column = 0;
            this.row = 0;
        }

        // TODO ２段ジャンプ
    }

    // 障害物に当たった場合
    hitObstacle() {
        this.jumping = false;
        this.hitStone = true;
        this.column = 3; // 倒れているキャラクター
        this.row = 1; // 倒れているキャラクター
    }

    gameOver() {
        cancelAnimationFrame(interval);
        alert('ゲームオーバー')
        document.location.reload();
    }

    
    update() {
        console.log('update');

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

        // キャラクターのy座標が400以下以上落ちないようにする。
        if (this.y >= 400 && this.jumping) {
            this.jumping = false;
            this.column = 1;
            this.row = 1;
        }

        // 石に当たったら TODOメソッドにする
        if (this.hitStone) {
            if (this.column === 3 && this.row === 1) {
                this.column = 2;
            } else if (this.column === 2 && this.row === 1) {
                this.column = 3;
            }
            this.y += 16; // キャラクターをcanvas外に移動させる。
        }
        // canvasの外側に落ちたらゲームオーバー
        if (this.y >= canvas.height) {
            this.gameOver();
        }

        // 歩く TODOメソッドにする
        if (this.walking && this.jumping === false) {
            if (this.frameCount === 6) {

                if (this.column === 0) {
                    this.column = 1;
                    this.walking = false;
                } else {
                    this.column = 0;
                    this.walking = false;
                }
                this.frameCount = 0;
            }
            this.frameCount += 1;
        } else if (this.walking === false && this.jumping === false) {
            this.column = 1;
            this.row = 1;
        }


        stones.forEach((stone, i) => { // 石とキャラの距離を測り0になったらゲームオーバー
            const distanceX = this.x - stone.x;
            const distanceY = this.y - stone.y;
            // 横の距離と縦の距離が20以下ならゲームオーバー
            if (Math.abs(distanceX) <= 20 && Math.abs(distanceY) <= 50) {
                this.hitObstacle();
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
    
    stones.forEach((stone, i) => { // 石を描画し動かす
        stone.move();
    });

    interval = requestAnimationFrame(draw);
    
    character.update(); // ユニコーンを描画し続ける。
}

// ゲームスタート
function gameStart() {
    canvas.style.opacity = 1;
    requestAnimationFrame(draw);

    window.onkeydown = (event) => {
        if (event.code === 'ArrowUp') {
            character.jump();
        } else if (event.code === 'ArrowRight') {
            character.walkRight();
        } else if (event.code === 'ArrowLeft') {
            character.walkLeft();
        }
    };
}

window.onload = () => {
    ctx.drawImage(bg, 0, 0, 1000, 600);
}

// TODO
// 追加機能例
// 無敵アイテム
// 石が増える

// AWS アカウント作成,S3について調べる