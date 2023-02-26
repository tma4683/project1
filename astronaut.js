import { setCustomProperty,incrementCustomProperty, getCustomProperty } from "./updateCustomProperty.js";

const astroElem = document.querySelector("[data-astro]");
const JUMP_SPEED = .45;
const GRAVITY = .0013;
const ASTRO_FRAME_COUNT = 2;
const FRAME_TIME = 100; //every single frame of our animation should last 100ms 


let isJumping;
let currentFrameTime;
let astroFrame;
let yVelocity;

export function setupAstro(){
    isJumping = false;
    currentFrameTime = 0;
    astroFrame = 0;
    yVelocity = 0;
    setCustomProperty(astroElem, "--bottom", 0);
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
    
}

export function updateAstro(delta, speedScale){
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getAstroRect(){
    return astroElem.getBoundingClientRect();
}


function handleRun(delta, speedScale){
    if(isJumping){ // astronaut when jumping animation
        astroElem.src = 'imgs/astronaut-standing.png'
        return;
    }

    if(currentFrameTime >= FRAME_TIME){ 
        astroFrame = (astroFrame + 1) % ASTRO_FRAME_COUNT;
        astroElem.src = `imgs/astro-run-${astroFrame}.png ` //swap between the two images
        currentFrameTime -= FRAME_TIME; //reset current frame time
    }
    currentFrameTime += delta * speedScale; //as the game gets quicker the astronaut will also increase in speed


}

function handleJump(delta){  //jump animation
    if(!isJumping) return;

    incrementCustomProperty(astroElem, '--bottom', yVelocity * delta);

    if(getCustomProperty(astroElem, '--bottom') <= 0){
        setCustomProperty(astroElem, '--bottom', 0);
        isJumping = false;
    }
    
    yVelocity -= GRAVITY * delta;

}


function onJump(e){ //event listener for the jump button
    if (e.code !== "Space" || isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;

}