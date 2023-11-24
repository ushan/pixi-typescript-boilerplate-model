import * as PIXI from 'pixi.js';
import { AppConfig } from '../../../config';
import Point3D from '../../../model/pseudo3ds/Point3D';

const { gameWidth, gameHeight } = AppConfig.settings;
const { worldSize, conveyorY, conveyorWidth, focalLength, horyzontPos} = AppConfig.settings3D;

class Background3D extends PIXI.Graphics{
    constructor() {
        super();
       // this.bg.lineStyle(2, 0xFF00FF, 1);
       this.beginFill(0x993333);


       const w = gameWidth;
       const h = gameHeight;
       const centrX = w / 2;

       const marginFactor = 1.2

       const topLeft3D = new Point3D (null, - marginFactor * worldSize * conveyorWidth / 2, conveyorY * worldSize, 100);
       const topRight3D = new Point3D (null, marginFactor * worldSize * conveyorWidth / 2, conveyorY * worldSize, 100);
       const bottomLeft3D = topLeft3D.clone();
       bottomLeft3D.z = - 2;
       const bottomRight3D = topRight3D.clone();
       bottomRight3D.z = - 2;


       const topLeft = new PIXI.Point();
       const topRight = new PIXI.Point();
       const bottomLeft = new PIXI.Point();
       const bottomRight = new PIXI.Point();

       topLeft.x = centrX + topLeft3D.x / (topLeft3D.z + focalLength);
       topLeft.y = h * horyzontPos + topLeft3D.y / (topLeft3D.z + focalLength);
       
       topRight.x = centrX + topRight3D.x / (topRight3D.z + focalLength);
       topRight.y = h * horyzontPos + topRight3D.y / (topRight3D.z + focalLength);
       
       bottomLeft.x = centrX + bottomLeft3D.x / (bottomLeft3D.z + focalLength);
       bottomLeft.y = h * horyzontPos + bottomLeft3D.y / (bottomLeft3D.z + focalLength);
       
       bottomRight.x = centrX + bottomRight3D.x / (bottomRight3D.z + focalLength);
       bottomRight.y = h * horyzontPos + bottomRight3D.y / (bottomRight3D.z + focalLength);
       
       const vertices = [
           topLeft, topRight,
           bottomRight, bottomLeft
       ];

       this.drawPolygon(vertices);
    }

/*     drawSegemntOfConveyor (start = 0, end = 0) {

    } */
}

export default Background3D;