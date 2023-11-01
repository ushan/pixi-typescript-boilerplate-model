import * as PIXI from 'pixi.js';
import SpriteCommon from "../../components/common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import gsap from "gsap";
import Pseudo3DSprite from '../../components/common/Pseudo3DSprite';
import { AppConfig } from '../../config';

const {gameWidth, gameHeight} = AppConfig.settings;
const {animationSpped, worldSize, convayorY, convayorWidth} = AppConfig.settings3D;

class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly bg         :SpriteCommon = new SpriteCommon(ResourceList.BG);
    private readonly items      :Pseudo3DSprite[] = [];
    private readonly itemsCont  :PIXI.Container = new PIXI.Container;

    // endregion

    constructor(private app: PIXI.Application) {
        super();
        this.items = [];

 /*       this.items = new Array(6).fill(1).map((v,i) => {
            const card = new Pseudo3DSprite(ResourceList.CARD);
            card.on('click', () => this.do(card));
            return card;
        }); */


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

        const newItemInterval = setInterval(() => {
            this.addRandomItem();
        }, 1000);

        
    }

    public animate = (delta: number = 0) => {
    }


    private addElements = () => {
        this.addChild(this.bg);
        this.addChild(this.itemsCont);

        // this.items.forEach(item => this.addChild(item));
        console.log("hhh");
    }

    private n:number = 1;
    private  addRandomItem = () => {
        const item = new Pseudo3DSprite(ResourceList.CARD);
        const xPosOnConvayor = Math.random () * convayorWidth * worldSize - convayorWidth / 2;
        const yPosOnConvayor = convayorY * worldSize;
        item.point3D.setPositions(xPosOnConvayor, yPosOnConvayor, 50);
        this.itemsCont.addChild(item);
        this.items.push(item);
        this.n++;
        item.zIndex = 0xffffff - this.n;
        this.itemsCont.sortChildren();

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
}

export default GameScreen;