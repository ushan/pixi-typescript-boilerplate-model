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
    }

    /**
     * @access private
     * @param {(1- | 0 | 1)} posInRow 
     * @returns {Graphics}
     */
    createBox(posInRow){
        const box = new PIXI.Graphics();
        box.eventMode = 'dynamic';
        box.beginFill(0x00ff0);
        const w = 0.9 * gameWidth / 3
        box.drawRect( - w /2 , - 150, w, 150);
        box.cursor = "pointer";
        box.alpha = 0.07;
        this.setToPosition(box, posInRow);
        this.addChild(box);
        box.on('pointerdown', () => {
            this.gameModel.registerSetCartPos(posInRow);
        });
        return box
    }

    /**
     * @access private
     * @param {PIXI.Graphics} element 
     * @param {(1- | 0 | 1)} posInRow 
     */
    setToPosition (element, posInRow) {
        const f = 0.65 * posInRow;
        const conveyorWidth = gameWidth * 0.5;
        element.x = gameWidth / 2   + conveyorWidth * f;
        //margin like x
        
        element.y = gameHeight - 15;

    };

    addArrowButtons() {
        this.controlsCont = new PIXI.Container();
        this.keyLeft = new SpriteCommon(ResourceList.KEY_LEFT);
        this.keyLeft.cursor = "pointer";
        this.keyLeft.on('pointerdown', () => {
            // this.cart.x -= 50;
            // this.cartOver.x = this.cart.x;
            this.gameModel.registerMoveCart(true);
        });
        this.keyLeft.anchor.set(1, 0.5);
        this.keyLeft.alpha = 0.6;
        this.keyLeft.x = - 50;

        this.keyRight = new SpriteCommon(ResourceList.KEY_RIGHT);
        this.keyRight.on('pointerdown', () => {
            // this.cart.x += 50;
            // this.cartOver.x = this.cart.x;
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