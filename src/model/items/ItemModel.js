
class ItemModel {
    /**
     * 
     * @param {number} id 
     * @param {string} resource 
     * @param {('scores' | 'time' | 'magent' | 'speedUp')} itemType 
     * @param {number} scores 
     * @param {number} time 
     * @param {('good' | 'bad')} itemKind 
     */
    constructor(id, resource, itemType, scores = 0, time = 0) {
        this.id = id;
        this.resource = resource;
        this.itemType = itemType;
        this.scores = scores;
        this.time = time;
    }
}
export default ItemModel;
