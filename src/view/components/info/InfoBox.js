import * as PIXI from 'pixi.js'
import { Text } from 'pixi.js';
import { NineSlicePlane } from 'pixi.js';
import ResourceList from '../../../resources/ResourceList';
import ResourceService from '../../../resources/ResourceService';
import SpriteCommon from '../common/SpriteCommon';

class InfoBox extends PIXI.Container {
    constructor() {
        super();
        this.bg = new NineSlicePlane(ResourceService.getTexture(ResourceList.MSC_INFOBOX_BG), 19, 16, 16, 28);
        this.bg.height = 58;
        this.icon = new SpriteCommon(ResourceList.MSC_COIN);
        this.addChild(this.bg);
        this.addChild(this.icon);

        this.label = new Text('0', {
            fontFamily: 'LithosProBlack',
            fontSize: 48,
            fill: 0x000000,
            letterSpacing: -5,
            align: 'left'
        });
        this.addChild(this.label);
        // this.bg.scale.set(0.5, 0.5);
        this.scale.set(0.5, 0.5);
        this.bg.width = 500;
        this.icon.anchor.set(0.5, 0.5);
        this.icon.y = this.bg.height / 2;
        this.icon.x =  this.bg.height / 2;

        this.label.x = this.icon.x + this.icon.width  / 2 + this.icon.x;
        
    }

    /**
     * @access public
     * @param {number} value sets Scale with kkeping 9 cells corner not transformed
     */
    setComponentWidth(value) {
        this.bg.width = value;
    }
}

export default InfoBox