import { init} from "./init";
import { hideLoader } from './wrapper/game/loader';

const game = init();

// document.getElementById('loading_title').innerHTML = translate('LOADING');
const bannerIMG = document.querySelector('#banner');
// bannerIMG.style.backgroundImage = `url(${config.skinData.banner})`
// bannerIMG.style.backgroundColor = config.skinData.bannerColor || '#911d23'

const message = {
  eventName: "all-loaded",
};
const hasParent = window.parent === window;
window.parent.postMessage(message, '*');

const headerCloseButton = document.querySelector('header .home');
headerCloseButton.addEventListener('click', () => {
	const message = {
		eventName: "close",
	};

	gameModel.game.gamePause();

	window.parent.postMessage(message, '*');

	sendData('webEvent_game_close');
});

const headerMuteButton = document.querySelector('header .mute');
headerMuteButton.addEventListener('click', () => {
	gameModel.muted = !gameModel.muted;

	if (gameModel.muted) {
		headerMuteButton.classList.add('active');
	} else {
		headerMuteButton.classList.remove('active');
	}
});


window.addEventListener('message', event => {

  if (event.data?.eventName === 'closed-refuse') {
    gameModel.game.gameResume();
  }

  if (event.data?.eventName === 'powerUps-show') {
    gameModel.game.gamePause();
    console.log('powerUps-received. Timer pauses.');
  }

  if (event.data?.eventName === 'powerUps-close') {
    gameModel.game.gameResume();
    console.log('powerUps-closed. Timer resumes.');
  }

	if (event.data?.eventName === 'prize') {
		const {powerUps = []} = event.data;
		const skinData = config.skinData.powerUps;

    console.log('powerUps: ', powerUps);

		powerUps.forEach((el) => {
			switch (el.name) {
				case skinData.score.name:
					gameModel.scoreMultiplier = skinData.score.value;
					gameModel.activePowerUp = 'multiplier';
					gsap.to({}, {
						duration: 30,
						onComplete: () => {
							gameModel.scoreMultiplier = 1;
						}
					});
					break;
				case skinData.timer.name:
					gameModel.timerData.initial += skinData.timer.value;
					gameModel.activePowerUp = 'timebonus';
					EventBus.emit(EVENTS.PWRUP_INIT_TIME_ACTIVATED, skinData.timer.value);
					break;
				default:
			}
		})
	}
});

hideLoader();