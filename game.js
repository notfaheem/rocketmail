//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");

const step = 10;
let position = game.clientHeight / 2;
rocket.style.top = position + "px";
let rotationDirection = "";

document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    const halfHeight = rocket.offsetHeight / 2;

    if (e.code === "ArrowUp" || e.code === "KeyW") {

        

        if (position - step >= halfHeight) {
            position -= step;
            rotationDirection = "up";
        }
    }

    if (e.code === "ArrowDown" || e.code === "KeyS") {
        if (position + step <= game.clientHeight - halfHeight) {
            position += step;
            rotationDirection = "down";
        }
    }

    rocket.style.top = position + "px";
    if (rotationDirection === "up") {
        rocket.style.rotate = "-5deg"
        setTimeout(() => {
            rocket.style.rotate = "0deg";
        }, 500)
    }else if (rotationDirection === "down"){
        rocket.style.rotate = "20deg"
        setTimeout(() => {
            rocket.style.rotate = "0deg";
        }, 500)
    }
});

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