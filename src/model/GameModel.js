import ResourceList from "../resources/ResourceList";
import ItemModel from "./goods/ItemModel";
import { MiniSignal } from "mini-signals";
class GameModel {
    /*     readonly itemTypes:string [] = [
            "good_1",
            "good_2",
            "good_3",
            "good_4",
            "good_5",
        ] */
    constructor() {
        this.scoreUpdated = new MiniSignal();
        this.itemModels = this.createItemModels();
        this._scores = 0;
        this.init();
    }
    get scores() { return this._scores; }
    set scores(value) { this._scores = value; this.scoreUpdated.dispatch(); }
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
}
export default GameModel;
