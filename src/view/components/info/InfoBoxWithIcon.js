import ResourceList from "../../../resources/ResourceList";
import SpriteCommon from "../common/SpriteCommon";
import InfoBox from "./InfoBox";

class InfoBoxWithIcon extends InfoBox {
    constructor(iconTextureID) {
        super();

        this.iconHolder = new SpriteCommon(iconTextureID);

        if (this.iconHolder.width < this.bg.height) {
            this.iconHolder.anchor.set(0.5, 0.5);
            this.iconHolder.y = this.bg.height / 2;
            this.iconHolder.x =  this.bg.height / 2; 
        } else {
            this.iconHolder = new SpriteCommon(iconTextureID);
            const disckOverMargin = this.getDiskOverMargin(this.iconHolder.height / 2, this.bg.height);
            this.iconHolder.alpha = 1;
            this.iconHolder.y =  - (this.iconHolder.height - this.bg.height) / 2;
            this.iconHolder.x =  - (this.iconHolder.width) + disckOverMargin + this.cornerRadius;
        }

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

    /**
     * @access public
     * @returns {x:number, y:number}
     */
    getIconCeter() {
        return {x: this.iconHolder.x + this.iconHolder.width / 2, y:this.bg.height / 2}
    }

    /**
     * @access public
     * @returns {x:number, y:number}
     */
    getIconOverhang() {
        return  this.iconHolder.x * this.scale.x;
    }

    /**
     * @access public
     */
    resizeLabel() {
        if (this.label) this.label.x = this.bg.width - this.label.width - 10;
    }

}

export default InfoBoxWithIcon