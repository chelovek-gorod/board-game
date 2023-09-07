import {SPRITES} from '../assets';
import constants from '../constants';
import VIEW from '../render';
import DicePointer from './DicePointer';

class Dice {
    constructor(x, y) {
        this.img = SPRITES.dice;
        this.x = x - 42;
        this.y = y - 42;
        this.frameSize = 84;

        this.throwDuration = constants.diceThrowDuration;
        this.fps = 30;
        this.frameDuration = Math.floor(1000 / this.fps);
        this.frameTimeout = this.frameDuration;
        this.framePathSize = Math.floor(this.throwDuration / this.frameDuration);
        this.framePath = [];
        this.framePoint = {x: 0, y: 0};
        this.value = this.getNewValue();

        this.pointer = new DicePointer(this);
        this.isActive = false;
    }

    getNewValue() {
        const value = Math.ceil(Math.random() * 6);
        //const value = Math.random() < 0.5 ? 6 : 3;
        switch(value) {
            case 1: 
                this.framePoint.x = 0;
                this.framePoint.y = (Math.random() < 0.5) ? 4 * this.frameSize : 12 * this.frameSize;
                break;
            case 2:
                this.framePoint.x = 4 * this.frameSize;
                this.framePoint.y = (Math.random() < 0.5) ? 4 * this.frameSize : 12 * this.frameSize;
                break;
            case 5:
                this.framePoint.x = 12 * this.frameSize;
                this.framePoint.y = (Math.random() < 0.5) ? 4 * this.frameSize : 12 * this.frameSize;
                break;
            case 6:
                this.framePoint.x = 8 * this.frameSize;
                this.framePoint.y = (Math.random() < 0.5) ? 4 * this.frameSize : 12 * this.frameSize;
                break;
            case 3:
                this.framePoint.x = Math.floor(Math.random() * 4) * 4 * this.frameSize;
                this.framePoint.y = 0;
                break;
            case 4:
                this.framePoint.x = Math.floor(Math.random() * 4) * 4 * this.frameSize;
                this.framePoint.y = 8 * this.frameSize;
                break;
            default: console.warn('error in dice value');
        }
        return value;
    }

    throw() {
        // 
        if(this.framePath.length) return 0;

        let turnsOnPath = '';
        while (turnsOnPath.length < this.framePathSize) {
            turnsOnPath += ('' + Math.random()).slice(2);
        }

        this.value = this.getNewValue();
        this.framePath.push(this.framePoint);

        let direction = Math.floor(Math.random() * 8);
        let {x, y} = this.framePoint;
        const maxXY = 15 * this.frameSize;

        for (let i = 0; i < this.framePathSize; i++) {
            if (direction !== 0 && direction !== 4) {
                x += (direction < 4) ? this.frameSize : -this.frameSize;
                if (x < 0) x = maxXY;
                if (x > maxXY) x = 0;
            }
            if (direction !== 2 && direction !== 6) {
                y += (direction > 2 && direction < 6) ? this.frameSize : -this.frameSize;
                if (y < 0) y = maxXY;
                if (y > maxXY) y = 0;
            }

            this.framePath.push( {x, y} );

            if (+turnsOnPath[i] < 2) {
                direction--;
                if (direction < 0) direction = 7;
            }
            if (+turnsOnPath[i] > 7) {
                direction++;
                if (direction > 7) direction = 0;
            }
        }
    }

    update(dt) {
        if (this.isActive) this.pointer.update(dt);

        if (this.framePath.length) {
            this.frameTimeout -= dt;
            if (this.frameTimeout <= 0) {
                this.frameTimeout += this.frameDuration;
                this.framePoint = this.framePath.pop();
            }
        }
        VIEW.context.drawImage(this.img,
            this.framePoint.x, this.framePoint.y, this.frameSize, this.frameSize,
            this.x, this.y, this.frameSize, this.frameSize);
    }
}

export default Dice;