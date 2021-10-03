function getListOfPlayers(blockContainer) {
  let div = document.createElement("div");
  div.classList.add("miniLoader");
  blockContainer.prepend(div);
  
  ul = document.createElement("ul");
        ul.classList.add("lobby__list");
        blockContainer.prepend(ul);

  const timerLobby = setInterval(() => {
    

    request(
      "player-list",
      window.application.gameData,
      (data) => {
        console.log("Получаем список");
        
        div.classList.remove("miniLoader");

        function getListContent() {
          const arrListOfPlayers = [];
          for (let i = 0; i < data.list.length; i++) {
            let li = document.createElement("li");
            li.append(data.list[i].login);
            arrListOfPlayers.push(li);
          }
          return arrListOfPlayers;
        }
        ul.textContent = ''
        ul.append(...getListContent())
      })
      
  }, 1000);
  window.application.timers.push(timerLobby);
  
}

function getButtonPlay(blockContainer) {
  let div = document.createElement("div");
  blockContainer.appendChild(div);

  let button = document.createElement("button");
  button.classList.add('lobby__button-play')
  button.textContent = "PLAY";
  blockContainer.appendChild(button);

  button.addEventListener("click", () => {
    request("start", window.application.gameData, (data) => {
      
      if (data.status === "ok" && data["player-status"].status === "game") {
        window.application.gameData.id = data["player-status"].game.id;
        console.log("Игрок добавлен в игру с соответствующим id");
        document.querySelector(".app").classList.remove("lobby__block-list");
        window.application.renderScreen("wait-opponent-screen");
      }

      if (data.status === "error" && data.message === "no token sent") {
        console.log("Нет игрока с таким токеном");
      }

      if (
        data.status === "error" &&
        data.message === "player is already in game"
      ) {
        console.log("Игрок уже в игре, нельзя начать две игры одновременно");
      }
    });
  });
}

function renderLobbyScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";
  app.classList.add('lobby__background')
  const title = document.createElement("h1");
  title.textContent = "Лобби";

  const content = document.createElement("div");
  content.classList.add("lobby__block-list");

  window.application.renderBlock("list-of-players", content);
  window.application.renderBlock("button-play", content);

  app.appendChild(title);
  app.appendChild(content);
}
