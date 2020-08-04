// This is  a function that generates random number and takes two number as parameter
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}



// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // sets the height and width of the enemy bug images. Needed for the smooth working of the collision.

    this.height = 68;
    this.width = 100;
    this.x = x;
    this.y = y;
    this.speed = random(100, 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // this changes the position of the enemy bug when it goes off the the canvas.

    this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
        this.speed = random(100, 300);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// all the 6 enemy  objects are created here. They have three different spawn location and
// the random function we created earlier giving then different speed everytime they are respawn.

var enemy1 = new Enemy(0, 60);
var enemy2 = new Enemy(0, 140);
var enemy3 = new Enemy(0, 230);
var enemy4 = new Enemy(0, 60);
var enemy5 = new Enemy(0, 140);
var enemy6 = new Enemy(0, 230);

// the enemy objects are put into and array here.

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


// similar to Enemy class a Player class is defined here.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.height = 75;
    this.width = 70;
    this.x = x;
    this.y = y;
    this.playerScore = 0;
};


// this function resets the players position when a collusion happens or when player gets to the safe zone in the top of the canvas

Player.prototype.reset = function() {
    this.x = 300;
    this.y = 400;
};

// this is the function that tracks the collusion of the player and enemy object.
// There is a for loop that goes through the allEnemies object and an if statement checks if a collusion has occured using the "Axis-Aligned Bounding Box" technique

Player.prototype.collusion = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x < allEnemies[i].x + allEnemies[i].width) && (this.x + this.width > allEnemies[i].x) && (this.y < allEnemies[i].y + allEnemies[i].height) && (this.y + this.height > allEnemies[i].y)) {
            console.log("Collusion!!");
            this.reset();
        }
    }
};

// This prevents the player going off canvas. This also check if a player has successfully reached the safe zone at the top.
//  upon reaching the top player secures a score and there is a counter for keeping the score saved.
//  the player collusion method is also called upon at the bottom

Player.prototype.update = function(dt) {

    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 400) {
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400) {
        if (this.y > 400) {
            this.y = 400;
        } else if (this.y < 0) {
            this.playerScore += 1;
            document.getElementById("score").innerHTML = this.playerScore;
            this.reset();
        }
    }

    this.collusion();
    this.winCondition();

};


// This function renders the players image in the canvas.

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  This handles the keyboard input that is being made for the player.

Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        this.x -= 100;
    }

    if (direction === 'right') {
        this.x += 100;
    }

    if (direction === 'up') {
        this.y -= 85;
    }

    if (direction === 'down') {
        this.y += 85;
    }
};

// this is a win condition when player reaches the top for certain times it will announce the player as winner and the game will enc and restart will occur.

Player.prototype.winCondition = function() {
    if (this.playerScore === 5) {
        alert("Congratulations!! You have done it!!");
        this.playerScore = 0;
        document.getElementById("score").innerHTML = this.playerScore;
    }
};


var player = new Player(300, 400);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// var score = function() {
//     ctx.font = "30px Arial";
//     ctx.fillText("Hello World", 300, 300);

// };



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});