let isJumping = false;
let playerBottom = 0;
let enemyPosition = 600;
let score = 0;
let gameInterval;
let levelSpeed = 5; // Basisgeschwindigkeit des Hindernisses
let isPaused = false;

function startGame(level) {
    // Menü ausblenden und Spielbereich anzeigen
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('backgroundMusic').play();

    // Geschwindigkeit basierend auf dem gewählten Level anpassen
    levelSpeed = 5 + (level - 1) * 2; // Geschwindigkeit erhöht sich mit dem Level

    // Spiel initialisieren
    enemyPosition = 600;
    score = 0;
    playerBottom = 0;
    isJumping = false;
    document.getElementById('player').style.bottom = playerBottom + 'px';
    document.getElementById('score').innerText = 'Punkte: ' + score;

    // Starte das Spiel
    gameInterval = setInterval(moveEnemy, 100);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        jump();
    } else if (event.code === 'Escape' && !isPaused) {
        pauseGame();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                playerBottom -= 5;
                jumpHeight -= 5;
                document.getElementById('player').style.bottom = playerBottom + 'px';
            }, 20);
        }
        playerBottom += 5;
        jumpHeight += 5;
        document.getElementById('player').style.bottom = playerBottom + 'px';
    }, 20);
}

function moveEnemy() {
    if (isPaused) return;

    enemyPosition -= levelSpeed; // Hindernisgeschwindigkeit

    if (enemyPosition < -40) {
        enemyPosition = 600; // Setze das Hindernis zurück
        score++; // Punkte erhöhen
        document.getElementById('score').innerText = 'Punkte: ' + score;
    }
    
    document.getElementById('enemy').style.left = enemyPosition + 'px';

    // Kollisionsüberprüfung
    if (enemyPosition > 0 && enemyPosition < 40 && playerBottom <= 40) {
        alert('Game Over! Deine Punkte: ' + score);
        resetGame();
    }
}

function resetGame() {
    clearInterval(gameInterval);
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('backgroundMusic').pause();
}

function pauseGame() {
    isPaused = true;
    clearInterval(gameInterval);
    document.getElementById('pauseMenu').style.display = 'block';
}

function resumeGame() {
    isPaused = false;
    document.getElementById('pauseMenu').style.display = 'none';
    gameInterval = setInterval(moveEnemy, 100);
}

function setLanguage() {
    const lang = document.getElementById('language').value;
    if (lang === 'en') {
        document.getElementById('menu').children[0].innerText = 'Jump and Run Game';
        document.getElementById('menu').children[1].innerText = 'Level 1';
        document.getElementById('menu').children[2].innerText = 'Tutorial';
    } else {
        document.getElementById('menu').children[0].innerText = 'Jump and Run Spiel';
        document.getElementById('menu').children[1].innerText = 'Level 1';
        document.getElementById('menu').children[2].innerText = 'Tutorial';
    }
}

function showTutorial() {
    document.getElementById('tutorial').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tutorialText').innerText = 'Steuerung:\nDrücke die Leertaste, um zu springen.\nVermeide die Gegner und sammle Punkte!';
}

function hideTutorial() {
    document.getElementById('tutorial').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}
