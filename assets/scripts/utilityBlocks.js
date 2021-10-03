function renderExitButton(blockContainer) {
    const button = document.createElement("button");
    button.innerText = "Выход";

    button.addEventListener("click", () => {
        console.log("click exit");
        window.application.renderScreen("login");
    });

    blockContainer.appendChild(button);
}


function renderEnemyStatsBlock(blockContainer) {
    const divContainer = document.createElement("div");
    
    request('game-status', application.gameData, (data) => {
        const header = document.createElement('h2');
        const winrateP = document.createElement('p');
        const weaponP = document.createElement('p');
        const nicknameP = document.createElement('p');
        let enemy = data['game-status'].enemy;
        let enemyWinRate;
        let enemyPrimaryWeapon = 'paper';
        const weapons = [
            {paper: Number(enemy.papers)},
            {rock: Number(enemy.rocks)},
            {scissors: Number(enemy.scissors)},
        ]
        let max = 0;
        
        for (let weapon of weapons) {
            const key = Object.keys(weapon)
            console.log([key[0]]);
            if (max < weapon[key[0]]) {
                max = weapon[key[0]];
                enemyPrimaryWeapon = [key[0]];
            }
            
        }
        if (enemy.loses === 0) {
            enemyWinRate = 1;
        }else {
            enemyWinRate = Number(enemy.wins)/(Number(enemy.wins) + Number(enemy.loses))
        }
        header.innerText = 'ПРОТИВНИК:'
        
        winrateP.innerText = `Процент побед: ${Math.floor(enemyWinRate * 100)}%`;
        nicknameP.innerText = `Имя: ${enemy.login}`;
        weaponP.innerText = `Любимое оружие: ${enemyPrimaryWeapon}`;
        divContainer.append(header,nicknameP, winrateP, weaponP);

        blockContainer.appendChild(divContainer);

    });


    
}