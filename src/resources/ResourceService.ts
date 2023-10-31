import * as PIXI from 'pixi.js';
import ResourceList from "./ResourceList";

class ResourceService {
    static init = (onSuccess: () => void) => {
        const {shared} = PIXI.Loader;

        ResourceList.LIST.forEach(resource => shared.add(resource));

        shared.load(onSuccess);
    }

    static getTexture = (resourceName: string)  => {
        return PIXI.Loader.shared.resources[resourceName]?.texture;
    }

    static getSprite = (resourceName: string) => {
        return new PIXI.Sprite(ResourceService.getTexture(resourceName));
    }
}

export default ResourceService;