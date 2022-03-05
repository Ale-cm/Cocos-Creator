
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('Start')
export class Start extends Component {

    start() {
        director.preloadScene("scene");
    }

    cambiarEscena() {
        director.loadScene("scene");
    }


}
