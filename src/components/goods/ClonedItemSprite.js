import SpriteCommon from "../common/SpriteCommon";
class ClonedItemSprite extends SpriteCommon {
    constructor(resourceName, inCartPoint) {
        super(resourceName);
        this.resourceName = resourceName;
        this.inCartPoint = inCartPoint;
    }
}
export default ClonedItemSprite;
