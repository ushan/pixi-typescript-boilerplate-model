import SpriteCommon from './SpriteCommon';
import Point3D from '../../model/pseudo3ds/Point3D';
import { AppConfig } from '../../config';
const { gameWidth, gameHeight } = AppConfig.settings;
const { focalLength, scaleZoom, horyzontPos } = AppConfig.settings3D;
const { itemsExtraScale } = AppConfig.gameSettings;
class Pseudo3DSprite extends SpriteCommon {
    constructor(gameScreen, resourceName) {
        super(resourceName);
        this.gameScreen = gameScreen;
        this.listen3D = true;
        // public onUpdate : () => void;
        this.point3D = new Point3D(() => this.updatePosByPoint3D());
    }

    updatePosByPoint3D() {
        if (!this.listen3D)
            return;
        const w = gameWidth;
        const h = gameHeight;
        const centrX = w / 2;
        this.x = centrX + this.point3D.x / (this.point3D.z + focalLength);
        this.y = h * horyzontPos + this.point3D.y / (this.point3D.z + focalLength);
        const sc = itemsExtraScale * scaleZoom * 1 / (this.point3D.z + focalLength);
        this.scale.set(sc, sc);
        // this.rotation = this.point3D.z;
        if (this.point3D.z < -20 && this.outOfBoundsCallback) {
            this.dispatchOutOfBounds();
        }
    }

    dispatchOutOfBounds() {
        if (this.outOfBoundsCallback)
            this.outOfBoundsCallback(this);
    }
}
export default Pseudo3DSprite;
