import {SPRITES} from '../assets';
import VIEW from '../render';

class Dice {
    constructor(offsetViewX, offsetViewY) {
        this.offsetViewX = offsetViewX;
        this.offsetViewY = offsetViewY;
        this.img = SPRITES.dice;
        this.resize();
        this.frameSize = 42;
        this.frameHalfSize = 21;
        this.fps = 30;
        this.frameDuration = Math.floor(1000 / this.fps);
        this.frameTimeout = this.frameDuration;
        this.framePathSize = 30;
        this.framePath = [];
        this.value = this.getNewValue();
        this.framePoint = this.getCoordinates();
        this.framePoint.x *= this.frameSize;
        this.framePoint.y *= this.frameSize;

        VIEW.resizeDependenceArray.push(this);
    }

    resize() {
        this.x = VIEW.x + this.offsetViewX;
        this.y = VIEW.y + this.offsetViewY;
    }

    getNewValue() {
        return Math.ceil(Math.random() * 6);
    }

    getCoordinates() {
        switch(this.value) {
            case 1: return {x: 0, y: (Math.random() < 0.5) ? 4 : 12};
            case 2: return {x: 4, y: (Math.random() < 0.5) ? 4 : 12};
            case 5: return {x:12, y: (Math.random() < 0.5) ? 4 : 12};
            case 6: return {x: 8, y: (Math.random() < 0.5) ? 4 : 12};
            case 3: return {x: Math.floor(Math.random() * 4) * 4, y: 0};
            case 4: return {x: Math.floor(Math.random() * 4) * 4, y: 8};
        }
    }

    throw() {
        if(this.framePath.length) return 0;

        let path = ('' + Math.random()).slice(2);
        while (path.length < this.framePathSize) path += ('' + Math.random()).slice(2);

        this.value = this.getNewValue();
        let {x: xx, y: yy} = this.getCoordinates();
        this.framePath.push({x: xx, y: yy});

        let direction = Math.floor(Math.random() * 8);

        for (let i = 1; i < path.length; i++) {
            if (direction !== 0 && direction !== 4) {
                xx += (direction < 4) ? 1 : -1;
                if (xx < 0) xx = 15;
                if (xx > 15) xx = 0;
            }
            if (direction !== 2 && direction !== 6) {
                yy += (direction > 2 && direction < 6) ? 1 : -1;
                if (yy < 0) yy = 15;
                if (yy > 15) yy = 0;
            }

            this.framePath.push( {x: xx, y: yy} );

            if (+path[i] < 2) {
                direction--;
                if (direction < 0) direction = 7;
            }
            if (+path[i] > 7) {
                direction++;
                if (direction > 7) direction = 0;
            }
        }
        this.framePath.forEach( point => {
            point.x *= this.frameSize;
            point.y *= this.frameSize;
        });

        return this.value;
    }

    update(dt) {
        if (this.framePath.length) {
            this.frameTimeout -= dt;
            if (this.frameTimeout <= 0) {
                this.frameTimeout += this.frameDuration;
                this.framePoint = this.framePath.pop();
            }
        }
        VIEW.context.drawImage(this.img, this.framePoint.x, this.framePoint.y, this.frameSize, this.frameSize,
            this.x - this.frameHalfSize, this.y - this.frameHalfSize, this.frameSize, this.frameSize);
    }
}

export default Dice;