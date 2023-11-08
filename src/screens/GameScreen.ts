import * as PIXI from 'pixi.js';
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import gsap from "gsap";
import {Spine} from "pixi-spine";
import ResourceService from '../resources/ResourceService';

class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly bg     :SpriteCommon = new SpriteCommon(ResourceList.BG);
    private readonly dots   :PIXI.Graphics[] = [];
    private readonly sphere :PIXI.Graphics[] = [];

    // endregion

    constructor(private app: PIXI.Application) {
        super();
        this.drawCircle();

        // this.start();

        const spine = ResourceService.getSpine(ResourceList.EXPLOSION_ANIM) as any;
        this.addChild(spine  as PIXI.Container);
    }
    private drawCircle = () => {
        let t = 0; //phase of angle in radians in the circle. 0.. Math.PI * 2
        const dotsNum = 30;
        const tStep = 2 * Math.PI / dotsNum; //angle in radians between dots
        for (let i = 0; i < dotsNum; i++) {
            const dot = new PIXI.Graphics();
            const centerX = this.app.view.width / 5;
            const centerY = this.app.view.height / 2;
            const radius = 100;
            dot.x = centerX + radius * Math.cos(t);
            dot.y = centerY + radius * Math.sin(t);
            dot.beginFill(0xffffff);
            dot.drawCircle(0, 0, 2);
            dot.endFill();
            this.addChild(dot);
            t += tStep
        }
    }





 
}

export default GameScreen;