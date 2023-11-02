import * as PIXI from 'pixi.js';

class ProgressBar extends PIXI.Container {
  private bg  :PIXI.Graphics = new PIXI.Graphics();
  private bar :PIXI.Graphics = new PIXI.Graphics();
  private _progress:number = 0;
  
  constructor(
    private w = 60,
    private h = 5,
    private color = 0xff0000,
  ) {
    super();
    // this.options = options;

    // Drawing the background

    this.bg.beginFill(0xffffff);
    this.bg.lineStyle(1, 0xffffff);
    this.bg.drawRect(0, 0, this.w, this.h);
    this.bg.endFill();
    this.addChild(this.bg);

    // Preparing the progress bar filling
    this.addChild(this.bar);

  }

  clear() {
    this.bar.clear();
  }

  drawProgress(value:number) {
    this.clear();
    this.bar.beginFill(this.color);
    let limitedValue = value;
    if (value > 1) limitedValue = 1;
    if (value < 0) limitedValue = 0;
    
    this.bar.drawRect(1, 1, (this.w * limitedValue) - 2, this.h - 2);
  }

  set progress(value:number) {

    this._progress = value;

    if (value > 0) {
      this.drawProgress(value);
      this.alpha = 1;
    } else {
      this.alpha = 0;
      this.bar.clear();
    }
  }

  get progress() {
    return this._progress;
  }
}

export default ProgressBar;
