
import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

enum DIRS {
    IDLE = 0,
    ARRIBA,
    ABAJO,
    DERECHA,
    IZQUIERDA,
    ARRDER,
    ARRIZQ,
    ABDER,
    ABIZQ
}
enum ANIMS {
    IDLE = 0,
    CAMINAR,
    SALTAR,
    CORRER,
    ATACAR,
    AGACHAR,
    ACOSTARSE,

}
@ccclass('Enemigo')
export class Enemigo extends Component {
    private _dirEnemigo: number = DIRS.IDLE; //direccion actual
    private _animEnemigo: number = ANIMS.IDLE; //animacion actual
    private _animacionEnemigo: Animation = null;
    private _tipoEnemigo: any = null;
    private _contadorTiempo: number = 0;
    start() {
        this._tipoEnemigo = this.node.name;
        console.log(this._tipoEnemigo)

        if (this._tipoEnemigo == "NodoEnemigoCocos") {
            this._animacionEnemigo = this.node.getChildByName("Cocos").getComponent(Animation);
            this._animacionEnemigo.play("cocos_anim_idle");
            this._animEnemigo = ANIMS.IDLE;
        }
    }
    update(tiempo: number) {
        this._contadorTiempo += tiempo;
        if (this._contadorTiempo >= 4) {
            this._contadorTiempo = 0;
            this._dirEnemigo = this.aplicoDir();
            let nuevaAnimacion = this.aplicoAnim();

            if (this._animEnemigo != nuevaAnimacion) {
                this._animEnemigo = nuevaAnimacion;
                if (this._animEnemigo == ANIMS.IDLE) {
                    this._animacionEnemigo.play("cocos_anim_idle");
                }
                else if (this._animEnemigo == ANIMS.ATACAR) {
                    this._animacionEnemigo.play("cocos_anim_attack");
                    this._animacionEnemigo.once(Animation.EventType.LASTFRAME, this.terminarAnimacion, this);
                }
                else if (this._animEnemigo == ANIMS.CAMINAR) {
                    this._animacionEnemigo.play("cocos_anim_walk");
                }
            }

        }
        let posicion = this.node.position;
        if (this._animEnemigo == ANIMS.CAMINAR && this._tipoEnemigo == "NodoEnemigoCocos") {
            switch (this._dirEnemigo) {
                case 1: //caso ARRIBA
                    this.node.setPosition(posicion.x + 0.05, posicion.y, posicion.z - 0.05);
                    this.node.setRotationFromEuler(0, 135, 0); //lado para el que ve el personaje estos valores van a ser siempre iguales
                    break;
                case 2: //caso ABAJO
                    this.node.setPosition(posicion.x - 0.05, posicion.y, posicion.z + 0.05);
                    this.node.setRotationFromEuler(0, 315, 0);
                    break;
                case 3: //caso DERECHA
                    this.node.setPosition(posicion.x + 0.05, posicion.y, posicion.z + 0.05);
                    this.node.setRotationFromEuler(0, 45, 0);
                    break;
                case 4: //caso IZQUIERDA
                    this.node.setPosition(posicion.x - 0.05, posicion.y, posicion.z - 0.05);
                    this.node.setRotationFromEuler(0, 225, 0);
                    break;
                case 5: //caso ARRIBADERECHA
                    this.node.setPosition(posicion.x + 0.0707, posicion.y, posicion.z);
                    this.node.setRotationFromEuler(0, 90, 0);
                    break;
                case 6: //caso ARRIBAIZQUIERDA
                    this.node.setPosition(posicion.x, posicion.y, posicion.z - 0.0707);
                    this.node.setRotationFromEuler(0, 180, 0);
                    break;
                case 7: //caso ABAJODERECHA
                    this.node.setPosition(posicion.x, posicion.y, posicion.z + 0.0707);
                    this.node.setRotationFromEuler(0, 0, 0);
                    break;
                case 8: //caso ABAJOIZQUIERDA
                    this.node.setPosition(posicion.x - 0.0707, posicion.y, posicion.z);
                    this.node.setRotationFromEuler(0, 270, 0);
                    break;
            }
        }
    }

    aplicoDir(): number {
        return Math.floor(Math.random() * 8) + 1;
    }
    aplicoAnim(): number {
        let randm = Math.floor(Math.random() * 10);
        let anim = ANIMS.IDLE;
        if (randm == 3) {
            anim = ANIMS.ATACAR;
        }
        else if (randm > 3) {
            anim = ANIMS.CAMINAR;
        }
        return anim;
    }
    terminarAnimacion() {
        this._animEnemigo = ANIMS.IDLE;
        this._animacionEnemigo.play("cocos_anim_idle");
    }

}
