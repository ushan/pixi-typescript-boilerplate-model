import * as PIXI from 'pixi.js';


class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly dots   :PIXI.Graphics[] = [];
    private readonly sphere :PIXI.Graphics[] = [];

    // endregion

    constructor(private app: PIXI.Application) {
        super();
        // this.drawCircle();
        // this.drawSphere();
        // this.drawMatrix();
        this.drawSphericalDisplace();

        // this.start();
    }

    public animate = (delta: number = 0) => {
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

    private  drawGrid = () => {
        const dotsNumX = 16;
        const dotsNumY = 16;
        const xStep = 20; //angle in radians between dots
        const yStep = 20; //angle in radians between dots
        for (let i = 0; i < dotsNumX; i++) {
             for (let j = 0; j < dotsNumY; j++) {
                const dot = new PIXI.Graphics();
                dot.x = 20 + i * xStep;
                dot.y = 20 + j * yStep;
                dot.beginFill(0xff0000);
                dot.drawCircle(0, 0, 4);
                dot.alpha = 0.3;
                dot.endFill();
                this.addChild(dot);
                
             }

            
        }
    }

    private  drawMatrixSphere2 = () => {
        const dotsNumX = 8;
        const dotsNumY = 8;
        const xStep = 20; //angle in radians between dots
        const yStep = 20; //angle in radians between dots
        for (let i = - dotsNumX; i < dotsNumX; i++) {
             for (let j = -dotsNumY; j < dotsNumY; j++) {
                const dot = new PIXI.Graphics();
                let startX = dotsNumX * xStep + xStep;
                let startY = dotsNumY * yStep + yStep;
                let xPos = i * xStep;
                let yPos = j * yStep;
                let displaceX =  0;
                let displaceY =  0;
                dot.x = startX + xPos + displaceX;
                dot.y = startY + yPos + displaceY;
                dot.beginFill(0xff0000);
                dot.drawCircle(0, 0, 4);
                dot.alpha = 0.3;
                dot.endFill();
                this.addChild(dot);
                
             }

            
        }
    }

    //Get inverse position on texture
    private drawSphericalDisplace = () => {
        const dotsNumX = 8;
        const dotsNumY = 8;
        const xStep = 20; // angle in radians between dots
        const yStep = 20; // angle in radians between dots
        const centerX = 0; // Center of the grid X coordinate
        const centerY = 0; // Center of the grid Y coordinate
        // const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY); // Maximum distance from the center
        const maxDistance = 100; // Maximum distance from the center
    
        for (let i = -dotsNumX; i < dotsNumX; i++) {
            for (let j = -dotsNumY; j < dotsNumY; j++) {
                const dot = new PIXI.Graphics();
                let startX = dotsNumX * xStep + xStep;
                let startY = dotsNumY * yStep + yStep;
                let xPos = i * xStep;
                let yPos = j * yStep;
    
                // Calculate the distance from the center of the grid
                const distance = Math.sqrt((xPos - centerX) ** 2 + (yPos - centerY) ** 2);
    
                // Apply a quadratic displacement
                const displacementFactor = 1 - (distance / maxDistance) ** 2;
                let displaceX = displacementFactor * (centerX - xPos) / 4;
                let displaceY = displacementFactor * (centerY - yPos) / 4;
    
                dot.x = startX + xPos + displaceX;
                dot.y = startY + yPos + displaceY;
                dot.beginFill(0xff0000);
                dot.drawCircle(0, 0, 4);
                dot.alpha = 0.3;
                dot.endFill();
                this.addChild(dot);
            }
        }
    }
    
}

export default GameScreen;