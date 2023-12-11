import ResourceList from "../../../resources/ResourceList";
import SpriteCommon from "../common/SpriteCommon";
import ProgressBarWithIcon from "./ProgressBarWithIcon";

class TimeLeftProgressBar extends ProgressBarWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_TIMER, 0xf0bd0f, "elastic", 0.05, 1);
        this.arrow = new SpriteCommon(ResourceList.TIMER_PROGRESS_ARROW);
        this.scale.set(0.5, 0.5);
        const center = this.getIconCeter();
        this.arrow.x = center.x
        this.arrow.y = center.y;
        // this.arrow.anchor.set(0.15, 0.5);
        const xAnchor =  - this.iconHolder.x
        // this.anchor.set(-0.45, 0);
        this.addChild(this.arrow);
    }

    drawProgress() {
        super.drawProgress();
        if (this.arrow) this.arrow.rotation = Math.PI * 2 * this._visualProgress;
    }
}

export default TimeLeftProgressBar