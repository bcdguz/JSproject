export default class Map {
    constructor(dimensions){
        this.dimensions = dimensions;
    }

    animate(ctx){
        this.drawMap(ctx);
    }

    drawMap(ctx){
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }
}