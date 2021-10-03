const params = new URLSearchParams(location.search);
let newBack = "";
params.has("backend") ? (newBack = params.get("backend")) : newBack;

const BACK_END_URL = newBack || `http://localhost:3000`;
console.log(newBack);

function request(url, npm, callback) {
  const urlBackend = new URL(BACK_END_URL);
  let urlPath = urlBackend + url;
  urlPath = new URL(urlPath);

  const npmKeys = Object.keys(npm);

  for (let key of npmKeys) {
    if (npm[key]) {
      urlPath.searchParams.set(`${key}`, npm[key]);
    }
  }

  //console.log(urlPath.toString());
  const xhr = new XMLHttpRequest();

  xhr.open("GET", urlPath.toString());

  xhr.addEventListener("readystatechange", (e) => {
    if (e.target.readyState !== 4) {
      return;
    }

    if (xhr.status != 200) {
      console.log(xhr.status + ": " + xhr.statusText);
      return;
    }

    const responseText = JSON.parse(e.target.responseText);

    callback(responseText);
  });

  xhr.send();
}
window.application = {
  blocks: {
    "example-button": renderExampleButton,
    "auth-block": renderAuthorizationBlock,
    "list-of-players": getListOfPlayers,
    "button-play": getButtonPlay,
    lose: renderLoseBlock,
    "button-go-to-the-lobby": renderToTheLobbyButton,
    "button-play-more": renderPlayMoreButton,
    "game-wait-block": renderGameWaitBlock,
    "buttons-for-choose": renderRadioButtonsForm,
    "wait-opponent-block": renderOpponentWaitingBlock,
    win: renderWinBlock,
    "button-go-to-lobby": renderToLobbyButton,
    "button-play-again": renderPlayAgainButton,
    "enemy-stats-block": renderEnemyStatsBlock,
    "exit-button": renderExitButton,
  },

  screens: {
    example: renderExampleScreen,
    login: renderLoginScreen,
    lobby: renderLobbyScreen,
    lose: renderLoseScreen,
    "game-wait": renderGameWaitScreen,
    "wait-opponent-screen": renderOpponentWaitingScreen,
    "game-win": renderWinScreen,
    turn: renderRadioButtonsFormScreen,
  },

  renderScreen: function (screenName) {
    for (let timer of this.timers) {
      clearInterval(timer);
    }

    if (this.screens[screenName]) {
      this.screens[screenName]();
    } else {
      console.log("screen does not exist");
    }
    console.log(this.screens[screenName]);
    if (this.screens[screenName] === renderLoginScreen) {
      return;
    }
    let basicTimer = setTimeout(() => {
      alert("session expired");
      this.renderScreen("login");
      document.querySelector(".app").classList.remove("preloader");
    }, 60000 * 2);
    this.timers.push(basicTimer);
  },
  renderBlock: function (blockName, container, text) {
    if (this.blocks[blockName]) {
      this.blocks[blockName](container, text);
    } else {
      console.log("block does not exist");
    }
  },

  start: {
    login: "",
  },
  gameData: {
    token: "",
    id: "",
    move: "",
  },
  enemy: {
    /*здесь будет инфа о противнике*/
  },

  timers: [],
};
// отрисовываем тестовый экран

window.application.renderScreen("login");
