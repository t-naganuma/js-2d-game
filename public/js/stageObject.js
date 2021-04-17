require('dotenv').config();

class StageObject {
    constructor(stageInfo) {
        this.currentStage = 1;
        this.goalFlag = false;
        this.score = 0;
        this.frameCount = 0;
        this.stageInfo = stageInfo;
        this.stageEnemy; // 敵数
        this.stageItem; // アイテム数
        this.stageBg = new Image(); // 背景
        this.stageInvincibleItem;
    }

    setStage() {
        switch(currentStage) {
            case 1:
                this.stageEnemy = this.stageInfo.first.enemy;
                this.stageBg.src = this.stageInfo.first.background;
                this.stageItem = this.stageInfo.first.item;
                break;
            case 2:
                this.stageEnemy = this.stageInfo.second.enemy;
                this.stageBg.src = this.stageInfo.second.background;
                this.stageItem = this.stageInfo.second.item;
                break;
            case 3:
                this.stageEnemy = this.stageInfo.third.enemy;
                this.stageBg.src = this.stageInfo.third.background;
                this.stageItem = this.stageInfo.third.item;
                break;
        }

        for (let i = 0; i < this.stageEnemy; i++) {
            new Enemy(300 * Math.random() * i + 1000, 400 * Math.random());
        }

        for (let i = 0; i < this.stageItem; i++) {
            new Item(300 * Math.random() * i + 1000, 400 * Math.random());
        }

        invincibleItem = new InvincibleItem(1500, 400 * Math.random());
    }

    finish() {
        cancelAnimationFrame(interval);
        document.getElementById('modal').classList.add('is-show');
        this.score += character.score;
        character.score = 0;
        jumpFlag = false;
    }

    nextStage() {
        tree.x = 200;
        tree.y = 500;
        tree.w = 128;
        tree.h = 128;
        tree.draw();
        character.init();
        character.draw();
        enemies.length = 0;
        items.length = 0;
        currentStage++;

        ctx.clearRect(0, 0, 1000, 600); // canvasエリアを白紙にする
        // ステージ情報書き換え
        this.setStage();
        ctx.drawImage(this.stageBg, 0, 0, 1000, 600); // 背景を描く

        countdown.time = 3;
        countdown.start();
        this.currentStage++;

        cancelAnimationFrame(interval);
        draw();
    }
}


const moon = new Image();
moon.src = './image/moon.png';

let stage;
async function getStageJson() {
    // ステージ情報を取得
    // console.log(process.env.BASE_URL);
    // await axios.get('http://localhost:5000/stage.json')
    await axios.get('https://js-2d-game.herokuapp.com/stage.json')
        .then(response => {
            stage = new StageObject(response.data.stage);
            stage.setStage();
        })
        .catch(error => {
            console.log(error);
        })
}
getStageJson();

// NextStage移行処理
const modal = document.getElementById('modal');
document.querySelector('.js-nextStage').addEventListener('click', () => {
    modal.classList.remove('is-show');
    gameStartFlag = false;
    stage.nextStage();
});