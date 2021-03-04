import { WALLS } from './util/constants';


export default class Map {
    constructor(dimensions){
        this.dimensions = dimensions; //canvas dimensions
        this.wallImg = document.getElementById('wall');
        this.background = document.getElementById('background');
        this.walls = WALLS;
        
    }

    animate(ctx){
        this.drawMap(ctx);
        this.drawWalls(ctx);
    }

    drawMap(ctx){
        ctx.drawImage(this.background, 0, 0,
        this.dimensions.width, this.dimensions.height);    
    }

    drawWalls(ctx){
        this.eachWall(wall => {
            ctx.drawImage(this.wallImg, wall.posX,
            wall.posY, wall.width, wall.height);
        });
    }

    eachWall(cb){ //preserve my walls context
        this.walls.forEach(cb.bind(this));
    }
}