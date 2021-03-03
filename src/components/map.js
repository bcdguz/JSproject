export default class Map {
    constructor(dimensions){
        this.dimensions = dimensions;
        this.wallImg = document.getElementById('wall');
        this.background = document.getElementById('background');
        this.walls = [];
    }

    animate(ctx){
        this.drawMap(ctx);
    }

    drawMap(ctx){
        //background
        ctx.drawImage(this.background, 0, 0, this.dimensions.width, this.dimensions.height);

        ctx.drawImage(this.wallImg, 550, 350, 200, 250);
        ctx.drawImage(this.wallImg, 550, 0, 200, 250)

     
    }
}