import View from './classes/View';

const VIEW = new View();

let previousTime = performance.now();

let isOnFocus = true;

addEventListener('blur', stopRender);
addEventListener('focus', startRender);

let renderId = requestAnimationFrame(render);

function startRender() {
    cancelAnimationFrame(renderId);
    isOnFocus = true;
    previousTime = performance.now();
    renderId = requestAnimationFrame(render);
    console.log('start render');
}

function stopRender() {
    isOnFocus = false;
    console.log('stop render');
}

function render(time) {
    const deltaTime = time - previousTime;
    previousTime = time;
    VIEW.context.clearRect(0, 0, VIEW.width, VIEW.height);
    VIEW.layers.forEach( layer => layer.update(deltaTime) );
    if (isOnFocus) renderId = requestAnimationFrame(render);
}

export default VIEW;