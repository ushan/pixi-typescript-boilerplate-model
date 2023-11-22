import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import StartButton from './StartButton';

class Countdown extends PIXI.Container {
    constructor() {
        super();

        this.startButton = new StartButton();
        // this.startButton.anchor
        this.addChild(this.startButton);

        // Create PIXI.Text objects for each countdown number
        this.text3 = new PIXI.Text('3', { fontSize: 148, fill: 0xFFFFFF });
        this.text2 = new PIXI.Text('2', { fontSize: 148, fill: 0xFFFFFF });
        this.text1 = new PIXI.Text('1', { fontSize: 148, fill: 0xFFFFFF });

        // Add text objects to the container
        this.addChild(this.text3, this.text2, this.text1);

        // Initial setup
        this.text2.visible = false;
        this.text1.visible = false;

        // Center the text objects within the container
        this.text3.anchor.set(0.5);
        this.text2.anchor.set(0.5);
        this.text1.anchor.set(0.5);

        // Position the text objects
        this.text3.position.set(0, 0);
        this.text2.position.set(0, 0);
        this.text1.position.set(0, 0);
    }

    startCountdown() {
        // GSAP animation sequence
        gsap.timeline()
          .to(this.text3, { alpha: 0, duration: 1, delay: 0 })
          .to(this.text2, { alpha: 1, duration: 1, onStart: () => this.text2.visible = true })
          .to(this.text2, { alpha: 0, duration: 1, delay: 1 })
          .to(this.text1, { alpha: 1, duration: 1, onStart: () => this.text1.visible = true })
          .to(this.text1, { alpha: 0, duration: 1, delay: 1 })
          .call(() => {
            this.emit('countdownComplete');
            this.visible = false;
        }); // Emit an event when countdown is complete
      }

}

export default Countdown