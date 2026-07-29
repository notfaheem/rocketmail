//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");
let planet = document.querySelectorAll(".planet")

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
    
    let scoreInt = setInterval(() => {
        score += 1;
        scoreLine.innerText = `Score : ${score}`;
        if(gameOver){
            clearInterval(scoreInt)
        }
    }, 500);
}
scoreFun()

score = 45
//planets
const planetWrapper = document.querySelectorAll(".planet-wrapper")
function planets (){


    const windSize = game.getBoundingClientRect();
    // planetWrapper[0].style.transform = `translateY(${planetPosition}px)`;
    planetWrapper.forEach(element => {
        const planetPosition = random(windSize.top + windSize.height * 0.15, windSize.top + windSize.height * 0.85)
        element.style.transform = `translateY(${planetPosition}px)`;
    });
    
    if(score > 50){
        if(planet.length < 2){
            clonePlanet()
        }
        const bgFactor = random(0, 9);
        console.log(planet)
        planet[1].style.background = `url(public/Planets/planet0${bgFactor}.webp) center / cover`;
        console.log(bgFactor)
    }
    if(score > 100 ){
        const sizeFactor = random(100, 150)
        planet[0].style.width = `${sizeFactor}px`;
        planet[0].style.height = `${sizeFactor}px`;
    }

    // 2 planets, change planet livery, time/speed (diff for diff planets), asteroids, UFOs
}
planets()

planet[0].addEventListener("animationiteration", ()=>{
        planets()
    })


function clonePlanet(){
    const newPlanet = planetWrapper[0].cloneNode(true)
    game.appendChild(newPlanet)
    planet = document.querySelectorAll(".planet")
}
//random num gen
function random (min, max){
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeild + 1) + minCeild);
}