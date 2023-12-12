import * as PIXI from 'pixi.js';
import ProgressBar from '../ProgressBar';
import TimeLeftProgressBar from '../progresses/TimeLeftProgressBar';
import MagnetProgress from '../progresses/MagnetProgress';
import SpeedUpProgress from '../progresses/SpeedUpProgress';
import { AppConfig } from '../../../config/AppConfig';
import EItemsID from '../../../model/EItemsID';
import ScoreInfo from './ScoreInfo';
import gsap from "gsap";
import SpriteCommon from '../common/SpriteCommon';
import ResourceList from '../../../resources/ResourceList';

class PanelInfo extends PIXI.Container {
    constructor(gameModel, gameScreen) {
        super();
        this._magnetIsOn = false;
        this._speedUpIsOn = false;
        this.gameModel = gameModel;
        this.gameScreen = gameScreen;
        this.topBanner = new SpriteCommon(ResourceList.MSC_TOP_BANNER);
        this.topBannerAd = new SpriteCommon(ResourceList.MSC_TOP_BANNER_AD_1);
        // this.progressBar = new ProgressBar(120, 4);
        // this.timerProgressBar = new TimerProgressBar();
        this.timeLeftProgressBar = new TimeLeftProgressBar();
        this.magnetProgress = new MagnetProgress();
        this.speedUpProgress = new SpeedUpProgress();
        this.scoreInfo = new ScoreInfo();
        this.btnMuteCont = new PIXI.Container();
        this.btnMute = new SpriteCommon(ResourceList.MSC_BTN_MUTE);
        this.btnUnMute = new SpriteCommon(ResourceList.MSC_BTN_UNMUTE);
        this.btnClose = new SpriteCommon(ResourceList.MSC_BTN_CLOSE);

        

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
            this.topBanner.x = gameWidth / 2;
            this.topBannerAd.x = gameWidth / 2;
            this.topBannerAd.y = 115;
            this.timeLeftProgressBar.setComponentWidth(gameWidth / 2);

            this.btnClose.x = gameWidth - this.btnClose.width + 5;
            this.btnMuteCont.x = gameWidth - this.btnMute.width + 5;

            this.scoreInfo.setComponentWidth(gameWidth * 0.5);
            this.scoreInfo.x = this.btnClose.x - this.btnClose.width - 10 - this.scoreInfo.width;

            this.scoreInfo.setComponentWidth(gameWidth * 0.3);



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

        this.addButtons();
 
    }

    addChildren() {
        const { gameWidth, gameHeight  } = AppConfig.settings;
        this.addChild(this.topBanner);
        this.topBanner.anchor.set(0.5, 0);

        this.addChild(this.topBannerAd);
        this.topBannerAd.anchor.set(0.5, 0.5);

        const pad = 5;

        this.addChild(this.timeLeftProgressBar);
        this.addChild(this.magnetProgress);
        this.addChild(this.speedUpProgress);
        this.addChild(this.scoreInfo);
        this.magnetProgress.progress = 0;

        this.timeLeftProgressBar.x = 50;
        this.timeLeftProgressBar.y = 0;

        // this.scoreInfo.width = 150;
        this.scoreInfo.x = gameWidth - this.scoreInfo.width - 100;
        // this.scoreInfo.x = this.timeLeftProgressBar.x + this.timeLeftProgressBar.width + pad;

        this.speedUpProgress.x = this.timeLeftProgressBar.x - 20;
        this.speedUpProgress.y = this.timeLeftProgressBar.y + this.timeLeftProgressBar.height + pad - 5;

        this.magnetProgress.x = this.speedUpProgress.x;
        this.magnetProgress.y = this.speedUpProgress.y + this.speedUpProgress.height + pad;

        this.initPwerUpVision();
    }

    addButtons() {
        this.addChild(this.btnClose);
        this.addChild(this.btnMuteCont);
        this.btnMuteCont.addChild(this.btnMute);
        this.btnMuteCont.addChild(this.btnUnMute);

        this.btnClose.anchor.set(1, 0);
        this.btnMute.anchor.set(1, 0);
        this.btnUnMute.anchor.set(1, 0);
        this.btnUnMute.alpha = 0.5;

        this.btnClose.y = this.scoreInfo.y;
        this.btnMuteCont.y = this.btnClose.y + this.btnClose.height + 10;

        this.btnClose.eventMode = "dynamic";
        this.btnMuteCont.eventMode = "dynamic";

        this.btnClose.cursor = "pointer";
        this.btnMuteCont.cursor = "pointer";


         this.btnClose.on('pointerdown', () => {
            console.log("close app");
        }); 
        
        this.btnMuteCont.on('pointerdown', () => {
            this.gameScreen.soundManager.isSoundOn = !this.gameScreen.soundManager.isSoundOn;
            this.switchBtnMuteStatus();
        });

    }

    switchBtnMuteStatus(isSoundOn) {
        if (this.gameScreen.soundManager.isSoundOn) {
            this.btnMute.visible = true;
            this.btnUnMute.visible = false;
        } else {
            this.btnMute.visible = false;
            this.btnUnMute.visible = true;
        }
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