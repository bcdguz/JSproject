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

        ctx.drawImage(this.wallImg, 625, 340, 130, 180);
        ctx.drawImage(this.wallImg, 625, 60, 130, 180);

        ctx.drawImage(this.wallImg, 425, 0, 130, 160);
        ctx.drawImage(this.wallImg, 425, 230, 130, 125);
        ctx.drawImage(this.wallImg, 425, 440, 130, 160);
    }
}