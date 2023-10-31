import * as PIXI from 'pixi.js';
import Game from "./Game";

const options: object = {
  width: 800,
  height: 600,
  background: 0x223388,
  antialias: true,
  transparent: true,
};

const app: PIXI.Application = new PIXI.Application(options);

(window as any)['globalThis']['__PIXI_APP__'] = app;

const init = () => {
  const game = new Game(app);
  app.stage.addChild(game);
}

init();

document.body.appendChild(app.view);