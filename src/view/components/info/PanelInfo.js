import * as PIXI from 'pixi.js';
import ProgressBar from '../ProgressBar';
import TimeLeftProgressBar from '../progresses/TimeLeftProgressBar';
import MagnetProgress from '../progresses/MagnetProgress';
import SpeedUpProgress from '../progresses/SpeedUpProgress';
import { AppConfig } from '../../../config/AppConfig';
import EItemsID from '../../../model/EItemsID';
import ScoreInfo from './ScoreInfo';

class PanelInfo extends PIXI.Container {
    constructor(gameModel) {
        super();
        this.gameModel = gameModel;
        this.progressBar = new ProgressBar(120, 4);
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
                if (isOn) {
                    this.speedUpProgress.alpha = 1;
                    this.speedUpProgress.visualProgress = 1;
                } else {
                    this.speedUpProgress.alpha = 0.6;
                    
                }
            }
            if (extraID === EItemsID.MAGNET){
                if (isOn) {
                    this.magnetProgress.alpha = 1;
                    this.magnetProgress.visualProgress = 1;
                } else {
                    this.magnetProgress.alpha = 0.6;
                    this.magnetProgress.visualProgress = 0;
                }
            }
        };

        this.onResize = (item) => {
            const { gameWidth, gameHeight } = AppConfig.settings;
            this.timeLeftProgressBar.setComponentWidth(gameWidth / 2);

        };


        this.gameModel.scoreUpdated.add(this.updateScores);
        this.gameModel.timeLeftUpdated.add(this.updateTimeLeft);
        this.gameModel.extraCoutch.add(this.onExtraCoutch);
        this.gameModel.extraStatusUpdated.add(this.onExtraStatusUpdated);

        AppConfig.sizeUpdated.add(this.onResize);

        this.addChildren();

        this.updateExtras();

        this.updateTimeLeft();

        // this.onResize();

 
    }

    addChildren() {
        const { gameWidth, gameHeight  } = AppConfig.settings;

        this.addChild(this.timeLeftProgressBar);
        this.addChild(this.magnetProgress);
        this.addChild(this.speedUpProgress);
        this.addChild(this.scoreInfo);
        this.magnetProgress.progress = 0;

        this.timeLeftProgressBar.x = 0;
        this.timeLeftProgressBar.y = 0;

        // this.scoreInfo.width = 150;
        // this.scoreInfo = gameWidth - this.scoreInfo.width - 20;
        this.scoreInfo.x = 200;

        this.magnetProgress.x = 60;
        this.magnetProgress.y = 190;

        this.speedUpProgress.x = 60;
        this.speedUpProgress.y = 260;

        this.speedUpProgress.alpha = 0.6;
        this.magnetProgress.alpha = 0.6;
        // this.timeLeftText.x = gameWidth - 100;
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
}

export default PanelInfo