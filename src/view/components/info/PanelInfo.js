import * as PIXI from 'pixi.js';
import ProgressBar from '../ProgressBar';
import TimeLeftProgressBar from '../progresses/TimeLeftProgressBar';
import MagnetProgress from '../progresses/MagnetProgress';
import SpeedUpProgress from '../progresses/SpeedUpProgress';
import { AppConfig } from '../../../config/AppConfig';
import EItemsID from '../../../model/EItemsID';
import ScoreInfo from './ScoreInfo';
import gsap from "gsap";

class PanelInfo extends PIXI.Container {
    constructor(gameModel) {
        super();
        this._magnetIsOn = false;
        this._speedUpIsOn = false;
        this.gameModel = gameModel;
        // this.progressBar = new ProgressBar(120, 4);
        // this.timerProgressBar = new TimerProgressBar();
        this.timeLeftProgressBar = new TimeLeftProgressBar();
        this.magnetProgress = new MagnetProgress();
        this.speedUpProgress = new SpeedUpProgress();
        this.scoreInfo = new ScoreInfo();

        

        this.updateScores = (item, scores) => {
            const { levelMaxScores } = AppConfig.gameSettings;
            this.scoreInfo.label.text = this.gameModel.scores;
        };

        this.updateTimeLeft = (item, timeIncrement) => {
            const { timeMax, magnetMaxDuration, speedUpDuration  } = AppConfig.gameSettings;
            this.timeLeftProgressBar.progress = this.gameModel.timeLeft / timeMax;
            this.timeLeftProgressBar.label.text = this.gameModel.timeLeft;
            this.timeLeftProgressBar.resizeLabel();
            this.magnetProgress.visualProgress = this.gameModel.magnetTimeLeftMS / magnetMaxDuration;
            this.speedUpProgress.visualProgress = this.gameModel.speedUpTimeLeftMS / speedUpDuration;

        };

        this.onGameStateUpdated = () => {
            if (this.gameModel.gameState === EGameStates.playing){

            } 
            if (this.gameModel.gameState === EGameStates.stop) {

            };
        };

        this.onExtraCoutch = (item) => {           

        };

        this.onExtraStatusUpdated = (extraID, isOn) => {           
            if (extraID === EItemsID.SPEED_UP){
                this.speedUpIsOn = isOn;
            }
            if (extraID === EItemsID.MAGNET){
                this.magnetIsOn = isOn
            }
        };

        

        this.onResize = (item) => {
            const { gameWidth, gameHeight } = AppConfig.settings;
            this.timeLeftProgressBar.setComponentWidth(gameWidth * 1);
            this.scoreInfo.setComponentWidth(gameWidth * 0.5);
            this.scoreInfo.x = gameWidth - this.scoreInfo.width - 26;

        };


        this.gameModel.scoreUpdated.add(this.updateScores);
        this.gameModel.timeLeftUpdated.add(this.updateTimeLeft);
        this.gameModel.extraCoutch.add(this.onExtraCoutch);
        this.gameModel.extraStatusUpdated.add(this.onExtraStatusUpdated);

        AppConfig.sizeUpdated.add(this.onResize);

        this.addChildren();

        this.updateExtras();

        this.updateTimeLeft();

        this.onResize();

 
    }

    addChildren() {
        const { gameWidth, gameHeight  } = AppConfig.settings;
        const pad = 5;

        this.addChild(this.timeLeftProgressBar);
        this.addChild(this.magnetProgress);
        this.addChild(this.speedUpProgress);
        this.addChild(this.scoreInfo);
        this.magnetProgress.progress = 0;

        this.timeLeftProgressBar.x = 50;
        this.timeLeftProgressBar.y = 0;

        // this.scoreInfo.width = 150;
        // this.scoreInfo = gameWidth - this.scoreInfo.width - 20;
        this.scoreInfo.x = this.timeLeftProgressBar.x + this.timeLeftProgressBar.width + pad;

        this.speedUpProgress.x = this.timeLeftProgressBar.x - 20;
        this.speedUpProgress.y = this.timeLeftProgressBar.y + this.timeLeftProgressBar.height + pad - 5;

        this.magnetProgress.x = this.speedUpProgress.x;
        this.magnetProgress.y = this.speedUpProgress.y + this.speedUpProgress.height + pad;

        this.initPwerUpVision();
    }

    updateExtras(item) {
        const { timeMax, magnetMaxDuration, speedUpDuration  } = AppConfig.gameSettings;
        if (this.gameModel.isMagnet) {
            this.magnetProgress.visualProgress = this.gameModel.magnetTimeLeftMS / magnetMaxDuration;
        }
        if (this.gameModel.speedUpFactor > 1) {
            this.speedUpProgress.visualProgress = this.gameModel.speedUpTimeLeftMS / speedUpDuration;
        }
    };

    get magnetIsOn() { return this._magnetIsOn; }
    set magnetIsOn(value) {
        if (value === this._magnetIsOn) return
        this._magnetIsOn = value;
        if (value) {
            this.magnetProgress.alpha = 0;
            this.magnetProgress.visible = true;
            this.magnetProgress.visualProgress = 1;
            gsap.to(this.magnetProgress, {
                alpha: 1,
                duration: 0.3
            });
        } else {
            gsap.to(this.magnetProgress, {
                alpha: 0,
                duration: 0.3,
                onComplete: () => this.magnetProgress.visible = false,
            });
        }
        
    }

    initPwerUpVision() {
        this.speedUpIsOn = false;
        this.magnetIsOn = false;
        this.magnetProgress.alpha = 0;
        this.magnetProgress.visualProgress = 1;
        this.speedUpProgress.alpha = 0;
        this.speedUpProgress.visualProgress = 1;
    }

    get speedUpIsOn() { return this._speedUpIsOn; }
    set speedUpIsOn(value) {
        if (value === this._speedUpIsOn) return
        this._speedUpIsOn = value; 
        if (value) {
            this.speedUpProgress.alpha = 0;
            this.speedUpProgress.visible = true;
            this.speedUpProgress.visualProgress = 1;
            gsap.to(this.speedUpProgress, {
                alpha: 1,
                duration: 0.3
            });
        } else {
            gsap.to(this.speedUpProgress, {
                alpha: 0,
                duration: 0.3,
                onComplete: () => this.speedUpProgress.visible = false,
            });
        }
    }
}

export default PanelInfo