import SpriteCommon from "../common/SpriteCommon";

class Particle extends SpriteCommon{
    /**
     * 
     * @param {string} resurceName 
     * @param {number} angle - direction of the particle
     * @param {number} speedAbs - absolute aspeed
     * @param {number} lifeTime - life in frames
     */
    constructor(    resurceName,
                    posX,
                    posY,
                    angle, 
                    speedAbs, 
                    rSpeed, 
                    lifeTime = 200){
        super(resurceName);
        this.x = posX;
        this.y = posY;
        this.lifeTime = lifeTime;
        this.gX = 0;
        this.gY = 0.2;
        this.rSpeed = rSpeed;
        this.speedX = speedAbs * Math.cos(angle);
        this.speedY = speedAbs * Math.sin(angle);
        this.t = 0;
        this.anchor.set(0.5, 0.5);
        // this.scale.set(0.2, 0.2);

    }

    update() {
        this.t++;
        this.speedX += this.gX;
        this.speedY += this.gY;
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha = 1 - this.t / this.lifeTime;
        this.rotation += this.rSpeed;
    }

    static randRange(min, max) {
        if (min > max) {
            throw new Error('min must be less than or equal to max');
        }
    
        // Generate a random number within the specified range
        return Math.random() * (max - min) + min;
    }
}

export default Particle