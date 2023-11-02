import * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';
import SpriteCommon from "../../components/common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import gsap from "gsap";
import Pseudo3DSprite from '../../components/common/Pseudo3DSprite';
import { AppConfig } from '../../config';
import GameModel from '../../model/GameModel';
import ItemModel from '../../model/goods/ItemModel';
import ItemSprite from '../../components/goods/ItemSprite';
import Cart from '../../components/common/Cart';
import ProgressBar from '../../components/ProgressBar';

const {gameWidth, gameHeight} = AppConfig.settings;
const {animationSpped, worldSize, convayorY, convayorWidth} = AppConfig.settings3D;
const {levelMaxScores} = AppConfig.gameSettings;

class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly bg         :SpriteCommon = new SpriteCommon(ResourceList.BG);
    private readonly items      :Pseudo3DSprite[] = [];
    private readonly itemsCont  :PIXI.Container = new PIXI.Container;
    private scores              :PIXI.Container = new PIXI.Container;
    private scoresText?         :Text;
    private cart                :Cart = new Cart();
    private progressBar         :ProgressBar = new ProgressBar(120, 4);


    // endregion

    constructor(private app:PIXI.Application, private gameModel:GameModel) {
        super();
        this.items = [];

 /*       this.items = new Array(6).fill(1).map((v,i) => {
            const card = new Pseudo3DSprite(ResourceList.CARD);
            card.on('click', () => this.do(card));
            return card;
        }); */

        this.gameModel.scoreUpdated.add(this.updateScores);
        this.start();
    }

    private t:number = 0;

    // region #Game flow
    public start = () => {
        this.addElements();
        this.arrangeElements();
        this.app.ticker.add((delta) =>
        {
            this.t += delta;
            this.items.forEach(c => {c.point3D.z -= (delta / animationSpped)})
        });
        this.bg.on("pointermove", (e:any) => {
            console.log('X', e.data.global.x, 'Y', e.data.global.y);
            this.cart.x = e.data.global.x;
        });
        const newItemInterval = setInterval(() => {
            this.addRandomItem();
        }, 1000);        
    }

    private do(item: Pseudo3DSprite) {
        const {x,y, defaultX, defaultY} = item;

        if (x !== defaultX || y !== defaultY) {
            this.items.forEach(c => gsap.to(c, {x: c.defaultX, y: c.defaultY, rotation: 0, duration: .3}));
        } else {
            gsap.to(item, {y:100, rotation: 6.28, duration: 1, onComplete: () => {item.rotation = 0} });
        }
    }

    public animate = (delta: number = 0) => {
    }


    private addElements = () => {
        this.addChild(this.bg);
        this.addChild (this.cart);
        this.cart.scale.set(0.5);
        this.cart.anchor.set(0.5, 1);
        this.cart.y = gameHeight;

        this.addChild(this.itemsCont);

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
  
    }

    private count:number = 1;

    private  addRandomItem = () => {
        const itemModel:ItemModel = this.gameModel.getNextItemModel();
        const item = new ItemSprite(itemModel);
        item.anchor.set(0.5,1);
        item.outOfBoundsCallback = () =>  this.onItemOutOfBounds(item);
        const xPosOnConvayor = Math.random () * convayorWidth * worldSize - worldSize * convayorWidth / 2;
        const yPosOnConvayor = convayorY * worldSize;
        item.point3D.setPositions(xPosOnConvayor, yPosOnConvayor, 100);
        this.itemsCont.addChild(item);
        this.items.push(item);
        this.count++;
        item.zIndex = 0xffffff - this.count;
        this.itemsCont.sortChildren();
        item.alpha = 0;
        gsap.to(item, {alpha: 1, duration: 1, onComplete: () => {item.alpha = 1} });

        this.gameModel.scores += itemModel.scores;
    }

    private onItemOutOfBounds (item:Pseudo3DSprite):void {
        this.removeItem(item);
        item.destroy();
    }

    private removeItem = (item:Pseudo3DSprite) => {
        this.itemsCont.removeChild(item);
        //this.items.
        const index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    private arrangeElements = () => {
        const {app} = this;

        // Bg
        this.bg.width = gameWidth;    
        this.bg.height = gameHeight;  

 /*       this.items.forEach((item,i) => {

            item.anchor.set(0.5,1);
            item.point3D.x = Math.random () * convayorWidth * worldSize - convayorWidth / 2;
            item.point3D.y = convayorY * worldSize;
            const n = this.items.length - i;
            item.point3D.z = n * 20 - 19;
            item.alpha = 1;
        });
*/

    }
    // endregion

    private updateScores = () => {
        if (this.scoresText){
            this.scoresText.text = `${this.gameModel.scores} / ${levelMaxScores}`;
            this.progressBar.progress = this.gameModel.scores / levelMaxScores;
            // this.progressBar.progress = 0.5;
            this.scoresText.x = (this.progressBar.width - this.scoresText.width) / 2;
        } 
        
    }
}

export default GameScreen;