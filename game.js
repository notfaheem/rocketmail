//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");
const planet = document.querySelectorAll(".planet")

let mouseY = 0;
document.addEventListener("mousemove", (e)=>{
    const windSize = game.getBoundingClientRect();
    mouseY = e.clientY;
    if(mouseY < windSize.top + windSize.height * 0.15 || mouseY > windSize.top + windSize.height * 0.85){
        return;
    }
    mouseY = mouseY - ((rocket.getBoundingClientRect().height)/2)
    rocket.style.transform = `translateX(${mouseY}px)`;
})


//collision
let gameOver = false;
function collision() {
    if (gameOver) return;

    const rocketArea = rocket.getBoundingClientRect();
    const planetArea = planet[0].getBoundingClientRect();
    const isColliding = rocketArea.left < planetArea.right && rocketArea.right > planetArea.left && rocketArea.top < planetArea.bottom && rocketArea.bottom > planetArea.top;

    if(isColliding){
        gameOver = true;
        planet[0].classList.add("planet-pause")
    }
    requestAnimationFrame(collision)
}
requestAnimationFrame(collision)

//score
let score = 0;
const scoreLine = document.getElementById("score")
function scoreFun(){
    if(gameOver){
        return;
    }
    let scoreInt = setInterval(() => {
        score += 1;
        scoreLine.innerText = `Score : ${score}`
    }, 500);
}
scoreFun()

//planets
function planets (){

}