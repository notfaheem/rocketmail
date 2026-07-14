//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");

const step = 10;
let position = game.clientHeight / 2;
rocket.style.top = position + "px";
let rotationDirection = "";

document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    if (e.code === "ArrowUp" || e.code === "KeyW") {
        movement("up")
    }

    if (e.code === "ArrowDown" || e.code === "KeyS") {
        movement("down")
    }

})


//collision
let gameOver = false;
function collision() {
    if (gameOver) return;

    const rocketArea = rocket.getBoundingClientRect();
    const planet = document.querySelectorAll(".planet")
    const planetArea = planet[0].getBoundingClientRect();
    const isColliding = rocketArea.left < planetArea.right && rocketArea.right > planetArea.left && rocketArea.top < planetArea.bottom && rocketArea.bottom > planetArea.top;

    if(isColliding){
        gameOver = true;
        planet[0].classList.add("planet-pause")
    }
    requestAnimationFrame(collision)
}
requestAnimationFrame(collision)