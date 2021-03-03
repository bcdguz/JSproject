const CONSTANTS = {
    PLAYER_SPEED: 1.5,
    PLAYER_RADIUS: 18
}


export default class Player {
    constructor(dimensions){
        this.dimensions = dimensions;
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
        const speed = CONSTANTS.PLAYER_SPEED;
        const radius = CONSTANTS.PLAYER_RADIUS;
        const dimensions = this.dimensions;

        //boundary checks
        const upBound = this.playerPosY - speed - radius > 0;
        const lowBound = this.playerPosY + speed + radius < dimensions.height;
        const leftBound = this.playerPosX - speed - radius > 0;
        const rightBound = this.playerPosX + speed + radius < dimensions.width;
        
        if (move["wKey"] && move["aKey"]) {
            if (upBound && leftBound) {
                this.playerPosX -= 0.5 * speed;
                this.playerPosY -= 0.5 * speed;
            }
        } else if (move["wKey"] && move["dKey"]) {
            this.playerPosX += 0.5 * speed;
            this.playerPosY -= 0.5 * speed;
        } else if (move["sKey"] && move["aKey"]) {
            this.playerPosX -= 0.5 * speed;;
            this.playerPosY += 0.5 * speed;
        } else if (move["sKey"] && move["dKey"]) {
            this.playerPosX += 0.5 * speed;
            this.playerPosY += 0.5 * speed;
        } else if (move["wKey"]) {
            if (upBound) this.playerPosY -= speed;
        } else if (move["sKey"]) {
            if (lowBound) this.playerPosY += speed;
        } else if (move["aKey"]) {
            if (leftBound) this.playerPosX -= speed;
        } else if (move["dKey"]) {
            if (rightBound) this.playerPosX += speed;
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