import ProgressBarCapsule from "./ProgressBarCapsule";
import gsap from "gsap";

class ProgressBarElastic extends ProgressBarCapsule {
    constructor() {
        super();
        this._progress = 0;
    }

    /**
     * @access public
     * @param {number} value
     * @returns {number}
     */
    get progress() {return this._progress;}

    /**
     * @access public
     * @param {number} value
     * @returns {}
     */
    set progress(value) {
        if (this._progress === value) return
        if (value > 1) this._progress = 1;
        if (value < 0) this._progress = 0;
        

        if (Math.abs(value - this._progress) < 0.05) {
            this.visualProgress = value;
        } else {
            gsap.to(this, {
                visualProgress: value,
                ease: "elastic.out(1,0.2)",
                duration: 1
            });
        }
        this._progress = value;
        // this.drawComponent();

    }

}

export default ProgressBarElastic