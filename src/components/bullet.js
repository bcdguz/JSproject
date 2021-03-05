import { BULLET, WALLS } from './util/constants';
import { overlap } from './util/overlap';

export default class Bullet {
    constructor(x, y, angle, dimensions) {
        this.dimensions = dimensions;
        this.angle = { x: Math.cos(angle), y: Math.sin(angle)};
        this.posX = x + this.angle.x * 40;
        this.posY = y + this.angle.y * 40;
    }

    animate(ctx, bullets) {
        this.update(bullets); //add zombies
        this.drawBullet(ctx);
    }

    drawBullet(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, BULLET.RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.restore();
    }

    bulletBounds() {
        const midX = this.posX;
        const midY = this.posY;
        const radius = BULLET.RADIUS;
        return {
            top: midY - radius, bottom: midY + radius,
            left: midX - radius, right: midX + radius
        }
    }

    outOfBounds(WALLS) {
        const radius = BULLET.RADIUS;
        const bullet = this.bulletBounds();
        const outOfContainer = (this.posX > this.dimensions.width + radius ||
            this.posY > this.dimensions.height + radius ||
            this.posX < 0 - radius ||
            this.posY < 0 - radius);
        for (let i = 0; i < WALLS.length; i++) {
            if (overlap(bullet, WALLS[i])) return true;
        }
        return outOfContainer;
    }

    update(bullets) { // add zombies
        //Remove bullet if it goes out of screen
        if (this.outOfBounds()) {
            const idx = bullets.indexOf(this);
            bullets = bullets.splice(idx, 1);
            return;
        }

        this.posX += this.angle.x * BULLET.SPEED;
        this.posY += this.angle.y * BULLET.SPEED;
    }
}