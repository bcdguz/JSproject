import _ from 'lodash';
import Game from './components/game';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('zombo-game');
    const game = new Game(canvas);
    const playButton = document.getElementById('play-button');
    const splashPage = document.getElementsByClassName('splash-page')[0];
    const gameContainer = document.getElementsByClassName('game-container')[0];
    const controlsButton = document.getElementById('controls-button');
    const controlsPage = document.getElementsByClassName('controls-page')[0];
    const backButton = document.getElementById('back-arrow');
    const backgroundMusic = document.getElementById('song');
    const audioButton = document.getElementById('audio-button');
    const volumeControl = document.getElementById('volume-control')
    game.restart();

    playButton.addEventListener("click", () => {
        splashPage.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        game.play();
        volumeControl.value = 25;
        backgroundMusic.volume = 0.25;
        backgroundMusic.play();
    })

    controlsButton.addEventListener("click", () => {
        splashPage.classList.add("hidden");
        controlsPage.classList.remove("hidden");
    })

    backButton.addEventListener("click", () => {
        controlsPage.classList.add("hidden");
        splashPage.classList.remove("hidden");
    })

    audioButton.addEventListener("click", () => {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            audioButton.classList.remove("muted");
        } else {
            backgroundMusic.muted = true;
            audioButton.classList.add("muted");
        }
    })

    volumeControl.addEventListener("change", (e) => {
        backgroundMusic.volume = e.currentTarget.value / 100;
    })
})