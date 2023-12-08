import ResourceList from "../../../resources/ResourceList";
import ProgressBarWithIcon from "./ProgressBarWithIcon";

class SpeedUpProgress extends ProgressBarWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_EXTRA_SPEEDUP, 0xff4456);

    }
}

export default SpeedUpProgress