let tickSpeed = 500;
let snakeLength = 5;
let newDirection = "right";
let cameFrom;
let head;
let apple;

window.addEventListener('load', (event) => {
    document.getElementById("startbutton").setAttribute("onclick", "init();");
});

function movement() {
    document.addEventListener('keydown', function (k) {
        //implement listeners for direction of movement
    });
}

function init() {
    document.getElementById("startbutton").remove();
    head = document.getElementById("snakehead");
    movement();
    setInterval(game, tickSpeed);
}

function game() {
    //implement creation of snakebody element
    //implement collision detection with walls, snake, and apple
    switch (newDirection) {
        case "right":
            console.log(pos(head.style.left) + 20);
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

function pos(string) {
    return Number(string.slice(0, -2));
}
