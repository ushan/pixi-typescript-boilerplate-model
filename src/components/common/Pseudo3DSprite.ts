import * as PIXI from 'pixi.js';
import ResourceService from "../../resources/ResourceService";
import SpriteCommon from './SpriteCommon';
import Point3D from '../../model/pseudo3ds/Point3D';
import { AppConfig } from '../../config';

const {
    gameWidth, 
    gameHeight
} = AppConfig.settings;

const {
    focalLength, 
    scaleZoom, 
    horyzontPos
} = AppConfig.settings3D;

class Pseudo3DSprite extends SpriteCommon {
    // public onUpdate : () => void;
    public point3D:Point3D = new Point3D(() => this.updatePosByPoint3D());
    public outOfBoundsCallback?    :(item:Pseudo3DSprite) => void
    constructor(resourceName :string) {
        super(resourceName);
    }

    updatePosByPoint3D(){
        const w = gameWidth;
        const h = gameHeight;
        this.x = w / 2 + this.point3D.x / (this.point3D.z + focalLength);
        this.y = h * horyzontPos + this.point3D.y / (this.point3D.z + focalLength);
        const sc:number =  scaleZoom * 1 / (this.point3D.z + focalLength);
        this.scale.set(sc, sc);
        // this.rotation = this.point3D.z;
        if (this.point3D.z < -20 && this.outOfBoundsCallback){
            this.outOfBoundsCallback(this);
        }
        
    }


}




export default Pseudo3DSprite;