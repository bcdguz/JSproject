import { walls } from './util/constants';

export default class Map {
    constructor(dimensions){
        this.dimensions = dimensions; //canvas dimensions
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

    drawWalls(ctx){
        this.eachWall(wall => {
            ctx.drawImage(this.wallImg, wall.posX,
            wall.posY, wall.width, wall.height);
        });
    }

    eachWall(cb){ //preserve my walls context
        this.walls.forEach(cb.bind(this));
    }

    collidesWith(player){
        this.eachWall(wall => {
            const wallLeft = wall.posX;
            const wallRight = wall.posX + wall.width;
            const wallTop = wall.posY;
            const wallBot = wall.posY + wall.height;
        })
        
        if (obj1.left > obj2.right || obj1.right < obj2.left) {
            return false;
        }
        if (obj1.top > obj2.bottom || obj1.bottom < obj2.top) {
            return false;
        }
        return true;
        


    }
}