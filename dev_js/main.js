import { loader } from './loader';
import { SPRITES } from './assets';
import Board from './classes/Board';
import Dice from './classes/Dice';
import Token from './classes/Token';
import Layer from './classes/Layer';
import Pointer from './classes/Pointer';
import DicePointer from './classes/DicePointer';


loader(loadingDone);

let isUserActionAwait = false;
let currentTurn;

const players = [];

let dicesResult = [];
let isDoubleDiceResult = false;

let dicePointersLayer;

function next() {
    dicePointersLayer.clear();
    if (dicesResult.length) {
        const {pointer, steps} = dicesResult.shift();
        dicePointersLayer.add(pointer);
        players[currentTurn].move(steps);
    } else {
        if (!isDoubleDiceResult) {
            currentTurn++;
            if (currentTurn === players.length) currentTurn = 0;
        }
        isUserActionAwait = true;
    }
}

function loadingDone() {
    const board = new Board();

    const dice1 = new Dice(-21, -21);
    const dice2 = new Dice(21, 21);
    const dicesLayer = new Layer('dices', 1, [dice1, dice2]);

    const dicePointer1 = new DicePointer(dice1);
    const dicePointer2 = new DicePointer(dice2);
    dicePointersLayer = new Layer('dicePointers', 2);

    players.push( new Token(SPRITES.tokenColor, 0, board, next) );
    players.push( new Token(SPRITES.tokenBlack, 1, board, next) );
    players.push( new Token(SPRITES.tokenYellow, 2, board, next) );
    players.push( new Token(SPRITES.tokenRed, 3, board, next) );
    const tokensLayer = new Layer('tokens', 3, players);

    const stepDuration = players[0].stepDuration;

    currentTurn =  Math.floor(Math.random() * players.length);
    tokensLayer.remove( players[currentTurn] );
    tokensLayer.add( players[currentTurn] );
    isUserActionAwait = true;

    const pointers = [
        new Pointer(board.ceils[6], board, true),
        new Pointer(board.ceils[18], board, false),
    ];
    const pointersLayer = new Layer('pointers', 4, pointers);
    
    document.body.onclick = function() {
        if (!isUserActionAwait) return;

        tokensLayer.remove( players[currentTurn] );
        tokensLayer.add( players[currentTurn] );

        isUserActionAwait = false;
        let d1, d2;
        d1 = dice1.throw();
        d2 = dice2.throw();

        if (d1 > d2) dicesResult = [{pointer: dicePointer1, steps: d1}, {pointer: dicePointer2, steps: d2}];
        else dicesResult = [{pointer: dicePointer2, steps: d2}, {pointer: dicePointer1, steps: d1}];
        isDoubleDiceResult = d1 === d2;
        
        setTimeout(next, 1500);
    };
}