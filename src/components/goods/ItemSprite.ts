import ItemModel from "../../model/goods/ItemModel";
import Pseudo3DSprite from "../common/Pseudo3DSprite";

class ItemSprite extends Pseudo3DSprite {
    constructor(readonly itemModel :ItemModel) {
        super(itemModel.resource);
    }



}
