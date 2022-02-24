
import { _decorator, Component, Node, Collider, PlaneCollider, onCollisionEnter } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Coll')
export class Coll extends Component {

    start() {
        var collider = this.node.getComponent(Collider);
        console.log(collider);
        // var plane = this.node.getComponent(PlaneCollider);
        // console.log(plane);

        // "onCollisionEnter/Stay/Exit" "onTriggerEnter/Stay/Exit"
        collider.on("onCollisionEnter", this.collisionEnter, this);
        collider.on("onCollisionStay", this.collisionStay, this);
        collider.on("onCollisionExit", this.collisionExit, this);
    }

    private collisionEnter(event: ICollisionEvent): void {
        console.log("collision enter", event);
    }

    private collisionStay(event: ICollisionEvent): void {
        console.log("collision stay", event);
    }

    private collisionExit(event: ICollisionEvent): void {
        console.log("collision exit", event);
    }

}


