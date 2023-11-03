import * as PIXI from 'pixi.js';
import { Sprite } from "pixi.js";
import ItemModel from "../../model/goods/ItemModel";
import Pseudo3DSprite from "../common/Pseudo3DSprite";
import SpriteCommon from '../common/SpriteCommon';
import GameModel from '../../model/GameModel';
import GameScreen from '../../view/screens/GameScreen';
import { AppConfig } from '../../config';

const {cartWidth} = AppConfig.gameSettings;
class ItemSprite extends Pseudo3DSprite {
    protected hasAchivedBorder:boolean = false;
    private shadow?:SpriteCommon;
    constructor(
        readonly itemModel  :ItemModel,
        protected gameModel :GameModel,
        protected gameScreen:GameScreen
        ) {
        super(gameScreen, itemModel.resource);
        //this.createShadow();
    }

    protected override updatePosByPoint3D(){
        super.updatePosByPoint3D();
        if (this.point3D.z < 6 && !this.hasAchivedBorder){
            const isInCart:boolean = Math.abs(this.x - this.gameScreen.cart.x) < cartWidth;
            this.gameModel.registerAchiveBorder(this.itemModel, isInCart);
            this.hasAchivedBorder = true;
        }
    }

     private createShadow():void{
        this.shadow = new SpriteCommon(this.resourceName);
        this.addChildAt(this.shadow, 0);
        const colorMatrix = new PIXI.filters.BlurFilter();
        colorMatrix.blur = 100;
        this.shadow = new SpriteCommon(this.resourceName);
        this.shadow.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        this.shadow.filters = [colorMatrix];
        this.shadow.skew.set(1, 1);
        this.shadow.anchor.set(-1,-1);
    } 
}

export default ItemSprite
