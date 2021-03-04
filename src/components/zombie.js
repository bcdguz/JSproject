import { random } from 'lodash';
import {ZOMBIE} from './util/constants';

export default class Zombie {
    constructor(dimensions, player){
        this.posX = dimensions.width - 20;
        this.posY = dimensions.height/2;
        this.rotate(player);
    }

    animate(ctx, player) {
        this.moveZombie(player);
        this.drawZombie(ctx);
    }

    drawZombie(ctx) {
        ctx.save();
        const posX = this.posX;
        const posY = this.posY;
        
        ctx.setTransform(1, 0, 0, 1, posX, posY)
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.fillStyle = "#00cc44";
        ctx.arc(0, 0, ZOMBIE.RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();


        ctx.restore()
    }

    rotate(player) {
        const dy = player.playerPosY - this.posY;
        const dx = player.playerPosX - this.posX;
        this.angle = Math.atan2(dy, dx);
    }

    moveZombie(player) {
        this.rotate(player);
        this.posX += Math.cos(this.angle) * ZOMBIE.ZOMB_SPEED;
        this.posY += Math.sin(this.angle) * ZOMBIE.ZOMB_SPEED;
    }
}