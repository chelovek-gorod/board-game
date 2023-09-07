import VIEW from "../render";

class Timer {
    constructor(callback, milliseconds) {
        this.callback = callback;
        this.milliseconds = milliseconds;
        VIEW.layers[0].add(this);
    }

    update(dt) {
        this.milliseconds -= dt;
        if (this.milliseconds <= 0) {
            setTimeout(() => this.callback(), 0);
            VIEW.layers[0].remove(this);
        }
    }
}

export default Timer;