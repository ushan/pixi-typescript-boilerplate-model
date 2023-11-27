
class ItemKind {
    /**
     * 
     * @param {string} id 
     * @param {string} resource 
     * @param {('scores' | 'time' | 'magnet' | 'speedUp')} itemType 
     * @param {number} scores 
     * @param {number} time 
     * @param {('good' | 'bad')} kindness = "good"
     */
    constructor(id, resource, itemType, scores = 0, time = 0, kindness = 'good') {
        this.id = id;
        this.resource = resource;
        this.itemType = itemType;
        this.scores = scores;
        this.time = time;
        this.kindness = kindness;
    }
}
export default ItemKind;
