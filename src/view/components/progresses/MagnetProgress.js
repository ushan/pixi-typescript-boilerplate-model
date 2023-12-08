import ResourceList from "../../../resources/ResourceList";
import ProgressBarWithIcon from "./ProgressBarWithIcon";

class MagnetProgress extends ProgressBarWithIcon {
    constructor() {
        super(ResourceList.PRGS_DISK_EXTRA_MAGNET, 0xf16617);
    }
}

export default MagnetProgress