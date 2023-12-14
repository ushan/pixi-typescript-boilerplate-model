import { Text } from 'pixi.js';
import ResourceList from "../../../resources/ResourceList";
import SpriteCommon from "../common/SpriteCommon";
import ProgressBarWithIcon from "../progresses/ProgressBarWithIcon";
import InfoBoxWithIcon from './InfoBoxWithIcon';

class TimeLeftInfoBox extends InfoBoxWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_TIMER, 0xf0bd0f, "elastic", 0.05, 1);
        this.arrow = new SpriteCommon(ResourceList.TIMER_PROGRESS_ARROW);
        // this.scale.set(0.5, 0.5);
        const center = this.getIconCeter();
        this.arrow.x = center.x
        this.arrow.y = center.y;
        this.arrow.anchor.set(0.15, 0.5);
        const xAnchor =  - this.iconHolder.x
        // this.anchor.set(-0.45, 0);
        this.addChild(this.arrow);

        this.resizeLabel();
    }

    drawProgress() {
        super.drawProgress();
        if (this.arrow) this.arrow.rotation = Math.PI * 2 * this._visualProgress;
    }

    /**
     * @access public
     * @param {number} value 
     * @returns {}
     */
    setComponentWidth(value){
        super.setComponentWidth(value);
        this.resizeLabel();

    }


}

export default TimeLeftInfoBox