export default class Player {
    constructor(dimensions){
        this.playerPosY = dimensions.height/3;
        this.playerPosX = dimensions.width/3;
    }

    animate(ctx){
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx){
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.arc(this.playerPosX, this.playerPosY, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
}