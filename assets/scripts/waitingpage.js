function renderOpponentWaitingBlock(blockContainer) {
    const content = document.createElement("div");
    const app = document.querySelector(".app");
    content.innerText = "";
    const opponentChecker = setInterval(() => {

        request('game-status', window.application.gameData, (data) => {
            console.log(data)
            if (data['game-status'].status !== 'waiting-for-start') {
                app.classList.remove("preloader");
                window.application.renderScreen("turn");
            }
        })
    }, 500);
    window.application.timers.push(opponentChecker);

    blockContainer.appendChild(content);
}


function renderOpponentWaitingScreen() {
    const app = document.querySelector(".app");
    app.textContent = "";
    app.classList.add("preloader");

    const title = document.createElement("h1");
    title.textContent = "Ожидание нового соперника";

    const content = document.createElement("div");

    window.application.renderBlock("wait-opponent-block", content);

    app.appendChild(title);
    app.appendChild(content);

}