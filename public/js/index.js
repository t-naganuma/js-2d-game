const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let gameStartFlag = false;
const bg = new Image(); // 背景
const moon = new Image();
bg.src = './image/bg.png';
moon.src = './image/moon.png';

window.onload = () => {
    ctx.drawImage(bg, 0, 0, 1000, 600);
    ctx.drawImage(moon, 800, 50, 64, 64);
}

// 通信処理
function getRanking() {
    // axios.get('https://xhid6nw6ka.execute-api.ap-northeast-1.amazonaws.com/default/hello')
    axios.get('http://localhost:5000/ranking')
        .then((response) => {
            // console.log("-----");
            // console.log(response);
            // console.log("-----");
            let data = response.data;
            // scoreが大きい順にソート
            data.sort((a, b) => { return b.score - a.score; });
            let scoreData = [];
            for(let i = 0; i < 5; i++) {
                scoreData.push(data[i]);
            }
            let rankText = document.getElementsByClassName('js-rank');
            let index = 0;
            scoreData.forEach((data) => {
                let html = `
                    <span class="ranking_score">${data.score}個</span>
                    <span class="ranking_name">${data.name}</span>
                `;
                rankText[index].innerHTML = html;
                index++
            });

            document.getElementById("ranking").classList.add("is-show");
        })
        .catch((error) => {
            console.log(error);
        });
}

// スコア送信
function sendData() {
    const FD = new FormData(form);
    const name = FD.get('name');
    const score = character.score;

    // axios.post('https://xhid6nw6ka.execute-api.ap-northeast-1.amazonaws.com/default/hello', FD)
    axios.post('http://localhost:5000/post', {name: name, score: score})
    .then((response) => {
        document.getElementById('form').style.opacity = 0;
        getRanking();
    })
    .catch((error) => {
        console.log(error);
    });
}

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendData();
});
