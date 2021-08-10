let bird;
let pipes;
let score;
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

        //Touches a pipe
        if (bird.x > pipe.x && bird.x < pipe.x + pipe.w) {
            if (bird.y < pipe.topy || bird.y > pipe.boty) {
                start();
            }
        }  
    }

    bird.update();
    bird.show();

    if ((frameCount - gameoverFrame) % 150 == 0) {
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
            break;
        case 's':
            noLoop();
        default:
            break;
    }
}

