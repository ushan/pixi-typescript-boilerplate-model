import * as PIXI from 'pixi.js';
import { AppConfig } from '../../../config/AppConfig';
import Point3D from '../../../model/pseudo3ds/Point3D';
import Utils3D from '../../utils/Utils3D';


class Background3D extends PIXI.Graphics{
    constructor() {
        super();
        
        this.redraw = () => {
            this.clear();
            const { gameWidth, gameHeight } = AppConfig.settings;
            const { worldSize, conveyorY, conveyorWidth, focalLength, horyzontPos} = AppConfig.settings3D;
            
            this.beginFill(0x993333);
    
            const { topLeft, topRight, bottomRight, bottomLeft } = Utils3D.updateConveyorCorners();
    
            const vertices = [
                topLeft, topRight,
                bottomRight, bottomLeft
            ];
    
            this.drawPolygon(vertices);
        }

        // AppConfig.sizeUpdated.add(this.redraw);
        // this.redraw();
    }



}

export default Background3D;