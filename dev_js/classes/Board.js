import VIEW from "../render";
import { SPRITES } from "../assets";
import Layer from "./Layer";


const ceils = 13; // 13 ячеек на одной грани поля
const rate = ceils * 2; // 13 ячеек (умножаем на 2 чтобы коэффициент был четным)
const maxCeilSize = 120; // максимальный размер клетки в пикселях

class Board {
    constructor() {
        this.image = SPRITES.board;

        this.layer = new Layer('board', 0, [this]);

        this.toiletTop = [
            {type: 'toilet', x: 0, y: 0, rateX: 9, rateY: 1},
            {type: 'toilet', x: 0, y: 0, rateX: 10, rateY: 1},
            {type: 'toilet', x: 0, y: 0, rateX: 11, rateY: 1},
        ];
        this.toiletRight = [
            {type: 'toilet', x: 0, y: 0, rateX: 11, rateY: 9},
            {type: 'toilet', x: 0, y: 0, rateX: 11, rateY: 10},
            {type: 'toilet', x: 0, y: 0, rateX: 11, rateY: 11},
        ];
        this.toiletBottom = [
            {type: 'toilet', x: 0, y: 0, rateX: 3, rateY: 11},
            {type: 'toilet', x: 0, y: 0, rateX: 2, rateY: 11},
            {type: 'toilet', x: 0, y: 0, rateX: 1, rateY: 11},
        ];
        this.toiletLeft = [
            {type: 'toilet', x: 0, y: 0, rateX: 1, rateY: 3},
            {type: 'toilet', x: 0, y: 0, rateX: 1, rateY: 2},
            {type: 'toilet', x: 0, y: 0, rateX: 1, rateY: 1},
        ];

        this.homeTop = [
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 1},
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 2},
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 3},
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 4},
        ];
        this.homeRight = [
            {type: 'home', x: 0, y: 0, rateX: 11, rateY: 6},
            {type: 'home', x: 0, y: 0, rateX: 10, rateY: 6},
            {type: 'home', x: 0, y: 0, rateX: 9, rateY: 6},
            {type: 'home', x: 0, y: 0, rateX: 8, rateY: 6},
        ];
        this.homeBottom = [
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 11},
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 10},
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 9},
            {type: 'home', x: 0, y: 0, rateX: 6, rateY: 8},
        ];
        this.homeLeft = [
            {type: 'home', x: 0, y: 0, rateX: 1, rateY: 6},
            {type: 'home', x: 0, y: 0, rateX: 2, rateY: 6},
            {type: 'home', x: 0, y: 0, rateX: 3, rateY: 6},
            {type: 'home', x: 0, y: 0, rateX: 4, rateY: 6},
        ];

        this.ceils = [
            // top line
            {type: 'corner', x: 0, y: 0, rateX: 0, rateY: 0},
            {type: 'empty', x: 0, y: 0, rateX: 1, rateY: 0},
            {type: 'empty', x: 0, y: 0, rateX: 2, rateY: 0},
            {type: 'empty', x: 0, y: 0, rateX: 3, rateY: 0},
            {type: 'port', target: 44, x: 0, y: 0, rateX: 4, rateY: 0},
            {type: 'empty', x: 0, y: 0, rateX: 5, rateY: 0},
            {type: 'home', target: 'HomeTop', x: 0, y: 0, rateX: 6, rateY: 0},
            {type: 'empty', x: 0, y: 0, rateX: 7, rateY: 0},
            {type: 'port', target: 16, x: 0, y: 0, rateX: 8, rateY: 0},
            {type: 'toilet', target: 'toiletTop', x: 0, y: 0, rateX: 9, rateY: 0},
            {type: 'empty', x: 0, y: 0, rateX: 10, rateY: 0},
            {type: 'exit', target: 'toiletTop', x: 0, y: 0, rateX: 11, rateY: 0},
            // right line
            {type: 'corner', x: 0, y: 0, rateX: 12, rateY: 0},
            {type: 'empty', x: 0, y: 0, rateX: 12, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 12, rateY: 2},
            {type: 'empty', x: 0, y: 0, rateX: 12, rateY: 3},
            {type: 'port', target: 8, x: 0, y: 0, rateX: 12, rateY: 4},
            {type: 'empty', x: 0, y: 0, rateX: 12, rateY: 5},
            {type: 'home', target: 'HomeRight', x: 0, y: 0, rateX: 12, rateY: 6},
            {type: 'empty', x: 0, y: 0, rateX: 12, rateY: 7},
            {type: 'port', target: 28, x: 0, y: 0, rateX: 12, rateY: 8},
            {type: 'toilet', target: 'toiletRight', x: 0, y: 0, rateX: 12, rateY: 9},
            {type: 'empty', x: 0, y: 0, rateX: 12, rateY: 10},
            {type: 'exit', target: 'toiletRight', x: 0, y: 0, rateX: 12, rateY: 11},
            // bottom line
            {type: 'corner', x: 0, y: 0, rateX: 12, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 11, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 10, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 9, rateY: 12},
            {type: 'port', target: 20, x: 0, y: 0, rateX: 8, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 7, rateY: 12},
            {type: 'home', target: 'HomeBottom', x: 0, y: 0, rateX: 6, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 5, rateY: 12},
            {type: 'port', target: 40, x: 0, y: 0, rateX: 4, rateY: 12},
            {type: 'toilet', target: 'toiletBottom', x: 0, y: 0, rateX: 3, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 2, rateY: 12},
            {type: 'exit', target: 'toiletBottom', x: 0, y: 0, rateX: 1, rateY: 12},
            // left line
            {type: 'corner', x: 0, y: 0, rateX: 0, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 0, rateY: 11},
            {type: 'empty', x: 0, y: 0, rateX: 0, rateY: 10},
            {type: 'empty', x: 0, y: 0, rateX: 0, rateY: 9},
            {type: 'port', target: 32, x: 0, y: 0, rateX: 0, rateY: 8},
            {type: 'empty', x: 0, y: 0, rateX: 0, rateY: 7},
            {type: 'home', target: 'HomeLeft', x: 0, y: 0, rateX: 0, rateY: 6},
            {type: 'empty', x: 0, y: 0, rateX: 0, rateY: 5},
            {type: 'port', target: 4, x: 0, y: 0, rateX: 0, rateY: 4},
            {type: 'toilet', target: 'toiletLeft', x: 0, y: 0, rateX: 0, rateY: 3},
            {type: 'empty', x: 0, y: 0, rateX: 0, rateY: 2},
            {type: 'exit', target: 'toiletLeft', x: 0, y: 0, rateX: 0, rateY: 1},
        ];

        this.resize();

        VIEW.resizeDependenceArray.push(this);
    }

    getHalfCeilSize() {
        if (VIEW.width > VIEW.height) return Math.floor(VIEW.height / rate);
        return Math.floor(VIEW.width / rate);
    }

    resize() {
        this.halfCeilSize = this.getHalfCeilSize();
        this.ceilSize = (this.halfCeilSize > maxCeilSize / 2) ? maxCeilSize : this.halfCeilSize * 2;
        this.size = this.ceilSize * ceils;
        this.offsetX = Math.floor((VIEW.width - this.size) / 2);
        this.offsetY = Math.floor((VIEW.height - this.size) / 2);

        this.recalculateCeilsPositions([
            this.toiletTop, this.toiletRight, this.toiletBottom, this.toiletLeft,
            this.homeTop, this.toiletRight, this.toiletBottom, this.toiletLeft,
            this.ceils
        ]);
    }

    recalculateCeilsPositions( ceilsContainersArray ) {
        const offsetX = this.offsetX + this.halfCeilSize;
        const offsetY = this.offsetY + this.halfCeilSize;
        ceilsContainersArray.forEach( container => {
            container.forEach(ceil => {
                ceil.x = offsetX + this.ceilSize * ceil.rateX;
                ceil.y = offsetY + this.ceilSize * ceil.rateY;
            });
        });
    }

    update() {
        VIEW.context.drawImage(this.image, this.offsetX, this.offsetY, this.size, this.size);
    }
}

export default Board;