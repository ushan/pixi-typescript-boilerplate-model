import * as PIXI from 'pixi.js';

class StartButton extends PIXI.Sprite {
  constructor() {
    super();

    // this.anchor.set (0.5, 0.5);

    this.cursor = "pointer";
    this.eventMode = "dynamic";

    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0x33cc33); // Green color
    this.bg.drawRoundedRect(0, 0, 150, 70, 10);
    this.bg.endFill();

    this.buttonLabel = new PIXI.Text('Start', { fontSize: 40  , fill: 0xFFFFFF });

    this.addChild(this.bg, this.buttonLabel);

    this.bg.position.set( - this.bg.width / 2,  - this.bg.height / 2);
    this.buttonLabel.position.set( - this.buttonLabel.width / 2,  - this.buttonLabel.height / 2);

    this.buttonMode = true;

    this.on('pointerdown', this.onButtonDown.bind(this));
    this.on('pointerup', this.onButtonUp.bind(this));
    this.on('pointerout', this.onButtonUp.bind(this));
  }

  onButtonDown() {
      this.emit('startButtonClick');
  }

  onButtonUp() {
    this.bg.tint = 0x33cc33;

  }
}

export default StartButton
