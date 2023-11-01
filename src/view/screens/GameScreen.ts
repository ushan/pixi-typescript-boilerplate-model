import * as PIXI from 'pixi.js';
import SpriteCommon from "../../components/common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import gsap from "gsap";
import Pseudo3DSprite from '../Pseudo3DSprite';


class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly bg: SpriteCommon = new SpriteCommon(ResourceList.BG);
    private readonly items: Pseudo3DSprite[] = [];


    // endregion

    constructor(private app: PIXI.Application) {
        super();

        this.items = new Array(6).fill(1).map((v,i) => {
            const card = new Pseudo3DSprite(ResourceList.CARD);
            card.on('click', () => this.do(card));
            return card;
        });


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
            this.items.forEach(c => {c.point3D.z += (delta / 100)})
        });

        
    }

    public animate = (delta: number = 0) => {
    }

    private do(item: Pseudo3DSprite) {
        const {x,y, defaultX, defaultY} = item;

        if (x !== defaultX || y !== defaultY) {
            this.items.forEach(c => gsap.to(c, {x: c.defaultX, y: c.defaultY, rotation: 0, duration: .3}));
        } else {
            gsap.to(item, {y:100, rotation: 6.28, duration: 1, onComplete: () => {item.rotation = 0} });
            //gsap.to(this.bg, {rotation: 6.28, duration: 1, onComplete: () => {this.bg.rotation = 0}});
        }
    }


    private addElements = () => {
        this.addChild(this.bg);

        this.items.forEach(card => this.addChild(card));
    }

    private  addRandomItem = () => {
        const item = new Pseudo3DSprite(ResourceList.CARD);
        const w = 800;
        const h = 600;
        item.point3D.setPositions(Math.random() * 800, 280, -100);

    }

    private arrangeElements = () => {
        const {app} = this;

        // Bg
        this.bg.width = 800;    
        this.bg.height = 600;  

        this.items.forEach((item,i) => {

            item.anchor.set(0.5,1);
            item.point3D.x = Math.random () * 2000 - 1000;
            item.point3D.y = 6000;
            const n = this.items.length - i;
            item.point3D.z = n * 20 - 19;
            item.alpha = 1;
        });

    }
    // endregion
}

export default GameScreen;