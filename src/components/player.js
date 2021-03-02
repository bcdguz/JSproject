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
        ctx.arc(this.playerPosX, this.playerPosY, 18, 0, 2 * Math.PI);
        ctx.fillStyle = "brown";
        ctx.fill()
        ctx.stroke();
    }
}