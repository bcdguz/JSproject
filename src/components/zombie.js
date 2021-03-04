import { random } from 'lodash';
import {ZOMBIE} from './util/constants';

export default class Zombie {
    constructor(dimensions, player){
        this.posX = dimensions.width + ZOMBIE.RADIUS;
        this.posY = random(-ZOMBIE.RADIUS, dimensions.height + ZOMBIE.RADIUS);
        this.angle = Math.log(this.playerPosY, this.playerPosX);
        this.rotate(player);
    }

    animate(ctx) {}

    drawZombie(ctx) {
        ctx.save();
        const posX = this.posX;
        const posY = this.posY;
        ctx.translate(posX, posY);
        ctx.rotate(this.angle);
        ctx.translate(-posX, -posY);

        ctx.beginPath()
        ctx.fillStyle = "#00cc44"
        ctx.arc(posX, this.posY, ZOMBIE.RADIUS, 0, Math.PI * 2)
        ctx.fill()

        // Hands
        ctx.beginPath()
        ctx.strokeStyle = "#00cc44"
        ctx.lineCap = "round"
        ctx.lineWidth = 2

        // Right Hand
        ctx.moveTo(posX + 5, this.posY + ZOMBIE.RADIUS - 2)
        ctx.lineTo(posX + ZOMBIE.RADIUS + 15, this.posY + ZOMBIE.RADIUS - 5)
        ctx.stroke()

        // Left Hand
        ctx.moveTo(posX + 5, this.posY - ZOMBIE.RADIUS + 2)
        ctx.lineTo(posX + ZOMBIE.RADIUS + 15, this.posY - ZOMBIE.RADIUS + 5)
        ctx.stroke()

        ctx.restore()
    }

    rotate(player) {
        const dy = player.posY - this.posY;
        const dx = player.posX - this.posX;
        this.angle = Math.atan2(dy, dx)
    }

    moveZombie(player, zombies) {
        this.rotate(player)
    }
}