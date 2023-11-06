import * as PIXI from 'pixi.js';
import GameScreen from "./screens/GameScreen";
import ResourceService from "./resources/ResourceService";

class Game extends PIXI.Container {

    private gameScreen: GameScreen | undefined;

    constructor(private app: PIXI.Application) {
        super();

        ResourceService.init(() => {
            this.startGame();
            this.animate();
        })
    }

    startGame = () => {
        this.cleanUp();

        this.gameScreen = new GameScreen(this.app);
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