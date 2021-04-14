let enemies = [];
class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y, 70, 70, './image/enemy.png');
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

for (let i = 1; i <= 4; i++) {
    new Enemy(400 * Math.random() * i + 500, 400 * Math.random());
}

function addEnemy() {
    for (let i = 1; i <= 3; i++) {
        new Enemy(200 * Math.random() + 1000, 500 * Math.random());
    }
}