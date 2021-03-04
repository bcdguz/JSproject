export const overlap = (rect1, rect2) => {
    const rightCheck = (rect1.right < rect2.right && rect1.right > rect2.left);
    const topCheck = (rect1.top < rect2.bottom && rect1.top > rect2.top);
    const botCheck = (rect1.bottom < rect2.bottom && rect1.bottom > rect2.top);
    const leftCheck = (rect1.left < rect2.right && rect1.left > rect2.left);

    let adjust = { type: null }

    if (rightCheck && topCheck && botCheck) {
        adjust.type = "right";
        adjust.val = rect2.left;
        return adjust
    } else if (leftCheck && topCheck && botCheck) {
        adjust.type = "left";
        adjust.val = rect2.right;
        return adjust;
    } else if (topCheck && leftCheck && rightCheck) {
        adjust.type = "top";
        adjust.val = rect2.bottom;
        return adjust;
    } else if (botCheck && leftCheck && rightCheck) {
        adjust.type = "bottom";
        adjust.val = rect2.top;
        return adjust
    }

    //corner logic still broken

    return adjust;
};