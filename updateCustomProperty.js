export function getCustomProperty(element, property){ //convert the  css property to a number
    return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0 ;
    
}

export function setCustomProperty(element, property, value){ //set the css property
    element.style.setProperty(property, value);
}

export function incrementCustomProperty(element, property, value){ //increment the css property
    setCustomProperty(element, property, getCustomProperty(element, property) + value);
}