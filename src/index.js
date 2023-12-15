import { init} from "./init";

const game = init();

document.getElementById('loading_title').innerHTML = translate('LOADING');
const bannerIMG = document.querySelector('#banner');
bannerIMG.style.backgroundImage = `url(${config.skinData.banner})`
bannerIMG.style.backgroundColor = config.skinData.bannerColor || '#911d23'

const message = {
  eventName: "all-loaded",
};
const hasParent = window.parent === window;
window.parent.postMessage(message, '*');