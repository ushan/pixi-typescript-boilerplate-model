import * as PIXI from 'pixi.js';
import ResourceService from "../../resources/ResourceService";

class SpriteCommon extends PIXI.Sprite {
    public defaultX: number = 0;
    public defaultY: number = 0;

    constructor(protected resourceName: string) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this.texture = ResourceService.getTexture(resourceName);
    }
}

export default SpriteCommon;