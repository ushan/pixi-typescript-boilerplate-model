import * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';
import GameModel, { EGameStates } from '../../model/GameModel';
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import gsap from "gsap";
import { AppConfig } from '../../config';
import ItemSprite from '../components/items/ItemSprite';
import { Cart, CartOver } from '../components/items/Cart';
import ProgressBar from '../components/ProgressBar';
import Point3D from '../../model/pseudo3ds/Point3D';
import Background3D from '../components/items/Background3D';
import { SoundBoard } from '../../resources/SoundBoard';
import Countdown from '../components/CountDown';
import ScoreBallon from '../components/ScoreBallon';
import { SoundManager } from '../../resources/sounds';


const { gameWidth, gameHeight } = AppConfig.settings;
const { animationSpeed, worldSize, conveyorY, conveyorWidth, zCartPosition, zDeep} = AppConfig.settings3D;
const { levelMaxScores, newItemDelay } = AppConfig.gameSettings;


class GameScreen extends PIXI.Container {
    /**
     * @param {PIXI.Application} app
     * @param {GameModel} gameModel 
     */
    constructor(app, gameModel) {
        super();
        this.app = app;
        this.gameModel = gameModel;
        this.soundManager = new SoundManager();
        this.bg = new Background3D();
        this.items = [];
        this.itemsCont = new PIXI.Container;
        this.cart = new Cart();
        this.cartOver = new CartOver();
        this.scoreBallonsCont = new PIXI.Container;
        this.scoresPanel = new PIXI.Container;
        this.progressBar = new ProgressBar(120, 4);
        this.countdown = new Countdown();
        this.t = 0;

        this.addElements = () => {
            // this.drawBG();
            this.addChild(this.bg);
            this.addChild(this.itemsCont);
            this.addChild(this.cart);
            this.cart.scale.set(0.5);
            this.cart.anchor.set(0.5, 1);
            this.cart.y = gameHeight;
            this.cart.x = gameWidth / 2;
            this.addChild(this.cartOver);
            this.cartOver.scale.set(0.5);
            this.cartOver.anchor.set(0.5, 1);
            this.cartOver.y = gameHeight;
            this.cartOver.x = gameWidth / 2;
            this.addChild(this.scoresPanel);
            this.scoresText = new Text('0/0', {
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 24,
                fill: 0x9f1212,
                align: 'center'
            });
            this.timeLeftText = new Text('0s', {
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 24,
                fill: 0xeeeeee,
                align: 'center'
            });
            this.claculateParams();

            this.addControls();

            this.scoresPanel.addChild(this.scoresText);
            this.scoresPanel.addChild(this.progressBar);
            this.scoresPanel.addChild(this.timeLeftText);
            this.scoresPanel.x = 10;
            this.scoresPanel.y = 10;
            this.progressBar.y = 30;
            this.timeLeftText.x = gameWidth - 100;
            this.addChild(this.scoreBallonsCont);
            this.updateScores();
            this.updateTimeLeft();

            this.countdown.position.set(app.screen.width / 2, app.screen.height / 2);
            this.addChild(this.countdown);
            this.countdown.on('countdownComplete', () => {
                 this.start();
              });
  
        };

        this.count = 1; 

        this.updateScores = (item, scores) => {
            this.addScoreBallon(item, 'scores', scores);
            if (this.scoresText) {
                this.scoresText.text = `${this.gameModel.scores} / ${levelMaxScores}`;
                this.progressBar.progress = this.gameModel.scores / levelMaxScores;
                this.scoresText.x = (this.progressBar.width - this.scoresText.width) / 2;
            }
        };

        this.updateTimeLeft = (item, timeIncrement) => {
            if (timeIncrement > 0) this.addScoreBallon(item, 'time', timeIncrement);
            if (this.timeLeftText) {
                this.timeLeftText.text = `${this.gameModel.timeLeft} s`
            }
        };

        this.onGameStateUpdated = () => {
            if (this.gameModel.gameState === EGameStates.playing){

            } 
            if (this.gameModel.gameState === EGameStates.stop) {

            };
        };

        this.onCartLineUpdated = () => {
            const f = 0.5 * this.gameModel.cartLine;
            const conveyorWidth = gameWidth * 0.5;
            // const lineWidth = conveyorWidth / 3;
            const trgX = gameWidth / 2   + conveyorWidth * f;
            // this.cart.x = gameWidth / 2   + conveyorWidth * f;
            // this.cartOver.x = this.cart.x;

            gsap.to(this.cart, { x: trgX, duration: 0.3 })
            gsap.to(this.cartOver, { x: trgX, duration: 0.3 })
        };
        
        this.items = [];
        this.interactive = true;
        this.eventMode = `dynamic`;

        this.gameModel.scoreUpdated.add(this.updateScores);
        this.gameModel.timeLeftUpdated.add(this.updateTimeLeft);
        this.gameModel.gameStateUpdated.add(this.onGameStateUpdated);
        this.gameModel.cartLineUpdated.add(this.onCartLineUpdated);
        this.init();
    }

    init() {
        this.addElements();
        this.arrangeElements();

    };

    start() {
        this.gameModel.startGame();
        this.app.ticker.add((delta) => {
            if (this.gameModel.gameState !== EGameStates.playing) return
            this.t += delta;
            const speed = this.blockSpace3Dz * (this.app.ticker.deltaMS / (this.gameModel.speed * 1000));
            // const speed = this.blockSpace3Dz * (delta / )
            this.items.forEach(c => { c.point3D.z -= speed; });
        });
        this.on("pointermove", (e) => {
            // this.cart.x = e.data.global.x;
            // this.cartOver.x = e.data.global.x;
        });
        const newItemInterval = setInterval(() => {
            if (this.gameModel.gameState !== EGameStates.playing) return
            const posInRow = this.getRandomInt(-1, 2);
            this.addItem(posInRow);
        }, newItemDelay);
    }

    moveToCart(item) {
        this.cart.cloneItem(item);
    };

    animate (delta = 0) {

    };

    /**
     * 
     * @param { (-1 | 0 | 1 | 'none') } pos 
     * @returns {ItemSprite}
     */
    addItem(posInRow) {
         const itemModel = this.gameModel.getNextItemModel();
        const item = new ItemSprite(posInRow, itemModel, this.gameModel, this);
        item.anchor.set(0.5, 1);
        item.outOfBoundsCallback = () => this.onItemOutOfBounds(item);
        // const xPosOnConveyor = Math.random() * conveyorWidth * worldSize - worldSize * conveyorWidth / 2;
        const yPosOnConveyor = conveyorY * worldSize;
        const xPosOnConveyor = this.get3DXByPosInRow(posInRow);
        item.point3D.setPositions(xPosOnConveyor, yPosOnConveyor, zDeep);
        this.itemsCont.addChild(item);
        this.items.push(item);
        this.count++;
        item.zIndex = 0xffffff - this.count;
        this.itemsCont.sortChildren();
        item.alpha = 0;
        gsap.to(item, { alpha: 1, duration: 1, onComplete: () => { item.alpha = 1; } });
        return item

    };

    removeItem(item) {
        this.itemsCont.removeChild(item);
        //this.items.
        const index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    };

    claculateParams() {
        const zLeng = zDeep - zCartPosition;
        const n = 10;
        this.blockSpace3Dz = zLeng / n;
    }

    arrangeElements() {
        // const zLeng = zDeep - zCartPosition;
        const n = 10;
        // const space = zLeng / n;
        
        for (let i = 0; i < n; i++) {
            for (let r = -1; r <= 1; r++){
                const posInRow = this.getRandomInt(-1, 2);
                let item = this.addItem(posInRow);
                item.point3D.z = zDeep - i * this.blockSpace3Dz;
                item.point3D.x = this.get3DXByPosInRow(r);
                item.zIndex = 0xffffff - item.point3D.z - posInRow;
            }
        }
        this.itemsCont.sortChildren();
    };

    addControls() {
        this.controlsCont = new PIXI.Container();
        this.keyLeft = new SpriteCommon(ResourceList.KEY_LEFT);
        this.keyLeft.cursor = "pointer";
        this.keyLeft.on('pointerdown', () => {
            // this.cart.x -= 50;
            // this.cartOver.x = this.cart.x;
            this.gameModel.registerMoveCart(true);
        });
        this.keyLeft.anchor.set(1, 0.5);
        this.keyLeft.alpha = 0.6;
        this.keyLeft.x = - 50;

        this.keyRight = new SpriteCommon(ResourceList.KEY_RIGHT);
        this.keyRight.on('pointerdown', () => {
            // this.cart.x += 50;
            // this.cartOver.x = this.cart.x;
            this.gameModel.registerMoveCart(false);
        });
        
        this.keyRight.cursor = "pointer";
        this.keyRight.alpha = 0.6;
        this.keyRight.anchor.set(0, 0.5);
        this.keyRight.x = 50;

        this.controlsCont.addChild(this.keyLeft);
        this.controlsCont.addChild(this.keyRight);
        this.addChild(this.controlsCont);
        this.controlsCont.y = gameHeight - 60;
        this.controlsCont.x = gameWidth / 2;
    }

    get3DXByPosInRow(pos) {
        const f = 0.5 + pos * 0.35;
        return f * conveyorWidth * worldSize - worldSize * conveyorWidth / 2;
    } 

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
      }

    onItemOutOfBounds(item) {
        this.removeItem(item);
        item.destroy();
    }

    /**
     * @param {*} item 
     * @param {( 'scores' | 'time')} item 
     * @param {*} value 
     */
    addScoreBallon(item, type, value) {
        let point = item ? {x:item.x, y:item.y} : {x:gameWidth / 2, y:gameHeight / 2};
        const scoreBallon = new ScoreBallon(type, value, point);
        this.scoreBallonsCont.addChild(scoreBallon);
        scoreBallon.on('finish', () => {
            this.scoreBallonsCont.removeChild(scoreBallon);
            scoreBallon.removeAllListeners('finish');
        });
        if (value > 0 ) {
            // SoundBoard.play('match');
            this.soundManager.play('match');
        } else {
            // SoundBoard.play('move');
            this.soundManager.play('move');
        }

    }


    getCartXByLine(linePos) {

    }

  
}
export default GameScreen;
