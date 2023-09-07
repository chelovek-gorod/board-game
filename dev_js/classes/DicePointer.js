import { SPRITES } from "../assets";
import constants from "../constants";
import VIEW from "../render";

class DicePointer {
    constructor(dice) {
        this.image = SPRITES.dicePointer;
        this.x = dice.x + 41;
        this.y = dice.y + 41;
        this.scaleDuration = constants.diceActiveDuration / 2;
        this.maxSize = 160;
        this.minSize = 80;
        this.scaleRate = (this.maxSize - this.minSize) / this.scaleDuration;
        this.isScaleUp = true;
        this.size = this.minSize;
        this.halfSize = this.size / 2;
    }

    setMinSize() {
        this.size = this.minSize;
        this.halfSize = this.size / 2;
    }

    update(dt) {
        if (this.isScaleUp) {
            this.size += this.scaleRate * dt;
            if (this.size >= this.maxSize) this.isScaleUp = false;
        } else  {
            this.size -= this.scaleRate * dt;
            if (this.size <= this.minSize) this.isScaleUp = true;
        }
        this.halfSize = this.size / 2;

        VIEW.context.drawImage(this.image, this.x-this.halfSize, this.y-this.halfSize, this.size, this.size);
    }
}

export default DicePointer;