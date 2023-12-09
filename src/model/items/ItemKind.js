
class ItemKind {
    /**
     * 
     * @param {string} id 
     * @param {(string | Array<string>)} resource 
     * @param {('scores' | 'time' | 'magnet' | 'speedUp')} itemType 
     * @param {number} scores 
     * @param {number} time 
     * @param {('good' | 'bad')} kindness = "good"
     * @param {boolean} magnetable = true
     */
    constructor(id, resource, itemType, scores = 0, time = 0, kindness = 'good', magnetable = true) {
        this.id = id;
        this.resource = resource;
        this.itemType = itemType;
        this.scores = scores;
        this.time = time;
        this.kindness = kindness;
        this.magnetable = magnetable;
    }
}
export default ItemKind;
