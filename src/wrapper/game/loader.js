import gsap from 'gsap';
import { tutorial } from '../first-time-turotial';

/**
 * Run tutorial animation and wait for user action
 * @returns {Promise<void>} A promise that resolves when the user do match 3 point.
 */
/* export const runTutorialAnimation = () => {
  return new Promise(async (res, rej) => {
    try {
      const tutorialAnimation = await tutorial.animationShow();

      tutorialAnimation.on('destroy', res);
    } catch (e) {
      rej(e);
    }
  })
} */

/**
 * Hide the loader and perform necessary animations.
 * @returns {Promise<void>} A promise that resolves when the loader is hidden.
 */
// export const showPreloaderAnimation = () => {
//   return new Promise(async (res, rej) => {
//     try {
//
// 	    await transitionTime.init(90);
//
//       res();
//     } catch (e) {
//       rej(e);
//     }
//   });
// };

/**
 * Hide the loader and perform necessary animations.
 * @returns {Promise<void>} A promise that resolves when the loader is hidden.
 */
export const hideLoader = () => {
    return new Promise(async (res, rej) => {
    try {
      await showWrapper();
      removeSpinnerAnimation();

      res();
    } catch (e) {
      rej(e);
    }
  });
};

/**
 * Animate the mainZSImages.
 */
export const animateMainZSImages = async () => {
  const tl = gsap.timeline({ paused: true });

  await tl.to('.mainZSImages', {
      opacity: 1,
      duration: 1,
    })
    .to(['.mainZSImages', '.darkBackground'], {
    delay: 2,
    opacity: 0,
    duration: 1,
  })
  .play();

  return true;
};

/**
 * Remove the spinner animation.
 */
export const removeSpinnerAnimation = () => {
  const el = document.querySelector('.spinner-container');
  if (el) {
    el.remove();
  }
};

/**
 * Show the wrapper with animations.
 * @returns {Promise<boolean>} A promise that resolves to true when the wrapper is shown.
 */
export const showWrapper = async () => {
  const tl = gsap.timeline({ paused: true });
  await tl
    .to('.wrapper', {
      autoAlpha: 1,
      opacity: 1,
      duration: 1,
    })
    .play();

  return true;
};
