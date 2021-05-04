class Tree extends GameObject {
    constructor() {
        super(treeX, treeY, treeW, treeH, './image/tree.png')
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