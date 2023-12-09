import ProgressBarCapsule from "./ProgressBarCapsule";
import gsap from "gsap";

class ProgressBarElastic extends ProgressBarCapsule {
    /**
     * 
     * @param {number} progressColor - The color of the progress bar
     * @param {("elastic" | "linear" | "none")} easeType - The type of animation changing the progress bar
     * @param {number} minimalAnimatedStep - The minimal difference of value when the progress is animated
     * @param {number} animDuration - The duration of animation
     */
    constructor(progressColor, animType, minimalAnimatedStep, animDuration = 1) {
        super(progressColor);
        this.animType = animType;
        this.minimalAnimatedStep = minimalAnimatedStep;
        this.ease = "none";
        this.animDuration = animDuration;

        switch (animType) {
            case "elastic":
                this.ease = "elastic.out(1,0.2)";
            break;
            case "linear":
                this.ease = "none";
            break;
            case "none":
                this.ease = "none";
            break;
            default:
                this.ease = "none";

        }

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
     * @param {number} value - this param we need for dispalying animated changing of progress time. If 
     * @returns {}
     */
    set progress(value) {
        if (this._progress === value) return
        if (value > 1) this._progress = 1;
        if (value < 0) this._progress = 0;
        

        if (Math.abs(value - this._progress) < 0.05) {
            this.visualProgress = value;
        } else {
            if (this.animType !== "none"){
                this.gsapAnimation = gsap.to(this, {
                    visualProgress: value,
                    ease: this.ease,
                    duration: this.animDuration
                });
            } else {
                this.visualProgress = value;
            }

        }
        this._progress = value;
        // this.drawComponent();

    }

    clearAnimation() {
        if (this.gsapAnimation) this.gsapAnimation.kill();
    }

}

export default ProgressBarElastic