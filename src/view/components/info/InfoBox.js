import * as PIXI from 'pixi.js'
import { Text } from 'pixi.js';
import { NineSlicePlane } from 'pixi.js';
import ResourceList from '../../../resources/ResourceList';
import ResourceService from '../../../resources/ResourceService';
import SpriteCommon from '../common/SpriteCommon';

class InfoBox extends PIXI.Container {
    constructor() {
        super();
        this.cornerRadius = 16;
        this.bg = new NineSlicePlane(ResourceService.getTexture(ResourceList.MSC_INFOBOX_BG), 
                                        19, this.cornerRadius, this.cornerRadius, 28);
        this.bg.height = 58;
        this.addChild(this.bg);

        this.label = new Text('0', {
            fontFamily: 'LithosProBlack',
            fontSize: 48,
            fill: 0x000000,
            letterSpacing: -5,
            align: 'right'
        });
        this.addChild(this.label);
        // this.bg.scale.set(0.5, 0.5);
        this.scale.set(0.5, 0.5);
        // this.bg.width = 500;


        this.label.x = this.bg.width;
        
    }

    /**
     * @access public
     * @param {number} value sets Scale with keeping 9 cells corner not transformed
     */
    setComponentWidth(value) {
        this.bg.width = value;
    }
}

export default InfoBox