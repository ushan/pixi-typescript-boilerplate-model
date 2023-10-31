import * as PIXI from 'pixi.js';
import ResourceService from "../resources/ResourceService";
import SpriteCommon from '../components/common/SpriteCommon';
import Point3D from '../model/pseudo3ds/Point3D';

class Pseudo3DSprite extends SpriteCommon {
    public point3D:Point3D = new Point3D(() => this.updatePosByPoint3D());
    constructor(resourceName: string) {
        super(resourceName);
    }

    updatePosByPoint3D(){
        const focalLength:number = 5;
        this.x = this.point3D.x / (this.point3D.z + focalLength);
        this.y = this.point3D.y / (this.point3D.z + focalLength);
        const sc:number = 1 / (this.point3D.z + focalLength);
        this.scale.set(sc, sc);

    }
}




export default Pseudo3DSprite;