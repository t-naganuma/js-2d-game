let items = [];
class Item extends GameObject {
    constructor(x, y) {
        super(x, y, 36, 36, './image/fruit_grape.png');
        this.speed = Math.random() * 3 + 2;
        items.push(this);
    }

    move() {
        if(gameStartFlag) {
            this.x = this.x - this.speed;
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
            if (this.x < -100) this.x = 1100;
        }
    }
}

// 無敵アイテム
class InvincibleItem extends GameObject {
    constructor(x, y) {
        super(x, y, 50, 50, './image/star.png')
        this.speed = 10;
    }

    move() {
        if (gameStartFlag) {
            this.x = this.x - this.speed;
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
            if (this.x < -1000) this.x = 2000;
        }
    }
}
let invincibleItem = new InvincibleItem(1500, 400 * Math.random());
