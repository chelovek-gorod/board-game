import VIEW from '../render';
import { game } from "../main";
import Pointer from './Pointer';
import { SOUNDS, SPRITES } from '../assets';
import Timer from './Timer';
import constants from '../constants';

function playStepSound() {
    SOUNDS['step' + Math.floor(Math.random() * 7)].play();
}

class Token {
    constructor(image, startPoint, player) {
        this.player = player;
        this.image = image;
        this.maxSize = 128;
        this.minSize = 96;
        this.size = this.minSize;
        this.halfSize = this.size / 2;

        this.startPoint = startPoint;
        this.reserve = game.board.reserves[startPoint];
        this.home = game.board.homes[startPoint];
        this.container = this.reserve;
        this.index = game.board.addToReserve(startPoint);

        this.x = this.container[this.index].x;
        this.y = this.container[this.index].y;

        this.stepDuration = constants.tokenStepDuration;
        this.halfStepDuration = this.stepDuration / 2;
        this.sizeRate = (this.maxSize - this.minSize) / this.halfStepDuration;
        this.stepTimeout = this.stepDuration;
        this.speed = 0;
        this.steps = 0;
        this.direction = 0;
        this.target = null; // {container: null, index: 0, x: 0, y: 0}

        this.isGoHome = false;
        this.isOtherTokenAction = false;
        this.isFromPort = false;

        this.pointer = new Pointer(this.index);
        this.isAvailable = false;
    }

    // проверка пути (если путь доступен - фишка активируется)
    checkUse(value) {
        // выходим если не прошли проверку
        switch(this.container) {
            // в резерве
            case this.reserve :
                if (value !== 6) return false;
                const otherToken = this.checkCeil(game.board.ceils, this.reserve[0].target);
                if (otherToken.startPoint === this.startPoint) return false;
                break;
            // дома
            case this.home :
                if (this.index === 3) return false;

                const steps = 3 - this.index;
                if (value > steps) return false;
                for(let i = this.index; i < this.index + steps; i++) {
                    if (!this.home[i + 1].isEmpty) return false;
                }
                break;
            // туалет
            case game.board.toiletTop :
            case game.board.toiletRight :
            case game.board.toiletBottom :
            case game.board.toiletLeft :
                const exitIndex = this.container[2].target;
                let exitToken = null;
                game.players.forEach( player => {
                    player.tokens.forEach( token => {
                        if (token.container === game.board.ceils
                        && token.index === exitIndex) exitToken = token;
                    });
                });
                const lastToken = this.container[2].token
                const secondToken = this.container[1].token
                
                if (this.index === 0) {
                    if (value !== 1) return false; // запрет активации

                    // проверяем не перекрыт ли выход
                    if (secondToken && lastToken && exitToken) {
                        if (lastToken.startPoint === exitToken.startPoint) return false;
                    }
                }
                if (this.index === 1) {
                    if (value !== 3) return false;

                    // проверяем не перекрыт ли выход
                    if (lastToken && exitToken) {
                        if (lastToken.startPoint === exitToken.startPoint) return false;
                    }
                }
                if (this.index === 2) {
                    if (value !== 6) return false;

                    // проверяем не перекрыт ли выход своими фишками
                    if (exitToken && exitToken.startPoint === this.startPoint) return false;
                }
                break;
            // поле
            default :
                // проверка пути по основному игровому полю
                let index = this.index;
                let isInHome = false;
                for(let step = value; step > 0; step--) {
                    index = ++index % game.board.ceils.length;

                    // !!! Только после подхода к дому !!!
                    if (isInHome) { console.log('ПРОВЕРКА ВХОДА ДОМОЙ step =', step, this.home);
                        if (step > 4) return false;
                        for (let i = 0; i < step; i++) {
                            if (this.home[i].isEmpty === false) return false;
                        }
                        this.isAvailable = true;
                        return true;
                    }

                    if(this.isGoHome) {
                        console.log('Проверить не пора ли заходить домой...');
                        if (index === this.reserve[0].target) {
                            isInHome = true;
                            console.log('Я ПОДОШОЛ К ДОМУ');
                        }
                    }

                    // если это не последний шаг
                    if (step > 1) {
                        //проверяем все токены по пути
                        if (this.checkCeil(game.board.ceils, index)) return false;

                    } else {
                    // если это последний шаг

                        // нельзя есть своих
                        const otherToken = this.checkCeil(game.board.ceils, index);
                        if (otherToken && otherToken.startPoint === this.startPoint) return false;

                        // проверяем, если это угол, то он должен быть свободен
                        if (game.board.ceils[index].type === 'corner' && otherToken ) return false;

                        // проверяем, если это порт, то на его точке портирования не должно быть своих
                        if (game.board.ceils[index].type === 'port') {
                            const portIndex = game.board.ceils[index].target;
                            const portTargetCeilIndex = game.board.ports[portIndex].target;
                            const otherTokenPort = this.checkCeil(game.board.ceils, portTargetCeilIndex);
                            console.log('проверяем фишку с другого конца порта ->', otherTokenPort);
                            if (otherTokenPort && otherToken.startPoint === this.startPoint) return false;
                        }

                        // проверяем, если это туалет - он не должен быть заблокирован при сдвиге фишек
                        if (game.board.ceils[index].type === 'toilet') {
                            const toiletIndex = game.board.ceils[index].target;
                            const toilet = game.board.toilets[toiletIndex];

                            const exitIndex = toilet[2].target;
                            let exitToken = null;
                            game.players.forEach( player => {
                                player.tokens.forEach( token => {
                                    if (token.container === game.board.ceils
                                    && token.index === exitIndex) exitToken = token;
                                });
                            });
                            const lastToken = toilet[2].token;
                            const secondToken = toilet[1].token;
                            const firstToken = toilet[0].token;
                            if (firstToken && secondToken && lastToken && exitToken) {
                                if (lastToken.startPoint === exitToken.startPoint) return false;
                            }
                        }
                    }
                }
            // проверки пройдены
        }
        // фишка может быть использована
        this.isAvailable = true;
        return true;
    }

    // проверка ячейки (вернет фишку - если она там есть, или false - если ячейка свободна)
    checkCeil(container, index) {
        for (let p = 0; p < game.players.length; p++) {
            for (let t = 0; t < 4; t++) {
                const otherToken = game.players[p].tokens[t];
                if (otherToken.container === container && otherToken.index === index && otherToken !== this) {
                    return otherToken;
                }
            }
        }
        return false;
    }

    // активация фишки - она была доступна для перемещения и игрок по ней кликнул
    activation() {
        if (!this.isAvailable) return;

        // это наш ход, а не активация чужой фишкой
        this.isOtherTokenAction = false;

        // деактивируем все токены
        this.player.tokens.forEach(token => token.isAvailable = false);

        // определяем шаги
        this.steps = this.player.dice.value;

        // выносим на верхний уровень слоя
        this.player.layer.moveUp(this);
        
        this.startStep();
    }

    // начало перемещения
    startStep() {
        // определяем где мы
        switch(this.container) {
            // в резерве
            case this.reserve : this.moveFromReserve(); break;
            // дома
            case this.home : this.moveInHome(); break;
            // туалет
            case game.board.toiletTop :
            case game.board.toiletRight :
            case game.board.toiletBottom :
            case game.board.toiletLeft : this.moveInToilet(); break;
            // порт - (уже начали перемещаться по порту)
            case game.board.ports : this.moveInPort(); break;
            // поле
            default : this.moveOnMain();
        }
    }

    // выводим фишку из резерва на стартовую клетку
    moveFromReserve() {
        this.steps = 1;
        this.reserve[this.index].isEmpty = true;
        this.target = {
            container: game.board.ceils,
            index: this.reserve[0].target,
            x: game.board.ceils[this.reserve[0].target].x,
            y: game.board.ceils[this.reserve[0].target].y,
        };
        this.setDirection();
        const distance = this.getDistance();
        this.speed = distance / this.stepDuration;

        SOUNDS.startToken.play();
    }

    // перемещения по дому
    moveInHome() { 
        this.target = {
            container: this.home,
            index: this.index + 1,
            x: this.home[this.index + 1].x,
            y: this.home[this.index + 1].y,
        };

        this.home[this.index].isEmpty = true;
        this.home[this.index + 1].isEmpty = false;

        this.setDirection();
        const distance = this.getDistance();
        this.speed = distance / this.stepDuration;
    }

    // перемещения по порту (вызывается при входе на клетку с портом или при движении в порту)
    moveInPort() { 
        // (сейчас target = null)

        // если уже в порту - выходим из него
        if (this.container === game.board.ports) {
            this.steps = 1;
            const targetIndex = this.container[this.index].target;
            this.target = {
                container: game.board.ceils,
                index: targetIndex,
                x: game.board.ceils[targetIndex].x,
                y: game.board.ceils[targetIndex].y,
            };
            const otherToken = this.target.container[this.target.index.token];
            if (otherToken) {
                otherToken.isOtherTokenAction = true;
                otherToken.moveInToilet();
            }
        } else {
        // если только попали в порт
            this.steps = 2;
            const targetIndex = this.container[this.index].target;
            this.target = {
                container: game.board.ports,
                index: targetIndex,
                x: game.board.ports[targetIndex].x,
                y: game.board.ports[targetIndex].y,
            };
        }
        
        this.setDirection();
        const distance = this.getDistance();
        this.speed = distance / this.stepDuration;

        // SOUNDS.startToken.play();
    }

    // движение по туалету
    moveInToilet() { console.log('MOVE IN TOILET', {...this});
        this.steps = 1;
        // движение внутри туалета
        if (this.index < 2) {
            this.target = {
                container: this.container,
                index: this.index + 1,
                x: this.container[this.index + 1].x,
                y: this.container[this.index + 1].y,
            };
            const otherToken = this.target.container[this.target.index].token;
            if (otherToken) {
                otherToken.isOtherTokenAction = true;
                otherToken.moveInToilet();
            }
            // перезаписываем обитателя текущей ячейки туалета
            this.container[this.target.index].token = this;
            // очищаем информацию в предыдущей ячейки туалета
            this.container[this.index].token = null;
        } else {
        // выход из туалета
            const targetIndex = this.container[this.index].target
            this.target = {
                container: game.board.ceils,
                index: targetIndex,
                x: game.board.ceils[targetIndex].x,
                y: game.board.ceils[targetIndex].y,
            };
            // очищаем информацию в предыдущей ячейки туалета
            this.container[this.index].token = null;
        }
        
        this.setDirection();
        const distance = this.getDistance();
        this.speed = distance / this.stepDuration;

        // SOUNDS.startToken.play();
    }

    // движение по основному полю
    moveOnMain() {
        // проверка не подошли ли ко входу домой
        if(this.index === this.reserve[0].target && this.isGoHome) {
            console.log('Пора заходить домой!');
            this.target = {
                container: this.home,
                index: 0,
                x: this.home[0].x,
                y: this.home[0].y,
            };
        } else {
            let targetIndex = (this.index + 1) % game.board.ceils.length;

            this.target = {
                container: game.board.ceils,
                index: targetIndex,
                x: game.board.ceils[targetIndex].x,
                y: game.board.ceils[targetIndex].y,
            };
        }

        this.setDirection();
        const distance = this.getDistance();
        this.speed = distance / this.stepDuration;

        // SOUNDS.startToken.play();
    }

    // перемещение (вызывается из update(dt))
    move(pathSize) {
        this.x += Math.cos(this.direction) * pathSize;
        this.y += Math.sin(this.direction) * pathSize;
    }

    // завершение текущего шага
    stepEnd() {let t = false; if (this.target.container.length === 3) t = true;
        this.size = this.minSize;
        this.halfSize = this.size / 2;
        this.stepTimeout = this.stepDuration;
        this.container = this.target.container;
        this.index = this.target.index;
        this.x = this.target.x;
        this.y = this.target.y;

        this.target = null;
        playStepSound();

        if (t) console.log('ЗАВЕРШЕНИЕ ХОДА ПОСЛЕ ВХОДА В ТУАЛЕТ', {...this});

        if (--this.steps > 0) this.startStep();
        else this.moveEnd();
    }

    // завершение перемещения (this.steps = 0)
    moveEnd() {
        // если был активирован другой фишкой - выходим со стартовыми свойствами
        // что бы не дублировать передачу хода
        if (this.isOtherTokenAction) {
            if (this.container === this.reserve) {
                this.isGoHome = false;
                this.isOtherTokenAction = false;
                this.isFromPort = false;
            }
            return;
        }

        // проверка - нужно ли начать отслеживать приближение к дому
        if (!this.isGoHome) {
            // если мы ушли со стартовой клетки - активируем проверки на вход домой
            if (this.container !== game.board.ceils || this.index !== this.reserve[0].target) {
                this.isGoHome = true;
                console.log('this.isGoHome', this.isGoHome);
            }
        }

        // если дома - проверяем все ли фишки пришли
        if (this.container === this.home) {
            let allAtHome = true
            this.home.forEach( ceil => {
                if (ceil.isEmpty) allAtHome = false;
            });

            if (allAtHome) {
                console.log('PLAYER', this.startPoint, 'WIN');
                return;
            }
        }

        // если на основном поле
        if (this.container === game.board.ceils) {
            // проверяем не съели ли мы кого-то
            const otherToken = this.checkCeil(game.board.ceils, this.index);
            if (otherToken) otherToken.destroy();

            // проверка занятия 4-х углов
            if (this.container[this.index].type === 'corner') {
                let isWin = true;
                for(let i = 0; i < 4; i++) {
                    const token = this.player.tokens[i];
                    if (token.container !== this.container) isWin = false;
                    else if (token.container[token.index].type !== 'corner') isWin = false;
                }
                if (isWin) console.log('PLAYER', this.startPoint, 'WIN');
            }

            // проверка входа в порт
            if (this.container[this.index].type === 'port') {
                // если не перешли с другого порта
                if (this.isFromPort === false) {
                    this.isFromPort = true;
                    return this.moveInPort();
                } else {
                // если перешли с другого порта - не выходим, что бы закончить ход
                    this.isFromPort = false;
                }
            }

            // проверка входа в туалет
            if (this.container[this.index].type === 'toilet') {
                this.steps = 1;

                const toiletIndex = this.container[this.index].target;
                const targetContainer = game.board.toilets[toiletIndex];
                this.target = {
                    container: targetContainer,
                    index: 0,
                    x: targetContainer[0].x,
                    y: targetContainer[0].y,
                };

                // двигаем того, кото в первой ячейки нашего туалета
                const otherToken = this.target.container[0].token;
                if (otherToken) {
                    otherToken.isOtherTokenAction = true;
                    otherToken.moveInToilet();
                }

                // перезаписываем обитателя текущей ячейки туалета
                this.target.container[0].token = this;

                console.log("ВОШОЛ В ТУАЛЕТ", {...this})

                this.setDirection();
                const distance = this.getDistance();
                this.speed = distance / this.stepDuration;

                return;
            }
        }

        new Timer(() => this.player.diceFinished(), 1000);
    }

    setDirection() {
        this.direction = Math.atan2(this.target.y-this.y, this.target.x-this.x);
    }

    getDistance() {
        let dx = this.target.x - this.x; 
        let dy = this.target.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    destroy() {
        this.isOtherTokenAction = true;
        this.steps = 1;
        let targetIndex = game.board.addToReserve(this.startPoint);

        this.target = {
            container: this.reserve,
            index: targetIndex,
            x: this.reserve[targetIndex].x,
            y: this.reserve[targetIndex].y,
        };
        
        this.setDirection();
        const distance = this.getDistance();
        this.speed = distance / this.stepDuration;

        // SOUNDS.startToken.play();
    }

    update(dt) {
        if (this.isAvailable) this.pointer.draw(SPRITES.tokenPointerGreen, {x:this.x, y:this.y}, dt);

        if (this.target) {
            this.stepTimeout -= dt;

            if (this.stepTimeout > this.halfStepDuration) this.size += this.sizeRate * dt;
            else this.size -= this.sizeRate * dt;
            this.halfSize = this.size / 2;

            if (this.stepTimeout > 0) this.move(dt * this.speed);
            else this.stepEnd();
        }

        VIEW.context.drawImage(this.image, this.x - this.halfSize, this.y - this.halfSize, this.size, this.size);
    }
}

export default Token;