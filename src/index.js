import _ from 'lodash';
import Game from './components/game';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('zombo-game');
    const game = new Game(canvas);
    game.restart();
    game.play();
    game.moveListener();
    game.lookListener();
    game.bulletListener();
})