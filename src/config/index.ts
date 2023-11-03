// import { ConfigInterface } from './ConfigInterface';

export namespace AppConfig {
  export const settings = {
    gameWidth   :800,
    gameHeight  :600,
  };
  export const settings3D = {
    focalLength     :10,
    scaleZoom       :4,
    horyzontPos     :0.2, //0 .. 1 Position of horizont that devides view to parts with corresponed ratio
    animationSpped  :5,
    worldSize       :1000,
    convayorY       :6,
    convayorWidth   :11
  };
  export const gameSettings = {
    levelMaxScores    :1000,
    cartWidth         :20,
  };
}