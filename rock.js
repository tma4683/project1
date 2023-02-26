import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const SPEED = 0.03; 
const ROCK_INTERVAL_MIN = 500;
const ROCK_INTERVAL_MAX = 2000; //interval between how long to summon a rock on the screen
const worldElem = document.querySelector("[data-world]"); //add the rocks to the screen

let nextRockTime;
export function setupRock(){
    nextRockTime = ROCK_INTERVAL_MIN;
    document.querySelectorAll("[data-rock]").forEach(rock => {
        rock.remove();
    }); //remove the rocks once the game is over.
}

export function updateRock(delta, speedScale){ // create rocks on the screen
    document.querySelectorAll("[data-rock]").forEach(rock => {
        incrementCustomProperty(rock, "--left", delta * speedScale * SPEED * -1);
        if(getCustomProperty(rock, "--left") <= -100){
            rock.remove();
        }
    })

    if (nextRockTime <= 0){
        createRock();
        nextRockTime = randomNumberBetween(ROCK_INTERVAL_MIN, ROCK_INTERVAL_MAX) / speedScale;
    }
    nextRockTime -= delta; // this makes the nextRockTime smaller and below zero so we can create a new rock
}
export function getRockRects(){
    return [...document.querySelectorAll("[data-rock]")].map(rock => 
        {
            return rock.getBoundingClientRect(); 
        });       
}

function createRock(){
    const rock = document.createElement("img");
    rock.dataset.rock = true;
    rock.src = "imgs/Cartoon-Rock.png";
    rock.classList.add("rock");
    setCustomProperty(rock,"--left", 100);
    worldElem.append(rock);   
}


function randomNumberBetween(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min); 
}