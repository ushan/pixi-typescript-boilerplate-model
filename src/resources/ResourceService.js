import { Assets, Sprite } from 'pixi.js';
import ResourceList from "./ResourceList";
class ResourceService {
}
ResourceService.init = (onSuccess) => {
    // The hard way
    // const bundle = ResourceList.LIST
    //     .map(name => ({ [name]: name }))
    //     .reduce((acc, elem) => ({...acc, ...elem}), {})
    //
    // Assets.addBundle('assets', bundle);
    // Assets.loadBundle('assets').then(() => onSuccess());
    // Or the easier, but the same
    Assets.load(ResourceList.LIST).then(() => onSuccess());
};
ResourceService.getTexture = (resourceName) => {
    return Assets.get(resourceName);
};
ResourceService.getSprite = (resourceName) => {
    return new Sprite(ResourceService.getTexture(resourceName));
};
export default ResourceService;
