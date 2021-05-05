// 通信処理
function getRanking() {
    // axios.get('http://localhost:5000/ranking')
    axios.get('https://js-2d-game.herokuapp.com/ranking')
        .then((response) => {
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
    const score = FD.get('score');
    console.log(score);
    // axios.post('http://localhost:5000/post', {name: name, score: score})
    axios.post('https://js-2d-game.herokuapp.com/post', {name: name, score: score})
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

const cancelButton = document.querySelector('.button-cancel');
cancelButton.addEventListener('click', () => {
    location.reload();
});
