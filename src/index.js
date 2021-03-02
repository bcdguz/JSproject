import _ from 'lodash';
import Game from './components/game';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('bird-game');
    const game = new Game(canvas);
})