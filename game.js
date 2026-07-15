//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");

let mouseY = 0;
document.addEventListener("mousemove", (e)=>{
    mouseY = e.clientY;
    console.log(mouseY)
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