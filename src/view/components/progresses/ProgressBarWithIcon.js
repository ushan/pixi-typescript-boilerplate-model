import ResourceList from "../../../resources/ResourceList";
import SpriteCommon from "../common/SpriteCommon";
import ProgressBarElastic from "./ProgressBarElastic";

class ProgressBarWithIcon extends ProgressBarElastic{
    constructor(iconTextureID, progressColor, animType, minimalAnimatedStep, animDuration){
        super(progressColor, animType, minimalAnimatedStep, animDuration);
        this.iconHolder = new SpriteCommon(iconTextureID);
        const disckOverMargin = this.getDiskOverMargin(this.iconHolder.height / 2, this.bg.height);
        this.iconHolder.alpha = 1;
        this.iconHolder.y =  - (this.iconHolder.height - this.bg.height) / 2;
        this.iconHolder.x =  - (this.iconHolder.width) + disckOverMargin;
        this.addChild(this.iconHolder);
        

    }


    setTopLeft(topX, topY) {

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

    /**
     * @access public
     * @returns {x:number, y:number}
     */
    getIconCeter() {
        return {x: this.iconHolder.x + this.iconHolder.width / 2, y:this.bg.height / 2}
    }
}

export default ProgressBarWithIcon