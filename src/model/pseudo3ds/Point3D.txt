import { MiniSignal } from 'mini-signals';

class Point3D {

    constructor (
        private onUpdate?   :() => void,
        private _x  :number = 0, 
        private _y  :number = 0, 
        private _z  :number = 0){
    }

    public get x()      :number {return this._x;}
    public set x(value  :number) {this._x = value; this.update();}

    public get y()      :number {return this._y;}
    public set y(value  :number) {this._y = value; this.update();}

    public get z()      :number {return this._z;}
    public set z(value  :number) {this._z = value; this.update();}

    public setPositions (x:number, y:number, z:number) {
        this._x = x;
        this._y = y;
        this._z = z;
        this.update();
    }

    update() {
        if (this.onUpdate) {
            this.onUpdate();
        }
    }
}

export default Point3D



