
import { _decorator, Component, Node, systemEvent, SystemEvent, KeyCode, EventKeyboard } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Events')
export class Events extends Component {

    start() {
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this.sopa, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_END, this.touchEnd, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.touchMove, this);
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }
    sopa() {
        console.log("aprete el mouse");
    }
    touchEnd() {
        console.log("solte el mouse");
    }
    touchMove() {
        console.log("movi el mouse");
    }
    keyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case 87:
                console.log("w")
                break;
            case 65:
                console.log("a")
                break;
            case 83:
                console.log("s")
                break;
            case 68:
                console.log("d")
                break;
            case 32:
                console.log("espacio")
                break;
        }
        // if(event.keyCode == 87){ console.log("w"); }else{ if(event.keyCode == 65){ console.log("a"); } else { ... }}
    }
    keyUp(event: EventKeyboard) {
        console.log(event.keyCode);
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.TOUCH_START, this.sopa, this);
        systemEvent.off(SystemEvent.EventType.TOUCH_END, this.touchEnd, this);
        systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.touchMove, this);
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }

}

