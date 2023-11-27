import { AppConfig } from "../config";
import GAME_CONFIG from "../config/GameConfig";
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
        this._timeSpend = 0;
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
        const scorePlusItem1 = new ItemModel("plus10", ResourceList.GOOD_1, "scores", 10, 10, "good");
        const scorePlusItem2 = new ItemModel("plus20", ResourceList.GOOD_2, "scores", 20, 10, "good");
        const scoreMinusItem = new ItemModel("minus10", ResourceList.GOOD_3, "scores", -10, 10, "bad");
        const secondsMinusItem = new ItemModel("minusNseconds", ResourceList.GOOD_4, "time", 0, 10, "bad");
        const magnetItem = new ItemModel("magnet", ResourceList.GOOD_5, "magent", 0, 0, "good");
        const speedUpItem = new ItemModel("speedUp", ResourceList.GOOD_1, "speedUp", 0, 0, "good");
        const arr = [
            scorePlusItem1, 
            scorePlusItem2,
            scoreMinusItem,
            secondsMinusItem,
            magnetItem,
            speedUpItem
        ];

        //creating dictionary were the keys are ID's of objects in original array
        const dict = arr.reduce((dictionary, obj) => {
            dictionary[obj.id] = obj;
            return dictionary;
          }, {});
        return dict;
    }

    update() {
    }

    updateTime() {
        this.timeSpent ++;
        this.updateTimeLevel();
        this.updateTimeLevel();
        // if (this.timeSpent % 30 === 0) this.updateTimeLevel();
    }

    updateTimeLeft() {
        this.timeLeft = this.timeLeft - 1;
        if (this.timeLeft <= 0) {
            this.stopGame();
        }
    }

    updateTimeLevel() {
        this.speed = this.getParamsByTime(this.timeSpent, GAME_CONFIG.speeds).speed;
    }

    getParamsByTime(currentTime, configObj) {
        const keys = Object.keys(configObj).map(Number).sort((a, b) => a - b);
        const key = keys.find(interval => interval > currentTime);
        return key ? configObj[key] : configObj['infinity'];
    }

    startGame() {
        this.gameState = EGameStates.playing;
        this.intervalId = setInterval(() => {
            this.updateTime();
        }, 1000);
        this.gameStateUpdated.dispatch();
        this.timeSpent = 0;
    }

    stopGame() {
        this.gameState = EGameStates.stop;
        clearInterval(this.intervalId);
        this.gameStateUpdated.dispatch(); 
    }


    /**
     * 
     * @returns {Array.<ItemModel>}
     *          Array of 
     */
    getNextItemModel() {
        // const itemModel = this.itemModels[Math.floor(Math.random() * this.itemModels.length)];
        
        // const randomItemID = (dict) => {
        //     var keys = Object.keys(dict);
        //     return dict[keys[Math.floor(keys.length * Math.random())]];
        // };
        const itemModel = this.getRandomElementFromDictionary(this.itemModels);




        const currentIntemsInRowParams = this.getParamsByTime(this.timeSpent, GAME_CONFIG.itemsInRow);
        const numInRowProp = this.getPropertyByProbability(currentIntemsInRowParams);
        const numOfItems = parseInt(numInRowProp.replace('row', ''), 10) //parse number from propname row0, row1, row2 ...
        console.log(numOfItems);
        const ItemsArray = [];
        for (let i = 0; i < numOfItems; i++)
        {
            const currentItemKinds = this.getParamsByTime(this.timeSpent, GAME_CONFIG.itemKinds);
            const itemProp = this.getPropertyByProbability(currentItemKinds, false);
            console.log(itemProp);
        }

        
        return itemModel;
    }

    getRandomElementFromDictionary(dict) {
        const keys = Object.keys(dict);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return dict[randomKey];
      }

    /**
     *  @param      {Object} probObj 
     *              the object with distribution of probabilities in perscetns 
     *              {prop1:10, prop2:20, prop3:70}. It must be 100 in summ
     *  @param      {boolean} usePercents=true
     *              determine if the values in objects are defined as percents but
     *  @returns    {string} 
     *              propname
     */
    getPropertyByProbability(probObj, usePercents = true) {
        const randomNumber = Math.floor(Math.random() * 101);
        const percentFactor = usePercents ? 1 : 100;
        let cumulativeProbability = 0;
        for (const row in probObj) {
            if (probObj.hasOwnProperty(row)) {
                cumulativeProbability += (probObj[row] * percentFactor);
                if (randomNumber <= cumulativeProbability) {
                    return row
                }
            }
        }

        // console.log ("Error: the value exceeds probabilities ")
        // Default to the last row if the random number exceeds the cumulative probability
        return Object.keys(probObj).length - 1;
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
