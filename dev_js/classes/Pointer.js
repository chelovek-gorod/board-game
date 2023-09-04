import { SPRITES } from "../assets";
import VIEW from "../render";

const scale = 123 / 120;
const scaleDuration = 600;
const rotationSpeed = 0.002;

class Pointer {
    constructor (target, board, isGreen = true) {
        this.image = (isGreen) ? SPRITES.pointerGreen : SPRITES.pointerRed;
        this.target = target;
        this.board = board;
        this.scaleDuration = scaleDuration;
        this.rotationSpeed = rotationSpeed;
        this.resize();
        this.direction = 0;
        this.isScaleUp = true;

        VIEW.resizeDependenceArray.push(this);
    }

    resize() {
        this.maxSize = this.board.ceilSize * scale;
        this.minSize = this.maxSize * 0.9;
        this.size = this.minSize;
        this.halfSize = this.size / 2;
        
        this.scaleRate = (this.maxSize - this.minSize) / this.scaleDuration;

        this.x = this.target.x;
        this.y = this.target.y;
    }

    update(dt) {
        this.direction += this.rotationSpeed * dt;

        if (this.isScaleUp) {
            this.size += this.scaleRate * dt;
            if (this.size >= this.maxSize) this.isScaleUp = false;
        } else  {
            this.size -= this.scaleRate * dt;
            if (this.size <= this.minSize) this.isScaleUp = true;
        }
        this.halfSize = this.size / 2;

        VIEW.context.setTransform(1, 0, 0, 1, this.x, this.y);
        VIEW.context.rotate(this.direction);
        VIEW.context.drawImage(this.image, -this.halfSize, -this.halfSize, this.size, this.size);
        VIEW.context.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export default Pointer;