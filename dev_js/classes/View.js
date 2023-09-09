import constants from "../constants";

class View {

    static instance;

    constructor() {
        if (View.instance) return View.instance;

        this.canvas = document.getElementById('canvas');
        this.width = this.canvas.width = constants.ceilSize * 15 + constants.boardOffset * 2;
        this.height = this.canvas.height = constants.ceilSize * 15 + constants.boardOffset * 2;
        this.sizeRate = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.x = Math.round(this.width / 2);
        this.y = Math.round(this.height / 2);
        this.context = this.canvas.getContext('2d');
        this.layers = [];
        
        View.instance = this;

        this.resize();
    }

    resize() {
        let size = innerWidth > innerHeight ? innerHeight : innerWidth;
        //this.canvas.style.width = size + 'px';
        //this.canvas.style.height = size + 'px';

        this.offsetX = Math.floor((innerWidth - size) / 2);
        this.offsetY = Math.floor((innerHeight - size) / 2);
        this.sizeRate = this.width / size;
    }

    getLayer(name) {
        return this.layers.find(layer => layer.name === name);
    }
}

addEventListener('resize', function() {
    if (View.instance) View.instance.resize();
});

export default View;