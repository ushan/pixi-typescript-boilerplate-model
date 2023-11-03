import {Assets, Sprite } from 'pixi.js';
import ResourceList from "./ResourceList";

class ResourceService {
    static init = (onSuccess: () => void) => {
        // The hard way
        // const bundle = ResourceList.LIST
        //     .map(name => ({ [name]: name }))
        //     .reduce((acc, elem) => ({...acc, ...elem}), {})
        //
        // Assets.addBundle('assets', bundle);
        // Assets.loadBundle('assets').then(() => onSuccess());

        // Or the easier, but the same
        Assets.load(ResourceList.LIST).then(() => onSuccess());
    }

    static getTexture = (resourceName: string)  => {
        return Assets.get(resourceName);
    }

    static getSprite = (resourceName: string) => {
        return new Sprite(ResourceService.getTexture(resourceName));
    }
}

export default ResourceService;