import VIEW from "../render";
import { SPRITES } from "../assets";
import constants from "../constants";

class Board {
    constructor() {
        this.image = SPRITES.board;
        this.ceilSize = constants.ceilSize;
        this.imageSize = 13 * this.ceilSize;
        this.imageOffset = constants.boardOffset + constants.ceilSize;

        this.reserveTop = [
            // isEmpty: true - так как в начале нет фишек, они появятся при старте
            {isEmpty: true, target: 6, x: 0, y: 0, rateX: 5.5, rateY: 0},
            {isEmpty: true, target: 6, x: 0, y: 0, rateX: 6.5, rateY: 0},
            {isEmpty: true, target: 6, x: 0, y: 0, rateX: 7.5, rateY: 0},
            {isEmpty: true, target: 6, x: 0, y: 0, rateX: 8.5, rateY: 0},
        ];
        this.reserveRight = [
            // isEmpty: true - так как в начале нет фишек, они появятся при старте
            {isEmpty: true, target: 18, x: 0, y: 0, rateX: 14, rateY: 5.5},
            {isEmpty: true, target: 18, x: 0, y: 0, rateX: 14, rateY: 6.5},
            {isEmpty: true, target: 18, x: 0, y: 0, rateX: 14, rateY: 7.5},
            {isEmpty: true, target: 18, x: 0, y: 0, rateX: 14, rateY: 8.5},
        ];
        this.reserveBottom = [
            // isEmpty: true - так как в начале нет фишек, они появятся при старте
            {isEmpty: true, target: 30, x: 0, y: 0, rateX: 5.5, rateY: 14},
            {isEmpty: true, target: 30, x: 0, y: 0, rateX: 6.5, rateY: 14},
            {isEmpty: true, target: 30, x: 0, y: 0, rateX: 7.5, rateY: 14},
            {isEmpty: true, target: 30, x: 0, y: 0, rateX: 8.5, rateY: 14},
        ];
        this.reserveLeft = [
            // isEmpty: true - так как в начале нет фишек, они появятся при старте
            {isEmpty: true, target: 42, x: 0, y: 0, rateX: 0, rateY: 5.5},
            {isEmpty: true, target: 42, x: 0, y: 0, rateX: 0, rateY: 6.5},
            {isEmpty: true, target: 42, x: 0, y: 0, rateX: 0, rateY: 7.5},
            {isEmpty: true, target: 42, x: 0, y: 0, rateX: 0, rateY: 8.5},
        ];
        this.reserves = [this.reserveTop, this.reserveRight, this.reserveBottom, this.reserveLeft];

        this.toiletTop = [
            {token: null, move: 1, x: 0, y: 0, rateX: 10, rateY: 2},
            {token: null, move: 3, x: 0, y: 0, rateX: 11, rateY: 2},
            {token: null, move: 6, target: 11, x: 0, y: 0, rateX: 12, rateY: 2},
        ];
        this.toiletRight = [
            {token: null, move: 1, x: 0, y: 0, rateX: 12, rateY: 10},
            {token: null, move: 3, x: 0, y: 0, rateX: 12, rateY: 11},
            {token: null, move: 6, target: 23, x: 0, y: 0, rateX: 12, rateY: 12},
        ];
        this.toiletBottom = [
            {token: null, move: 1, x: 0, y: 0, rateX: 4, rateY: 12},
            {token: null, move: 3, x: 0, y: 0, rateX: 3, rateY: 12},
            {token: null, move: 6, target: 35, x: 0, y: 0, rateX: 2, rateY: 12},
        ];
        this.toiletLeft = [
            {token: null, move: 1, x: 0, y: 0, rateX: 2, rateY: 4},
            {token: null, move: 3, x: 0, y: 0, rateX: 2, rateY: 3},
            {token: null, move: 6, target: 47, x: 0, y: 0, rateX: 2, rateY: 2},
        ];
        this.toilets = [this.toiletTop, this.toiletRight, this.toiletBottom, this.toiletLeft];

        this.homeTop = [
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 2},
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 3},
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 4},
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 5},
        ];
        this.homeRight = [
            {isEmpty: true, x: 0, y: 0, rateX: 12, rateY: 7},
            {isEmpty: true, x: 0, y: 0, rateX: 11, rateY: 7},
            {isEmpty: true, x: 0, y: 0, rateX: 10, rateY: 7},
            {isEmpty: true, x: 0, y: 0, rateX: 9, rateY: 7},
        ];
        this.homeBottom = [
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 12},
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 11},
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 10},
            {isEmpty: true, x: 0, y: 0, rateX: 7, rateY: 9},
        ];
        this.homeLeft = [
            {isEmpty: true, x: 0, y: 0, rateX: 2, rateY: 7},
            {isEmpty: true, x: 0, y: 0, rateX: 3, rateY: 7},
            {isEmpty: true, x: 0, y: 0, rateX: 4, rateY: 7},
            {isEmpty: true, x: 0, y: 0, rateX: 5, rateY: 7},
        ];
        this.homes = [this.homeTop, this.homeRight, this.homeBottom, this.homeLeft];

        this.ports = [
            // граньСторона (topLeft - верхняя грань поля, слева)
            {type: 'topLeft', target: 44, x: 0, y: 0, rateX: 5, rateY: 5},
            {type: 'topRight', target: 16, x: 0, y: 0, rateX: 9, rateY: 5},
            {type: 'rightTop', target: 8, x: 0, y: 0, rateX: 9, rateY: 5},
            {type: 'rightBottom', target: 28, x: 0, y: 0, rateX: 9, rateY: 9},
            {type: 'bottomRight', target: 20, x: 0, y: 0, rateX: 9, rateY: 9},
            {type: 'bottomLeft', target: 40, x: 0, y: 0, rateX: 5, rateY: 9},
            {type: 'leftBottom', target: 32, x: 0, y: 0, rateX: 5, rateY: 9},
            {type: 'leftTop', target: 4, x: 0, y: 0, rateX: 5, rateY: 5},
        ]

        this.ceils = [
            // top line
            {type: 'corner', x: 0, y: 0, rateX: 1, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 2, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 3, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 4, rateY: 1},
            {type: 'port', target: 0, x: 0, y: 0, rateX: 5, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 6, rateY: 1},
            {type: 'home', target: 0, x: 0, y: 0, rateX: 7, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 8, rateY: 1},
            {type: 'port', target: 1, x: 0, y: 0, rateX: 9, rateY: 1},
            {type: 'toilet', target: 0, x: 0, y: 0, rateX: 10, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 11, rateY: 1},
            {type: 'exit', x: 0, y: 0, rateX: 12, rateY: 1},
            // right line
            {type: 'corner', x: 0, y: 0, rateX: 13, rateY: 1},
            {type: 'empty', x: 0, y: 0, rateX: 13, rateY: 2},
            {type: 'empty', x: 0, y: 0, rateX: 13, rateY: 3},
            {type: 'empty', x: 0, y: 0, rateX: 13, rateY: 4},
            {type: 'port', target: 2, x: 0, y: 0, rateX: 13, rateY: 5},
            {type: 'empty', x: 0, y: 0, rateX: 13, rateY: 6},
            {type: 'home', target: 1, x: 0, y: 0, rateX: 13, rateY: 7},
            {type: 'empty', x: 0, y: 0, rateX: 13, rateY: 8},
            {type: 'port', target: 3, x: 0, y: 0, rateX: 13, rateY: 9},
            {type: 'toilet', target: 1, x: 0, y: 0, rateX: 13, rateY: 10},
            {type: 'empty', x: 0, y: 0, rateX: 13, rateY: 11},
            {type: 'exit', x: 0, y: 0, rateX: 13, rateY: 12},
            // bottom line
            {type: 'corner', x: 0, y: 0, rateX: 13, rateY: 13},
            {type: 'empty', x: 0, y: 0, rateX: 12, rateY: 13},
            {type: 'empty', x: 0, y: 0, rateX: 11, rateY: 13},
            {type: 'empty', x: 0, y: 0, rateX: 10, rateY: 13},
            {type: 'port', target: 4, x: 0, y: 0, rateX: 9, rateY: 13},
            {type: 'empty', x: 0, y: 0, rateX: 8, rateY: 13},
            {type: 'home', target: 2, x: 0, y: 0, rateX: 7, rateY: 13},
            {type: 'empty', x: 0, y: 0, rateX: 6, rateY: 13},
            {type: 'port', target: 5, x: 0, y: 0, rateX: 5, rateY: 13},
            {type: 'toilet', target: 2, x: 0, y: 0, rateX: 4, rateY: 13},
            {type: 'empty', x: 0, y: 0, rateX: 3, rateY: 13},
            {type: 'exit', x: 0, y: 0, rateX: 2, rateY: 13},
            // left line
            {type: 'corner', x: 0, y: 0, rateX: 1, rateY: 13},
            {type: 'empty', x: 0, y: 0, rateX: 1, rateY: 12},
            {type: 'empty', x: 0, y: 0, rateX: 1, rateY: 11},
            {type: 'empty', x: 0, y: 0, rateX: 1, rateY: 10},
            {type: 'port', target: 6, x: 0, y: 0, rateX: 1, rateY: 9},
            {type: 'empty', x: 0, y: 0, rateX: 1, rateY: 8},
            {type: 'home', target: 3, x: 0, y: 0, rateX: 1, rateY: 7},
            {type: 'empty', x: 0, y: 0, rateX: 1, rateY: 6},
            {type: 'port', target: 7, x: 0, y: 0, rateX: 1, rateY: 5},
            {type: 'toilet', target: 3, x: 0, y: 0, rateX: 1, rateY: 4},
            {type: 'empty', x: 0, y: 0, rateX: 1, rateY: 3},
            {type: 'exit', x: 0, y: 0, rateX: 1, rateY: 2},
        ];

        this.init();
    }

    init() {
        const offset = this.ceilSize * 0.5 + constants.boardOffset;
        [ ...this.reserves, ...this.toilets, ...this.homes, this.ports, this.ceils]
        .forEach( container => {
            container.forEach(ceil => {
                ceil.x = offset + this.ceilSize * ceil.rateX;
                ceil.y = offset + this.ceilSize * ceil.rateY;
            });
        });
    }

    addToReserve(startPoint) {
        const reserve = this.reserves[startPoint];
        for (let i = 0; i < 4; i++) {
            if (reserve[i].isEmpty) {
                reserve[i].isEmpty = false;
                return i;
            }
        }
    }

    removeFromReserve(startPoint, index) {
        const reserve = this.reserves[startPoint];
        reserve[index].isEmpty = true;
    }

    update() {
        VIEW.context.drawImage(this.image, this.imageOffset, this.imageOffset, this.imageSize, this.imageSize);
    }
}

export default Board;