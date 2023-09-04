class View {

    static instance;

    constructor() {
        if (View.instance) return View.instance;

        this.canvas = document.createElement('canvas');
        this.width = this.canvas.width = innerWidth;
        this.height = this.canvas.height = innerHeight;
        this.x = Math.floor(this.width / 2);
        this.y = Math.floor(this.height / 2);
        this.context = this.canvas.getContext('2d');
        document.body.append(this.canvas);
        this.layers = [];
        this.resizeDependenceArray = [];
        View.instance = this;
    }

    resize() {
        this.width = this.canvas.width = innerWidth;
        this.height = this.canvas.height = innerHeight;
        this.x = Math.floor(this.width / 2);
        this.y = Math.floor(this.height / 2);
        this.resizeDependenceArray.forEach( object => object.resize() );
    }
}

export default View;