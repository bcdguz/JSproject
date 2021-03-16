import Player from './player';
import Map from './map';
import Zombie from './zombie';
import Bullet from './bullet';
import mousePointer from './util/mouse_pointer';
import { overlap } from './util/overlap';
import { PLAYER } from './util/constants';

export default class Level {
    constructor(canvas, ctx, dimensions){
        this.canvas = canvas;
        this.ctx = ctx;
        this.dimensions = dimensions;
        this.wave = 1;
        this.totalZombies = this.wave * 2;
        this.spawned = 0;
        this.bullets = [];
        this.zombies = [];

        //start first level and begin listening
        this.start();
        this.moveListener();
        this.lookListener();
        this.bulletListener();
    }

    animate() {
        this.levelOver();
        this.map.animate(this.ctx);
        this.player.animate(this.ctx);
        this.bullets.forEach(bullet => {
            bullet.animate(this.ctx, this.bullets, this.zombies)
        });
        this.zombies.forEach(zombie => {
            zombie.animate(this.ctx);
        })
    }

    gameOver() {
        this.player.takeDamage(this.zombies);
        return this.player.lives === 0 ? true : false;
        // const player = this.player.playerBounds();
        // for (let i = 0; i < this.zombies.length; i++) {
        //     const zombie = this.zombies[i].zombieBounds();
        //     if (overlap(player, zombie).type !== null) {
        //         return true;
        //     }
        // }
        // return false
    }

    levelOver() {
        if (this.player.kills === this.totalZombies) {
            this.wave++;
            this.totalZombies = this.wave * 2;
            this.start();
        }
    }


    start() {
        this.map = new Map(this.dimensions);
        this.player = new Player(this.dimensions);
        this.spawned = 0;
        this.spawnZombies();
        this.animate();
    }

    spawnZombies() {
        let spawn1 = setInterval(() => {
            if (this.spawned === this.totalZombies) {
                clearInterval(spawn1);
            } else {
                this.zombies.push(new Zombie(this.dimensions, this.player));
                this.spawned++;
            }
        }, 1500)
        let spawn2 = setInterval(() => {
            if (this.spawned === this.totalZombies) {
                clearInterval(spawn2);
            } else {
                this.zombies.push(new Zombie(this.dimensions, this.player));
                this.spawned++;
            }
        }, 3000)
    }

    moveBinds(e) {
        switch (e.keyCode) {
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

    //event listeners
    moveListener() {
        const moveBound = this.moveBinds.bind(this);
        document.addEventListener("keydown", moveBound);
        document.addEventListener("keyup", moveBound);
    }

    lookListener() {
        this.canvas.addEventListener("mousemove", (e) => {
            let dir = mousePointer(this.canvas, e);
            this.player.look(dir);
        })
    }

    fireBullet() {
        this.bullets.push(
            new Bullet(this.player.playerPosX, this.player.playerPosY,
                this.player.angle, this.dimensions)
        )
    }

    gunSound() {
        const sound = document.getElementById('gun-sound');
        sound.play();
    }

    bulletListener() {
        const fireBullet = this.fireBullet.bind(this);
        const gunSound = this.gunSound.bind(this);
        let reloading = false;
        this.canvas.addEventListener("click", () => {
            if (reloading) {
                return; //A click will do nothing
            }
            reloading = true;
            fireBullet();
            gunSound();
            //Will set reloading to false after timeout
            setTimeout(() => {reloading = false}, PLAYER.FIRE_RATE);
        })
    }
}