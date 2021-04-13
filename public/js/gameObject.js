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

