import * as PIXI from 'pixi.js';

class StartButton extends PIXI.Container {
  constructor() {
    super();

    // Create a PIXI.Graphics object for the button background
    this.buttonBackground = new PIXI.Graphics();
    this.buttonBackground.beginFill(0x33cc33); // Green color
    this.buttonBackground.drawRect(0, 0, 100, 50);
    this.buttonBackground.endFill();

    // Create a PIXI.Text object for the button label
    this.buttonLabel = new PIXI.Text('Start', { fontSize: 20, fill: 0xFFFFFF });

    // Add objects to the container
    this.addChild(this.buttonBackground, this.buttonLabel);

    // Center the button elements
    this.buttonBackground.position.set(-50, -25);
    this.buttonLabel.position.set(0.5, 0.5);

    // Enable interactive mode and button events
    this.buttonBackground.interactive = true;
    this.buttonBackground.buttonMode = true;

    // Add event listeners
    this.buttonBackground.on('pointerdown', this.onButtonDown.bind(this));
    this.buttonBackground.on('pointerup', this.onButtonUp.bind(this));
    this.buttonBackground.on('pointerout', this.onButtonUp.bind(this));
  }

  onButtonDown() {
    // Adjust the button appearance when pressed
    this.buttonBackground.tint = 0x66ff66; // Lighter green color
  }

  onButtonUp() {
    // Reset the button appearance when released or pointer leaves
    this.buttonBackground.tint = 0x33cc33; // Original green color

    // Emit a custom event when the button is clicked
    this.emit('startButtonClick');
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
