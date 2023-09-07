import VIEW from "../render";

class Pointer {
    constructor (index) {
        this.scaleDuration = 900;
        this.maxSize = 144; //132
        this.minSize = 120; //102
        this.size = this.minSize + ((this.maxSize - this.minSize) / 4) * index;
        this.halfSize = this.size / 2;
        
        this.scaleRate = (this.maxSize - this.minSize) / this.scaleDuration;
        this.direction = 0;
        this.isScaleUp = true;
    }

    draw(sprite, point, dt) {
        if (this.isScaleUp) {
            this.size += this.scaleRate * dt;
            if (this.size >= this.maxSize) this.isScaleUp = false;
        } else  {
            this.size -= this.scaleRate * dt;
            if (this.size <= this.minSize) this.isScaleUp = true;
        }
        this.halfSize = this.size / 2;

        VIEW.context.drawImage(sprite, point.x-this.halfSize, point.y-this.halfSize, this.size, this.size);
    }
}

export default Pointer;