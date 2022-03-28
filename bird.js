class Bird {
    constructor(brain) {
        this.x = 64;
        this.y = height / 2;
        this.w = 32;

        this.g = 0.8;
        this.l = -12;
        this.s = 0;

        this.score = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain;
        } else {
            const options = {
                inputs: 5,
                outputs: ["up", "down"],
                task: "classification",
                noTraining: true
            }
            this.brain = ml5.neuralNetwork(options);
        }
    }

    think(pipes) {
        let closest = null;
        let closestD = Infinity;
        for (const pipe of pipes) {
            const d = pipe.x + pipe.w - this.x;
            if (d < closestD && d > 0) {
                closest = pipe;
                closestD = d;
            }
        }

        const inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.topy / height;
        inputs[2] = closest.boty / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.s / 10;


        const results = this.brain.classifySync(inputs);
        if (results[0].label === "up") {
            this.jump();
        }
    }

    offScreen() {
        return this.y + this.w / 2 > height || this.y - this.w / 2 < 0;
    }

    jump() {
        this.s = this.l;
    }

    update() {
        this.score++;
        this.s += this.g;
        this.y += this.s;
    }

    show() {
        stroke(255);
        fill(255, 255, 0, 100);
        ellipse(this.x, this.y, this.w)
    }
}