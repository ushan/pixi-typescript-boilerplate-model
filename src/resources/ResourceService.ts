import * as PIXI from 'pixi.js';
import ResourceList from "./ResourceList";
import { ISkeletonData, Spine } from 'pixi-spine';



class ResourceService {
    static init = (onSuccess: () => void) => {
        const {shared} = PIXI.Loader;

        ResourceList.LIST.forEach(resource => {
            shared.add(resource)
        }
        );

        shared.load(onSuccess);
    }

    static getTexture = (resourceName: string)  => {
        return PIXI.Loader.shared.resources[resourceName]?.texture;
    }

    static getSprite = (resourceName: string) => {
        return new PIXI.Sprite(ResourceService.getTexture(resourceName));
    }

    static getSpineData = (resourceName: string):ISkeletonData  => {
        const res = PIXI.Loader.shared.resources[resourceName];
        if (res.data.version == undefined) res.data.version = "0"; //UNKNOWN version
        if (res.data.bones){
            res.data.bones.forEach(bone => {
                if (bone.parent === "root"){
                    bone.parent.index = 0;
                };
            }
            );
            res.data.bones[0].parent = null;
        }
        return res?.data;
    }

    static getSpine = (resourceName: string):Spine => {
        return new Spine(ResourceService.getSpineData(resourceName));
    }
}

export default ResourceService;




