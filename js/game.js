window.onload = function() {
    initialize();
    builSequences();
    manageVelocity();
    showSequence();

    canvas.addEventListener("click", onClick, false);

    function onClick(e) {
        checkInputSequence('mouse', event);
        if (gameOver) {
            coords = getMousePosition(event);
            if ((coords.x >= 340 && coords.x <= 435) && (coords.y >= 252 && coords.y <= 284)) {
                reset();
                initialize();
                builSequences();
                manageVelocity();
                showSequence();
            }
        }
    }

    document.addEventListener('keydown', function(event) {
        checkInputSequence('key', event);
        key = event.key
        if (key == "Enter") {
            reset();
            initialize();
            builSequences();
            manageVelocity();
            showSequence();
        }
    }, false);
};

function buildMessage(mode) {
    ctx.fillStyle = "#333";
    ctx.fillRect((canvas.width / 2) - 360, (canvas.height / 2) - 165, 220, 50);
    if (mode == "wait") {
        ctx.fillStyle = "#FFF";
        ctx.font = "30px sans-serif";
        ctx.fillText("Pay Attention!", (canvas.width / 2) - 350, (canvas.height / 2) - 125);
    } else {
        ctx.fillStyle = "#FFF";
        ctx.font = "30px sans-serif";
        ctx.fillText("Your turn!", (canvas.width / 2) - 350, (canvas.height / 2) - 125);
    }
}

function buildTemplate(index) {
    var gameTemplate = new Image();
    if (index == null) {
        ctx.fillStyle = "#333";
        ctx.fillRect(0, 51, gameWidth, gameHeight - 51);
        index = 0;
    }
    gameTemplate.src = "imgs/genius_template_" + index + ".png";
    gameTemplate.onload = function() {
        setTimeout(function() {
            ctx.drawImage(gameTemplate, (gameWidth / 2) - 200, (gameHeight / 2) - 170);
        }, 10);
    };
    var mode = ""
    if(startToPlay){
        mode = "player"
    }
    buildMessage(mode)
}

function builSequences() {
    var stageSequence = sequence.length;
    for (var i = stageSequence; i < stage; i++) {
        sequence[i] = randomIntFromInterval(1, 4);
    }
}

function checkInputSequence(mode, event) {
    if (startToPlay && !gameOver) {
        arrowInput = getArrowInput(mode, event);
        if (arrowInput != null) {
          gameTemplate = new Image();
          setTimeout(function(){
            gameTemplate.src = "imgs/genius_template_" + arrowInput + ".png";
            gameTemplate.onload = function() {
                ctx.drawImage(gameTemplate, (gameWidth / 2) - 200, (gameHeight / 2) - 170);
                setTimeout(function(){
                  buildTemplate(null)
                }, 50)
            };
          }, 15)

            if (sequence[indexHit] == arrowInput) {
                if ((indexHit + 1) == stage) {
                    startToPlay = false
                    setTimeout(function(){
                        nextStage();
                    }, 1000)

                } else {
                    indexHit++;
                }
            } else {
                startToPlay = false
                buildGameOver();
            }
        }
    }
}

function getArrowInput(mode, event) {
    if (mode == 'key') {
        var key = event.key
        switch (key) {
            case "ArrowLeft":
                return 1
            case "ArrowUp":
                return 2
            case "ArrowDown":
                return 3
            case "ArrowRight":
                return 4
        }
    } else {
        coords = getMousePosition(event);
        if ((coords.x >= 206 && coords.x <= 322) && (coords.y >= 270 && coords.y <= 388))
            return 1;
        else if ((coords.x >= 339 && coords.x <= 457) && (coords.y >= 132 && coords.y <= 254))
            return 2;
        else if ((coords.x >= 358 && coords.x <= 458) && (coords.y >= 270 && coords.y <= 388))
            return 3;
        else if ((coords.x >= 473 && coords.x <= 596) && (coords.y >= 270 && coords.y <= 388))
            return 4;
    }
    return null;
}

function manageVelocity() {
    if (stage < 5) {
        velocity = 300;
    } else if (stage >= 5 && stage < 10) {
        velocity = 400;
    } else if (stage >= 10 && stage < 15) {
        velocity = 500;
    } else if (stage >= 15 && stage < 20) {
        velocity = 600;
    } else if (stage >= 20 && stage < 25) {
        velocity = 700;
    } else if (stage >= 25 && stage < 30) {
        velocity = 800;
    } else {
        velocity = 950;
    }

    requestAnimationFrame(manageVelocity);
}

function nextStage() {
    startToPlay = false;
    stage++;
    indexHit = 0;
    renderTop();
    builSequences();
    showSequence();
}

function showSequence() {
    var count = 0;
    var i = 0
    for (i = 0; i < stage; i++) {
        highlight(count++, sequence[i]);
        highlight(count++, null);
    }
    setTimeout(function() {
        startToPlay = true;
        buildMessage("player");
    }, (i) * (1600 - velocity));
}

// Helpers:

function highlight(i, index) {
    setTimeout(function() {
        buildTemplate(index);
        buildMessage("wait");
    }, i * (1000 - velocity));
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
