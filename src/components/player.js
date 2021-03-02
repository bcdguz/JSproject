const CONSTANTS = {
    PLAYER_SPEED: 0.4
}


export default class Player {
    constructor(dimensions){
        this.playerPosY = dimensions.height/2;
        this.playerPosX = dimensions.width/5;
        this.movement = "";
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
        switch(this.movement) {
            case "LEFT":
                this.playerPosX -= CONSTANTS.PLAYER_SPEED;
            case "RIGHT":
                this.playerPosX += CONSTANTS.PLAYER_SPEED;
            case "UP":
                this.playerPosY -= CONSTANTS.PLAYER_SPEED;
            case "DOWN":
                this.playerPosY += CONSTANTS.PLAYER_SPEED;
        }
    }
}