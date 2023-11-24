import ResourceList from "../resources/ResourceList";
import ItemSprite from "../view/components/items/ItemSprite";
import ItemModel from "./items/ItemModel";
import { MiniSignal } from "mini-signals";

export const EGameStates = Object.freeze({"stop":1, "playing":2});
class GameModel {
    static _instance;
    static get instance() {
        return GameModel._instance;
    }
    constructor() {
        this.scoreUpdated = new MiniSignal();
        this.timeLeftUpdated = new MiniSignal();
        this.gameStateUpdated = new MiniSignal();
        this.cartLineUpdated = new MiniSignal();
        this.itemModels = this.createItemModels();
        this.gameState = EGameStates.stop;
        this.lastItem = null;
        this._scores = 0;
        this._timeLeft = 120;
        this._cartLine = 0;
        this.init();
        GameModel._instance = this;
    }

    get scores() { return this._scores }
    set scores(value) { 
        if (value == this._scores) return
        const increment = value - this._scores;
        this._scores = value; 
        this.scoreUpdated.dispatch(this.lastItem, increment); 
    }

    get timeLeft() { return this._timeLeft }
    set timeLeft(value) { 
        if (value == this._timeLeft) return
        const increment = value - this._timeLeft;
        this._timeLeft = value; 
        this.timeLeftUpdated.dispatch(increment); 
    }

    get cartLine() { return this._cartLine }
    set cartLine(value) { 
        if (value == this._cartLine) return
        this._cartLine = value; 
        this.cartLineUpdated.dispatch(); 
    }



    init() {
        this.createItemModels();
    }
    
    createItemModels() {
        const arr = [];
        let itemScores = 1;
        ResourceList.GOODS_LIST.forEach(resource => {
            const itemModel = new ItemModel(resource);
            itemModel.scores = itemScores;
            itemScores *= 2;
            arr.push(itemModel);
        });
        return arr;
    }
    update() {
    }

    updateTimeLeft() {
        this.timeLeft = this.timeLeft - 1;
        if (this.timeLeft <= 0) {
            this.stopGame();
        }
    }

    startGame() {
        this.gameState = EGameStates.playing;
        this.intervalId = setInterval(() => {
            this.updateTimeLeft();
        }, 1000);
        this.gameStateUpdated.dispatch(); 
    }

    stopGame() {
        this.gameState = EGameStates.stop;
        clearInterval(this.intervalId);
        this.gameStateUpdated.dispatch(); 
    }

    getNextItemModel() {
        const itemModel = this.itemModels[Math.floor(Math.random() * this.itemModels.length)];
        return itemModel;
    }

    /***************************
     * Controller
     **************************/
    
    /**
     * @param {ItemSprite} item 
     * @param {Boolean} inCart 
     * @returns {Boolean}
     */
    registerAchiveBorder(item, inCart) {
        let itemModel = item.itemModel;
        this.lastItem = item;
        if (inCart) {
            this.scores += itemModel.scores;
            return true;
        }
        else {
            this.scores -= 1;
            return false;
        }
    }

    /**
     * 
     * @param {Boolean} toLeft //The direction of changing the cart line
     */
    registerMoveCart(toLeft) {
        if (toLeft) {
            if (this._cartLine < 0) {
                return
            } else {
                this.cartLine -= 1;
            }

        } else {
            if (this._cartLine > 0) {
                return
            } else {
                this.cartLine += 1;
            }
        }
    }


}
export default GameModel;
