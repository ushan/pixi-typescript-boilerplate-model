import * as PIXI from 'pixi.js';
import GameScreen from "./view/screens/GameScreen";
import ResourceService from "./resources/ResourceService";
import GameModel from './model/GameModel';

class Game extends PIXI.Container {

    readonly gameModel  :GameModel = new GameModel();
    private gameScreen  :GameScreen | undefined;

    constructor(private app: PIXI.Application) {
        super();

        ResourceService.init(() => {
            this.startGame();
            this.animate();
        })
    }

    startGame = () => {
        this.cleanUp();

        this.gameScreen = new GameScreen(this.app, this.gameModel);
        this.addChild(this.gameScreen);
    }

    cleanUp = () => {
        this.removeChildren();
    }

    animate = (delta?: number) => {
        requestAnimationFrame(this.animate);
        this.app.renderer.render(this.app.stage);

        this.gameScreen?.animate(delta);
    }
}

export default Game;