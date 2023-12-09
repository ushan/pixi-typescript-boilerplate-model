
import { MiniSignal } from "mini-signals";

class AppConfig {

    static sizeUpdated = new MiniSignal();

    /** 
     * @readonly
     */
    static settings = {
        gameWidth: 600,
        gameHeight: 800
    }

    static updateSize (w, h) {
        AppConfig.settings.gameWidth = w;
        AppConfig.settings.gameHeight = h;
        AppConfig.sizeUpdated.dispatch();
    }

    /** 
     * @readonly
     */
    static settings3D = {
        focalLength: 10,
        scaleZoom: 26,
        horyzontPos: 0.2,
        animationSped: 1 * 5,
        worldSize: 1000,
        conveyorY: 6,
        conveyorWidth: 6,
        zCartPosition: 0,
        zDeep:100
    };

    /** 
     * @readonly
     */
    static gameSettings = {
        levelMaxScores: 500,
        cartWidth: 50,
        newItemDelay: 1 * 1000,
        itemsExtraScale: 0.8,
        magnetItemsCount: 6,
        magnetMaxDuration: 6000, //we double duration of bugnet by timeout and itemscount
        speedUpDuration: 4000,
        timeMax: 180
    };

    /** 
     * @readonly
     */
    static animationSettings = {
        itemJumpDuration: 0.3,
        itemDropDuration: 0.2,
        displayItemsInCart: 30
    };
}

export { AppConfig };