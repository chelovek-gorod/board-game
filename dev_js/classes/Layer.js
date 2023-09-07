import VIEW from "../render";

let layerCount = 0;

class Layer {
    constructor(name = '', zIndex = VIEW.layers.length, objects = []) {
        this.name = name || 'layer' + layerCount++;
        this.zIndex = zIndex;
        this.objects = objects;

        if (zIndex === VIEW.layers.length) VIEW.layers.push(this);
        else {
            VIEW.layers.splice(zIndex, 0, this);
            VIEW.layers.forEach( (layer, index) => layer.zIndex = index );
        }
    }

    update(deltaTime) {
        this.objects.forEach( object => object.update(deltaTime) );
    }

    remove(object) {
        this.objects = this.objects.filter(obj => obj !== object);
    }

    add(object) {
        this.objects.push(object);
    }

    moveUp(object) {
        this.objects = this.objects.filter(obj => obj !== object);
        this.objects.push(object);
    }

    clear() {
        this.objects = [];
    }
}

export default Layer;