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
import Background3D from '../components/items/Background3D';
import Countdown from '../components/CountDown';
import ScoreBallon from '../components/ScoreBallon';
import { SoundManager } from '../../resources/SoundManager';
import KeyPad from '../components/common/KeyPad';


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
        this.keyPad = new KeyPad(gameModel);
        this.scoresPanel = new PIXI.Container;
        this.progressBar = new ProgressBar(120, 4);
        this.countdown = new Countdown();
        this.initialSpeed = this.gameModel.speed * this.gameModel.speedUpFactor;
        this.t = 0;

        this.addElements = () => {
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
            // this.startSpeed = this.

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
            const trgX = gameWidth / 2   + conveyorWidth * f;

            gsap.to(this.cart, { x: trgX, duration: 0.3 })
            gsap.to(this.cartOver, { x: trgX, duration: 0.3 })
        };

        this.onExtraCoutch = (item) => {
            if (item.itemKind.id === "speedUp" || item.itemKind.id === "magnet"){
                this.addScoreBallon(item, item.itemKind.id);
            }
        };

        this.onSpeedUpdated = (item) => {
            this.reRunAddRowInterval();
        };
        
        this.items = [];
        this.eventMode = `dynamic`;

        this.gameModel.scoreUpdated.add(this.updateScores);
        this.gameModel.timeLeftUpdated.add(this.updateTimeLeft);
        this.gameModel.gameStateUpdated.add(this.onGameStateUpdated);
        this.gameModel.cartLineUpdated.add(this.onCartLineUpdated);
        this.gameModel.extraCoutch.add(this.onExtraCoutch);
        this.gameModel.speedUpdated.add(this.onSpeedUpdated);
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
            this.items.forEach(c => { c.point3D.z -= speed * this.gameModel.speedUpFactor; });
        });
        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowRight') {
                this.gameModel.registerMoveCart(false);
            } else if (e.code === 'ArrowLeft') {
                this.gameModel.registerMoveCart(true);
            }
        });
        this.reRunAddRowInterval();

    }

    moveToCart(item) {
        this.cart.cloneItem(item);
    };

    animate (delta = 0) {

    };

    reRunAddRowInterval() {
        if (this.newItemInterval){
            clearInterval(this.newItemInterval);
        }
        const currentAddItemInterval = (this.gameModel.speed * 1000) / this.gameModel.speedUpFactor;
        this.newItemInterval = setInterval(() => {
            if (this.gameModel.gameState !== EGameStates.playing) return
            const newItems = this.addItemsRow();
            this.test_checkDistance();
        }, currentAddItemInterval);
    }

    /**
     * 
     * @returns {Array.<ItemSprite>}
     */
    addItemsRow() {
        const modelItemsArray = this.gameModel.getNextItemModelsRow()
        const itemsArray = []
        for (let i = 0; i < modelItemsArray.length; i++) {
            const itemModel = modelItemsArray[i];
            const item = new ItemSprite(itemModel.posInRow, itemModel.itemKind, this.gameModel, this);
            itemsArray.push(item);
            item.anchor.set(0.5, 1);
            item.outOfBoundsCallback = () => this.onItemOutOfBounds(item);
            // const xPosOnConveyor = Math.random() * conveyorWidth * worldSize - worldSize * conveyorWidth / 2;
            const yPosOnConveyor = conveyorY * worldSize;
            const xPosOnConveyor = this.get3DXByPosInRow(itemModel.posInRow);
            item.point3D.setPositions(xPosOnConveyor, yPosOnConveyor, zDeep);
            item.axis3Dx = xPosOnConveyor;
            this.itemsCont.addChild(item);
            this.items.push(item);
            this.count++;
            item.zIndex = 0xffffff - this.count;
            this.itemsCont.sortChildren();
            item.alpha = 0;
            gsap.to(item, { alpha: 1, duration: 1, onComplete: () => { item.alpha = 1; } });
        }
        return itemsArray

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
            let itemsRow = this.addItemsRow();
            for (let r = 0; r < itemsRow.length; r++) {
                let item = itemsRow[r];
                item.point3D.z = zDeep - i * this.blockSpace3Dz;
                // item.update3DPoseByPosInRow();
                // item.point3D.x = this.get3DXByPosInRow(item.posInRow);
                item.axis3Dx = this.get3DXByPosInRow(item.posInRow); 
                item.zIndex = 0xffffff - item.point3D.z - r;
            }
            
        }
        this.itemsCont.sortChildren();
    };

    addControls() {
        this.addChild(this.keyPad);
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
        if (item === undefined) return
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

    test_checkDistance() {
        let distances = [];
        for (let i = 0; i < this.items.length; i++){
            let item = this.items[i];
            if (i < this.items.length - 1) {
                let diff = this.items[i + 1].point3D.z - this.items[i].point3D.z 
                distances.push(diff);
            }
        }
        // console.log(this.gameModel.speed, this.gameModel.speedUpFactor, distances);
    }
}
export default GameScreen;
