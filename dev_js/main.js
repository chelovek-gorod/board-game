import { loader } from './loader';
import { SPRITES } from './assets';
import Board from './classes/Board';
import Dice from './classes/Dice';
import Layer from './classes/Layer';
import Player from './classes/Player';
import VIEW from './render';
import constants from './constants';
import Timer from './classes/Timer';

loader(() => game.isLoaded = true);

export const game = {
    isLoaded: false,
    isStart: false,
    players: [],
    currentTurn: 0,
    board: null,
    dices: [],

    nextTurn() {
        this.currentTurn++
        if (this.currentTurn === this.players.length) this.currentTurn = 0;

        this.players[this.currentTurn].startTurn();
    }
};

function startGame() {
    game.isStart = true;
    VIEW.canvas.style.opacity = 1;

    game.board = new Board();
    new Layer('board', 0, [game.board]);

    game.dices.push( new Dice(VIEW.x - 63, VIEW.y - 63) );
    game.dices.push( new Dice(VIEW.x + 63, VIEW.y + 63) );
    new Layer('dices', 1, game.dices);

    new Layer('players', 2, []);
    new Layer('tokens', 3, []);

    game.players.push( new Player(SPRITES.tokenColor, 0) );
    game.players.push( new Player(SPRITES.tokenBlack, 1) );
    game.players.push( new Player(SPRITES.tokenYellow, 2) );
    game.players.push( new Player(SPRITES.tokenRed, 3) );

    game.currentTurn = Math.floor(Math.random() * game.players.length);

    new Timer(() => game.nextTurn(), constants.gameStartDuration);

    VIEW.canvas.onclick = function(event) {
        const cx = (event.clientX - VIEW.offsetX) * VIEW.sizeRate;
        const cy = (event.clientY - VIEW.offsetY) * VIEW.sizeRate;
        game.players[game.currentTurn].tokens.forEach( token => {
            if (token.isAvailable) {
                const dx = cx - token.x;
                const dy = cy - token.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < constants.ceilSize / 2) token.activation();
            }
        })

    }
}

document.body.onclick = function(event) {
    /*console.log('x:', event.clientX, ' y:', event.clientY);*/
    if (!game.isStart && game.isLoaded) startGame();
};