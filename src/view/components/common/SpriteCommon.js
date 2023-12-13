import * as PIXI from 'pixi.js';
import ResourceService from "../../../resources/ResourceService";

class SpriteCommon extends PIXI.Sprite {
    constructor(resourceName) {
        super();
        this.resourceName = resourceName;
        this.defaultX = 0;
        this.defaultY = 0;
        this.emitterDisplaceX = 0;
        this.emitterDisplaceY = 0;
        this.eventMode = 'dynamic';
        this.texture = ResourceService.getTexture(resourceName);
    }
}

export default SpriteCommon;
