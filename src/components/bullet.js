import { BULLET, WALLS } from './util/constants';
import { overlap } from './util/overlap';

export default class Bullet {
    constructor(x, y, angle, dimensions) {
        this.dimensions = dimensions;
        this.angle = { x: Math.cos(angle), y: Math.sin(angle)};
        this.posX = x + this.angle.x * 40;
        this.posY = y + this.angle.y * 40;
    }

    animate(ctx, bullets, zombies) {
        this.update(bullets, zombies); //add zombies
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

    outOfBounds() {
        const radius = BULLET.RADIUS;
        const bullet = this.bulletBounds();
        const outOfContainer = (this.posX > this.dimensions.width + radius ||
            this.posY > this.dimensions.height + radius ||
            this.posX < 0 - radius ||
            this.posY < 0 - radius);
        for (let i = 0; i < WALLS.length; i++) {
            const wallRect = {};
            const wall = WALLS[i];
            wallRect.left = wall.posX;
            wallRect.right = wall.posX + wall.width;
            wallRect.top = wall.posY;
            wallRect.bottom = wall.posY + wall.height;
            if (overlap(bullet, wallRect).type !== null) {
                return true;
            };
        }
        return outOfContainer;
    }

    hitZombie(zombies) {
        const bullet = this.bulletBounds();
        for (let i = 0; i < zombies.length; i++) {
            const zombie = zombies[i];
            const zombBound = zombie.zombieBounds();
            if (overlap(bullet, zombBound).type !== null) {
                zombie.takeDamage(zombies);
                return true;
            };
        }
        return false;
    }

    update(bullets, zombies) {
        const bulletIdx = bullets.indexOf(this);
        if (this.hitZombie(zombies) || this.outOfBounds()) {
            bullets = bullets.splice(bulletIdx, 1);
            return;
        }

        
        this.posX += this.angle.x * BULLET.SPEED;
        this.posY += this.angle.y * BULLET.SPEED;
    }
}