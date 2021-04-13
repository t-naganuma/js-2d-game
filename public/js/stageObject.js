class StageObject {
    constructor() {
        this.currentStage = 1;
        this.goalFlag = false;
        this.score = [];
        this.frameCount = 0;
    }

    goal() {
        cancelAnimationFrame(interval);
        console.log('ゴール');
        document.getElementById('modal').classList.add('is-show');
        this.score.push(character.score);
        jumpFlag = false;
    }

    stageReset() {
        ctx.clearRect(0, 0, 1000, 600); // canvasエリアを白紙にする
        ctx.drawImage(bg, 0, 0, 1000, 600); // 背景を描く
        ctx.drawImage(moon, 800, 50, 64, 64);
        tree.x = 200;
        tree.y = 500;
        tree.w = 128;
        tree.h = 128;
        tree.draw();
        character.init();
        character.draw();
        enemies.length = 0;
        items.length = 0;
        this.nextStage();
    }

    nextStage() {
        this.currentStage++;
        for (let i = 0; i < 3; i++) {
            new Item(300 * Math.random() * i + 1000, 400 * Math.random());
        }
        for (let i = 0; i < 3; i++) {
            new Enemy(300 * Math.random() * i + 1000, 400 * Math.random());
        }
        console.log("ステージ2");
        cancelAnimationFrame(interval);
        draw();
    }
}
const stage = new StageObject();
const modal = document.getElementById('modal');
document.querySelector('.js-nextStage').addEventListener('click', () => {
    modal.classList.remove('is-show');
    stage.stageReset();
});