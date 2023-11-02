import * as PIXI from 'pixi.js';
import ItemModel from "../../model/goods/ItemModel";
import Pseudo3DSprite from "../common/Pseudo3DSprite";

class ItemSprite extends Pseudo3DSprite {
    constructor(readonly itemModel :ItemModel) {
        super(itemModel.resource);
        this.createShadow();
    }

    private createShadow():void{
        // PIXI.filters
        const blurFilter1 = new PIXI.filters.BlurFilter();
        blurFilter1.blur = 3;
        this.filters = [blurFilter1];
    }
}

export default ItemSprite
