import { random } from 'lodash';
import {ZOMBIE} from './util/constants';

export default class Zombie {
    constructor(dimensions, player){
        this.dimensions = dimensions;
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


}