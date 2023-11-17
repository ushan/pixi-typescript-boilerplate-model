import * as PIXI from 'pixi.js';
import GameScreen from "./view/screens/GameScreen";
import ResourceService from "./resources/ResourceService";
import GameModel from './model/GameModel';
class Game extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.gameModel = new GameModel();
        this.startGame = () => {
            this.cleanUp();
            this.gameScreen = new GameScreen(this.app, this.gameModel);
            this.addChild(this.gameScreen);
        };
        this.cleanUp = () => {
            this.removeChildren();
        };
        this.animate = (delta) => {
            requestAnimationFrame(this.animate);
            this.app.renderer.render(this.app.stage);
            this.gameScreen?.animate(delta);
        };
        ResourceService.init(() => {
            this.startGame();
            this.animate();
        });
    }
}
export default Game;
