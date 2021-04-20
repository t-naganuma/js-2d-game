class GameObject {
    constructor(x, y, w, h, src) {
        this.x = x; // x座標
        this.y = y; // y座標
        this.w = w; // 切り出すサイズ:幅
        this.h = h; // 切り出すサイズ:高さ
        if (src) {
            this.image = new Image();
            this.image.src = src;
        }
    }
}

