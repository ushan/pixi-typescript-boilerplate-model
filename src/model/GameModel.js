import { AppConfig } from "../config";
import ResourceList from "../resources/ResourceList";
import ItemSprite from "../view/components/items/ItemSprite";
import ItemModel from "./items/ItemModel";
import { MiniSignal } from "mini-signals";

export const EGameStates = Object.freeze({"stop":1, "playing":2});

const { animationSpeed} = AppConfig.settings3D;

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
        this.speed = 1.6;
        this.speedUpFactor = 1;
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
        this.timeLeftUpdated.dispatch(this.lastItem, increment); 
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
    
    createItemModelsDebug() {
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

    createItemModels() {   
        const scorePlusItem1 = new ItemModel(1, ResourceList.GOOD_1, "scores", 10, 10, "good");
        const scorePlusItem2 = new ItemModel(2, ResourceList.GOOD_2, "scores", 20, 10, "good");
        const scoreMinusItem = new ItemModel(3, ResourceList.GOOD_3, "scores", -10, 10, "bad");
        const secondsMinusItem = new ItemModel(4, ResourceList.GOOD_4, "time", 0, 10, "bad");
        const magnetItem = new ItemModel(5, ResourceList.GOOD_5, "magent", 0, 0, "good");
        const speedUpItem = new ItemModel(6, ResourceList.GOOD_1, "speedUp", 0, 0, "good");
        const arr = [
            scorePlusItem1, 
            scorePlusItem2,
            scoreMinusItem,
            secondsMinusItem,
            magnetItem,
            speedUpItem
        ];
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
            
            this.addCautchItem(itemModel);
            return true;
        }
        else {
            this.scores -= 1;
            return false;
        }
    }

    /**
     * @param {ItemModel} item 
     */
    addCautchItem(item){
        if (item.scores != 0) {
            this.scores += item.scores;
        }
        if (item.time != 0) {
            this.timeLeft += item.time;
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
