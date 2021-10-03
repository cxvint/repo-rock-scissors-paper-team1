function renderWinScreen() {
    const app = document.querySelector(".app");
    app.textContent = "";
    app.classList.add('win__background')

    const title = document.createElement("h1");
    title.textContent = "";

    const content = document.createElement("div");
    content.classList.add('win__block')

    window.application.renderBlock("win", content);
    window.application.renderBlock("button-go-to-lobby", content);
    window.application.renderBlock("button-play-again", content);

    app.appendChild(title);
    app.appendChild(content);
}

function renderWinBlock(blockContainer) {
    const header = document.createElement("h2");
    header.textContent = "Вы выиграли!";
    header.classList.add("winText");
    blockContainer.appendChild(header);
}

function renderToLobbyButton(blockContainer) {
    const button = document.createElement("button");
    button.innerText = "Вернуться в лобби =>";

    button.addEventListener("click", () => {
        console.log("click");
        document.querySelector(".app").classList.remove("win__background");
        window.application.renderScreen("lobby");
    });

    blockContainer.appendChild(button);
}

function renderPlayAgainButton(blockContainer) {
    const button = document.createElement("button");
    button.innerText = "Сыграть еще раз";
    button.addEventListener("click", () => {
        request('start', application.gameData, (data) => {
            if (data.status === 'ok') {
                application.gameData.id = data['player-status'].game.id;
                document.querySelector(".app").classList.remove("win__background");
                application.renderScreen('wait-opponent-screen');
            }
        })
    });

    blockContainer.appendChild(button);
}