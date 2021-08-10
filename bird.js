class Bird {
    constructor() {
        this.x = 64;
        this.y = height/2;
        this.w = 64;

        this.g = 0.6;
        this.l = -10
        this.s = 0;

    }

    jump(){
        this.s = this.l ;
    }

    update(){
        this.s += this.g;
        this.y += this.s;

        if (this.y >= height - this.w / 2) {
            this.y = height - this.w / 2;
            this.velocity = 0;
        }
    
        if (this.y <= this.w / 2) {
            this.y = this.w / 2;
            this.velocity = 0;
        }
    }

    show(){
        noStroke();
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.w)
    }
}