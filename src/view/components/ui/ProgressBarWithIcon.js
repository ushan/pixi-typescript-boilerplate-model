import ResourceList from "../../../resources/ResourceList";
import SpriteCommon from "../common/SpriteCommon";
import ProgressBarElastic from "./ProgressBarElastic";

class ProgressBarWithIcon extends ProgressBarElastic{
    constructor(){
        super();
        this.iconHolder = new SpriteCommon(ResourceList.PRGS_DISK_TIMER);
        const disckOverMargin = this.getDiskOverMargin(this.iconHolder.height / 2, this.bg.height);
        this.iconHolder.alpha = 1;
        this.iconHolder.y =  - (this.iconHolder.height - this.bg.height) / 2;
        this.iconHolder.x =  - (this.iconHolder.width) + disckOverMargin;
        this.addChild(this.iconHolder);

    }

    /**
     * @access private
     * @param {number} r 
     * @param {number} a 
     * @returns {number}
     */
    getDiskOverMargin(r, barHeight) {
        return r - Math.sqrt(r**2 - (barHeight / 2)**2);
    }
}

export default ProgressBarWithIcon