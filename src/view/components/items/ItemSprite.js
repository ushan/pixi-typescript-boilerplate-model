import * as PIXI from 'pixi.js';
import Pseudo3DSprite from "../common/Pseudo3DSprite";
import SpriteCommon from '../common/SpriteCommon';
import { AppConfig } from '../../../config';
import gsap from "gsap";
import ItemKind from '../../../model/items/ItemKind';
import GameModel from '../../../model/GameModel';
import GameScreen from '../../screens/GameScreen';
const { cartWidth } = AppConfig.gameSettings;
const { worldSize, conveyorWidth, zCartPosition} = AppConfig.settings3D;


class ItemSprite extends Pseudo3DSprite {
    /**
     * @param { ( -1| 0 | 1 ) } posInRow
     * @param { ItemKind } itemKind 
     * @param { GameModel } gameModel 
     * @param { GameScreen } gameScreen 
     */
    constructor(posInRow, itemKind, gameModel, gameScreen) {
        super(gameScreen, itemKind.resource);
        this.posInRow = posInRow;
        this.itemKind = itemKind;
        this.gameModel = gameModel;
        this.gameScreen = gameScreen;
        this.hasAchivedBorder = false;
        this.hasAchivedMagnetLine = true;
        this._axis3Dx = 0;
        this.xAxis = 0;
        //this.createShadow();
    }

    get axis3Dx() { return this._axis3Dx; }
    set axis3Dx(value) { this._axis3Dx = value; this.point3D.x = value; }


    updatePosByPoint3D() {
        super.updatePosByPoint3D();
        const zMagnetPosition = 12;
        if (this.gameModel.isMagnet && this.point3D.z < zMagnetPosition) {
        // if (this.gameModel.isMagnet && this.point3D.z < zMagnetPosition) {
            const distInMagnet = zMagnetPosition - this.point3D.z;
            const distOfMagnet = zMagnetPosition - zCartPosition;
            const f =   1 -  0.5 * (Math.pow (distInMagnet / distOfMagnet, 2));
            this.point3D._x = this._axis3Dx * f;
            
        }
        if (this.point3D.z < zCartPosition && !this.hasAchivedBorder) {
            // const isInCart = Math.abs(this.x - this.gameScreen.cart.x) < cartWidth;
            const isInCart = this.gameModel.cartLine === this.posInRow;
            const isSuccess = this.gameModel.registerAchiveBorder(this);
            
            this.hasAchivedBorder = true;
            // this.setByPosInLine();
            if (isSuccess) {
                this.listen3D = false;
                // this.gameScreen.moveToCart(this);
                // this.dispatchOutOfBounds();

                gsap.to(this, {
                    y: 300,
                    rotation: Math.PI / 4,
                    onComplete: () => { 
                        
                        this.gameScreen.moveToCart(this);
                        this.dispatchOutOfBounds();
                    },
                    ease: "power2.out",
                    duration: 0.3
                });
            }
            else {

                /*
                this.listen3D = false;
                gsap.to(this, {
                    x: 1000,
                    y: 200,
                    rotation: Math.PI / 4,
                    onComplete: () => { this.dispatchOutOfBounds(); },
                    ease: "power2.out",
                    duration: 0.9
                });
                */
            }
        }
    }



    // update3DPoseByPosInRow() {
        // this.point3D.x = this.get3DXByPosInRow(this.posInRow);
    // }

    /**
     * @access protected
     * @param { (-1 | 0 | 1 )} pos 
     * @returns { number }
     */
    get3DXByPosInRow(pos) {
        const f = 0.5 + pos * 0.35;
        return f * conveyorWidth * worldSize - worldSize * conveyorWidth / 2;
    }

    getAxis3DxByCartPos() {
        return this.get3DXByPosInRow(this.gameModel.posInRow);
    }

    createShadow() {
        this.shadow = new SpriteCommon(this.resourceName);
        this.addChildAt(this.shadow, 0);
        const colorMatrix = new PIXI.filters.BlurFilter();
        colorMatrix.blur = 100;
        this.shadow = new SpriteCommon(this.resourceName);
        this.shadow.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        this.shadow.filters = [colorMatrix];
        this.shadow.skew.set(1, 1);
        this.shadow.anchor.set(-1, -1);
    }
}
export default ItemSprite;
