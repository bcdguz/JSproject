
import Level from './level';

export default class Game {
    constructor(canvas){
        this.canvasEl = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, height: canvas.height};
        this.levelTitle = document.getElementById('level-title');
    }

    animate(){
        this.levelTitle.innerHTML = `Level: ${this.level.wave}`
        this.level.animate();

        if (this.level.gameOver()) {
            alert("game over!")
            this.running = false;
        }

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    restart(){
        this.running = false;
        this.level = new Level(this.canvasEl, this.ctx, this.dimensions);
        this.animate();
    }

    play(){
        this.running = true;
        this.animate();
    }

}