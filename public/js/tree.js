class Tree extends GameObject {
    constructor() {
        super(200, 500, 128, 128, './image/tree.png')
        this.flag = false; // キャラがジャンプしたらtrueになる。
    }
    init() {
        ctx.drawImage(this.image, 200, 500, 128, 128);
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