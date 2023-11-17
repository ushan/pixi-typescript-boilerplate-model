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
    cloneItemV2(item) {
        const clone = new SpriteCommon(item.resourceName);
        clone.scale.set(item.scale.x / this.scale.x);
        clone.anchor.x = item.anchor.x;
        clone.anchor.y = item.anchor.y;
        clone.x = (item.x - this.x) * 0.5;
        clone.y = -item.y * 0.5 + this.height * 0.25;
        this.addChild(clone);
        // clone.transform = item.transform;
    }
    cloneItemV3(item) {
        const clone = new SpriteCommon(item.resourceName);
        const mx = item.transform.worldTransform;
        mx.applyInverse;
        clone.transform.setFromMatrix(item.transform.worldTransform);
        this.addChild(clone);
    }
    cloneItemV6(item) {
        const sourceMatrix = item.transform.worldTransform;
        // Get the transformation matrix of the destination sprite's parent container
        const clone = new SpriteCommon(item.resourceName);
        const parentMatrix = this.transform.worldTransform;
        // Calculate the inverse of the parent's transformation matrix
        const parentInverseMatrix = parentMatrix.clone();
        parentInverseMatrix.invert();
        // Multiply the source matrix by the inverse of the parent matrix to get the relative transformation
        // const relativeMatrix = sourceMatrix.clone().append(parentInverseMatrix);
        const relativeMatrix = parentInverseMatrix.clone().append(sourceMatrix);
        // Apply the relative transformation to the destination sprite
        clone.transform.setFromMatrix(sourceMatrix);
        this.addChild(clone);
    }
    cloneItemV7(item) {
        const clone = new SpriteCommon(item.resourceName);
        const sourceMatrix = item.transform.worldTransform.clone();
        clone.transform.setFromMatrix(sourceMatrix);
        clone.anchor.set(item.anchor.x, item.anchor.y);
        this.addChild(clone);
    }
    cloneItemV8(item) {
        const clone = new SpriteCommon(item.resourceName);
        const sourceMatrix = item.transform.worldTransform.clone();
        const invertedMatrix = this.transform.worldTransform.clone().invert();
        const modifiedMatrix = sourceMatrix.append(invertedMatrix);
        clone.transform.setFromMatrix(modifiedMatrix);
        clone.anchor.set(item.anchor.x, item.anchor.y);
        this.addChild(clone);
    }
    cloneItemV5(item) {
        const clone = new SpriteCommon(item.resourceName);
        const sourceMatrix = item.transform.worldTransform.clone();
        // Clone the anchor point as well
        clone.anchor.set(item.anchor.x, item.anchor.y);
        // Clone the transformation
        clone.transform.setFromMatrix(sourceMatrix);
        // Invert the transformations of the destinationContainer
        const invertedMatrix = this.transform.worldTransform.clone().invert();
        // Apply the inverted transformations to the cloned sprite
        clone.transform.localTransform.copyFrom(invertedMatrix);
        // Add the cloned sprite to the destination container
        this.addChild(clone);
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
