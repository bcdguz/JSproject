const CONSTANTS = {
    PLAYER_SPEED: 0.8
}


export default class Player {
    constructor(dimensions){
        this.playerPosY = dimensions.height/2;
        this.playerPosX = dimensions.width/5;
        this.movement = {wKey: false, aKey: false, sKey: false, dKey: false};
        this.gun = document.getElementById('pistol');
    }

    animate(ctx){
        this.move();
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx){
        //main circle
        ctx.beginPath();
        ctx.arc(this.playerPosX, this.playerPosY, 18, 0, 2 * Math.PI);
        ctx.fillStyle = "brown";
        ctx.fill()
        ctx.stroke();

        //weapon
        ctx.drawImage(this.gun, this.playerPosX, this.playerPosY, 50, 25)

    }

    move(){
        let move = this.movement;
        
        if (move["wKey"] && move["aKey"]) {
            this.playerPosX -= 0.5 * CONSTANTS.PLAYER_SPEED;
            this.playerPosY -= 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["wKey"] && move["dKey"]) {
            this.playerPosX += 0.5 * CONSTANTS.PLAYER_SPEED;
            this.playerPosY -= 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["sKey"] && move["aKey"]) {
            this.playerPosX -= 0.5 * CONSTANTS.PLAYER_SPEED;;
            this.playerPosY += 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["sKey"] && move["dKey"]) {
            this.playerPosX += 0.5 * CONSTANTS.PLAYER_SPEED;
            this.playerPosY += 0.5 * CONSTANTS.PLAYER_SPEED;
        } else if (move["wKey"]) {
            this.playerPosY -= CONSTANTS.PLAYER_SPEED;
        } else if (move["sKey"]) {
            this.playerPosY += CONSTANTS.PLAYER_SPEED;
        } else if (move["aKey"]) {
            this.playerPosX -= CONSTANTS.PLAYER_SPEED;
        } else if (move["dKey"]) {
            this.playerPosX += CONSTANTS.PLAYER_SPEED;
        }

    }
}