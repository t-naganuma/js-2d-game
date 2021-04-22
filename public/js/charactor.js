class Character extends GameObject {
    constructor() {
        if (browserWidth >= sp) {
            super(240, 460, 64, 64, './image/64.png');
            this.jumpPower = -15;
        } else {
            super(20, 100, 64, 64, './image/64.png');
            this.jumpPower = -6;
        }
        this.vy = 0; // 重力
        this.jumping = false; // ジャンプしているか
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

    init() {
        this.vy = 0;
        this.jumping = false;
        this.frameCount = 6;
        this.invincibleFlag = false;
        this.invincibleTime = 0;
        this.column = 1;
        this.row = 1;

        if (browserWidth >= sp) {
            this.x = 240;
            this.y = 460;
        } else {
            this.x = 20;
            this.y = 100;
        }

    }

    draw() {
        if (browserWidth >= sp) {
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
        } else {
            ctx.drawImage(
                this.image, // スプライト画像
                this.column * 64, // スプライト画像から切り抜く列
                this.row * 64, // スプライト画像から切り抜く行
                this.w, // 切り出すサイズ 幅
                this.h, // 切り出すサイズ 高さ
                this.x, // 書き出すx座標
                this.y, // 書き出すy座標
                28, // 表示サイズ 幅
                24 // 表示サイズ 高さ
            );
        }

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
        let sum = this.score + stage.score;
        let text = "スコア: " + sum;
        ctx.fillStyle = "#fffef9";
        if (browserWidth >= sp) {
            ctx.font = "24px serif";
            ctx.fillText(text, 0, 24);
        } else {
            ctx.font = "10px serif";
            ctx.fillText(text, 0, 12);
        }
    }

    jump() {
        this.vy = this.jumpPower;
        this.jumping = true;
        this.column = 0;
        this.row = 0;
    }

    checkJump() {
        if (this.jumping) {
            this.y += this.vy;

            if(browserWidth >= sp) { // PC
                this.vy += 1;
            } else { // SP
                this.vy += 0.4
            }
            // 羽ばたくようにスプレッド画像の位置を変更
            // frameCountが6になったら羽ばたくようにする
            if (this.frameCount === 6) {
                switch(this.column) {
                    case 1:
                        this.column = 2;
                        break;
                    case 2:
                        this.column = 3;
                        break;
                    case 3:
                        this.column = 2;
                        break;
                    default:
                        this.column = 1;
                        break;
                }
                // frameCountをリセットする
                this.frameCount = 0;
            }
            this.frameCount += 1;
        }
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
            browserWidth >= sp ? this.y += 16 : this.y += 3;
        }

        // canvasの外側に落ちたらゲームオーバー
        if (this.y >= canvas.height || this.y < -50) {
            this.gameOver();
        }
    }

    // アイテムを手に入れたか
    getItem(item) {
        if (browserWidth >= sp) {
            // itemのxを再設定
            item.x = 1100;
            // y座標を再設定
            item.y = 400 * Math.random();
        } else {
            // itemのxを再設定
            item.x = 800;
            // y座標を再設定
            item.y = 500 * Math.random();
        }
    }

    scoreCount() {
        this.score += 1;
        if (this.score === 1 && currentStage !== 3) {
            stage.finish();
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

        if(browserWidth >= sp) {
            if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
                this.invincibleFlag = true;
                invincibleItem.x = 5000;
                invincibleItem.y = 400 * Math.random();
            }
        } else {
            if (Math.abs(distanceX) <= 12 && Math.abs(distanceY) <= 12) {
                this.invincibleFlag = true;
                invincibleItem.x = 1000;
                invincibleItem.y = 400 * Math.random();
            }
        }
    }

    gameOver() {
        cancelAnimationFrame(interval);
        alert('ゲームオーバー')
        const totalScore = stage.score + this.score;

        document.getElementById('form').classList.add('is-show');
        document.getElementById('playerScore').append(totalScore + '個');
    }

    updateEnemies() {
        if (browserWidth >= sp) {
            enemies.forEach((enemy) => { // 石とキャラの距離を測り0になったらゲームオーバー
                const distanceX = this.x - enemy.x;
                const distanceY = this.y - enemy.y;
                // 横の距離と縦の距離が20以下ならゲームオーバー
                if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
                    this.hitObstacle();
                }
            });
        } else {
            enemies.forEach((enemy) => { // 石とキャラの距離を測り0になったらゲームオーバー
                const distanceX = this.x - enemy.x;
                const distanceY = this.y - enemy.y;
                // 横の距離と縦の距離が20以下ならゲームオーバー
                if (Math.abs(distanceX) <= 12 && Math.abs(distanceY) <= 12) {
                    this.hitObstacle();
                }
            });
        }
    }

    updateItems() {
        if (browserWidth >= sp) {
            items.forEach((item) => { // itemを取ったか
                const distanceX = this.x - item.x;
                const distanceY = this.y - item.y;
                if (Math.abs(distanceX) <= 30 && Math.abs(distanceY) <= 40) {
                    this.getItem(item);
                    this.scoreCount();
                }
            });
        } else {
            items.forEach((item) => { // itemを取ったか
                const distanceX = this.x - item.x;
                const distanceY = this.y - item.y;
                if (Math.abs(distanceX) <= 12 && Math.abs(distanceY) <= 12) {
                    this.getItem(item);
                    this.scoreCount();
                }
            });
        }
    }

    update() {
        // 無敵化判定
        this.isInvincible();
        // jumpしたら
        this.checkJump();
        // 石に当たったか。
        this.hit();
        // 敵
        this.updateEnemies();
        // アイテム
        this.updateItems();
        // 無敵アイテム
        this.getInvincible();
        // 描画
        this.draw();
    }
}
const character = new Character;
let jumpFlag = false; // ジャンプしているか