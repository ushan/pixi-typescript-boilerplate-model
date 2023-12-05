import * as PIXI from 'pixi.js';
import GameModel from '../../model/GameModel';
import { AppConfig } from '../../config/AppConfig';
import ResourceList from '../../resources/ResourceList';
import SpriteCommon from './common/SpriteCommon';

const { gameWidth, gameHeight } = AppConfig.settings;
const { conveyorWidth} = AppConfig.settings3D;

class KeyPad extends PIXI.Container {
    /**
     * @param {GameModel} gameModel 
     */
    constructor(gameModel){
        super();
        this.eventMode = 'dynamic';
        this.gameModel = gameModel;
        this.leftBox = this.createBox(-1);
        this.centerBox = this.createBox(0);
        this.rightBox = this.createBox(1);
        //this.addArrowButtons();

        this.onResize = () => {
            //this.redrawBG();
            this.updateAreaPos();
        }
        AppConfig.sizeUpdated.add(this.onResize);
        this.onResize();
    }

    /**
     * @access private
     * @param {(1- | 0 | 1)} posInRow 
     * @returns {Graphics}
     */
    createBox(posInRow){
        const { gameWidth, gameHeight } = AppConfig.settings;

        const box = new PIXI.Graphics();
        box.eventMode = 'dynamic';
        box.beginFill(0x00ff0);
        const w = 0.9 * gameWidth / 3
        //box.drawRect( - w /2 , - 150, w, 150);
        box.drawRect( - 50, -50, 100, 100);
        box.cursor = "pointer";
        box.alpha = 0.3;
        // this.setToPosition(box, posInRow);
        this.addChild(box);
        box.on('pointerdown', () => {
            this.gameModel.registerSetCartPos(posInRow);
        });
        return box
    }

    updateAreaPos() {
        this.setToPosition(this.leftBox, -1);
        this.setToPosition(this.centerBox, 0);
        this.setToPosition(this.rightBox, 1); 
    }

    /**
     * @access private
     * @param {PIXI.Graphics} element 
     * @param {(- 1 | 0 | 1)} posInRow 
     */
    setToPosition (element, posInRow) {
        const { gameWidth, gameHeight } = AppConfig.settings;

        const f = 0.35 * posInRow;
        const conveyorWidth = gameWidth * 1;
        element.width = conveyorWidth / 3;
        element.height = 200;
        element.x = gameWidth / 2   + conveyorWidth * f;
        //margin like x
        
        element.y = gameHeight - element.height / 2;

    };

    addArrowButtons() {
        this.controlsCont = new PIXI.Container();
        this.keyLeft = new SpriteCommon(ResourceList.KEY_LEFT);
        this.keyLeft.cursor = "pointer";
        this.keyLeft.on('pointerdown', () => {
            this.gameModel.registerMoveCart(true);
        });
        this.keyLeft.anchor.set(1, 0.5);
        this.keyLeft.alpha = 0.6;
        this.keyLeft.x = - 50;

        this.keyRight = new SpriteCommon(ResourceList.KEY_RIGHT);
        this.keyRight.on('pointerdown', () => {
            this.gameModel.registerMoveCart(false);
        });
        
        this.keyRight.cursor = "pointer";
        this.keyRight.alpha = 0.6;
        this.keyRight.anchor.set(0, 0.5);
        this.keyRight.x = 50;

        this.controlsCont.addChild(this.keyLeft);
        this.controlsCont.addChild(this.keyRight);
        this.addChild(this.controlsCont);
        this.controlsCont.y = gameHeight - 60;
        this.controlsCont.x = gameWidth / 2;
    }
}
export default KeyPad