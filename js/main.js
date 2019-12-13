let tickSpeed = 500;
let snakeLength = 5;
let newDirection = "right";
let cameFrom;
let head;
let apple;
let snakeBody = [];

window.addEventListener('load', (event) => {
    document.getElementById("startbutton").setAttribute("onclick", "init();");
});

function movement() {
    document.addEventListener('keydown', function (k) {
        if (k.keyCode === (38 || 87) && cameFrom != "up") {
            newDirection = "up";
            console.log(newDirection + " " + k.keyCode);
        }
        if (k.keyCode === (37 || 65) && cameFrom != "left") {
            newDirection = "left";
            console.log(newDirection + " " + k.keyCode);
        }
        if (k.keyCode === (39 || 68) && cameFrom != "right") {
            newDirection = "right";
            console.log(newDirection + " " + k.keyCode);
        }
        if (k.keyCode === (40 || 83) && cameFrom != "down") {
            newDirection = "down";
            console.log(newDirection + " " + k.keyCode);
        }
    });
}

function init() {
    document.getElementById("startbutton").remove();
    head = document.getElementById("snakehead");
    movement();
    setInterval(game, tickSpeed);
}

function game() {
    snakeBody.unshift(document.createElement("body"));
    snakeBody[0].classList.add("snakebody");
    snakeBody[0].style.left = head.style.left;
    snakeBody[0].style.top = head.style.top;
    document.getElementById("board").appendChild(snakeBody[0]);
    if (snakeBody.length > snakeLength) {
        snakeBody.pop().remove();
    }
    //implement creation of snakebody element
    //implement collision detection with walls, snake, and apple
    switch (newDirection) {
        case "right":
            console.log("going " + newDirection);
            cameFrom = "left";
            head.style.left = pos(head.style.left) + 20 + "px";
            break;
        case "left":
            console.log("going " + newDirection);
            cameFrom = "right";
            head.style.left = pos(head.style.left) - 20 + "px";
            break;
        case "up":
            console.log("going " + newDirection);
            cameFrom = "down";
            head.style.top = pos(head.style.top) - 20 + "px";
            break;
        case "down":
            console.log("going " + newDirection);
            cameFrom = "up";
            head.style.top = pos(head.style.top) + 20 + "px";
            break;
    }       
}

function pos(string) {
    return Number(string.slice(0, -2));
}
