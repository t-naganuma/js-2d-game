class StageObject {
    constructor(gameInfo) {
        this.currentStage = 1;
        this.goalFlag = false;
        this.score = 0;
        this.frameCount = 0;
        this.gameInfo = gameInfo.stage;
        this.enemyInfo = gameInfo.enemyInfo;
        this.itemInfo = gameInfo.itemInfo;
        this.stageEnemy; // 敵数
        this.stageItem; // アイテム数
        this.stageBg = new Image(); // 背景
        this.stageInvincibleItem;
    }

    setStage() {
        switch(currentStage) {
            case 1:
                this.stageEnemy = this.gameInfo.first.enemy;
                this.increasedOfEnemy = this.gameInfo.first.increasedOfEnemy;
                this.stageBg.src = this.gameInfo.first.background;
                this.stageItem = this.gameInfo.first.item;
                break;
            case 2:
                this.stageEnemy = this.gameInfo.second.enemy;
                this.increasedOfEnemy = this.gameInfo.second.increasedOfEnemy;
                this.stageBg.src = this.gameInfo.second.background;
                this.stageItem = this.gameInfo.second.item;
                break;
            case 3:
                this.stageEnemy = this.gameInfo.third.enemy;
                this.increasedOfEnemy = this.gameInfo.third.increasedOfEnemy;
                this.stageBg.src = this.gameInfo.third.background;
                this.stageItem = this.gameInfo.third.item;
                break;
        }

        let itemW, itemH, enemyW, enemyH;
        if (window.innerWidth < spW) {
            enemyW = this.enemyInfo.spWidth;
            enemyH = this.enemyInfo.spHeight;
            itemW = this.itemInfo.spWidth;
            itemH = this.itemInfo.spHeight;
        } else {
            enemyW = this.enemyInfo.pcWidth;
            enemyH = this.enemyInfo.pcHeight;
            itemW = this.itemInfo.pcWidth;
            itemH = this.itemInfo.pcHeight;
        }

        for (let i = 0; i < this.stageEnemy; i++) {
            new Enemy(300 * Math.random() + 600, 400 * Math.random() + 100, enemyW, enemyH);
        }
        
        for (let i = 0; i < this.stageItem; i++) {
            new Item(300 * Math.random() + 600, 400 * Math.random() + 100, itemW, itemH);
        }

        invincibleItem = new InvincibleItem(invincibleItemX, 450 * Math.random(), invincibleItemW, invincibleItemH);
        increasedEnemyFlag = true;
    }

    addEnemies() {
        for (let i = 0; i < this.increasedOfEnemy; i++) {
            new Enemy(300 * Math.random() + 600, 400 * Math.random() + 100, enemyW, enemyH);
        }
    }

    finish() {
        cancelAnimationFrame(interval);
        document.getElementById('modal').classList.add('is-show');
        this.score += character.score;
        character.score = 0;
        jumpFlag = false;
    }

    nextStage() {
        jumpFlag = false;
        tree.x = treeX;
        tree.y = treeY;
        tree.w = treeW;
        tree.h = treeH;
        tree.draw();

        character.init();
        character.draw();

        enemies.length = 0;
        items.length = 0;
        currentStage++;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ステージ情報書き換え
        this.setStage();

        ctx.drawImage(this.stageBg, 0, 0, canvas.width, canvas.height); // 背景を描く

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
    // await axios.get('http://localhost:5000/gameInfo.json')
    await axios.get('https://js-2d-game.herokuapp.com/gameInfo.json')
        .then(response => {
            stage = new StageObject(response.data);
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