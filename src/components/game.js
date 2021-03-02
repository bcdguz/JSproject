import Player from './player';
import Map from './map';

export default class Game {
    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, height: canvas.height};
        this.moveListener();
    }

    animate(){
        this.map.animate(this.ctx);
        this.player.animate(this.ctx);

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    restart(){
        this.running = false;
        this.player = new Player(this.dimensions);
        this.map = new Map(this.dimensions);
        this.animate();
    }

    play(){
        this.running = true;
        this.animate();
    }

    moveBinds(e){
        console.log(e)
        switch(e.keyCode){
            case 87:
                this.player.movement = "UP"; // w key
                this.player.move();
                break;
            case 65:
                this.player.movement = "LEFT"; // a key
                this.player.move();
                break;
            case 83:
                this.player.movement = "DOWN"; // s key
                this.player.move();
                break;
            case 68:
                this.player.movement = "RIGHT"; // d key
                this.player.move();
                break;
        }
    }

    moveListener(){
        const moveBound = this.moveBinds.bind(this);
        document.addEventListener("keydown",moveBound);
    }
}