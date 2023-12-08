import ResourceList from "../../../resources/ResourceList";
import SpriteCommon from "../common/SpriteCommon";
import ProgressBarWithIcon from "./ProgressBarWithIcon";

class TimeLeftProgressBar extends ProgressBarWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_TIMER, 0xf0bd0f);
        this.arrow = new SpriteCommon(ResourceList.TIMER_PROGRESS_ARROW);
        const center = this.getIconCeter();
        this.arrow.x = center.x
        this.arrow.y = center.y;
        this.arrow.anchor.set(0.15, 0.5);
        this.addChild(this.arrow);
    }

    drawProgress() {
        super.drawProgress();
        if (this.arrow) this.arrow.rotation = Math.PI * 2 * this._visualProgress;
    }
}

export default TimeLeftProgressBar