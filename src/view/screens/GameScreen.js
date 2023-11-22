import * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';
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

const { gameWidth, gameHeight } = AppConfig.settings;
const { animationSpped, worldSize, conveyorY, conveyorWidth, zCartPosition, zDeep} = AppConfig.settings3D;
const { levelMaxScores, newItemDelay } = AppConfig.gameSettings;
class GameScreen extends PIXI.Container {
    // endregion
    constructor(app, gameModel) {
        super();
        this.app = app;
        this.gameModel = gameModel;
        // region #Resources
        // this.bg = new SpriteCommon(ResourceList.BG);
        this.bg = new Background3D();
        this.items = [];
        this.itemsCont = new PIXI.Container;
        this.cart = new Cart();
        this.cartOver = new CartOver();
        this.scores = new PIXI.Container;
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
            this.cart.x = 0;
            this.addChild(this.cartOver);
            this.cartOver.scale.set(0.5);
            this.cartOver.anchor.set(0.5, 1);
            this.cartOver.y = gameHeight;
            this.cartOver.x = 0;
            this.addChild(this.scores);
            this.scoresText = new Text('0/0', {
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 24,
                fill: 0x9f1212,
                align: 'center'
            });
            this.scores.addChild(this.scoresText);
            this.scores.addChild(this.progressBar);
            this.scores.x = 10;
            this.scores.y = 10;
            this.progressBar.y = 30;
            this.updateScores();

            this.countdown.position.set(app.screen.width / 2, app.screen.height / 2);
            this.addChild(this.countdown);
            // this.items.forEach(item => this.addChild(item));
        };

        this.count = 1; 

        this.updateScores = () => {
            if (this.scoresText) {
                this.scoresText.text = `${this.gameModel.scores} / ${levelMaxScores}`;
                this.progressBar.progress = this.gameModel.scores / levelMaxScores;
                this.scoresText.x = (this.progressBar.width - this.scoresText.width) / 2;
            }
        };
        
        this.items = [];
        this.interactive = true;

        this.gameModel.scoreUpdated.add(this.updateScores);
        this.start();
    }

    start () {
        this.addElements();
        this.arrangeElements();
        this.app.ticker.add((delta) => {
            this.t += delta;
            this.items.forEach(c => { c.point3D.z -= (delta / animationSpped); });
        });
        this.on("pointermove", (e) => {
            this.cart.x = e.data.global.x;
            this.cartOver.x = e.data.global.x;
        });
        const newItemInterval = setInterval(() => {
            this.addRandomItem();
        }, newItemDelay);
    };




    moveToCart(item) {
        this.cart.cloneItem(item);
    };

    animate (delta = 0) {

    };


    addRandomItem() {
        const itemModel = this.gameModel.getNextItemModel();
        const item = new ItemSprite(itemModel, this.gameModel, this);
        item.anchor.set(0.5, 1);
        item.outOfBoundsCallback = () => this.onItemOutOfBounds(item);
        const xPosOnConveyor = Math.random() * conveyorWidth * worldSize - worldSize * conveyorWidth / 2;
        const yPosOnConveyor = conveyorY * worldSize;
        item.point3D.setPositions(xPosOnConveyor, yPosOnConveyor, zDeep);
        this.itemsCont.addChild(item);
        this.items.push(item);
        this.count++;
        item.zIndex = 0xffffff - this.count;
        this.itemsCont.sortChildren();
        item.alpha = 0;
        gsap.to(item, { alpha: 1, duration: 1, onComplete: () => { item.alpha = 1; } });
        // this.gameModel.scores += itemModel.scores;

        SoundBoard.play('move');

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


    arrangeElements() {
        const zLeng = zDeep - zCartPosition;
        const n = 10;
        const space = zLeng / n;
        
        for (let i = 0; i < n; i++) {
            for (let r = -1; r <= 1; r++){
                let item = this.addRandomItem();
                const posInRow = this.getRandomInt(-1, 2);
                item.point3D.z = zDeep - i * space;
                item.point3D.x = this.get3DXByPosInRow(r);
                item.zIndex = 0xffffff - item.point3D.z - posInRow;
            }


        }
        this.itemsCont.sortChildren();
    };

    get3DXByPosInRow(pos) {
        const f = 0.5 + pos * 0.35;
        return f * conveyorWidth * worldSize - worldSize * conveyorWidth / 2
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
}
export default GameScreen;
