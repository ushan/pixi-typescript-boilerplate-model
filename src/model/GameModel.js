import ResourceList from "../resources/ResourceList";
import ItemModel from "./items/ItemModel";
import { MiniSignal } from "mini-signals";
class GameModel {
    static _instance;
    static get instance() {
        return GameModel._instance;
    }
    constructor() {
        this.scoreUpdated = new MiniSignal();
        this.itemModels = this.createItemModels();
        this.lastItem = null;
        this._scores = 0;
        this.init();
        GameModel._instance = this;
    }

    get scores() { return this._scores; }
    set scores(value) { 
        if (value == this._scores) return
        const increment = value - this._scores;
        this._scores = value; 
        this.scoreUpdated.dispatch(this.lastItem, increment); 
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

    getNextItemModel() {
        const itemModel = this.itemModels[Math.floor(Math.random() * this.itemModels.length)];
        return itemModel;
    }

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


}
export default GameModel;
