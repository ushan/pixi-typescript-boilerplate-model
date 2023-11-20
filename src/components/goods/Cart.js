import SpriteCommon from "../common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import { Container, Matrix, Point } from "pixi.js";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import ClonedItemSprite from "./ClonedItemSprite";
import { AppConfig } from "../../config";
const { itemJumpDuration, itemDropDuration, displayItemsInCart } = AppConfig.animationSettings;
export class Cart extends SpriteCommon {
    constructor() {
        super(ResourceList.CART);
        this.itemsCont = new Container();
        
        this.anymateInCartStart = (clone) => {
            gsap.to(clone, {
                x: 0,
                y: -800,
                rotation: 0,
                onComplete: this.anymateInCartFinish,
                ease: "power2.out",
                duration: itemJumpDuration
            });
        };

        this.anymateInCartFinish = (clone) => {
            gsap.to(clone, {
                x: clone.inCartPoint.x,
                y: clone.inCartPoint.y,
                rotation: Math.random() * Math.PI / 2 - Math.PI / 4,
                ease: "power2.in",
                delay: itemJumpDuration,
                duration: itemDropDuration
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
            // Apply the inverse of the current container's transformation to the reverseTransformMatrix
            reverseTransformMatrix = reverseTransformMatrix.append(currentContainer.transform.worldTransform.clone().invert());
            currentContainer = currentContainer.parent;
        }
        
        sourceMatrix.prepend(reverseTransformMatrix);
        clone.transform.setFromMatrix(sourceMatrix);
        // destinationContainer.addChild(clone);
        this.itemsCont.addChild(clone);
        this.anymateInCartStart(clone);
        this.anymateInCartFinish(clone);
        this.removeExtraItems();
    }

    getTargetPoint() {
        const p = new Point();
        p.x = Math.random() * 120 - 60;
        p.y = Math.random() * 140 - 70;
        return p;
    }

    removeExtraItems() {
        while (this.itemsCont.children.length > displayItemsInCart) {
            this.itemsCont.removeChildAt(0);
        }
    }
}
export class CartOver extends SpriteCommon {
    constructor() {
        super(ResourceList.CART_OVER);
    }
}
