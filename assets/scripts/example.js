function renderExampleButton(blockContainer) {
    const button = document.createElement("button");
    button.innerText = "test button";

    button.addEventListener("click", () => {
        window.application.renderScreen("turn");    
    });

    blockContainer.appendChild(button);
}

function renderExampleScreen() {
    const app = document.querySelector(".app");
    app.textContent = "";

    const title = document.createElement("h1");
    title.textContent = "Страница-пример";

    const content = document.createElement("div");

    window.application.renderBlock("example-button", content);

    app.appendChild(title);
    app.appendChild(content);
}
