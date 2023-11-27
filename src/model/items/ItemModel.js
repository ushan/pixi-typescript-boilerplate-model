class ItemModel {
    constructor(itemKind, posInRow){
        this.itemKind = itemKind;
        this.posInRow = posInRow;
    }

    static getRandomPosInRow() { return Math.floor(Math.random() * 3) - 1;}
}

export default ItemModel