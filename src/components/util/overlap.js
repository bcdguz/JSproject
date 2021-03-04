export const overlap = (rect1, rect2) => {
    const rightCheck = (rect1.right < rect2.right && rect1.right > rect2.left);
    const topCheck = (rect1.top < rect2.bottom && rect1.top > rect2.top);
    const botCheck = (rect1.bottom < rect2.bottom && rect1.bottom > rect2.top);
    const leftCheck = (rect1.left < rect2.right && rect1.left > rect2.left);

    let collision = { type: null }

    if (rightCheck && botCheck) {
        collision.type = "rightBot";
        collision.right = rect2.left;
        collision.bot = rect2.top;
        return collision;
    } else if (rightCheck && topCheck) {
        collision.type = "rightTop";
        collision.right = rect2.left;
        collision.top = rect2.bottom;
        return collision;
    } else if (leftCheck && topCheck) {
        collision.type = "leftTop";
        collision.left = rect2.right;
        collision.top = rect2.bottom;
        return collision;
    } else if (leftCheck && botCheck) {
        collision.type = "leftBot";
        collision.left = rect2.right;
        collision.bot = rect2.top;
        return collision;
    }
    
    
    // else if (leftCheck && topCheck && botCheck) {
    //     collision.type = "left";
    //     collision.val = rect2.right;
    //     return collision;
    // } else if (topCheck && leftCheck && rightCheck) {
    //     collision.type = "top";
    //     collision.val = rect2.bottom;
    //     return collision;
    // } else if (botCheck && leftCheck && rightCheck) {
    //     collision.type = "bottom";
    //     collision.val = rect2.top;
    //     return collision
    // } 

    //corner logic still broken

    return collision;
};