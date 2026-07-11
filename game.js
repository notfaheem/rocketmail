//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");

const step = 10;
let position = game.clientHeight / 2;
rocket.style.top = position + "px";

document.addEventListener("keydown", (e) => {
    const halfHeight = rocket.offsetHeight / 2;

    if (e.code === "ArrowUp" || e.code === "KeyW") {
        if (position - step >= halfHeight) {
            position -= step;
        }
    }

    if (e.code === "ArrowDown" || e.code === "KeyS") {
        if (position + step <= game.clientHeight - halfHeight) {
            position += step;
        }
    }

    rocket.style.top = position + "px";
});