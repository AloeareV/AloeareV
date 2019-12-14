let tickSpeed;
let snakeLength;
let newDirection;
let cameFrom;
let head;
let apple;
let snakeBody = [];
let score;
let game;

window.addEventListener('load', (event) => {
    document.getElementById("startbutton").setAttribute("onclick", "init();");
});

function init() {
    document.getElementsByClassName("but_start_game")[0].remove();
    head = document.getElementById("snakehead");
    apple = document.getElementById("apple");
    score = 0;
    tickSpeed = 250;
    snakeLength = 5;
    newDirection = "right";
    cameFrom = null;
    snakeBody.forEach(e => e.remove());
    snakeBody = [];
    head.style.top = "200px";
    head.style.left = "200px";
    apple.style.left = "360px";
    apple.style.top = "200px";
    movement();
    game = setInterval(action, tickSpeed);
}

function movement() {
    document.addEventListener('keydown', function (k) {
        if ((k.keyCode === 38 || k.keyCode === 87) && cameFrom != "up") {
            newDirection = "up";
        }
        if ((k.keyCode === 37 || k.keyCode === 65) && cameFrom != "left") {
            newDirection = "left";
        }
        if ((k.keyCode === 39 || k.keyCode === 68) && cameFrom != "right") {
            newDirection = "right";
        }
        if ((k.keyCode === 40 || k.keyCode === 83) && cameFrom != "down") {
            newDirection = "down";
        }
    });
}

function action() {
    snakeTail();
    move();
    collisionDetect();
    eatApple();
}

function pos(string) {
    return Number(string.slice(0, -2));
}

function snakeTail() {
    snakeBody.unshift(document.createElement("body"));
    snakeBody[0].classList.add("snakebody");
    snakeBody[0].style.left = head.style.left;
    snakeBody[0].style.top = head.style.top;
    document.getElementById("board").appendChild(snakeBody[0]);
    if (snakeBody.length > snakeLength) {
        snakeBody.pop().remove();
    }
}

function move() {
    switch (newDirection) {
        case "right":
            cameFrom = "left";
            head.style.left = pos(head.style.left) + 20 + "px";
            break;
        case "left":
            cameFrom = "right";
            head.style.left = pos(head.style.left) - 20 + "px";
            break;
        case "up":
            cameFrom = "down";
            head.style.top = pos(head.style.top) - 20 + "px";
            break;
        case "down":
            cameFrom = "up";
            head.style.top = pos(head.style.top) + 20 + "px";
            break;
    }       
}

function collisionDetect() {
    snakeBody.forEach(function(segment) {
        if (segment.style.left == head.style.left && segment.style.top == head.style.top) {
            gameOver();
        }
    });
    if (head.style.left == "-20px" || head.style.left == "600px" || head.style.top == "-20px" || head.style.top == "400px") {
        gameOver();
    }
}

function eatApple() {
    if (head.style.left == apple.style.left && head.style.top == apple.style.top) {
        snakeLength += 1;
        score += 1;
        let appleLocation = emptySpace();
        apple.style.left = appleLocation[0];
        apple.style.top = appleLocation[1];
        clearInterval(game);
        tickSpeed = 250 * 100 / (100 + (score * 5));
        game = setInterval(action, tickSpeed);
    }
}

function gameOver() {
    clearInterval(game);
    let newButton = document.createElement("startbutton");
    newButton.classList.add("but_start_game");
    let newText = document.createTextNode(score + " points!");
    newButton.appendChild(newText);
    board.appendChild(newButton);
    newButton.style.margin = "0px";
    newButton.setAttribute("onclick", "init();");
}

function emptySpace() {
    arr = new Array(600).fill(null).map((e, i) => [i % 30 * 20 + "px", parseInt(i / 30) * 20 + "px"])
    .filter(e => !snakeBody.some(body => body.style.left == e[0] && body.style.top == e[1]) && !(e[0] == head.style.left && e[1] == head.style.top));
    return arr[getRandomInt(0, arr.length)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}
