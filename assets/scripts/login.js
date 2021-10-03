function renderAuthorizationBlock(blockContainer) {
  const divInput = document.createElement("div");
  const divButton = document.createElement("div");
  const loginButton = document.createElement("button");
  loginButton.innerText = "Log In";
  const loginInput = document.createElement("input");
  const title = document.createElement("h1");
  title.textContent = "Log In";
  blockContainer.appendChild(title);
  blockContainer.appendChild(divInput);
  blockContainer.appendChild(divButton);
  divInput.appendChild(loginInput);
  divButton.appendChild(loginButton);
  loginInput.setAttribute("placeholder", "enter your name");

  loginButton.addEventListener("click", () => {
    window.application.start.login = loginInput.value;
    request("login", window.application.start, (data) => {
      if (data.status === "ok") {
        window.application.gameData.token = data.token;
        request("player-status", window.application.gameData, (data) => {
          console.log(data['player-status'])
          if (data['player-status'].status === 'lobby' && data.status === 'ok'){
            document.querySelector(".app").classList.remove('background_login');
            application.renderScreen('lobby');
          } else {
            application.gameData.id = data['player-status'].game.id;
            request("game-status", window.application.gameData, (data) => {
              switch(data['game-status'].status) {
                case "waiting-for-start":
                  document.querySelector(".app").classList.remove('background_login');
                  application.renderScreen("wait-opponent-screen");
                  break;
                case "waiting-for-your-move":
                  document.querySelector(".app").classList.remove('background_login');
                  application.renderScreen("turn");
                  break;
                case "waiting-for-enemy-move":
                  document.querySelector(".app").classList.remove('background_login');
                  
                  application.renderScreen("game-wait");
                  break;
              }
            })
          }
          
        });
      };
    });
  });
};

function renderLoginScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";
  app.classList.add('background_login');
  const imgSrc = "assets/images/header-logo.png";
  const img = new Image();
  img.src = imgSrc;
  app.appendChild(img).classList.add("login__logo");
  const content = document.createElement("div");
  window.application.renderBlock("auth-block", content);
  app.appendChild(content);
}
