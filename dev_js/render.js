import View from './classes/View';

const VIEW = new View();

let previousTime = performance.now();

let isOnFocus = true;

window.onblur = stopRender;
window.onfocus = startRender;
window.onresize = VIEW.resize.bind(VIEW);

function startRender() {
    if (isOnFocus) return;

    isOnFocus = true;
    previousTime = performance.now();
    requestAnimationFrame(render);
}

function stopRender() {
    isOnFocus = false;
}

function render(time) {
    const deltaTime = time - previousTime;
    previousTime = time;
    VIEW.context.clearRect(0, 0, VIEW.width, VIEW.height);
    VIEW.layers.forEach( layer => layer.update(deltaTime) );
    if (isOnFocus) requestAnimationFrame(render);
}
requestAnimationFrame(render);

export default VIEW;