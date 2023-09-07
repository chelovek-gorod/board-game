class Text {
    constructor(text = '', x = 0, y = 0, options ) {
        this.x = x;
        this.y = y;
        this.weight = options.weight || 'normal';
        this.style = options.style || 'normal';
        this.size = options.size || 24;
        this.family = options.font || 'Arial';
        this.color = options.color || '#00ff00';
        this.strokeColor = options.strokeColor || '#00000000';
        this.strokeWidth = options.strokeWidth || 0;
        this.align = options.align ? this.getTextAlign( options.align ) : 'left';
        this.offsetX = 0;
        this.font = `${this.weight} ${this.style} ${this.size}px ${this.font}, Arial, sans-serif`;
        this.img = document.createElement('canvas');
        this.ctx = this.img.getContext('2d');
        this.img.width = this.getTextWidth(text);
        this.img.height = this.size;
        this.isExist = true;

        this.render(text);
    }

    getTextAlign(align) {
        switch(align) {
            case 'right': return 'right';
            case 'center':  return 'center';
            default : return 'left';
        }
    }

    getTextWidth(text) {
        this.ctx.font = this.font;
        return this.ctx.measureText(text || ' ').width;
    }

    render(text) {
        this.ctx.clearRect(0, 0, this.img.width, this.img.height);

        this.img.width =  this.getTextWidth(text);

        if (this.align === 'right') {
            this.offsetX = this.img.width;
        }
        if (this.align === 'center') {
            this.offsetX = Math.floor(this.img.width / 2);
        }

        this.ctx.font = this.font;
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = this.align;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(text || ' ', this.offsetX, 0);
        if (this.strokeWidth) {
            this.ctx.strokeStyle = this.strokeColor;
            this.ctx.lineWidth = this.strokeWidth;
            this.ctx.strokeText(text || ' ', this.offsetX, 0);
        }
    }

    draw() {
        CONTEXT.drawImage( this.img, this.x - this.offsetX, this.y);
    }
}

export default Text;