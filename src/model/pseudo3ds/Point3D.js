class Point3D {
    constructor(onUpdate, _x = 0, _y = 0, _z = 0) {
        this.onUpdate = onUpdate;
        this._x = _x;
        this._y = _y;
        this._z = _z;
    }

    get x() { return this._x; }
    set x(value) { this._x = value; this.update(); }

    get y() { return this._y; }
    set y(value) { this._y = value; this.update(); }

    get z() { return this._z; }
    set z(value) { this._z = value; this.update(); }

    setPositions(x, y, z) {
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

    clone() {
        return new Point3D (this.onUpdate, this.x, this.y, this.z);
    }
}
export default Point3D;
