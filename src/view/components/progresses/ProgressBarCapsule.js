import * as PIXI from 'pixi.js';
import { NineSlicePlane, Texture } from 'pixi.js';
import ResourceList from '../../../resources/ResourceList';
import ResourceService from '../../../resources/ResourceService';
import SpriteCommon from '../common/SpriteCommon';
class ProgressBarCapsule extends PIXI.Container{
    constructor(progressColor = 0) {
        super();
        this.progressColor = progressColor;
        this._visualProgress = 0.5;

        this._cWidth = 300; //component width
        // this._cHeigh = 50;
        this.flareMargin = 6;

        this.bg = new NineSlicePlane(ResourceService.getTexture(ResourceList.PRGS_CAPSULE_BG), 2, 6, 16, 6);
        this.bg.width = this._cWidth;
        this.addChild(this.bg);  

        this.bar = new PIXI.Graphics();
        this.addChild(this.bar);

        this.shadow = new NineSlicePlane(ResourceService.getTexture(ResourceList.PRGS_CAPSULE_SHADOW), 2, 2, 21, 22);
        this.addChild(this.shadow);

        this.flare = new SpriteCommon(ResourceList.PRGS_CAPSULE_FLARE);
        this.addChild(this.flare);

        this.setComponentWidth(300);
    }

    get visualProgress() {return this._visualProgress;}

    /**
     * @access public
     * @param {number} value - we need this param for the cases when use animated changing of progress bar. 
     *        It displays the current visual state of the progress where `progress` param is a target for `visualProgress`
     * 
     * @return {}
     */
    set visualProgress(value) {
        if (this._visualProgress === value) return
        if (value > 1) this._visualProgress = 1;
        if (value < 0) this._visualProgress = 0;
        this._visualProgress = value;
        this.drawComponent();

    }

    /**
     * @access public
     * @param {number} value 
     * @returns {}
     */
    setComponentWidth(value){
        // if (value === this._cWidth) return
        this._cWidth = value;
        this.drawComponent();
    }

    drawComponent() {
        this.bg.width = this._cWidth;
        this.drawProgress();
        this.shadow.width = this._cWidth;
        this.shadow.y = 19;
        this.flare.width = this.bg.width - this.flareMargin * 2;
        this.flare.x = this.flareMargin;
        this.flare.y = this.flareMargin;

    }

    drawProgress() {
        const margin = 8;
        const maxW = this._cWidth - margin;
        let prg = this._visualProgress;
        if (prg > 1) prg = 1;
        if (prg < 0) prg = 0;
        const w = maxW * prg;
        this.bar.y = 6;
        this.bar.clear();
        this.bar.beginFill(this.progressColor);
        // this.bar.drawRoundedRect(0, 0, w, maxH, 8);
        this.bar.drawRoundedRect(0, 0, w, this.bg.height - 12, 8);
        
        this.bar.endFill();

    }



}

export default ProgressBarCapsule