class Pipe {
    constructor() {
        this.x = width;
        this.w = 80;
        this.s = 6;
        this.gap = 200;

        this.topy = random(height / 6, 3 / 4 * height);
        this.boty = this.topy + this.gap;
    }

    hits(bird) {
        let halfBird = bird.w / 2;
        if (bird.y - halfBird < this.topy || bird.y + halfBird > this.boty) {
            if (bird.x + halfBird > this.x && bird.x - halfBird < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    offScreen() {
        return this.x < -this.w;
    }

    update() {
        this.x -= this.s;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, 0, this.w, this.topy);
        rect(this.x, this.boty, this.w, height);
    }
}