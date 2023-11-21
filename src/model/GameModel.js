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
        this._scores = 0;
        this.init();
        GameModel._instance = this;
    }

    get scores() { return this._scores; }
    set scores(value) { this._scores = value; this.scoreUpdated.dispatch(); }

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
        if (inCart) {
            this.scores += item.scores;
            return true;
        }
        else {
            this.scores -= 1;
            return false;
        }
    }


}
export default GameModel;
