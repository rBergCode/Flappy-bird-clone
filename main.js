/*
Create a pong game in p5.js with the following features:
- The game should have a ball
- The game should have a paddle
- The game should have a score
*/

// Global variables
let ball;
let player1;
let player2;
let score1 = 0;
let score2 = 0;
let gameOver = false;
let winner = "";

// Padddle class
class Paddle {
    // Paddle constructor
    constructor(player) {
        this.player = player;
        this.width = 20;
        this.height = 100;
        this.speed = 10;
        this.score = 0;
        this.color = "white";
        this.x = player === 1 ? 20 : width - 20;
        this.y = height / 2 - this.height / 2;
    }

    // Paddle draw function
    draw() {
        rect(this.x, this.y, this.width, this.height);
    }

    // Paddle move function
    move(direction) {
        if (direction === "up") {
            this.y -= this.speed;
        } else if (direction === "down") {
            this.y += this.speed;
        }
    }
}

//Ball class
class Ball {
    // Ball constructor
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.radius = 10;
        this.speed = 5;
        this.direction = {
            x: 1,
            y: 1
        };
    }

    // Ball draw function
    draw() {
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }

    // Ball move function
    move() {
        ball.x += ball.speed * ball.direction.x;
        ball.y += ball.speed * ball.direction.y;
    }
}

// Setup function
function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    player1 = new Paddle(1);
    player2 = new Paddle(2);
}

// Draw function
function draw() {
    // Background
    background(0);
    // Draw ball
    ball.draw();
    // Draw paddles
    player1.draw();
    player2.draw();

    // Move ball
    ball.move();

    // move paddles
    if (keyIsDown(UP_ARROW)) {
        player1.move("up");
    } else if (keyIsDown(DOWN_ARROW)) {
        player1.move("down");
    }

    // Automatically move player 2
    player2.y = ball.y;

    // Draw white scores
    fill("white");
    text(score1, width / 4, height / 4);
    text(score2, width * 3 / 4, height / 4);
    // Check if game is over
    if (gameOver) {
        textSize(64);
        text(winner, width / 2 - 50, height / 2);
    }
    // Check if ball is out of bounds
    if (ball.y + ball.radius > height || ball.y - ball.radius < 0) {
        ball.direction.y *= -1;
    }
    // Check if ball hits paddle
    if (ball.x - ball.radius < player1.x + player1.width &&
        ball.x + ball.radius > player1.x &&
        ball.y - ball.radius < player1.y + player1.height &&
        ball.y + ball.radius > player1.y) {
        ball.direction.x *= -1;
    }
    if (ball.x - ball.radius < player2.x + player2.width &&
        ball.x + ball.radius > player2.x &&
        ball.y - ball.radius < player2.y + player2.height &&
        ball.y + ball.radius > player2.y) {
        ball.direction.x *= -1;
    }

    // Check if lost
    if (ball.x - ball.radius < 0) {
        score2++;
        ball.x = width / 2;
        ball.y = height / 2;
        ball.direction.x = 1;
        ball.direction.y = 1;
    }
    if (ball.x + ball.radius > width) {
        score1++;
        ball.x = width / 2;
        ball.y = height / 2;
        ball.direction.x = -1;
        ball.direction.y = 1;
    }
    // Check if game is over
    checkGameOver();
}

// Function which checks if game is over
function checkGameOver() {
    if (score1 === 3) {
        gameOver = true;
        winner = "Player 1 wins!";
    } else if (score2 === 3) {
        gameOver = true;
        winner = "Player 2 wins!";
    }
}