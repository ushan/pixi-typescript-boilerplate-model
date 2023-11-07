import { Point } from "pixi.js";
import SpriteCommon from "../common/SpriteCommon";

class ClonedItemSprite extends SpriteCommon{
    constructor(
        readonly resourceName    :string,
        readonly  inCartPoint     :Point){
            super(resourceName);
    }
}

export default ClonedItemSprite