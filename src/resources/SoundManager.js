import { Howl } from 'howler';
import soundData from './sounds.json';
class SoundManager {
    constructor() {
        this.initialized = false;
        this._isSoundOn = false;
    }

    
    init() {
        this.sounds = new Map();
        for (const [name, sound] of Object.entries(soundData)) {
            this.sounds.set(name, new Howl({
                src: [sound.src],
                volume: sound.volume
            }));
        }
        this.initialized = true;
        this.isSoundOn = true;
    }


    play(soundName, playSound = true) {
        if (!this.initialized) return
        if (!this.isSoundOn) return

        let sound = this.sounds.get(soundName);
        if (playSound)
            sound.play();
    }

    get isSoundOn() { return this._isSoundOn}
    set isSoundOn (value) {
        if (!value) {
            Howler.volume(0);
        } else {
            Howler.volume(1);
        }
        this._isSoundOn = value;
    }
}
export { SoundManager };
//# sourceMappingURL=sounds.js.map