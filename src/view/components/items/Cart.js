import * as PIXI from 'pixi.js';
import SpriteCommon from "../common/SpriteCommon";
import ResourceList from "../../../resources/ResourceList";
import { Container, Matrix, Point } from "pixi.js";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import ClonedItemSprite from "./ClonedItemSprite";
import { AppConfig } from "../../../config/AppConfig";
import EItemsID from '../../../model/EItemsID';

const { itemJumpDuration, itemDropDuration, displayItemsInCart } = AppConfig.animationSettings;
export class Cart extends SpriteCommon {
    constructor() {
        super(ResourceList.CART);
        this.itemsCont = new Container();
        
        this.anymateInCartStart = (clone) => {
            gsap.to(clone, {
                x: 0,
                y: -800,
                rotation: Math.random() * Math.PI / 2 - Math.PI / 4,
                onComplete: this.anymateInCartFinish,
                onCompleteParams:[clone],
                ease: "power2.out",
                duration: itemJumpDuration / 3
            });
        };

        this.anymateInCartFinish = (clone) => {
                gsap.to(clone, {
                x: clone.inCartPoint.x,
                y: clone.inCartPoint.y,
                rotation: Math.random() * Math.PI / 2 - Math.PI / 4,
                ease: "power2.in",
                delay: 0,
                duration: itemDropDuration
            });
            gsap.to(clone.scale, {
                x: 0.9,
                y: 0.9,
                // ease: "power2.out",
                duration: 0.3
            }); 
            
        };

        gsap.registerPlugin(PixiPlugin);
        this.addChild(this.itemsCont);
    }

    cloneItem(item) {
        const destinationContainer = this;
        const inCartPoint = this.getTargetPoint();
        const clone = new ClonedItemSprite(item.resourceName, inCartPoint);
        const sourceMatrix = item.transform.worldTransform.clone();
        clone.anchor.set(item.anchor.x, item.anchor.y);
        let reverseTransformMatrix = new Matrix();

        let currentContainer = destinationContainer;
        while (currentContainer) {
            reverseTransformMatrix = reverseTransformMatrix.append(currentContainer.transform.worldTransform.clone().invert());
            currentContainer = currentContainer.parent;
        }

        sourceMatrix.prepend(reverseTransformMatrix);
        clone.transform.setFromMatrix(sourceMatrix);
        this.itemsCont.addChild(clone);
        this.anymateInCartFinish(clone);
        this.removeExtraItems();
    }

    getTargetPoint() {
        const p = new Point();
        p.x = Math.random() * 90 - 45;
        p.y = Math.random() * 50 - 70;
        return p;
    }

    removeExtraItems() {
        while (this.itemsCont.children.length > displayItemsInCart) {
            this.itemsCont.removeChildAt(0);
        }
    }
}
export class CartOver extends SpriteCommon {
    constructor(gameModel) {
        super(ResourceList.CART_OVER);
        this.gameModel = gameModel;
        
        this.magnetIcon = new SpriteCommon(ResourceList.ITEM_MAGNET);
        this.speedUpIcon = new SpriteCommon(ResourceList.ITEM_SPEEDUP);
        this.addChild(this.magnetIcon);
        this.addChild(this.speedUpIcon);

        this.magnetIcon.blendMode = PIXI.BLEND_MODES.ADD;
        this.speedUpIcon.blendMode = PIXI.BLEND_MODES.ADD;

        this.magnetIcon.anchor.set(0.5, 0.5);
        this.speedUpIcon.anchor.set(0.5, 0.5);

        this.magnetIcon.y = - 100;
        this.speedUpIcon.y = - 100;
        this.speedUpIcon.visible = false;
        this.magnetIcon.visible = false;

        this.t = 0;

        this.gameModel.extraStatusUpdated.add((extraID, isOn) => {        
            if (extraID === EItemsID.SPEED_UP){
                this.speedUpIcon.visible = isOn;
            }
            if (extraID === EItemsID.MAGNET){
                this.magnetIcon.visible = isOn;
            }
        });
    }

    animate() {
        this.t += 0.1;
        this.magnetIcon.x =  8 * Math.cos(this.t) * Math.sin(this.t);
        this.magnetIcon.y =  6 * Math.sin(this.t) - 100;
        const sc = 1 +  Math.sin(this.t) / 20;
        this.magnetIcon.scale.set(sc, sc);

        this.speedUpIcon.x =  8 * Math.cos(this.t + Math.PI) * Math.sin(this.t);
        this.speedUpIcon.y =  8 * Math.sin(this.t + Math.PI) - 100;

        this.speedUpIcon.scale.set(sc, sc);


    }


    
}
