let bird;
let pipes;
let score;
let gameOver = false;
let gameoverFrame;

function setup() {
    createCanvas(400, 800);
    start();
}

function draw() {
    background(0);

    for (const pipe of pipes) {
        if (pipe.isOffScreen()) {
            pipes.shift();
        }
    }


    for (const pipe of pipes) {
        pipe.update();
        pipe.show();

        let birdMid = bird.w/2;
        //Touches a pipe
        if (bird.x+birdMid > pipe.x && bird.x-birdMid < pipe.x + pipe.w) {
            if (bird.y-birdMid < pipe.topy || bird.y+birdMid   > pipe.boty) {
                gameOver = true;
                noLoop();
            }
        }  
    }

    bird.update();
    bird.show();

    if ((frameCount - gameoverFrame) % 100 == 0) {
        pipes.push(new Pipe());
    }
}

function start() {
    bird = new Bird();
    pipes = [new Pipe(width)];
    score = 0;
    gameoverFrame = frameCount - 1;
}

function keyPressed(){
    switch (key) {
        case ' ':
            bird.jump();
            if (gameOver) {
                start();
                loop();
                gameOver = false;
            }
            break;
        default:
            break;
    }
}

