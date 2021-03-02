import Player from './player';
import Map from './map';

export default class Game {
    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, height: canvas.height};
    }

    animate(){
        this.map.animate(this.ctx);
        this.player.animate(this.ctx);
    }

    restart(){
        this.running = false;
        this.player = new Player(this.dimensions);
        this.map = new Map(this.dimensions);
        this.animate();
    }
}