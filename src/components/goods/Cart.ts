import SpriteCommon from "../common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import ItemSprite from "./ItemSprite";
import { Container, IPoint, IPointData, Matrix, ObservablePoint, Point } from "pixi.js";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import ClonedItemSprite from "./ClonedItemSprite";
import { AppConfig } from "../../config";

const {itemJumpDuration, itemDropDuration} = AppConfig.animationSettings;

class Cart extends SpriteCommon{
    private cartGraph?:SpriteCommon;
    constructor(){
        super(ResourceList.CART);
        gsap.registerPlugin(PixiPlugin);
    }

    private cloneItemV2(item:ItemSprite):void {
        const clone:SpriteCommon = new SpriteCommon(item.resourceName);
        clone.scale.set(item.scale.x / this.scale.x);
        clone.anchor.x  = item.anchor.x;
        clone.anchor.y  = item.anchor.y;
        clone.x = (item.x - this.x) * 0.5;
        clone.y = -item.y * 0.5 + this.height * 0.25;
        this.addChild(clone);
        // clone.transform = item.transform;
    }

    private cloneItemV3(item:ItemSprite):void {
        const clone:SpriteCommon = new SpriteCommon(item.resourceName);
        const mx:Matrix = item.transform.worldTransform;
        mx.applyInverse
        clone.transform.setFromMatrix(item.transform.worldTransform);
        this.addChild(clone);
    
    }
    private cloneItemV6(item:ItemSprite):void {

        const sourceMatrix = item.transform.worldTransform;

        // Get the transformation matrix of the destination sprite's parent container
        const clone:SpriteCommon = new SpriteCommon(item.resourceName);
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

    private cloneItemV7(item:ItemSprite):void {
        const clone = new SpriteCommon(item.resourceName);
        const sourceMatrix = item.transform.worldTransform.clone();
        clone.transform.setFromMatrix(sourceMatrix);
        clone.anchor.set(item.anchor.x,item.anchor.y);
        this.addChild(clone);
    }

    private cloneItemV8(item:ItemSprite):void {
        const clone = new SpriteCommon(item.resourceName);
        const sourceMatrix = item.transform.worldTransform.clone(); 
        const invertedMatrix = this.transform.worldTransform.clone().invert();
        const modifiedMatrix =  sourceMatrix.append(invertedMatrix);     
        clone.transform.setFromMatrix(modifiedMatrix);
        clone.anchor.set(item.anchor.x,item.anchor.y);
        this.addChild(clone);
    }

    private cloneItemV5(item: ItemSprite, ): void {
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

    public cloneItem(item: ItemSprite): void {
        const destinationContainer = this as Container;
        const inCartPoint = this.getTargetPoint();
        const clone = new ClonedItemSprite(item.resourceName, inCartPoint);
        const sourceMatrix = item.transform.worldTransform.clone();

        clone.anchor.set(item.anchor.x, item.anchor.y);

        let reverseTransformMatrix = new Matrix();
        let currentContainer = destinationContainer;
        while (currentContainer) {
            // Apply the inverse of the current container's transformation to the reverseTransformMatrix
            reverseTransformMatrix = reverseTransformMatrix.append(currentContainer.transform.worldTransform.clone().invert());
            currentContainer = currentContainer.parent as Container;
        }
    
        sourceMatrix.prepend(reverseTransformMatrix);
        clone.transform.setFromMatrix(sourceMatrix);
        destinationContainer.addChild(clone);
        
        this.anymateInCartStart(clone);
        this.anymateInCartFinish(clone);

    }

    private getTargetPoint():Point
    {
        const p = new Point();
        p.x = Math.random() * 80 - 40;
        p.y = Math.random() * 100 - 50;
        return p
    }

    private anymateInCartStart = (clone:ClonedItemSprite):void => {
        gsap.to(clone, {
            x           :0,
            y           :-800, 
            rotation    :0,
            onComplete  :this.anymateInCartFinish,
            ease        : "power2.out",
            duration    :itemJumpDuration});
    }

    private anymateInCartFinish = (clone:ClonedItemSprite):void  => {
        gsap.to(clone, {
            x           :clone.inCartPoint.x, 
            y           :clone.inCartPoint.y, 
            rotation    :Math.random() * Math.PI / 4 - Math.PI / 8,
            ease        :"power2.in",
            delay       :itemJumpDuration,
            duration    :itemDropDuration});
    }
    
    

    
}

export default Cart