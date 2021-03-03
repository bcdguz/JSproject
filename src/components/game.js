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
        switch(e.keyCode){
            case 87: //w key
                if (e.type === "keydown") {
                    this.player.movement["wKey"] = true;
                } else {
                    this.player.movement["wKey"] = false;
                }
                break;
            case 65: //a key
                if (e.type === "keydown") {
                    this.player.movement["aKey"] = true;
                } else {
                    this.player.movement["aKey"] = false;
                }
                break;
            case 83: //s key
                if (e.type === "keydown") {
                    this.player.movement["sKey"] = true;
                } else {
                    this.player.movement["sKey"] = false;
                }
                break;
            case 68: //d key
                if (e.type === "keydown") {
                    this.player.movement["dKey"] = true;
                } else {
                    this.player.movement["dKey"] = false;
                }
                break;
        }
    }

    moveListener(){
        const moveBound = this.moveBinds.bind(this);
        document.addEventListener("keydown",moveBound);
        document.addEventListener("keyup", moveBound);
    }
}