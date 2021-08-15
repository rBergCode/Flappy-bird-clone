class Pipe {
    constructor() {
        this.x = width;
        this.w = 80;
        this.s = 3;
        this.gap = 200;

        this.topy = random(height / 6, 3 / 4 * height);
        this.boty = this.topy+this.gap;
    }

    isOffScreen(){
        return this.x < -this.w;
    }

    update(){
        this.x -= this.s;
    }

    show(){
        stroke(255);
        fill(0, 255, 0);
        rect(this.x, 0, this.w, this.topy);
        rect(this.x, this.boty, this.w, height);
    }
}