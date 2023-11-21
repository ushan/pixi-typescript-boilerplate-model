import { Assets, Sprite } from 'pixi.js';
import ResourceList from "./ResourceList";
class ResourceService {
}
ResourceService.init = (onSuccess) => {
    Assets.load(ResourceList.LIST).then(() => onSuccess());
};
ResourceService.getTexture = (resourceName) => {
    return Assets.get(resourceName);
};
ResourceService.getSprite = (resourceName) => {
    return new Sprite(ResourceService.getTexture(resourceName));
};
ResourceService.getSound = (resourceName) => {
    return Assets.get(resourceName);
};
export default ResourceService;
