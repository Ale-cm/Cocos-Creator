
import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Animations')
export class Animations extends Component {

    start() {
        var model = this.getComponent(Animation);
        model.play("cocos_anim_walk");
        model.on(Animation.EventType.LASTFRAME, this.lastF, this);
    }

    lastF() {
        var model = this.getComponent(Animation);
        model.play("cocos_anim_idle");
    }
}
