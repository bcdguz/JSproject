const CONSTANTS = {
    PLAYER_SPEED: 2
}


export default class Player {
    constructor(dimensions){
        this.playerPosY = dimensions.height/2;
        this.playerPosX = dimensions.width/5;
        this.movement = "";
    }

    animate(ctx){
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
        switch(this.movement) {
            case "LEFT":
                console.log('left')
                this.playerPosX -= CONSTANTS.PLAYER_SPEED;
                break;
            case "RIGHT":
                console.log('right')
                this.playerPosX += CONSTANTS.PLAYER_SPEED;
                break;
            case "UP":
                console.log('up')
                this.playerPosY -= CONSTANTS.PLAYER_SPEED;
                break;
            case "DOWN":
                console.log('down')
                this.playerPosY += CONSTANTS.PLAYER_SPEED;
                break;
        }
    }
}