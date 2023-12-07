import { AppConfig } from "../../../config/AppConfig";
import ResourceList from "../../../resources/ResourceList";
import SpriteCommon from "../common/SpriteCommon";
import * as PIXI from 'pixi.js';

class TimerProgressBar extends  PIXI.Container{
    constructor() {
        super();
        const { timeMax } = AppConfig.gameSettings;

        this.progressWidthMax = 300;
        this.progressWidthMin = 0;
        this.progressSprite = this.timerProgress;
        this._progress = 0;
        this.scale.set(0.5, 0.5);
        this.timerBase = new SpriteCommon(ResourceList.TIMER_BASE);
        this.timerBase.alpha = 0.5;
        this.addChild(this.timerBase);
        
        this.timerProgress = new SpriteCommon(ResourceList.TIMER_PROGRESS_MIDDLE);
        this.timerProgress.x = 85;
        this.timerProgress.width = this.progressWidthMax;
        this.addChild(this.timerProgress);

        this.timerProgressCap = new SpriteCommon(ResourceList.TIMER_PROGRESS_RIGHT);
        this.addChild(this.timerProgressCap);

        this.timerOver = new SpriteCommon(ResourceList.TIMER_BASE);
        this.timerOver.alpha = 0.5;
        this.addChild(this.timerOver);

        this.arrow = new SpriteCommon(ResourceList.TIMER_PROGRESS_ARROW);
        this.arrow.x = 48;
        this.arrow.y = 47;
        this.arrow.anchor.set(0.15, 0.5);

        this.addChild(this.arrow);

        this.displayProgress()
    }

    /**
     * @access public
     * @param {number} time 
     */
    setProgressByTime(time) {
        const { timeMax } = AppConfig.gameSettings;
        this.progress = time / timeMax;
    }

    get progress() {return this._progress;}

    set progress(value) {
        if (this._progress === value) return
        if (value > 1) this._progress = 1;
        if (value < 0) this._progress = 0;
        this._progress = value;
        this.displayProgress();

    }

    displayProgress() {
        this.timerProgress.width = this._progress * (this.progressWidthMax - this.progressWidthMin);
        this.timerProgressCap.x = this.timerProgress.x + this.timerProgress.width;
        this.arrow.rotation = Math.PI * 2 * this._progress;

    }


   setPercetageByTime(time) {
        const { timeMax } = AppConfig.gameSettings;
        this.progress = time / timeMax
    }

    

}

export default TimerProgressBar