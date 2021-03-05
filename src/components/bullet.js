import { BULLET } from './util/constants';

export default class Bullet {
    constructor(x, y, angle) {
        this.angle = { x: Math.cos(angle), y: Math.sin(angle)};
        this.posX = x + this.angle.x * 40;
        this.posY = y + this.angle.y * 40;
    }

    bounds() {

    }

    move(bullets, zombies) {
        this.posX += this.angle.x * 
    }
}