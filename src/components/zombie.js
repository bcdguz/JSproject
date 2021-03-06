import { overlap } from './util/overlap';
import { ZOMBIE, WALLS } from './util/constants';

export default class Zombie {
    constructor(dimensions, player){
        this.player = player;
        this.dimensions = dimensions;
        this.posX = dimensions.width - 20;
        this.posY = Math.random() * (dimensions.height - 20) + 10;
        this.rotate(player);
        this.health = ZOMBIE.ZOMB_HEALTH;
        this.color = { 3: "#0E9C03", 2: "#8BE402", 1: "#CDDE09"};
    }

    animate(ctx) {
        this.moveZombie(this.player);
        this.collisionCheck(this.player);
        this.drawZombie(ctx);
    }

    takeDamage(zombies) {
        this.health--;
        if (this.health === 0) {
            const idx = zombies.indexOf(this);
            zombies = zombies.splice(idx, 1);
            this.player.kills++;
        }
    }

    drawZombie(ctx) {
        ctx.save();
        const posX = this.posX;
        const posY = this.posY;
        const color = this.color[this.health];
        //Transform is moving the canvas to pos
        //thus everything following is drawn at 0 0
        ctx.setTransform(1, 0, 0, 1, posX, posY)
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color
        ctx.arc(0, 0, ZOMBIE.RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke()

        // Hands
        ctx.beginPath();
        ctx.strokeStyle = color
        ctx.lineCap = "round"
        ctx.lineWidth = 4
        ctx.moveTo(0, 0 + ZOMBIE.RADIUS)
        ctx.lineTo(20, 10)
        ctx.stroke()

        ctx.beginPath();
        ctx.strokeStyle = color
        ctx.lineCap = "round"
        ctx.lineWidth = 4
        ctx.moveTo(0, 0 - ZOMBIE.RADIUS)
        ctx.lineTo(20, -10)
        ctx.stroke()

        ctx.restore()
    }

    rotate(player) {
        const dy = player.playerPosY - this.posY;
        const dx = player.playerPosX - this.posX;
        this.angle = Math.atan2(dy, dx);
    }

    moveZombie(player) {
        this.rotate(player);
        const speed = ZOMBIE.ZOMB_SPEED;
        //boundary checks
        const position = this.posY + Math.sin(this.angle) * speed;
        const upBound = position - ZOMBIE.RADIUS > 0;
        const lowBound = position + ZOMBIE.RADIUS < this.dimensions.height;
        
        this.posX += Math.cos(this.angle) * speed;        
        if (upBound && lowBound) {
            this.posY += Math.sin(this.angle) * speed;
        }

    }

    zombieBounds() {
        const midX = this.posX;
        const midY = this.posY;
        const radius = ZOMBIE.RADIUS;
        return {
            top: midY - radius, bottom: midY + radius,
            left: midX - radius, right: midX + radius
        }
    }

    collisionCheck(player) {
        const zBound = this.zombieBounds();
        const dim = this.dimensions;
        const radius = ZOMBIE.RADIUS;
        const speed = ZOMBIE.ZOMB_SPEED * 0.78;

        WALLS.forEach(wall => {
            const wallRect = {};
            wallRect.left = wall.posX;
            wallRect.right = wall.posX + wall.width;
            wallRect.top = wall.posY;
            wallRect.bottom = wall.posY + wall.height;
            
            const playerLeft = player.playerPosX < wallRect.right - wall.width/2;
            const playerAbove = player.playerPosY < wallRect.bottom - wall.height/2;
            const edgeWall = wallRect.top === 0 || wallRect.bottom === dim.height;

            const collision = overlap(zBound, wallRect); //returns an object
            //think about spliting logic? this.colliding = true?
            switch (collision.type) {
                case "rightBot":
                    if (zBound.right > wallRect.left + 2) {
                        this.posY = collision.bot - radius;
                        playerLeft ? (this.posX -= speed) : (this.posX += speed);
                    } else {
                        this.posX = collision.right - radius;
                        if (edgeWall) {
                            wallRect.top === 0 ? (this.posY += speed) : (this.posY -= speed);
                        } else {
                            playerAbove ? (this.posY -= speed) : (this.posY += speed);
                        }
                    }
                    break;
                case "leftBot":
                    if (zBound.left < wallRect.right - 2) {
                        this.posY = collision.bot - radius;
                        playerLeft ? (this.posX -= speed) : (this.posX += speed);
                    } else {
                        this.posX = collision.left + radius;
                        if (edgeWall) {
                            wallRect.top === 0 ? (this.posY += speed) : (this.posY -= speed);
                        } else {
                            playerAbove ? (this.posY -= speed) : (this.posY += speed);
                        }
                    }
                    break;
                case "rightTop":
                    if (zBound.right > wallRect.left + 2) {
                        this.posY = collision.top + radius;
                        playerLeft ? (this.posX -= speed) : (this.posX += speed);
                    } else {
                        this.posX = collision.right - radius;
                        if (edgeWall) {
                            wallRect.top === 0 ? (this.posY += speed) : (this.posY -= speed);
                        } else {
                            playerAbove ? (this.posY -= speed) : (this.posY += speed);
                        }
                    }
                    break;
                case "leftTop":
                    if (zBound.left < wallRect.right - 2) {
                        this.posY = collision.top + radius;
                        playerLeft ? (this.posX -= speed) : (this.posX += speed);
                    } else {
                        this.posX = collision.left + radius;
                        if (edgeWall) {
                            wallRect.top === 0 ? (this.posY += speed) : (this.posY -= speed);
                        } else {
                            playerAbove ? (this.posY -= speed) : (this.posY += speed);
                        }
                    }
                    break;
            }
        })
    }
}