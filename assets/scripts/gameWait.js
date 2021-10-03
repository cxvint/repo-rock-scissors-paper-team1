function renderGameWaitBlock(blockContainer) {
  const content = document.createElement("div");

  content.innerText = "";
  const app = document.querySelector(".app");

  //крутилка
  const gameChecker = setInterval(() => {
    request("game-status", application.gameData, (data) => {
      let status = data["game-status"].status;
      console.log(status);
      if (status !== "waiting-for-enemy-move") {
        app.classList.remove("preloader");
        switch (status) {
          case "win":
            window.application.renderScreen("game-win");
            break;
          case "lose":
            window.application.renderScreen("lose");
            break;
          case "waiting-for-your-move":
            alert("Ничья!");
            window.application.renderScreen("turn");
            break;
          default:
            alert("что-то не то");
        }
      }
    });
  }, 1000);
  window.application.timers.push(gameChecker);

  blockContainer.appendChild(content);
}

function renderGameWaitScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";
  app.classList.add("preloader");

  const title = document.createElement("h1");
  title.textContent = "Ожидание хода соперника";

  const content = document.createElement("div");

  window.application.renderBlock("game-wait-block", content);

  app.appendChild(title);
  app.appendChild(content);
}
