import * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';
import SpriteCommon from "../../components/common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import gsap from "gsap";
import { AppConfig } from '../../config';
import ItemSprite from '../../components/goods/ItemSprite';
import { Cart, CartOver } from '../../components/goods/Cart';
import ProgressBar from '../../components/ProgressBar';
const { gameWidth, gameHeight } = AppConfig.settings;
const { animationSpped, worldSize, convayorY, convayorWidth } = AppConfig.settings3D;
const { levelMaxScores, newItemDelay } = AppConfig.gameSettings;
class GameScreen extends PIXI.Container {
    // endregion
    constructor(app, gameModel) {
        super();
        this.app = app;
        this.gameModel = gameModel;
        // region #Resources
        this.bg = new SpriteCommon(ResourceList.BG);
        this.items = [];
        this.itemsCont = new PIXI.Container;
        this.cart = new Cart();
        this.cartOver = new CartOver();
        this.scores = new PIXI.Container;
        this.progressBar = new ProgressBar(120, 4);
        this.t = 0;
        // region #Game flow
        this.start = () => {
            this.addElements();
            this.arrangeElements();
            this.app.ticker.add((delta) => {
                this.t += delta;
                this.items.forEach(c => { c.point3D.z -= (delta / animationSpped); });
            });
            this.on("pointermove", (e) => {
                // console.log('X', e.data.global.x, 'Y', e.data.global.y);
                this.cart.x = e.data.global.x;
                this.cartOver.x = e.data.global.x;
            });
            const newItemInterval = setInterval(() => {
                this.addRandomItem();
            }, newItemDelay);
        };
        this.moveToCart = (item) => {
            this.cart.cloneItem(item);
        };
        this.animate = (delta = 0) => {
        };
        this.addElements = () => {
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
                fontSize: 24,
                fill: 0xff1010,
                align: 'center'
            });
            this.scores.addChild(this.scoresText);
            this.scores.addChild(this.progressBar);
            this.scores.x = 10;
            this.scores.y = 10;
            this.progressBar.y = 30;
            this.updateScores();
            // this.items.forEach(item => this.addChild(item));
        };
        this.count = 1;
        this.addRandomItem = () => {
            const itemModel = this.gameModel.getNextItemModel();
            const item = new ItemSprite(itemModel, this.gameModel, this);
            item.anchor.set(0.5, 1);
            item.outOfBoundsCallback = () => this.onItemOutOfBounds(item);
            const xPosOnConvayor = Math.random() * convayorWidth * worldSize - worldSize * convayorWidth / 2;
            const yPosOnConvayor = convayorY * worldSize;
            item.point3D.setPositions(xPosOnConvayor, yPosOnConvayor, 100);
            this.itemsCont.addChild(item);
            this.items.push(item);
            this.count++;
            item.zIndex = 0xffffff - this.count;
            this.itemsCont.sortChildren();
            item.alpha = 0;
            gsap.to(item, { alpha: 1, duration: 1, onComplete: () => { item.alpha = 1; } });
            // this.gameModel.scores += itemModel.scores;
        };
        this.removeItem = (item) => {
            this.itemsCont.removeChild(item);
            //this.items.
            const index = this.items.indexOf(item, 0);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        };
        this.arrangeElements = () => {
            const { app } = this;
            // Bg
            this.bg.width = gameWidth;
            this.bg.height = gameHeight;
        };
        this.updateScores = () => {
            if (this.scoresText) {
                this.scoresText.text = `${this.gameModel.scores} / ${levelMaxScores}`;
                this.progressBar.progress = this.gameModel.scores / levelMaxScores;
                this.scoresText.x = (this.progressBar.width - this.scoresText.width) / 2;
            }
        };
        this.items = [];
        this.interactive = true;
        /*       this.items = new Array(6).fill(1).map((v,i) => {
                   const card = new Pseudo3DSprite(ResourceList.CARD);
                   card.on('click', () => this.do(card));
                   return card;
               }); */
        this.gameModel.scoreUpdated.add(this.updateScores);
        this.start();
    }
    do(item) {
        const { x, y, defaultX, defaultY } = item;
        if (x !== defaultX || y !== defaultY) {
            this.items.forEach(c => gsap.to(c, { x: c.defaultX, y: c.defaultY, rotation: 0, duration: .3 }));
        }
        else {
            gsap.to(item, { y: 100, rotation: 6.28, duration: 1, onComplete: () => { item.rotation = 0; } });
        }
    }
    onItemOutOfBounds(item) {
        this.removeItem(item);
        item.destroy();
    }
}
export default GameScreen;
