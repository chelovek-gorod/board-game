import { SPRITES_PATH, SPRITES, SOUNDS_PATH, SOUNDS } from './assets';

export function loader(callback) {
    let assetsNumber = Object.keys(SPRITES).length + Object.keys(SOUNDS).length;
    
    for (const sprite in SPRITES) {
        const image = new Image();
        image.src = SPRITES_PATH + SPRITES[sprite];
        image.onload = () => {
            SPRITES[sprite] = image;
            updateLoadingState();
        }
    }
    
    for (const sound in SOUNDS) {
        const se = new Audio( SOUNDS_PATH + SOUNDS[sound] );
        se.oncanplaythrough = (event) => {
            event.target.oncanplaythrough = null;
            SOUNDS[sound] = se;
            updateLoadingState();
        }
    }

    function updateLoadingState() {
        assetsNumber--;
        if (!assetsNumber) callback();
    }
};