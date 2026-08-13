//loading 
window.addEventListener("load", ()=>{
    const loading = document.getElementById("loading");
    loading.style.opacity = 0;
    loading.style.pointerEvents = "none";
})
// bgms
const mainBgm = new Audio("public/mainbgm.ogg")
const gameBgm = new Audio("public/gamebgm.ogg")
const crash = new Audio("public/crash.ogg")
crash.volume = 0.5;
mainBgm.loop = true;
gameBgm.loop = true;
crash.preload = "auto";
crash.load()
function audio(){
    mainBgm.currentTime = 0;
    mainBgm.volume = 0.3
    gameBgm.volume = 0.3
    mainBgm.play();
}
document.addEventListener("click",()=>{
    audio();
}, {once:true})

//movement
const game = document.getElementById("game");
const rocket = document.getElementById("rocket");
const rocketImg = document.getElementById("rocket-img")
let planet = document.querySelectorAll(".planet")

let mouseY = 0;
document.addEventListener("mousemove", (e)=>{
    // if(gameOver) return;
    if (gameOver == false) {
        const windSize = game.getBoundingClientRect();
        mouseY = e.clientY;
        if (mouseY < windSize.top + windSize.height * 0.15 || mouseY > windSize.top + windSize.height * 0.85) {
            return;
        }
        mouseY = mouseY - ((rocket.getBoundingClientRect().height) / 2)
        rocket.style.transform = `translateX(${mouseY}px)`;
    }
})


//collision
let gameOver = true;
function collision() {

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
        crash.play()
        gameBgm.pause()
        rocketImg.style.background= "url(public/rocket-boom.webp) center / cover";
    }
    requestAnimationFrame(collision)
}
requestAnimationFrame(collision)

//score
let score = 0;
let hScore = Number(localStorage.getItem("hs"));
const scoreLine = document.getElementById("score")

const Btexts = document.getElementById("bt-cont")
const Btext1 = document.getElementById("bt1")
const Btext2 = document.getElementById("bt2")
let highscoreshowed = false;

function scoreFun(){
    
    let scoreInt = setInterval(() => {
        score += 1;
        scoreLine.innerText = score;

        if(localStorage.getItem("hs") != undefined && Number(localStorage.getItem("hs")) < score && highscoreshowed == false){
            Btext1.innerText = "New Highscore!";
            Btext2.innerText = score
            Btexts.style.opacity = 1;
            setTimeout(() => {
                Btexts.style.opacity = 0;  
            }, 5000);

            highscoreshowed = true;
        }

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


// mobile warning
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if(isMobile){
    alert("This game doesn't work properly on a touch device.")
}

//game over popup
const goBg = document.getElementById("go-bg");
const go = document.getElementById("go");
const goScore = document.getElementById("go-s");
const goHScore = document.getElementById("go-hs");
function gameEnd(){

    setTimeout(() => {
        goBg.style.opacity = 1;
        goBg.style.pointerEvents = "all";
        go.style.transform = "translate(-50%, -50%)";
        goBg.style.pointerEvents = "all";
    }, 500);

    goScore.innerText = `SCORE : ${score}`;
    goHScore.innerText = `HIGH SCORE : ${hScore}`;
}


// play again
const playAgainBtn = document.getElementById("go-btn");
playAgainBtn.addEventListener("click", ()=>{
    goBg.style.opacity = 0;
    goBg.style.pointerEvents = "none";
    go.style.transform = "translate(-50%, 100%)";
    removePlanet()
    startGame()
})

function removePlanet(){
    if (planet.length > 1){
        planetWrapper[1].remove();
        planet = document.querySelectorAll(".planet")
        planetWrapper = document.querySelectorAll(".planet-wrapper")
    }
}

//planets
let planetWrapper = document.querySelectorAll(".planet-wrapper")
function planets (index){
    const windSize = game.getBoundingClientRect();

    if(gameOver){
        planet[0].style.transitionDuration = "0s";
        if (planet.length == 2) {
            planet[1].style.transitionDuration = "0s";
            }
        return
    }


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
    if(score > 30){
        if (index== 0){
            const sizeFactor = random(100, 120)
            planet[0].style.width = `${sizeFactor}px`;
            planet[0].style.height = `${sizeFactor}px`;
        }
    }
    if(score > 40){
        if (index== 0){
            if(planet[0].style.transitionDuration != "4s"){
                planet[0].style.transitionDuration = "4s"
            }
        }
    }
    if(score > 50){
        if (index== 0){
            if (planet.length < 2) {
                clonePlanet()
                planets(1)
            }
        }
    }
    if(score > 60){
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
    if(score > 70){
        if (index== 1){
            if(planet[1].style.transitionDuration != "4s"){
                planet[1].style.transitionDuration = "4s"
            }
        }
    }
    if (score > 80) {
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
    if(score > 100){
        if (index== 0){
            if(planet[0].style.transitionDuration != "3s"){
                planet[0].style.transitionDuration = "3s"
            }
        }
    }
    if(score > 150){
        if (index== 1){
            if(planet[1].style.transitionDuration != "3s"){
                planet[1].style.transitionDuration = "3s"
            }
        }
    }
    if(score > 200){
        if (index== 0){
            if(planet[0].style.transitionDuration != "2s"){
                planet[0].style.transitionDuration = "2s"
            }
        }
    }
    if(score > 250){
        if (index== 1){
            if(planet[1].style.transitionDuration != "2s"){
                planet[1].style.transitionDuration = "2s"
            }
        }
    }


    
    

    const planetPosition = random(windSize.top + windSize.height * 0.05, windSize.top + windSize.height * 0.75);
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


planet[0].addEventListener("transitionend", ()=>{
    if(planet[0].style.transitionDuration != "0s"){
        planet[0].style.transitionDuration = "0s";
    }else{
        planet[0].style.transitionDuration = "5s";
        if(gameOver){
            planet[0].style.transitionDuration = "0s";
        }
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
            if(gameOver){
                planet[1].style.transitionDuration = "0s";
            }
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

// random messages 
const messages = [
    "Good luck with the flight!",
    "Keep flying. The mail must arrive.",
    "You're doing great!",
    "Is that an asteroid... or a potato?",
    "Stay alert, pilot.",
    "The universe is a pretty big place.",
    "Incoming! Dodge it!",
    "Your destination is somewhere out there.",
    "Careful... space gets weird.",
    "Nice flying!",
    "The mail won't deliver itself.",
    "Keep going. You've got this!"
];

let isRunning = false;
function rndmMsg(){
    if(gameOver) return;
    if(isRunning) return;
    if (Number(localStorage.getItem("hs")) - 20 > score || Number(localStorage.getItem("hs")) + 20 < score){
        isRunning = true;
        let timeInt = random(30000, 60000)
        let msgindex = random(0, 11)
        setTimeout(() => {
            textShow(messages[msgindex], 5000)
            isRunning = false;
            rndmMsg()
        }, timeInt)
    }
}

// game starting fn
const mail = document.getElementById("mail");
function startGame (){
    textShow("",100)
    mainBgm.pause();
    mainBgm.currentTime = 0;
    gameBgm.currentTime = 0;
    gameBgm.play();
    score = 0
    scoreLine.innerText = score;
    highscoreshowed = false;
    rocket.style.transform = "translateX(100%)";
    rocketImg.style.background= "url(public/rocket-c.webp) center / cover";
    mail.classList.add("mail-a")
    setTimeout(() => {
        gameOver = false;
        planets(0)
        scoreFun()
        mail.classList.remove("mail-a")
        rocket.classList.add("rocket-border")
        textShow("Use mouse to move the Rocket and dodge the obstacles", 6000)
        setTimeout(()=>{
            if(localStorage.getItem("hs") != undefined){
                rocket.classList.remove("rocket-border")
            }else{
                textShow("You have got a very important mail to deliver to a very faaaarrr place, Good luck!", 7000)
            }
            rndmMsg()
        }, 7000)
    }, 5000);
}

//  playbtn
const homeScrn = document.getElementById("home-scrn");
const hcbg = document.getElementById("hc-bg");
const playBtn = document.getElementById("play-btn");
playBtn.addEventListener("click", ()=>{
    homeScrn.style.transform = "translate(-50%,100%)";
    hcbg.style.opacity = 0;
    hcbg.style.pointerEvents = "none";

    setTimeout(() => {
        startGame()
    }, 1500);
})

// text fn
function textShow(text1, time, text2){
    if(text1 != undefined){
        Btext1.innerText = text1;
    }else{
        Btext1.innerText = "";
    }
    if(text2 != undefined){
        Btext2.innerText = text2;
    }else{
        Btext2.innerText = "";
    }
    Btexts.style.opacity = 1;
    setTimeout(() => {
        Btexts.style.opacity = 0;
    }, time);
}


//settings
const settings = document.getElementById("settings")
const setbtn = document.getElementById("settings-btn")
const setx = document.getElementById("set-x")
const bgmToggle = document.getElementById("bgm-checkbox");
const sfxToggle = document.getElementById("sfx-checkbox");
setbtn.addEventListener("click", ()=>{
    settings.style.opacity = 1;
    settings.style.pointerEvents = "all"
})
setx.addEventListener("click",()=>{
    settings.style.opacity = 0;
    settings.style.pointerEvents = "none"
})
bgmToggle.addEventListener("change",(event)=>{
    if(event.target.checked){
        mainBgm.volume = 0.3
        gameBgm.volume = 0.3
        mainBgm.play()
    }else{
        mainBgm.pause()
        mainBgm.volume = 0
        gameBgm.volume = 0
    }
})
sfxToggle.addEventListener("change",(event)=>{
    if(event.target.checked){
        crash.volume = 0.5
    }else{
        crash.volume = 0
    }
})

//about
const about = document.getElementById("about");
const abtbtn = document.getElementById("about-btn")
const abtx = document.getElementById("abt-x");
abtbtn.addEventListener("click", ()=>{
    about.style.opacity = 1;
    about.style.pointerEvents = "all";
})
abtx.addEventListener("click", ()=>{
    about.style.opacity = 0;
    about.style.pointerEvents = "none";
})

// menu btn
const menubtn = document.getElementById("menu-btn")
menubtn.addEventListener("click",()=>{
    goBg.style.opacity = 0;
    goBg.style.pointerEvents = "none";
    go.style.transform = "translate(-50%, 100%)";
    removePlanet()

    homeScrn.style.transform = "translate(-50%,-50%)";
    hcbg.style.opacity = 1;
    hcbg.style.pointerEvents = "all";
})