export const walls = [
    { posX: 630, posY: 340, width: 130, height: 180 },
    { posX: 630, posY: 60, width: 130, height: 180 },
    { posX: 430, posY: 0, width: 130, height: 160 },
    { posX: 430, posY: 440, width: 130, height: 160 },
    { posX: 380, posY: 230, width: 200, height: 125 },
    { posX: 235, posY: 80, width: 130, height: 125 },
    { posX: 235, posY: 380, width: 130, height: 125 }
]

export const isBetween = (bound1, bound2, val) => {
    if (bound1 <= val && bound2 >= val) return true;
}

export const overlap = (rect1, rect2) => {
    if (((rect1.right < rect2.right && rect1.right > rect2.left) ||
        (rect1.left < rect2.right && rect1.left > rect2.left)) &&
        ((rect1.top < rect2.bottom && rect1.top > rect2.top) ||
        (rect1.bottom < rect2.bottom && rect1.bottom > rect2.top))) {
        debugger
        return true;
    }



    
    // if (rect1.left > rect2.right || rect1.right < rect2.left) {
    //     return false;
    // }
    
    // if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
    //     return false;
    // }
    // debugger
    return false;
};