export namespace AppConfig {
  export const settings = {
    gameWidth   :800,
    gameHeight  :600,
  };
  export const settings3D = {
    focalLength     :10,
    scaleZoom       :4,
    horyzontPos     :0.2, //0 .. 1 Position of horizont that devides view to parts with corresponed ratio
    animationSpped  :1 * 5,
    worldSize       :1000,
    convayorY       :6,
    convayorWidth   :11
  };
  export const gameSettings = {
    levelMaxScores    :1000,
    cartWidth         :20,
    newItemDelay      :1 * 1000
  };
  export const animationSettings = {
    itemJumpDuration    :0.3,
    itemDropDuration    :0.2,
    displayItemsInCart  :10
  };
}