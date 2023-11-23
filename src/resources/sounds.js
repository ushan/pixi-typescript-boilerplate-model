import { Howl } from 'howler';
import soundData from './sounds.json';
class SoundManager {
    constructor() {
        this.sounds = new Map();
        for (const [name, sound] of Object.entries(soundData)) {
            this.sounds.set(name, new Howl({
                src: [sound.src],
                volume: sound.volume
            }));
        }
    }
    play(soundName, playSound = true) {
        let sound = this.sounds.get(soundName);
        if (playSound)
            sound.play();
        setTimeout(() => {
            let sound2 = this.sounds.get(soundName);
            sound2.play();
        }, 100);
    }
}
export { SoundManager };
//# sourceMappingURL=sounds.js.map