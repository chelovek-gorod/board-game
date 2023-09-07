import { SOUNDS, SPRITES } from "../assets";
import constants from "../constants";
import { game } from "../main";
import VIEW from "../render";
import Timer from "./Timer";
import Token from "./Token";

class Player {
    constructor(tokenImage, startPoint) {
        this.getPointerPosition(startPoint);
        this.image = (startPoint % 2 === 0) ? SPRITES.pointerPlayerH : SPRITES.pointerPlayerV;
        this.frameWidth = (startPoint % 2 === 0) ? 480 : 120;
        this.frameHeight = (startPoint % 2 === 0) ? 120 : 480;
        this.frame = 0;
        this.fps = 20;
        this.frameDuration = Math.floor(1000 / this.fps);
        this.frameTimeout = this.frameDuration;
        this.frames = this.getFrames();

        this.dices = [];
        this.dice = null;
        this.isGetDouble = false;
        this.startPoint = startPoint;
        this.tokens = this.generateTokens(tokenImage);

        this.layer = VIEW.getLayer('players');
    }

    getPointerPosition(startPoint) {
        if (startPoint % 2 === 0) {
            this.x = constants.boardOffset + constants.ceilSize * 5.5;
            if (startPoint === 0) this.y = constants.boardOffset;
            else this.y = constants.boardOffset + constants.ceilSize * 14;
        } else {
            this.y = constants.boardOffset + constants.ceilSize * 5.5;
            if (startPoint === 3) this.x = constants.boardOffset;
            else this.x = constants.boardOffset + constants.ceilSize * 14;
        }
    }

    getFrames() {
        const frames = [];
        for(let y = 0; y < this.image.height; y += this.frameHeight) {
            for(let x = 0; x < this.image.width; x += this.frameWidth) {
                frames.push({x, y});
            }
        }
        return frames;
    }

    generateTokens(tokenImage) {
        const tokensLayer = VIEW.getLayer('tokens');
        const tokens = [];
        for(let i = 0; i < 4; i++) {
            const token = new Token(tokenImage, this.startPoint, this);
            tokens.push(token);
            tokensLayer.add(token);
        }
        return tokens;
    }

    startTurn() {
        this.layer.add(this);
        this.throwDices();
    }

    throwDices() {
        SOUNDS.dice2.play();
        game.dices.forEach(dice => dice.throw());
        this.isGetDouble = game.dices[0].value === game.dices[1].value;
        if (game.dices[0].value >= game.dices[1].value) this.dices = [1, 0];
        else this.dices = [0, 1];

        //setTimeout();
        new Timer(() => this.useDice(), constants.diceThrowDuration);
    }

    useDice() {
        this.dice = game.dices[ this.dices.pop() ];
        this.dice.isActive = true;

        const availableTokens = [];
        /*
        1) проверить каждый токен, способен ди он использовать данный дайс
          - если да - пометить токен зеленым маркером
        */
        this.tokens.forEach(token => {
            const isAvailable = token.checkUse(this.dice.value);
            if (isAvailable) availableTokens.push(token);
        });

        if (availableTokens.length !== 0) {/*console.log('available tokens:', availableTokens);*/}
        else new Timer(() => this.diceFinished(), constants.diceActiveDuration);
    }

    diceFinished() {
        this.dice.isActive = false;
        this.dice.pointer.setMinSize();
        if (this.dices.length) this.useDice();
        else if (this.isGetDouble) this.throwDices();
        else this.endTurn();
    }

    endTurn() { /*console.log('end turn');*/
        this.layer.remove(this);
        game.nextTurn();
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
            this.frames[this.frame].x, this.frames[this.frame].y, this.frameWidth, this.frameHeight,
            this.x, this.y, this.frameWidth, this.frameHeight
        );
    }
}

export default Player;