//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");
const rocketImg = document.getElementById("rocket-img")
let planet = document.querySelectorAll(".planet")

let mouseY = 0;
document.addEventListener("mousemove", (e)=>{
    if(gameOver) return;
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
    let isColliding;
    if (planet.length == 1){
        const planetArea = planet[0].getBoundingClientRect();
        isColliding = rocketArea.left < planetArea.right && rocketArea.right > planetArea.left && rocketArea.top < planetArea.bottom && rocketArea.bottom > planetArea.top;
    }else if (planet.length == 2){
        const planetArea1 = planet[0].getBoundingClientRect();
        const planetArea2 = planet[1].getBoundingClientRect();
        isColliding = rocketArea.left < planetArea1.right && rocketArea.right > planetArea1.left && rocketArea.top < planetArea1.bottom && rocketArea.bottom > planetArea1.top;
        if (isColliding == false){
            isColliding = rocketArea.left < planetArea2.right && rocketArea.right > planetArea2.left && rocketArea.top < planetArea2.bottom && rocketArea.bottom > planetArea2.top;
        }
    }else{
        console.log("Planet.length is more than 2 ig")
    }
    if(isColliding){
        gameOver = true;
        rocketImg.style.background= "url(public/rocket-boom.webp) center / cover";
    }
    requestAnimationFrame(collision)
}
requestAnimationFrame(collision)

//score
let score = 0;
let hScore = Number(localStorage.getItem("hs"));
const scoreLine = document.getElementById("score")
function scoreFun(){
    
    let scoreInt = setInterval(() => {
        score += 1;
        scoreLine.innerText = score;
        if(gameOver){
            if(localStorage.getItem("hs") == undefined || Number(localStorage.getItem("hs")) < score){
                hScore = score;
                localStorage.setItem("hs" , score);
            }
            clearInterval(scoreInt)
            gameEnd();
        }
    }, 500);
}
scoreFun()

//game over popup
function gameEnd(){
    const goBg = document.getElementById("go-bg");
    const go = document.getElementById("go");
    const goScore = document.getElementById("go-s");
    const goHScore = document.getElementById("go-hs");

    setTimeout(() => {
        goBg.style.opacity = 1;
        goBg.style.pointerEvents = "all";                                  // set time out for a second or more
        go.style.transform = "translate(-50%, -50%)";
        goBg.style.pointerEvents = "all";
    }, 500);

    goScore.innerText = `SCORE : ${score}`;
    goHScore.innerText = `HIGH SCORE : ${hScore}`;
}



score = 0
//planets
let planetWrapper = document.querySelectorAll(".planet-wrapper")
function planets (index){
    const windSize = game.getBoundingClientRect();

    if(index != undefined){
        planet[index].style.transform = "translateX(10vw)"
        planet[index].style.transitionDuration = "5s";

    }
    
    if(score > 20){
        if (index== 0){
            const bgFactor = random(0, 9);
            planet[0].style.background = `url(public/Planets/planet0${bgFactor}.webp) center / cover`;
        }
    }
    if(score > 40){
        if (index== 0){
            const sizeFactor = random(100, 120)
            planet[0].style.width = `${sizeFactor}px`;
            planet[0].style.height = `${sizeFactor}px`;
        }
    }
    if(score > 60){
        if (index== 0){
            if(planet[0].style.transitionDuration != "4s"){
                planet[0].style.transitionDuration = "4s"
            }
        }
    }
    if(score > 90){
        if (index== 0){
            if (planet.length < 2) {
                clonePlanet()
                planets(1)
            }
        }
    }
    if(score > 150){
        if (index== 0){
            const obsFactor = random(1,10)
            if(obsFactor > 8){
                const bgFactor = random(1, 5);
                planet[0].style.background = `url(public/UFOs/u${bgFactor}.png) center / cover`;
            }else if(obsFactor > 6){
                planet[0].style.background = `url(public/UFOs/as.webp) center / cover`;
            }
        }
    }
    if(score > 200){
        if (index== 1){
            if(planet[1].style.transitionDuration != "4s"){
                planet[1].style.transitionDuration = "4s"
            }
        }
    }
    if (score > 300) {
        if (index == 0) {
            const sizeFactor = random(100, 150)
            planet[0].style.width = `${sizeFactor}px`;
            planet[0].style.height = `${sizeFactor}px`;
        }
        if (index == 1) {
            const sizeFactor = random(100, 150)
            planet[1].style.width = `${sizeFactor}px`;
            planet[1].style.height = `${sizeFactor}px`;
        }
    }
    if(score > 450){
        if (index== 0){
            if(planet[0].style.transitionDuration != "3s"){
                planet[0].style.transitionDuration = "3s"
            }
        }
    }
    if(score > 550){
        if (index== 1){
            if(planet[1].style.transitionDuration != "3s"){
                planet[1].style.transitionDuration = "3s"
            }
        }
    }
    if(score > 700){
        if (index== 0){
            if(planet[0].style.transitionDuration != "2s"){
                planet[0].style.transitionDuration = "2s"
            }
        }
    }
    if(score > 800){
        if (index== 1){
            if(planet[1].style.transitionDuration != "2s"){
                planet[1].style.transitionDuration = "2s"
            }
        }
    }


    
    

    const planetPosition = random(windSize.top + windSize.height * 0.05, windSize.top + windSize.height * 0.85);
    if(index == 0){
        planetWrapper[0].style.transform = `translateY(${planetPosition}px)`;
    }
    if(index == 1){
        planetWrapper[1].style.transform = `translateY(${planetPosition}px)`;
    }
    planet.forEach(plt => {
        plt.style.transform = "translateX(-110vw)"
    });
}


// setInterval(() => {
//     console.log(planet[0].style.transform)
//     console.log(planet[0].style.transitionDuration)
// }, 1000);

    // time/speed (diff for diff planets), Preload everyimage


    // Check gh md to find misjudged features

planets(0)

planet[0].addEventListener("transitionend", ()=>{
    if(planet[0].style.transitionDuration != "0s"){
        planet[0].style.transitionDuration = "0s";
    }else{
        planet[0].style.transitionDuration = "5s";
    }
    planet[0].style.transform = "translateX(10vw)";

    planets(0)
})

function clonePlanet(){
    const newPlanet = planetWrapper[0].cloneNode(true)
    game.appendChild(newPlanet)
    planet = document.querySelectorAll(".planet")
    planetWrapper = document.querySelectorAll(".planet-wrapper")

    // planet[1].style.animationDelay = "2s"
    planet[1].addEventListener("transitionend", () => {
        if (planet[1].style.transitionDuration != "0s") {
            planet[1].style.transitionDuration = "0s";
        } else {
            planet[1].style.transitionDuration = "5s";
        }
        planet[1].style.transform = "translateX(10vw)";

        planets(1)
    })
}
//random num gen
function random (min, max){
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeild + 1) + minCeild);
}