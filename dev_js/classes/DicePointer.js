import { SPRITES } from "../assets";
import VIEW from "../render";

class DicePointer {
    constructor(dice) {
        this.image = SPRITES.dicePointer;
        this.size = 56;
        this.halfSize = this.size / 2;
        this.dice = dice;
        this.frame = 0;
        this.fps = 30;
        this.frameDuration = Math.floor(1000 / this.fps);
        this.frameTimeout = this.frameDuration;
        this.frames = this.getFrames();
        this.resize();

        VIEW.resizeDependenceArray.push(this);
    }

    getFrames() {
        const frames = [];
        for(let y = 0; y < this.image.height; y += this.size) {
            for(let x = 0; x < this.image.width; x += this.size) {
                frames.push({x, y});
            }
        }
        return frames;
    }

    resize() {
        this.x = this.dice.x;
        this.y = this.dice.y;
    }

    update(dt) {
        this.frameTimeout -= dt;
        if (this.frameTimeout <= 0) {
            this.frameTimeout += this.frameDuration;
            this.frame++;
            if (this.frame === this.frames.length) this.frame = 0;
        }
        VIEW.context.drawImage(
            this.image,
            this.frames[this.frame].x, this.frames[this.frame].y, this.size, this.size,
            this.x - this.halfSize, this.y - this.halfSize, this.size, this.size
        );
    }
}

export default DicePointer;