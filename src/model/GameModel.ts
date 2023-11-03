import { resources } from "pixi.js";
import ResourceList from "../resources/ResourceList";
import ItemModel from "./goods/ItemModel";
import { MiniSignal } from "mini-signals";
import { AppConfig } from "../config";


class GameModel {
    readonly scoreUpdated:MiniSignal = new MiniSignal();
    readonly itemModels:ItemModel[] = this.createItemModels();
/*     readonly itemTypes:string [] = [
        "good_1",
        "good_2",
        "good_3",
        "good_4",
        "good_5",
    ] */
    constructor (){
        this.init();
    }

    public get scores()      :number {return this._scores;}
    public set scores(value  :number) {this._scores = value; this.scoreUpdated.dispatch();}
    private _scores          :number = 0;

    public getNextItemModel ():ItemModel {
        const itemModel = this.itemModels[Math.floor(Math.random() * this.itemModels.length)];
        return itemModel
    }

    public registerAchiveBorder(item:ItemModel, inCart:boolean):boolean {
        if (inCart) {
            this.scores += item.scores;
            return true
        } else {
            this.scores -= 1;
            return false
        }
    }

    private init():void {
        this.createItemModels();
    }

    private createItemModels():ItemModel[]{
        const arr:ItemModel[] = [];

        let itemScores:number = 1;
        ResourceList.GOODS_LIST.forEach(resource => {
            const itemModel = new ItemModel(resource)
            itemModel.scores = itemScores;
            itemScores *= 2;
            arr.push(itemModel);
        });

        return arr
    }

    private update():void{

    }
}

export default GameModel

