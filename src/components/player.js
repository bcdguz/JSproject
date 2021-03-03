const CONSTANTS = {
    PLAYER_SPEED: 1.5,
    PLAYER_RADIUS: 18
}


export default class Player {
    constructor(dimensions){
        this.playerPosY = dimensions.height/2;
        this.playerPosX = dimensions.width/5;
        this.angle = Math.log(this.playerPosY,this.playerPosX);
        this.movement = {wKey: false, aKey: false, sKey: false, dKey: false};
        this.gun = document.getElementById('pistol');
    }

    animate(ctx){
        this.move();
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx){
        const posX = this.playerPosX;
        const posY = this.playerPosY

        ctx.save();
        
        ctx.setTransform(1, 0, 0, 1, posX, posY);
        ctx.rotate(this.angle);
        
        //main body
        ctx.beginPath();
        ctx.arc(0, 0, CONSTANTS.PLAYER_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.stroke();
        
        //weapon
        ctx.drawImage(this.gun, 5, - 3, 30, 20);
        
        ctx.restore();
    }

    playerBounds(){
        return {
            centerX: this.playerPosX,
            centryY: this.playerPosY,
            radius: CONSTANTS.PLAYER_RADIUS
        }
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

    look(dir){
        // This method takes in xy of mouse pos to return angle
        //x,y relative to players position
        let dy = dir.y - this.playerPosY;
        let dx = dir.x - this.playerPosX;
        this.angle = Math.atan2(dy, dx);
    }
}