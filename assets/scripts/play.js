function renderRadioButtonsForm(blockContainer) {
  const div = document.querySelector(".app");
  div.innerHTML = "";
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.innerText = "Сделать ход";
  blockContainer.append(submitBtn);

  blockContainer.addEventListener("submit", (event) => {
    form = event.target;

    for (const element of form.elements) {
      event.preventDefault();
      if (element.name) {
        element.checked
          ? (application.gameData.move = element.value)
          : application.gameData.turn;
      }
    }
    request("play", application.gameData, (data) => {
      console.log(application.gameData);
      console.log(data);
      if (
        data.status === "ok" &&
        data["game-status"].status === "waiting-for-enemy-move"
      ) {
        window.application.renderScreen("game-wait");
        console.log("Ход отправлен, ожидание ответа соперника");
      }

      if (
        data.status === "ok" &&
        data["game-status"].status === "waiting-for-your-move"
      ) {
        window.application.renderScreen("game-wait");
        alert("Ничья!");
        console.log("ничья - ожидаем следующий ход игрока");
      }

      if (data.status === "ok" && data["game-status"].status === "lose") {
        window.application.renderScreen("lose");
        console.log("Вы проиграли");
      }

      if (data.status === "ok" && data["game-status"].status === "win") {
        window.application.renderScreen("game-win");
        console.log("Вы выйграли");
      }

      if (data.status === "error" && data.message === "no game id") {
        console.log("Id игры не передан");
      }

      if (data.status === "error" && data.message === "wrong game id") {
        console.log("Id игры некорректный/бой не существует/бой закончен");
      }

      if (data.status === "error" && data.message === "not your move") {
        console.log(
          "Не ваш ход! Вы уже отправили ход в текущем раунде, сейчас игра ждет хода вашего соперника, не ваша очередь делать ход"
        );
      }

      if (data.status === "error" && data.message === "no move") {
        console.log("Ход не передан");
      }

      if (data.status === "error" && data.message === "wrong move") {
        console.log("Недопустимый ход");
      }

      if (data.status === "error" && data.message === "token doesn't exist") {
        console.log("Нет игрока с таким ходом");
      }

      if (
        data.status === "error" &&
        data.message === "player is not in this game"
      ) {
        console.log("Игрок не в этой игре");
      }
    });
  });

  div.append(blockContainer);
}

function renderRadioButtonsFormScreen() {
  const form = document.createElement("form");
  form.classList.add("turn__form");
  const rockDiv = document.createElement("div");
  const scissorsDiv = document.createElement("div");
  const paperDiv = document.createElement("div");
  const blockDiv = document.createElement("div");
  const rock = document.createElement("input");
  const scissors = document.createElement("input");
  const paper = document.createElement("input");
  const rockLabel = document.createElement("label");
  const scissorsLabel = document.createElement("label");
  const paperLabel = document.createElement("label");
  const rockImg = new Image();
  const scissorsImg = new Image();
  const paperImg = new Image();

  rock.type = "radio";
  rock.id = "rock";
  rock.name = "rockScissorsPaper";
  rock.value = "rock";
  rock.classList.add("turn__input--radio");

  rockImg.src = "assets/images/rock.png";
  rockImg.classList.add("turn__img--radio");

  scissors.type = "radio";
  scissors.id = "scissors";
  scissors.name = "rockScissorsPaper";
  scissors.value = "scissors";
  scissors.classList.add("turn__input--radio");

  scissorsImg.src = "assets/images/scissors.png";
  scissorsImg.classList.add("turn__img--radio");

  paper.type = "radio";
  paper.id = "paper";
  paper.name = "rockScissorsPaper";
  paper.value = "paper";
  paper.classList.add("turn__input--radio");

  paperImg.src = "assets/images/paper.png";
  paperImg.classList.add("turn__img--radio");

  blockDiv.classList.add("turn__block-radio");

  rockDiv.append(rockLabel);
  scissorsDiv.append(scissorsLabel);
  paperDiv.append(paperLabel);

  rockLabel.append(rock, rockImg);
  scissorsLabel.append(scissors, scissorsImg);
  paperLabel.append(paper, paperImg);

  blockDiv.append(rockDiv, scissorsDiv, paperDiv);
  form.append(blockDiv);

  window.application.renderBlock("buttons-for-choose", form);
  window.application.renderBlock("enemy-stats-block", form);

  blockDiv.addEventListener("mouseover", (event) => {
    let target = event.target;
    target.classList.add("turn__img--shadow");
  });

  blockDiv.addEventListener("mouseout", (event) => {
    target = event.target;
    target.classList.remove("turn__img--shadow");
  });

  blockDiv.addEventListener("click", (event) => {
    target = event.target;
    target.classList.add("turn__img--shadowUp");
  });
  rockDiv.onclick = () => {
    rockImg.classList.add("turn__img--shadowUp");
    paperImg.classList.remove("turn__img--shadowUp");
    scissorsImg.classList.remove("turn__img--shadowUp");
  };

  scissorsDiv.onclick = () => {
    rockImg.classList.remove("turn__img--shadowUp");
    paperImg.classList.remove("turn__img--shadowUp");
    scissorsImg.classList.add("turn__img--shadowUp");
  };

  paperDiv.onclick = () => {
    rockImg.classList.remove("turn__img--shadowUp");
    paperImg.classList.add("turn__img--shadowUp");
    scissorsImg.classList.remove("turn__img--shadowUp");
  };
}
