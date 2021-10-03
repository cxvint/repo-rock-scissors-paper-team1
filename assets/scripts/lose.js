function renderLoseScreen() {
    const app = document.querySelector(".app");
    app.textContent = "";

    const title = document.createElement("h1");
    title.textContent = "Экран-поражение";

    const content = document.createElement("div");

    window.application.renderBlock("lose", content);
    window.application.renderBlock("button-go-to-the-lobby", content);
    window.application.renderBlock("button-play-more", content, 'Играть еще!');
    window.application.renderBlock("enemy-stats-block", content);
    window.application.renderBlock("exit-button", content);

    app.appendChild(title);
    app.appendChild(content);
}

function renderLoseBlock(blockContainer) {
    const header = document.createElement("h2");
    header.textContent = "Ха-Ха! Ты проиграл!";

    blockContainer.appendChild(header);
}

function renderToTheLobbyButton(blockContainer) {
    const button = document.createElement("button");
    button.innerText = "в лобби =>";

    button.addEventListener("click", () => {
        console.log("click lobby");
        window.application.renderScreen("lobby");
    });

    blockContainer.appendChild(button);
}
function renderPlayMoreButton(blockContainer, text) {
    
    const button = document.createElement("button");
    button.innerText = "играть еще!";
    
    if (text) {
        button.innerText = text
    }

    button.addEventListener("click", () => {
        request('start', application.gameData, (data) => {
            if (data.status === 'ok') {
                application.gameData.id = data['player-status'].game.id;
                application.renderScreen('wait-opponent-screen');
            }
        })
    });

    blockContainer.appendChild(button);
}
