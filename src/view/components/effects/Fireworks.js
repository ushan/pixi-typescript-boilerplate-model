import * as PIXI from 'pixi.js';
import SpriteCommon from '../common/SpriteCommon';
import ResourceList from '../../../resources/ResourceList';
import Particle from './Particle';

class Fireworks extends PIXI.ParticleContainer  {
    constructor() {
        super();
        // this.particles = new Array();
        this.frameCounter = 0;


        this.addParticle();
        this.addParticle();

    }

    update() {
        this.frameCounter ++;
        if (this.frameCounter % 1 === 0) {
            this.addParticle();
        }

        for (const p of this.children) {
            if (p instanceof Particle){
                p.update();
                if (p.t >= p.lifeTime) this.removeChild(p);
            }

        }
    }

    addParticle() {
        
        const angle = Particle.randRange(- Math.PI, Math.PI);
        const rSpeed = Particle.randRange(- Math.PI / 60, Math.PI / 60);
        const speedAbs = Particle.randRange( 2, 8);
        const p = new Particle(ResourceList.MSC_STAR, angle, speedAbs, rSpeed, 30);
        const sc = Particle.randRange( 0.7, 1.6);
        p.scale.set(sc);
        this.addChild(p);
    }

}

export default Fireworks