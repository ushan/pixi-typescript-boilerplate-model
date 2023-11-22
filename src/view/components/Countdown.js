import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import StartButton from './StartButton';
import { AppConfig } from '../../config';

const { gameWidth, gameHeight } = AppConfig.settings;

class Countdown extends PIXI.Container {
    constructor() {
        super();
        const STEP_TIME = 0.5;

        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x222222);
        this.bg.drawRect( - gameWidth / 2, - gameHeight / 2,  gameWidth, gameHeight);
        this.bg.endFill();
        this.bg.alpha = 0.5;
        this.addChild(this.bg);

        // Create PIXI.Text objects for each countdown number
        this.text3 = new PIXI.Text('3', { fontSize: 148, fill: 0xFFFFFF });
        this.text2 = new PIXI.Text('2', { fontSize: 148, fill: 0xFFFFFF });
        this.text1 = new PIXI.Text('1', { fontSize: 148, fill: 0xFFFFFF });

        this.startButton = new StartButton();
        // this.startButton.anchor.x = 0.5;
        this.addChild(this.startButton);

        this.startButton.on('click', () => {
            this.text3.alpha = 0;
            const duration = 0.25;
            gsap.timeline()
            .to(this.startButton, { alpha: 0, duration: duration, onStart: () => this.text3.visible = true })
            .to(this.text3, { alpha: 1, duration: duration, delay: duration })
            .call(() => {
                this.startButton.visible = false;
                this.startCountdown();
            }); 

          });

        // Add text objects to the container
        this.addChild(this.text3, this.text2, this.text1);

        // Initial setup
        this.text3.visible = false;
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
        const duration = 0.5;
        gsap.timeline()
          .to(this.text3, { alpha: 0, duration: duration, delay: 0 })
          .to(this.text2, { alpha: 1, duration: duration, onStart: () => this.text2.visible = true })
          .to(this.text2, { alpha: 0, duration: duration, delay: duration })
          .to(this.text1, { alpha: 1, duration: duration, onStart: () => this.text1.visible = true })
          .to(this.text1, { alpha: 0, duration: duration, delay: duration })
          .call(() => {
            this.emit('countdownComplete');
            this.visible = false;
        }); // Emit an event when countdown is complete
      }

}

export default Countdown