class Tree extends GameObject {
    constructor() {
        if(browserWidth >= sp) {
            super(200, 500, 128, 128, './image/tree.png')
        } else {
            super(10, 420, 60, 60, './image/tree.png')
        }
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