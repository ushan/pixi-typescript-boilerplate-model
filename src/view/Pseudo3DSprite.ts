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
        const focalLength:number = 10;
        const w = 800;
        const h = 600;
        this.x = w / 2 + this.point3D.x / (this.point3D.z + focalLength);
        this.y = h / 4 + this.point3D.y / (this.point3D.z + focalLength);
        const sc:number =  4 * 1 / (this.point3D.z + focalLength);
        // const sc:number = 0.5;
        this.scale.set(sc, sc);
        // this.rotation = Math.cos(this.point3D.z);
        // this.rotation = this.point3D.z / 2;
    }

    // updatePosByPoint3D (){
    //     const focal:number = 20;
    //     const w = 800;
    //     const h = 600;
    //     this.x = this.point3D.x * (focal / this.point3D.z) * w + w / 2;
    //     this.y = this.point3D.y * (focal / this.point3D.z) * h + h / 2;
    //     const sc:number = 1 / (this.point3D.z + focal);
    //     this.scale.set(sc, sc);

    // }
}




export default Pseudo3DSprite;