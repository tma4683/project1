import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const speed = .03;
const groundElems = document.querySelectorAll('[data-ground]');


export function setupGround(){
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
}

export function updateGround(delta, speedScale){
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * speed * -1);

        if(getCustomProperty(ground, "--left") <= -300){ //if statement so that the ground keeps  looping
            incrementCustomProperty(ground, "--left", 600);
        };
    });
    
}