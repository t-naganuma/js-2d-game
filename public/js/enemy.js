let enemies = [];
class Enemy extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h, './image/enemy.png');
        this.speed = Math.random() * 3 + 2;
        enemies.push(this);
    }

    move() {
        if (gameStartFlag) {
            this.x = this.x - this.speed;
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
            if (this.x < -100) this.x = 1100;
        }
    }
}
