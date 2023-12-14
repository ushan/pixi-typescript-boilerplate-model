import * as PIXI from 'pixi.js';
import GameScreen from "./view/screens/GameScreen";
import ResourceService from "./resources/ResourceService";
import GameModel, { EGameStates } from './model/GameModel';
import { AppConfig } from './config/AppConfig';
import Fireworks from './view/components/effects/Fireworks';

class Game extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.gameModel = new GameModel();
        
        this.onGameStateUpdated = () => {
            if (this.gameModel.gameState === EGameStates.playing){
                this.app.ticker.start();
            } 
            if (this.gameModel.gameState === EGameStates.stop) {
                this.app.ticker.stop();
            };
        };

        this.gameModel.gameStateUpdated.add(this.onGameStateUpdated);
        

        ResourceService.init(() => {
            this.startGame();
            this.animate();
        });

        this.animate = (delta) => {
            if (this.gameModel.gameState !== EGameStates.playing) return
            requestAnimationFrame(this.animate);
            this.app.renderer.render(this.app.stage);
            this.gameScreen?.animate(delta);


        };
    }

    startGame() {
        this.cleanUp();
        this.gameScreen = new GameScreen(this.app, this.gameModel);
        this.addChild(this.gameScreen);
    };

    cleanUp() {
        this.removeChildren();
    };


}

export default Game;
