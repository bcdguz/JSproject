import { BULLET } from './util/constants';

export default class Bullet {
    constructor(x, y, angle, dimensions) {
        this.dimensions = dimensions;
        this.angle = { x: Math.cos(angle), y: Math.sin(angle)};
        this.posX = x + this.angle.x * 40;
        this.posY = y + this.angle.y * 40;
    }

    animate(ctx, bullets, zombies) {
        this.update(bullets, zombies);
        this.drawBullet(ctx);
    }

    drawBullet(ctx) {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    outOfBounds() {
        return (this.posX > this.dimensions.width + this.radius ||
            this.posY > this.dimensions.height + this.radius ||
            this.posX < 0 - this.radius ||
            this.posY < 0 - this.radius)
    }

    update(bullets, zombies) {
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