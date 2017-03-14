canvas = null;
ctx = null;
gameWidth = null;
gameHeight = null;
score = 0;
velocity = 0;
gameOver = false;
stage = 3;
sequence = new Array();

function reset() {
  gameWidth = null;
  gameHeight = null;
  score = 0;
  stage = 1;
  velocity = 0;
  gameOver = false;
  sequence = new Array();
}

function initialize() {
    buildScenario();
    renderTop();
}

// Build game over:
function buildGameOver() {
    if (gameOver == false) {
        ctx.fillStyle = "#333";
        ctx.globalAlpha = 0.75;
        ctx.fillRect(0, 51, 1000, 1000);

        ctx.fillStyle = "#FFF";
        ctx.font = "30px sans-serif";
        ctx.fillText("SCORE: " + score, (canvas.width / 2) - 350, (canvas.height / 2) - 125);

        ctx.fillStyle = "#FFF";
        ctx.font = "30px sans-serif";
        ctx.fillText("GAME OVER", (canvas.width / 2) - 100, (canvas.height / 2));

        ctx.fillStyle = "#FFF";
        ctx.font = "18px sans-serif";
        ctx.fillText("Try Again", (canvas.width / 2) - 50, (canvas.height / 2) + 35);

        renderTop();

        gameOver = true;
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

    buildTemplate(0);

    renderTop();
}

// Render top line to get scores:
function renderTop() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, gameWidth, 50);

    renderScore();
}

// Render Score label and value:
function renderScore() {
    ctx.fillStyle = "#FFF";
    ctx.font = "14px sans-serif";
    ctx.fillText("Score: ", 20, 30);

    ctx.fillStyle = "#FFF";
    ctx.font = "14px sans-serif";
    ctx.fillText(score, 65, 31);
}
