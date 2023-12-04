import * as PIXI from 'pixi.js';
import { AppConfig } from './config/AppConfig';
import Game from "./Game";

/*
function resize() {

    let w = window.innerWidth;
    let h = window.innerHeight;

    AppConfig.settings.gameWidth = w;
    AppConfig.settings.gameHeight = h;
    if (app) {
        app.renderer.view.style.width = w + 'px';
        app.renderer.view.style.height = h + 'px';
        app.renderer.resize(w, h);
        app.resize();
    }

    
}
window.onresize = resize;*/

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

const init = () => {
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        // app.stage.scale.x = window.innerWidth / gameWidth;
        // app.stage.scale.y = window.innerHeight / gameHeight;
        AppConfig.settings.gameWidth = indow.innerWidth;
        AppConfig.settings.gameHeight = indow.innerHeight;
      });
    const game = new Game(app);
    app.stage.addChild(game);
};

init();

document.body.appendChild(app.view);
