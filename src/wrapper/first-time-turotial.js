// import { SoundBoard } from './sounds';
import { utils } from 'pixi.js';
import gsap from 'gsap';

// import '../style/tutorial/index.scss';
// import {config} from "./game/config";
// import {translate} from "./lang";
// import {gameModel} from "./game/gameModel";
// import {IdleState} from "./states/idleState";

class Tutorial extends utils.EventEmitter {
  _container = null;
  _timerStep = null;

  constructor(container) {
    super();

    this._container = container;
  }

  init(canvasContainer) {
    this.create();
    this.show(canvasContainer);

    this._timerStep = this._createTimerStep(canvasContainer, () => {
      this.showStepGround();
    });

    this._groundStep = this._createGroundStep(canvasContainer, () => {
      this.destroy();
    });

    this._container.append(this._timerStep, this._groundStep);
  }

  createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    const label = document.createElement('div');
    label.classList.add('tip-title');
    label.classList.add('font-bold');
    label.innerText = translate('TUTORIAL_TITLE_1');

    tooltip.append(label);

    return tooltip;
  }

  createShadow() {
    const tutorialBackgroundTop = document.createElement('div');
    tutorialBackgroundTop.classList.add('tutorial-background-top');

    const tutorialBackgroundLeft = document.createElement('div');
    tutorialBackgroundLeft.classList.add('tutorial-background-left');

    const tutorialBackgroundBottom = document.createElement('div');
    tutorialBackgroundBottom.classList.add('tutorial-background-bottom');

    const tutorialBackgroundRight = document.createElement('div');
    tutorialBackgroundRight.classList.add('tutorial-background-right');

    return {
      tutorialBackgroundTop,
      tutorialBackgroundLeft,
      tutorialBackgroundBottom,
      tutorialBackgroundRight,
    };
  }

  _createTip(text) {
    const tip = document.createElement('div');
    tip.classList.add('tip');

    const h3 = document.createElement('div');
    h3.classList.add('tip-title');
    h3.classList.add('font-bold');
    h3.innerText = text;

    tip.append(h3);

    return tip;
  }

  _createButton(text, callback) {
    const action = document.createElement('div');
    action.classList.add('action-block');

    const button = document.createElement('button');
    button.classList.add('button-primary-medium');
    button.innerText = text;

    button.onclick = () => {
      callback();
    }

    action.append(button);

    return action;
  }

  _createTimerStep(canvasContainer, nextStep) {
    const timerStep = document.createElement('div');
    timerStep.classList.add('timer-step');
    timerStep.classList.add('hidden');

    let { top, width } = canvasContainer.getBoundingClientRect();

    const padding = config.board.margin / 2;
    top += padding;


		const time = gameModel.timer.formatTime(config.initialTime);
    const tip = this._createTip(translate('TUTORIAL_TITLE_2', time));
    const button = this._createButton(translate('NEXT_TIP'), () => {
      timerStep.remove();
      nextStep()
    });

    tip.style.width = `${width * 0.9}px`;

    timerStep.append(tip, button);
    timerStep.style.top = `${Math.ceil(top)}px`;

    return timerStep;
  }

  _createGroundStep(canvasContainer, nextStep) {
    const padding = config.board.margin / 2;
	  const tileSize = gameModel.tileSize;
    let { bottom, width } = canvasContainer.getBoundingClientRect();

    const groundStep = document.createElement('div');
    groundStep.classList.add('ground-step');
    groundStep.classList.add('hidden');

    const topBackground = document.createElement('div');
    topBackground.classList.add('ground-step-top');

    const bottomBackground = document.createElement('div');
    bottomBackground.classList.add('ground-step-bottom');

    const tip = this._createTip(translate('TUTORIAL_TITLE_3', 30));
    const button = this._createButton(translate('START_GAME'), () => {
      groundStep.remove();
      nextStep()
    });

    tip.style.width = `${width * 0.9}px`;

    const action = document.createElement('div');
    action.classList.add('action-block');
    action.append(button);

    topBackground.style.height = `${Math.ceil(bottom - (padding + tileSize * 4))}px`;
    bottomBackground.style.top = `${Math.ceil(bottom - (padding + tileSize * 1))}px`;

    bottomBackground.append(tip, button);
    groundStep.append(topBackground, bottomBackground);

    return groundStep;
  }

  create() {
    const tutorialBackground = document.createElement('div');
    tutorialBackground.classList.add('tutorial-background');

    this._tutorialBackground = tutorialBackground;
    this._tootltip = this.createTooltip();

    this._tutorialBackground.append(this._tootltip);

    this._container.append(tutorialBackground);
  }

  tileSize() {
    const container = Math.max(480, window.innerWidth);
	  const {rows, margin} = config.board;
    return container / rows - margin / rows;
  }

	createInsetPolygonMask(x, y, width, height) {
		return `polygon(
	  0% ${y}px, ${x + width}px ${y}px, ${x + width}px ${y + height}px, ${x}px ${y + height}px,
	  ${x}px ${y}px, 0% ${y}px, 0% 100%, 100% 100%, 100% 0%, 0% 0%)`;
	}

  show(canvasContainer) {
	  const { margin } = config.board;
	  const tileSize = gameModel.tileSize;
    let { top, left } = canvasContainer.getBoundingClientRect();
    const padding = margin / 2;

    top += padding + tileSize;
    left += padding;

	  this._tutorialBackground.style.clipPath = this.createInsetPolygonMask(padding, top, 4 * tileSize, tileSize);

    this._tootltip.style.top = `${Math.ceil(top + tileSize + padding)}px`;
    this._tootltip.style.left = `${Math.ceil(left + tileSize / 2)}px`;
  }

  async animationShow() {
    await gsap.to(this._tutorialBackground, {
      opacity: 1,
      duration: 1,
    });

    this.emit('show');

    return this;
  }

	hide() {
		this._tutorialBackground.remove();
	}

  showStepTimer() {
    this._timerStep.classList.remove('hidden');
  }

  showStepGround() {
    this._groundStep.classList.remove('hidden');
  }

  destroy() {
    this.emit('destroy');

		gameModel.tutorialState++;
		gameModel.stateMachine.setState(IdleState.name);

    SoundBoard.play('move');
  }
}

const tutorial = new Tutorial(document.body);

export { tutorial };
