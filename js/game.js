window.onload = function() {
    initialize();
    builSequences();
    showSequence();

    canvas.addEventListener("click", onClick, false);

    function onClick(e) {
        console.log("cliked")
    }
};

function buildTemplate(index) {
    var gameTemplate = new Image();
    gameTemplate.src = "imgs/genius_template_" + index + ".png";
    gameTemplate.onload = function() {
        ctx.drawImage(gameTemplate, (gameWidth / 2) - 200, (gameHeight / 2) - 170);
    };
}

function builSequences() {
    for (var i = 0; i < 3; i++) {
        sequence[i] = randomIntFromInterval(1, 4);
    }
}

function showSequence() {
    for (var i = 0; i < stage; i++) {
        highlight(sequence[i]);
    }
}



// Helpers:

function highlight(index) {
    //buildTemplate(index);
    setTimeout(function(){
      buildTemplate(index);        
    }, 1500);

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

function sleep(seconds) {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
}
