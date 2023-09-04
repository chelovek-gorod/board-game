import VIEW from '../render';

class Token {
    constructor(image, startPoint, board, next) {
        this.image = image;
        this.board = board;
        this.container = board.ceils;
        this.index =  6 + 12 * startPoint;
        this.stepDuration = 400;
        this.steps = 0;
        this.target = null; // {container: null, index: undefined}
        this.isOnPort = false;
        this.resize();
        this.next = next;

        VIEW.resizeDependenceArray.push(this);
    }

    resize() {
        this.maxSize = this.board.ceilSize;
        this.minSize = this.maxSize * 0.7;
        this.size = this.minSize;
        this.halfSize = this.minSize / 2;
        
        this.sizeRate = (this.maxSize - this.minSize) / this.stepDuration;
        this.stepRate = this.board.ceilSize / this.stepDuration;

        if (this.steps) this.finishStep();
        else {
            this.x = this.container[this.index].x;
            this.y = this.container[this.index].y;
        }
    }

    move(steps) {
        if (this.steps) return;

        this.steps = steps;
        this.updateTarget();
    }

    updateTarget() {
        if (this.steps === 0) {
            // проверка туалета
            if (this.container === this.board.ceils && this.container[this.index].type === 'toilet') {
                this.steps++;
                let targetContainer;
                switch(this.container[this.index].target) {
                    case 'toiletTop' : targetContainer = this.board.toiletTop; break;
                    case 'toiletRight' : targetContainer = this.board.toiletRight; break;
                    case 'toiletBottom' : targetContainer = this.board.toiletBottom; break;
                    case 'toiletLeft' : targetContainer = this.board.toiletLeft; break;
                }
                
                this.target = {
                    container: targetContainer,
                    index: 0,
                    x: targetContainer[0].x,
                    y: targetContainer[0].y,
                };
                return;
            }

            // проверка вертушки
            if (this.container === this.board.ceils && this.container[this.index].type === 'port') {
                if (this.isOnPort) {
                    this.isOnPort = false;
                    this.steps = 0;
                    this.target = null;
                    setTimeout(() => this.next(), 500);
                    return;
                }

                this.isOnPort = true;
                this.steps++;

                let targetIndex = this.container[this.index].target;
                this.target = {
                    container: this.container,
                    index: targetIndex,
                    x: this.container[targetIndex].x,
                    y: this.container[targetIndex].y,
                };
                
                return;
            }

            this.target = null;
            setTimeout(() => this.next(), 500);
            return;
        }

        // проверка туалета
        if (this.container === this.board.toiletTop
        || this.container === this.board.toiletRight
        || this.container === this.board.toiletBottom
        || this.container === this.board.toiletLeft) {
            console.log('in toilet');
            // [ . ]
            if (this.index === 0 && this.steps !== 1) {
                this.steps = 0;
                this.target = null;
                setTimeout(() => this.next(), 500);
                return;
            }

            // [...]
            if (this.index === 1 && this.steps !== 3) {
                this.steps = 0;
                this.target = null;
                setTimeout(() => this.next(), 500);
                return;
            }

            // [:::]
            if (this.index === 2){

                if(this.steps !== 6) {
                    this.steps = 0;
                    this.target = null;
                    setTimeout(() => this.next(), 500);
                    return;
                }
                
                this.steps = 1;
                let targetIndex;
                switch(this.container) {
                    case this.board.toiletTop : targetIndex = 11; break;
                    case this.board.toiletRight : targetIndex = 23; break;
                    case this.board.toiletBottom : targetIndex = 35; break;
                    case this.board.toiletLeft : targetIndex = 47; break;
                }
                
                this.target = {
                    container: this.board.ceils,
                    index: targetIndex,
                    x: this.board.ceils[targetIndex].x,
                    y: this.board.ceils[targetIndex].y,
                };

                return;
            }
        }

        let targetIndex = this.index + 1;
        if (targetIndex === this.container.length) targetIndex = 0;

        const targetContainer = this.container;

        this.target = {
            container: targetContainer,
            index: targetIndex,
            x: targetContainer[targetIndex].x,
            y: targetContainer[targetIndex].y,
        };
    }

    finishStep() {
        this.steps--;
        this.container = this.target.container;
        this.index = this.target.index;
        this.x = this.target.x;
        this.y = this.target.y;
        this.size = this.minSize;
        this.halfSize = this.size / 2;

        this.updateTarget();
    }

    update(dt) {
        if (this.steps) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            // определяем направление
            if (this.isOnPort) { // телепорт
                const speed = this.stepRate * dt * 2;
                this.x += (dx > 0) ? speed : -speed;
                this.y += (dy > 0) ? speed : -speed;
                if (dx > 0 && this.x >= this.target.x) this.finishStep();
                if (dx < 0 && this.x <= this.target.x) this.finishStep();
            } else if (dx > 0) { // вправо
                // движемся
                this.x += this.stepRate * dt;
                // проверяем дошли ли до цели
                if (this.x >= this.target.x) this.finishStep();
                else {
                    // если не дошли - масштабируем фишку
                    if (dx > this.minSize) this.size += this.sizeRate * dt;
                    else this.size -= this.sizeRate * dt;
                }
            } else if (dx < 0) { // влево
                // движемся
                this.x -= this.stepRate * dt;
                // проверяем дошли ли до цели
                if (this.x <= this.target.x) this.finishStep();
                else {
                    // если не дошли - масштабируем фишку
                    if (-dx > this.minSize) this.size += this.sizeRate * dt;
                    else this.size -= this.sizeRate * dt;
                }
            } else if (dy > 0) { // вниз
                // движемся
                this.y += this.stepRate * dt;
                // проверяем дошли ли до цели
                if (this.y >= this.target.y) this.finishStep();
                else {
                    // если не дошли - масштабируем фишку
                    if (dy > this.minSize) this.size += this.sizeRate * dt;
                    else this.size -= this.sizeRate * dt;
                }
            } else if (dy < 0) { // вниз
                // движемся
                this.y -= this.stepRate * dt;
                // проверяем дошли ли до цели
                if (this.y <= this.target.y) this.finishStep();
                else {
                    // если не дошли - масштабируем фишку
                    if (-dy > this.minSize) this.size += this.sizeRate * dt;
                    else this.size -= this.sizeRate * dt;
                }
            } else {
                // мы на месте
                this.finishStep();
            }
            // пересчитываем половину размера для правильной отрисовки
            this.halfSize = this.size / 2;
        }

        VIEW.context.drawImage(this.image, this.x - this.halfSize, this.y - this.halfSize, this.size, this.size);
    }
}

export default Token;