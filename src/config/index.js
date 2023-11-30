//pseudo namespace
export var AppConfig;
(function (AppConfig) {

    AppConfig.settings = {
        gameWidth: 600,
        gameHeight: 800,
    };

    AppConfig.settings3D = {
        focalLength: 10,
        scaleZoom: 16,
        horyzontPos: 0.2,
        animationSped: 1 * 5,
        worldSize: 1000,
        conveyorY: 6,
        conveyorWidth: 6,
        zCartPosition: 0,
        zDeep:100
    };

    AppConfig.gameSettings = {
        levelMaxScores: 500,
        cartWidth: 50,
        newItemDelay: 1 * 1000,
        itemsExtraScale: 0.8,
        magnetItemsCount: 6,
        magnetMaxDuration: 6000, //we double duration of bugnet by timeout and itemscount
        speedUpDuration : 4000
        };

    AppConfig.animationSettings = {
        itemJumpDuration: 0.3,
        itemDropDuration: 0.2,
        displayItemsInCart: 30
    };
})(AppConfig || (AppConfig = {}));
