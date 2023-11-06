import SpriteCommon from "./SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import ItemSprite from "../goods/ItemSprite";
import { Matrix } from "pixi.js";

class Cart extends SpriteCommon{
    private cartGraph?:SpriteCommon;
    constructor(){
        super(ResourceList.CART);
    }

    public cloneItem2(item:ItemSprite):void {
        const clone:SpriteCommon = new SpriteCommon(item.resourceName);
        clone.scale.set(item.scale.x / this.scale.x);
        clone.anchor.x  = item.anchor.x;
        clone.anchor.y  = item.anchor.y;
        // clone.x = (item.x - this.x) * this.scale.x;
        clone.x = (item.x - this.x) * 0.5;
        // clone.y = -item.y * this.scale.y;
        clone.y = -item.y * 0.5 + this.height * 0.25;
        this.addChild(clone);
        // clone.transform = item.transform;
    }

    public cloneItem3(item:ItemSprite):void {
        const clone:SpriteCommon = new SpriteCommon(item.resourceName);
        const mx:Matrix = item.transform.worldTransform;
        mx.applyInverse
        clone.transform.setFromMatrix(item.transform.worldTransform);
        this.addChild(clone);
    
    }
    public cloneItem(item:ItemSprite):void {

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

    public cloneItem4(item:ItemSprite):void {

        const clone:SpriteCommon = new SpriteCommon(item.resourceName);
        this.addChild(clone);
        // Get the transformation matrix of the source sprite including all ancestors
        const sourceMatrix = item.transform.worldTransform;
    
        // Get the transformation matrix of the destination sprite's parent container
        const parentMatrix = clone.parent.transform.worldTransform;
    
        // Calculate the relative transformation matrix
        const relativeMatrix = new Matrix();
        relativeMatrix.append(parentMatrix);
        relativeMatrix.append(sourceMatrix);

    
        // Apply the relative transformation to the destination sprite
        clone.transform.setFromMatrix(relativeMatrix);
    }

    
}

export default Cart