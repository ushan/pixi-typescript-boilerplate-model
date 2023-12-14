import * as PIXI from 'pixi.js';
import { AppConfig } from './config/AppConfig';
import Game from "./Game";



AppConfig.updateSize(window.innerWidth, window.innerHeight);
const { gameWidth, gameHeight } = AppConfig.settings;

const options = {
    width: gameWidth,
    height: gameHeight,
    background: 0xDD2826,
    antialias: true,
    transparent: true,
};
const app = new PIXI.Application(options);

window['globalThis']['__PIXI_APP__'] = app;

const onResize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    AppConfig.updateSize(window.innerWidth, window.innerHeight);
}

const init = () => {
    window.addEventListener('resize', onResize);
    const game = new Game(app);
    app.stage.addChild(game);
    onResize();
};

init();

document.body.appendChild(app.view);
