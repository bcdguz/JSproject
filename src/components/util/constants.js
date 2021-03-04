export const walls = [
    { posX: 630, posY: 340, width: 120, height: 180 },
    { posX: 630, posY: 60, width: 120, height: 180 },
    { posX: 430, posY: 0, width: 120, height: 160 },
    { posX: 430, posY: 440, width: 120, height: 160 },
    { posX: 420, posY: 230, width: 150, height: 125 },
    { posX: 228, posY: 80, width: 120, height: 130 },
    { posX: 228, posY: 380, width: 120, height: 130 }
]

export const PLAYER = {
    PLAYER_SPEED: 1.5,
    PLAYER_RADIUS: 14
}

export const ZOMBIE = {
    ZOMB_SPEED: 1.1,
    ZOMB_HEALTH: 3,
    RADIUS: 14
}

export const overlap = (rect1, rect2) => {
    const rightCheck = (rect1.right < rect2.right && rect1.right > rect2.left);
    const topCheck = (rect1.top < rect2.bottom && rect1.top > rect2.top);
    const botCheck = (rect1.bottom < rect2.bottom && rect1.bottom > rect2.top);
    const leftCheck = (rect1.left < rect2.right && rect1.left > rect2.left);

    let adjust = {type: null} 

    if (rightCheck && topCheck && botCheck) {
        adjust.type = "right";
        adjust.val = rect2.left;
        console.log('right')
        return adjust
    } else if (leftCheck && topCheck && botCheck) {
        adjust.type = "left";
        adjust.val = rect2.right;
        console.log('left')
        return adjust;
    } else if (topCheck && leftCheck && rightCheck) {
        adjust.type = "top";
        adjust.val = rect2.bottom;
        console.log("in top")
        return adjust;
    } else if (botCheck && leftCheck && rightCheck) {
        adjust.type = "bottom";
        adjust.val = rect2.top;
        console.log("in bottom")
        return adjust
    } 

    //corner logic still broken
    
    return adjust;
};