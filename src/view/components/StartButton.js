import * as PIXI from 'pixi.js';

class StartButton extends PIXI.Sprite {
  constructor() {
    super();

    // this.anchor.set (0.5, 0.5);

    this.cursor = "pointer";
    // this.eventMode = "dynamic";

    // Create a PIXI.Graphics object for the button background
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0x33cc33); // Green color
    this.bg.drawRoundedRect(0, 0, 150, 70, 10);
    this.bg.endFill();



    // Create a PIXI.Text object for the button label
    this.buttonLabel = new PIXI.Text('Start', { fontSize: 40  , fill: 0xFFFFFF });

    // Add objects to the container
    this.addChild(this.bg, this.buttonLabel);

    this.bg.position.set( - this.bg.width / 2,  - this.bg.height / 2);
    this.buttonLabel.position.set( - this.buttonLabel.width / 2,  - this.buttonLabel.height / 2);



    this.interactive = true;
    this.buttonMode = true;

    this.on('pointerdown', this.onButtonDown.bind(this));
    this.on('pointerup', this.onButtonUp.bind(this));
    this.on('pointerout', this.onButtonUp.bind(this));
  }

  onButtonDown() {
      this.bg.tint = 0x66ff66; // Lighter green color
      this.emit('startButtonClick');
  }

  onButtonUp() {
    this.bg.tint = 0x33cc33; // Original green color

  }
}

export default StartButton

/*
// Usage
const app = new PIXI.Application();
document.body.appendChild(app.view);

const countdown = new CountdownText();
countdown.position.set(app.screen.width / 2, app.screen.height / 2);
app.stage.addChild(countdown);

const startButton = new StartButton();
startButton.position.set(app.screen.width / 2, app.screen.height / 2 + 60);
app.stage.addChild(startButton);

// Listen for the start button click event
startButton.on('startButtonClick', () => {
  countdown.startCountdown();
});
*/
