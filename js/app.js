'use strict';
// Princess frogger game


var Enemy = function(x, y, SpeedMulti) {
    this.sprite = 'images/enemy-bug.png';

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.SpeedMulti = Math.ceil(Math.random() * 10);
};


// Update the enemy's position, required method for game
// Parameter: dt found in engine, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.SpeedMulti * dt * (Math.random() * 30);

    //checks collision between this enemy and the player, if collides then resets.
    if (
        player.y + 131 >= this.y + 90 &&
        player.x + 25 <= this.x + 88 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 76 >= this.x + 11) {
        player.x = 250;
        player.y = 550;
    }

    // Make enemies loop from the left to end of canvas
    if (this.x >= 700) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* The Player!
 */

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, SpeedMulti) {
    // Player location
    this.x = x;
    this.y = y;
    this.SpeedMulti = SpeedMulti;
    // Image for the player
    this.sprite = 'images/char-princess-girl.png';

};

Player.prototype.update = function() {

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the difficultyRaised function
    if (this.y <= 10) {
        this.x = 250;
        this.y = 550;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        difficultyRaised(score);

    }

    // Check if player runs into left, bottom, or right canvas walls
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 500) {
        this.y = 500;
    }
    if (this.x > 505.5) {
        this.x = 505.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.SpeedMulti;
    }
    if (keyPress == 'up') {
        this.y -= this.SpeedMulti;
    }
    if (keyPress == 'right') {
        this.x += this.SpeedMulti;
    }
    if (keyPress == 'down') {
        this.y += this.SpeedMulti;
    }
    if (keyPress == 'space') {
        this.y -= this.SpeedMulti + 40;
    }
};

// Function to display player's score
var displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevel.innerHTML = 'Current Score: ' + aScore +
        ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevel, firstCanvasTag[0]);
};


// Increase number of enemies on screen based on player's score
var difficultyRaised = function(numEnemies) {


    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(250, Math.random() * 199, Math.random() * 99);

        //push into allEnemies array
        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level

var allEnemies = [];
var player = new Player(250, 550, 30);
var scoreLevel = document.createElement('h2');

// var enemy = new Enemy(0, Math.random() * 184, Math.random() * 256);
var score = 0;
var gameLevel = 1;

// Set a varaiable to instantiate new enemies. 
var enemyY = [200, 90, 60];

// Create the separate enemy instances
for (var i = 0; i < 10; i++) {

    // Set a starting x-position based on a random value
    var x = Math.floor((Math.random() * -1000));

    // Set a starting y-position based on a random selection
    // of the 3 possible values
    var y = enemyY[Math.floor(Math.random() * 4)];

    // Create the new enemy object
    var enemy = new Enemy(x, y);

    // Push the enemy into the array
    allEnemies.push(enemy);

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// added space to jump. 
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
    };

    player.handleInput(allowedKeys[e.keyCode]);
    displayScoreLevel(score, gameLevel);
});