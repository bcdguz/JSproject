
import Level from './level';
import { FPS } from './util/constants';

export default class Game {
    constructor(canvas){
        this.canvasEl = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, height: canvas.height};
        this.levelTitle = document.getElementById('level-title');
        this.playerLives = document.getElementById('player-lives');
        this.restartMenu = document.getElementsByClassName('modal')[0];
        this.gameOverMsg = document.getElementById('game-over-p');
        this.prevDelta = 0;
    }

    animate(curr){
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this, Date.now()));
        }

        //Limiting max fps to 60 so that fps is consistent across monitors
        let delta = curr - this.prevDelta;
        if (delta < 1000 / FPS) {
            return;
        }
        this.prevDelta = curr;

        this.levelTitle.innerHTML = `Wave ${this.level.wave}`;
        this.playerLives.innerHTML = `${this.level.player.lives}`;
        this.level.animate();

        if (this.level.gameOver()) {
            this.running = false;
            this.gameOverMenu();
        }

    }

    gameOverMenu() {
        this.gameOverMsg.innerHTML = `Game Over! Waves survived ${this.level.wave}`;
        this.restartMenu.style.display = "block";
    }

    restart(){
        this.running = false;
        this.level = new Level(this.canvasEl, this.ctx, this.dimensions);
        // this.animate();
    }

    play(){
        this.running = true;
        this.animate(Date.now());
    }

}