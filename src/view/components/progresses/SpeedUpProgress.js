import ResourceList from "../../../resources/ResourceList";
import ProgressBarWithIcon from "./ProgressBarWithIcon";

class SpeedUpProgress extends ProgressBarWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_EXTRA_SPEEDUP, 0xff4456, "linear", 0.01, 1);
        this.scale.set(0.5, 0.5);
        // this.setComponentWidth(200);

    }
}

export default SpeedUpProgress