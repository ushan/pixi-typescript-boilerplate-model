import ResourceList from "../../../resources/ResourceList";
import ProgressBarWithIcon from "./ProgressBarWithIcon";

class SpeedUpProgress extends ProgressBarWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_EXTRA_SPEEDUP, 0xff4456);
        this.scale.set(0.5, 0.5);

    }
}

export default SpeedUpProgress