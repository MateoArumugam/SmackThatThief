let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let gameStarted = false;
let moleInterval = 1000; // Initial speed of the mole
let plantInterval = 2000; // Initial speed of the plant
let moleTimer, plantTimer;
let ouchSound = new Audio("ouch.mp3");  // Load the sound effect
let whistleSound = new Audio("whistle.mp3");
let winnerSound = new Audio ("win.mp3");
  
window.onload = function () {

    showScenario();  
   // Add an event listener to start the music when the user clicks anywhere
        document.addEventListener('click', function startMusic() {
            // Start the background music
            let backgroundMusic = document.getElementById("backgroundMusic");
            backgroundMusic.play(); // Play the music

            // Remove the event listener to prevent it from triggering multiple times
            document.removeEventListener('click', startMusic);

            // Start the actual game logic here
            setGame();
        });
};

function showScenario() {
    document.getElementById("scenarioPopup").style.display = "flex";
}

function showInstructions() {
    document.getElementById("scenarioPopup").style.display = "none";
    document.getElementById("instructionsPopup").style.display = "flex";
}

function startGame() {
    document.getElementById("instructionsPopup").style.display = "none";
    setGame();
    gameStarted = true;
}

function setGame() {
    // Create the 3x3 grid
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    startTimers();
}

function startTimers() {
    moleTimer = setInterval(setMole, moleInterval);
    plantTimer = setInterval(setPlant, plantInterval);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) {
        return; // Avoid overlap with plant
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) {
        return; // Avoid overlap with mole
    }

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver || !gameStarted) return;

    if (this === currMoleTile) {
        ouchSound.play(); 
        score += 10;
        document.getElementById("score").innerText = score.toString();
       
        adjustDifficulty();
    } else if (this === currPlantTile) {
        whistleSound.play();
        showGameOverPopup();
        gameOver = true;
    }
}

function adjustDifficulty() {
    if (score % 50 === 0 && score < 300) { // Increase difficulty every 50 points
        moleInterval = Math.max(200, moleInterval - 100); // Faster mole, minimum interval of 200ms
        plantInterval = Math.max(200, plantInterval - 200); // Faster plant, minimum interval of 1000ms

        clearInterval(moleTimer);
        clearInterval(plantTimer);
        startTimers();
    }

    if (score >= 300 && !gameOver) {
        winnerSound.play();
        showWinPopup();
        gameOver = true;
    }
}

function showGameOverPopup() {
    document.getElementById("finalScore").innerText = score.toString();
    document.getElementById("gameOverPopup").style.display = "flex";
}

function showWinPopup() {
    document.getElementById("winningScore").innerText = score.toString();
    document.getElementById("winPopup").style.display = "flex";
}

function restartGame() {
    location.reload(); // Reloads the page to start the game again
}



