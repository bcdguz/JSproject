# Zombies

[Live Site!](https://bcdguz.github.io/Zombies/)
![Gif of game](src/assets/images/game_demo.gif)

## Overview

Zombies is a fun 2-D shooting game utilizing mouse and keyboard input. A player can move the character in various directions using the W A S D keys. Firing consists of aiming with the mouse cursor and left-click. It takes three shots to kill a zombie. There are infinite waves of zombies with that increase in difficulty. Once a zombie touches the player the game is over! Your score is the amount of waves you survived.

## Project Details and Technologies

This project was built in a one week time period using Vanilla JavaScript, HTML5, and CSS. Animation was done through the use of a canvas HTML element.

## Technical Challenges

### Varying Frames Per Second

The method used to animate the game is #requestAnimationFrame. This method calls upon #animate to draw the frames. Generally it will call on animate at 60 frames per second. However, while testing the game out on different computers it was discovered that the method will adapt to higher refresh rate monitors. This caused the movement and shooting to feel vastly different when switching between monitors with different refresh rates. In order to solve this, a time delta was used to keep track of the difference in ms between animation calls. If the difference was lower than the limit, #animate would simply return nothing.

``` javascript
//Inside #animate
if (this.running) {
    requestAnimationFrame(this.animate.bind(this, Date.now()));
}

//Limiting max fps to 60 so that fps is consistent across monitors
let delta = curr - this.prevDelta;
if (delta < 1000 / FPS) { //Here FPS = 60
    return;
}
```

### Zombie Tracking and Collison Events

Zombie tracking was done by finding the angle between the coordinates of the player and the coordinates of the zombie. The zombie's vectors were then adjusted using a speed constant to move the zombie. The major challenge was keeping a zombie moving towards the player when colliding with a solid object. This was solved using case types to find the direction of the collision. Within the case a check was performed to find the position of the player relative to the object in the collision event.

``` javascript
switch (collision.type) {
    //playerLeft and playerAbove found the players relative position
    case "rightBot":
        if (zBound.right > wallRect.left + 2) {
            this.posY = collision.bot - radius;
            playerLeft ? (this.posX -= speed) : (this.posX += speed);
        } else {
            this.posX = collision.right - radius;
            if (edgeWall) {
                wallRect.top === 0 ? (this.posY += speed) : (this.posY -= speed);
            } else {
                playerAbove ? (this.posY -= speed) : (this.posY += speed);
            }
        }
```


## Future Components
+ Different maps
+ High score list
+ More weapons
+ Player lives/bonus lives
