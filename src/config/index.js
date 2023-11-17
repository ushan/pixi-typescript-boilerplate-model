export var AppConfig;
(function (AppConfig) {
    AppConfig.settings = {
        gameWidth: 800,
        gameHeight: 600,
    };
    AppConfig.settings3D = {
        focalLength: 10,
        scaleZoom: 4,
        horyzontPos: 0.2,
        animationSpped: 1 * 5,
        worldSize: 1000,
        convayorY: 6,
        convayorWidth: 11
    };
    AppConfig.gameSettings = {
        levelMaxScores: 1000,
        cartWidth: 50,
        newItemDelay: 1 * 1000
    };
    AppConfig.animationSettings = {
        itemJumpDuration: 0.3,
        itemDropDuration: 0.2,
        displayItemsInCart: 10
    };
})(AppConfig || (AppConfig = {}));
