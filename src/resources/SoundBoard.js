class SoundBoard {
	static sounds = {
    match: '../assets/sounds/match.wav',
    move: '../assets/sounds/move.wav',
		lightning: '../assets/sounds/lightning.wav',
		fire: '../assets/sounds/fire.wav',
		paint: '../assets/sounds/paint.wav',
  };

  static play(sound) {
		// if (gameModel.muted) return;
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
}

export default SoundBoard
