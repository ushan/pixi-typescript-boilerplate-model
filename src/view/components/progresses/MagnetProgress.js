import ResourceList from "../../../resources/ResourceList";
import ProgressBarWithIcon from "./ProgressBarWithIcon";

class MagnetProgress extends ProgressBarWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_EXTRA_MAGNET, 0xf16617, "none", 0.01, 1);
        this.scale.set(0.5, 0.5);
        this.setComponentWidth(200);
    }
}

export default MagnetProgress