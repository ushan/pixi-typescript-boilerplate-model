import GameModel from "../model/GameModel";
import ResourceList from "./ResourceList";
import ResourceService from "./ResourceService";

class SoundBoard {
	static useDOM = true;
	static sounds = {
    match: '../assets/sounds/match.wav',
    move: '../assets/sounds/move.wav',
		lightning: '../assets/sounds/lightning.wav',
		fire: '../assets/sounds/fire.wav',
		paint: '../assets/sounds/paint.wav',
  };

  static play(sound) {
	if (GameModel.instance.muted) return;
	if (SoundBoard.useDOM){
		SoundBoard.playDOM(sound);
	} else {
		SoundBoard.playPIXI(sound);
	}
  }

  static playDOM(sound) {
	const audioEl = document.querySelector(`audio.${sound}`);
	if (!audioEl.src) {
		audioEl.src = SoundBoard.sounds[sound];
	}

	if (!audioEl.paused && audioEl.currentTime >= 0 && audioEl.started) {
		audioEl.pause();
		audioEl.currentTime = 0;
	}
	audioEl?.play();
  }

  static playPIXI(sound) {
	const audio =  ResourceService.getSound(ResourceList.SND_CAUTCH);
	audio.play();

	
  }
}

