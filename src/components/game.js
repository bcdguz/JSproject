
import Level from './level';

export default class Game {
    constructor(canvas){
        this.canvasEl = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, height: canvas.height};
        this.levelTitle = document.getElementById('level-title');
        this.restartMenu = document.getElementsByClassName('modal')[0];
        this.gameOverMsg = document.getElementById('game-over-p');
    }

    animate(){
        this.levelTitle.innerHTML = `Level: ${this.level.wave}`
        this.level.animate();

        if (this.level.gameOver()) {
            this.running = false;
            this.gameOverMenu();
        }

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    gameOverMenu() {
        this.gameOverMsg.innerHTML = `Game Over! Waves survived ${this.level.wave}`;
        this.restartMenu.style.display = "block";
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