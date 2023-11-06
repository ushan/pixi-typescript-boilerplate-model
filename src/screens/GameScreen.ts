import * as PIXI from 'pixi.js';


class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly dots   :PIXI.Graphics[] = [];
    private readonly sphere :PIXI.Graphics[] = [];

    // endregion

    constructor(private app: PIXI.Application) {
        super();
        this.drawCircle();
        this.drawSphere();

        // this.start();
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

    private  drawSphere = () => {
        let t = 0; //phase of angle in radians in the circle. 0 .. Math.PI
        let p = 0; //phase of angle in radians in the circle. 0 .. Math.PI * 2
        const dotsNumX = 12;
        const dotsNumY = 12;
        const tStep = Math.PI / dotsNumX; //angle in radians between dots
        const pStep = 2 * Math.PI / dotsNumY; //angle in radians between dots
        for (let i = 0; i < dotsNumX; i++) {
            t += tStep
             for (let j = 0; j < dotsNumY; j++) {
                p += pStep;
                const dot = new PIXI.Graphics();
                const centerX = this.app.view.width * 0.65;
                const centerY = this.app.view.height / 2;
                const radius = 220;
                dot.x = centerX + radius * Math.sin(t) * Math.cos(p);
                dot.y = centerY + radius * Math.sin(t) * Math.sin(p);
                const posZ = radius * Math.cos(t)
                dot.beginFill(0xff0000);
                dot.drawCircle(0, 0, 2 + posZ / 20);
                dot.alpha = 0.3;
                dot.endFill();
                this.addChild(dot);
                
             }
            
        }
    }
}

export default GameScreen;