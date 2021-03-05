import Player from './player';
import Map from './map';
import Zombie from './zombie';
import Bullet from './bullet';
import mousePointer from './util/mouse_pointer';
import { overlap } from './util/overlap'

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
        const player = this.player.playerBounds();
        for (let i = 0; i < this.zombies.length; i++) {
            const zombie = this.zombies[i].zombieBounds();
            if (overlap(player, zombie).type !== null) {
                return true;
            }
        }
        return false
    }

    levelOver() {
        if (this.player.kills === this.totalZombies) alert("level complete")
    }


    start() {
        this.running = false;
        this.map = new Map(this.dimensions);
        this.player = new Player(this.dimensions);
        this.spawnZombies();
    }

    spawnZombies() {
        let spawn1 = setTimeout(() => {
            if (this.spawned === this.totalZombies) {
                clearTimeout(spawn1);
            } else {
                this.zombies.push(new Zombie(this.dimensions, this.player));
                this.spawned++;
            }
        }, 1500)
        let spawn2 = setTimeout(() => {
            if (this.spawned === this.totalZombies) {
                clearTimeout(spawn2);
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
        document.addEventListener("mousemove", (e) => {
            let dir = mousePointer(this.canvas, e);
            this.player.look(dir);
        })
    }

    bulletListener() {
        const bullets = this.bullets
        const player = this.player
        document.addEventListener("click", () => {
            bullets.push(
                new Bullet(player.playerPosX, player.playerPosY,
                    player.angle, this.dimensions)
            )
        })
    }
}