import * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';
import gsap from "gsap";

class ScoreBallon extends PIXI.Sprite {
        /**
     * @param {*} item 
     * @param {( 'scores' | 'time' | 'speedUp' | 'magnet')} type 
     * @param { x:number, y:number } point 
     */
    constructor(type, scores, point){
        super();
        this.type = type;
        let scoreCaption;
        let textColor;
        switch(type) {
            case 'scores':
                textColor = 0xffffff;
                scoreCaption = scores >= 0 ? "+" + scores : scores;
                break;
            case  'time':
                textColor = 0x4444ff;
                scoreCaption = scores >= 0 ? "+" + scores + 's' : scores;
                break;
            case 'speedUp':
                textColor = 0x44ff44;
                scoreCaption = "speedUp";
                break;
            case 'magnet':
                textColor = 0xff4444;
                scoreCaption = "magnet";
                break;
            default:
                textColor = 0xffffff;
                scoreCaption = scores >= 0 ? "+" + scores : scores;
        }
        this.scoresText = new Text(scoreCaption, {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 32,
            fill: textColor,
            align: 'center'
        });
        this.x = point.x;
        this.y = point.y;
        // this.blendMode = PIXI.BLEND_MODES.ADD;
        this.alpha = 0.8;
        this.anchor.set(0.5, 0.5);
        this.scoresText.anchor.set (0.5, 0.5);


        this.addChild(this.scoresText);
        this.startTween();
    }

    startTween() {
        gsap.timeline()
            .to(this.scale, { x: 2, y: 2, duration: 0.2, stagger: 0.2 })
            .to(this, { y: this.y - 300, alpha: 0, rotation: 0, duration: 1, ease: "power.in", onComplete: () => {
                this.emit('finish');
            }});
    }
    

}

export default ScoreBallon