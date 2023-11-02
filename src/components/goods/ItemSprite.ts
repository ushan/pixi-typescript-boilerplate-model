import * as PIXI from 'pixi.js';
import { Sprite } from "pixi.js";
import ItemModel from "../../model/goods/ItemModel";
import Pseudo3DSprite from "../common/Pseudo3DSprite";
import SpriteCommon from '../common/SpriteCommon';

class ItemSprite extends Pseudo3DSprite {
    private shadow?:SpriteCommon;
    constructor(readonly itemModel :ItemModel) {
        super(itemModel.resource);
        //this.createShadow();
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
