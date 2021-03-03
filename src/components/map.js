import { walls, isBetween } from './util/constants';


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
        const pBound = player.playerBounds()
        const pRight = pBound.right;
        const pTop = pBound.top;
        const pBot = pBound.bot;
        const pLeft = pBound.left;

        this.eachWall(wall => {
            
            const wallLeft = wall.posX;
            const wallRight = wall.posX + wall.width;
            const wallTop = wall.posY;
            const wallBot = wall.posY + wall.height;
            if ((pRight === wallLeft) &&
                (isBetween(wallTop, wallBot, pTop) ||
                isBetween(wallTop, wallBot, pBot))) {
                    console.log("bump")
                    player.movement.dKey = false;
                }
        })
        
        //  || obj1.right < obj2.left) {
        //     return false;
        // }
        // if (obj1.top > obj2.bottom || obj1.bottom < obj2.top) {
        //     return false;
        // }
    }
}