import { _decorator, Component, Node, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rigid')
export class Rigid extends Component {

    start() {
        //traer rigid body
        var rigidB = this.node.getComponent(RigidBody);

        //rigidB.useGravity = true;

        //rigidB.applyImpulse(new Vec3(0, 0, 0));
        //rigidB.setLinearVelocity(new Vec3(0, 0, 0));
        //rigidB.setAngularVelocity(new Vec3(5, 0, 0));


    }

}
