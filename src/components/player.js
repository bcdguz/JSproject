const CONSTANTS = {
    PLAYER_SPEED: 0.4
}


export default class Player {
    constructor(dimensions){
        this.playerPosY = dimensions.height/2;
        this.playerPosX = dimensions.width/5;
        this.movement = {wKey: false, aKey: false, sKey: false, dKey: false};
    }

    animate(ctx){
        this.move();
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx){
        ctx.beginPath();
        ctx.arc(this.playerPosX, this.playerPosY, 18, 0, 2 * Math.PI);
        ctx.fillStyle = "brown";
        ctx.fill()
        ctx.stroke();
    }

    move(){
        let move = this.movement;
        console.log(move);
        if (move["wKey"] === true && move["aKey"] === true) {
            this.playerPosX -= 0.5 * CONSTANTS.PLAYER_SPEED;
            this.playerPosY -= 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["wKey"] === true && move["dKey"] === true) {
            this.playerPosX += 0.5 * CONSTANTS.PLAYER_SPEED;
            this.playerPosY -= 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["sKey"] === true && move["aKey"] === true) {
            this.playerPosX -= 0.5 * CONSTANTS.PLAYER_SPEED;;
            this.playerPosY += 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["sKey"] === true && move["dKey"] === true) {
            this.playerPosX += 0.5 * CONSTANTS.PLAYER_SPEED;
            this.playerPosY += 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["wKey"] === true) {
            this.playerPosY -= CONSTANTS.PLAYER_SPEED;
        } else if (move["sKey"] === true) {
            this.playerPosY += CONSTANTS.PLAYER_SPEED;
        } else if (move["aKey"] === true) {
            this.playerPosX -= CONSTANTS.PLAYER_SPEED;
        } else if (move["dKey"] === true) {
            this.playerPosX += CONSTANTS.PLAYER_SPEED;
        }

        // if(this.movement) {
        //     case "LEFT":
        //         console.log('left')
        //         this.playerPosX -= CONSTANTS.PLAYER_SPEED;
        //         break;
        //     case "RIGHT":
        //         console.log('right')
        //         this.playerPosX += CONSTANTS.PLAYER_SPEED;
        //         break;
        //     case "UP":
        //         console.log('up')
        //         this.playerPosY -= CONSTANTS.PLAYER_SPEED;
        //         break;
        //     case "DOWN":
        //         console.log('down')
        //         this.playerPosY += CONSTANTS.PLAYER_SPEED;
        //         break;
        // }
    }
}