let isJumping = false;
let playerBottom = 0;
let obstaclePosition = 600;
let score = 0;
let gameInterval;
let levelSpeed = 5; // Basisgeschwindigkeit des Hindernisses

function startGame(level) {
    // Menü ausblenden und Spielbereich anzeigen
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    
    // Geschwindigkeit basierend auf dem gewählten Level anpassen
    levelSpeed = 5 + (level - 1) * 2; // Geschwindigkeit erhöht sich mit dem Level

    // Spiel initialisieren
    obstaclePosition = 600;
    score = 0;
    playerBottom = 0;
    isJumping = false;
    document.getElementById('player').style.bottom = playerBottom + 'px';
    document.getElementById('score').innerText = 'Punkte: ' + score;

    // Starte das Spiel
    gameInterval = setInterval(moveObstacle, 100);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        jump();
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

function moveObstacle() {
    obstaclePosition -= levelSpeed; // Hindernisgeschwindigkeit

    if (obstaclePosition < -40) {
        obstaclePosition = 600; // Setze das Hindernis zurück
        score++; // Punkte erhöhen
        document.getElementById('score').innerText = 'Punkte: ' + score;
    }
    
    document.getElementById('obstacle').style.left = obstaclePosition + 'px';

    // Kollisionsüberprüfung
    if (obstaclePosition > 0 && obstaclePosition < 40 && playerBottom <= 40) {
        alert('Game Over! Deine Punkte: ' + score);
        resetGame();
    }
}

function resetGame() {
    clearInterval(gameInterval);
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}
