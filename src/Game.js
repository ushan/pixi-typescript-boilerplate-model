import * as PIXI from 'pixi.js';
import GameScreen from "./view/screens/GameScreen";
import ResourceService from "./resources/ResourceService";
import GameModel from './model/GameModel';
import { AppConfig } from './config/AppConfig';
import Fireworks from './view/components/effects/Fireworks';

class Game extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.gameModel = new GameModel();
        

        ResourceService.init(() => {
            this.startGame();
            this.animate();
        });

        this.animate = (delta) => {
            requestAnimationFrame(this.animate);
            this.app.renderer.render(this.app.stage);
            this.gameScreen?.animate(delta);
            this.fireworks?.update();

        };
    }

    startGame() {
        this.cleanUp();
        this.gameScreen = new GameScreen(this.app, this.gameModel);
        this.fireworks = new Fireworks();
        this.addChild(this.gameScreen);
        this.addChild(this.fireworks);
        const { gameWidth, gameHeight } = AppConfig.settings;
        this.fireworks.position.set(gameWidth / 2, gameHeight / 2);


    };

    cleanUp() {
        this.removeChildren();
    };


}

export default Game;
