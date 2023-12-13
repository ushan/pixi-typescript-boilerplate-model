import * as PIXI from 'pixi.js';
import SpriteCommon from '../common/SpriteCommon';
import ResourceList from '../../../resources/ResourceList';
import Particle from './Particle';

class Fireworks extends PIXI.ParticleContainer  {
    constructor() {
        super();
        this.emitters = new Array();
        this.emitterX = 0;
        this.emitterY = 0;
        this.frameCounter = 0;
        this.addOnEachFrame = 1;

        this.addParticle();
        this.addParticle();
    }

    /**
     * @access public - update on each frame
     */
    update() {
        this.frameCounter ++;
        if (this.addOnEachFrame >= 1){
            if (this.frameCounter % this.addOnEachFrame === 0) {
                this.addParticleToEmitters();
            }
        } else {
            const n = 1 / this.addOnEachFrame;
            for (let i = 0; i < n; i++) {
                this.addParticle();
                
            }
        }


        for (const p of this.children) {
            if (p instanceof Particle){
                p.update();
                if (p.t >= p.lifeTime) this.removeChild(p);
            }

        }
    }

    /**
     * @access public
     * @param {Sprite} emitter a Sprite with emitterDisplaceX and emitterDisplaceY protperties
     * @param {number} displaceX 
     * @param {number} displaceY 
     */
    addEmmiter(emitter, displaceX, displaceY) {
        emitter.emitterDisplaceX = displaceX;
        emitter.emitterDisplaceY = displaceY;
        emitter.on('stopEmitting', () => {
            this.removeEmmiter(emitter);
        });
        this.emitters.push(emitter);
    }

    /**
     * @access public
     * @param {Sprite} emitter 
     */
    removeEmmiter(emitter) {
        const index = this.emitters.indexOf(emitter, 0);
        if (index > -1) {
            this.emitters.splice(index, 1);
        }
    }

    addParticleToEmitters() {
        this.emitters.forEach((emitter) => {
            if (emitter.position){
                const angle = Particle.randRange(- Math.PI, Math.PI);
                const rSpeed = Particle.randRange(- Math.PI / 60, Math.PI / 60);
                const speedAbs = Particle.randRange( 2, 8);
                const posX = emitter.x + emitter.emitterDisplaceX;
                const posY = emitter.y + emitter.emitterDisplaceY;
                const p = new Particle(ResourceList.MSC_STAR, posX, posY,
                    angle, speedAbs, rSpeed, 30);
                const sc = Particle.randRange( 0.7, 1.6);
                p.scale.set(sc);
                this.addChild(p);
            }

        });  

    }

    addParticle() {
        this.emitters.forEach((emitter) => {
            const angle = Particle.randRange(- Math.PI, Math.PI);
            const rSpeed = Particle.randRange(- Math.PI / 60, Math.PI / 60);
            const speedAbs = Particle.randRange( 2, 8);
            const p = new Particle(ResourceList.MSC_STAR, this.emitterX, this.emitterY.y,
                angle, speedAbs, rSpeed, 30);
            const sc = Particle.randRange( 0.7, 1.6);
            p.scale.set(sc);
            this.addChild(p);
        });  

    }

    setImmiterPos(posX, posY) {
        this.emitterX = posX;
        this.emitterY = posY;
    }

}

export default Fireworks