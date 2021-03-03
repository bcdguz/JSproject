import { walls } from './util/constants';

export default class Map {
    constructor(dimensions){
        this.dimensions = dimensions;
        this.wallImg = document.getElementById('wall');
        this.background = document.getElementById('background');
        this.walls = walls;
    }

    animate(ctx){
        this.drawMap(ctx);
        this.drawWalls(ctx);
    }

    drawMap(ctx){
        ctx.drawImage(this.background, 0, 0,
        this.dimensions.width, this.dimensions.height);    
    }

    drawWalls(ctx) {
        this.walls.forEach(wall => {
            ctx.drawImage(this.wallImg, wall.posX,
            wall.posY, wall.width, wall.height);
        });
    }
}