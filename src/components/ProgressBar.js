import * as PIXI from 'pixi.js';

class ProgressBar extends PIXI.Container {
    constructor(w = 60, h = 5, color = 0xaf2424) {
        super();
        this.w = w;
        this.h = h;
        this.color = color;
        this.bg = new PIXI.Graphics();
        this.bar = new PIXI.Graphics();
        this._progress = 0;
        // Drawing the background
        this.bg.beginFill(0xffffff);
        this.bg.lineStyle(1, 0xffffff);
        this.bg.drawRect(0, 0, this.w, this.h);
        this.bg.endFill();
        this.addChild(this.bg);
        this.addChild(this.bar);
    }

    clear() {
        this.bar.clear();
    }

    drawProgress(value) {
        this.clear();
        this.bar.beginFill(this.color);
        let limitedValue = value;
        if (value > 1)
            limitedValue = 1;
        if (value < 0)
            limitedValue = 0;
        this.bar.drawRect(1, 1, (this.w * limitedValue) - 2, this.h - 2);
    }

    get progress() {
        return this._progress;
    }

    set progress(value) {
        this._progress = value;
        if (value > 0) {
            this.drawProgress(value);
        } else {
            this.bar.clear();
        }
    }

}

export default ProgressBar;
