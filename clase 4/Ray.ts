
import { _decorator, Component, Node, geometry, Vec3, PhysicsSystem } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ray')
export class Ray extends Component {

    start() {
        //crear ray punto de incio y direccion
        var ray = geometry.Ray.create(1, 0, 0, 0, 0, 1);
        var ray2 = new geometry.ray();
        geometry.Ray.fromPoints(ray2, new Vec3(0, 0, 0), new Vec3(0, 0, 1));
        console.log("ray 2", ray2);
        console.log("ray 1", ray);

        if (PhysicsSystem.instance.raycast(ray)) {
            console.log("resultados de ray", PhysicsSystem.instance.raycastResults)
        }
    }
}
