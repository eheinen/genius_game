canvas = null;
ctx = null;
gameWidth = null;
gameHeight = null;
velocity = 300;
gameOver = false;
stage = 1;
sequence = new Array();
startToPlay = false;
indexHit = 0;

function reset() {
    gameWidth = null;
    gameHeight = null;

    stage = 1;
    velocity = 300;
    gameOver = false;
    sequence = new Array();
    startToPlay = false;
    indexHit = 0;
}

function initialize() {
    buildScenario();
    renderTop();
}

// Build game over:
function buildGameOver() {
    if (gameOver == false) {
        setTimeout(function() {
            ctx.fillStyle = "#333";
            ctx.globalAlpha = 0.75;
            ctx.fillRect(0, 51, 1000, 1000);

            ctx.fillStyle = "#FFF";
            ctx.font = "30px sans-serif";
            ctx.fillText("STAGE: " + stage, (canvas.width / 2) - 350, (canvas.height / 2) - 125);

            ctx.fillStyle = "#FFF";
            ctx.font = "30px sans-serif";
            ctx.fillText("GAME OVER", (canvas.width / 2) - 100, (canvas.height / 2));

            ctx.fillStyle = "#FFF";
            ctx.font = "18px sans-serif";
            ctx.fillText("Try Again", (canvas.width / 2) - 50, (canvas.height / 2) + 35);

            gameOver = true;
        }, 300)

        renderTop();
    }
}

// Build scenario:
function buildScenario() {
    canvas = document.getElementById("screen-genius");
    ctx = canvas.getContext("2d");
    gameWidth = 800;
    gameHeight = 480;

    canvas.width = gameWidth;
    canvas.height = gameHeight;

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 51, gameWidth, gameHeight - 51);

    buildTemplate(null);

    renderTop();
}

// Render top line to get scores:
function renderTop() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, gameWidth, 50);

    renderStage();
}

// Render Score label and value:
function renderStage() {
    ctx.fillStyle = "#FFF";
    ctx.font = "14px sans-serif";
    ctx.fillText("Stage: ", gameWidth - 85, 30);

    ctx.fillStyle = "#FFF";
    ctx.font = "14px sans-serif";
    ctx.fillText(stage, gameWidth - 40, 31);
}
