
import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, Animation, Camera, Collider, ICollisionEvent } from 'cc';
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
@ccclass('Jugador')
export class Jugador extends Component {
    // 8 direcciones arriba abajo derecha izquierda arribaizq arribader abajoizq abajoder
    private _w: number = 0;
    private _a: number = 0;
    private _s: number = 0;
    private _d: number = 0;
    // 0 = la tecla no esta siendo apretada, 2 = la tecla esta siendo apretada, 1 = la tecla esta siendo apretada pero se apreto antes la tecla opuesta a esta
    private _dirActual: number = DIRS.IDLE; //direccion actual
    private _animActual: number = ANIMS.IDLE; //animacion actual
    private _animacion: Animation = null;
    private _corriendo: boolean = false;
    private _velocidad1: number = 0;
    private _velocidad2: number = 0;
    private _atacando: boolean = false;

    @property(Camera)
    private camara: Camera;

    start() {
        this._animacion = this.node.getChildByName("Cocos").getComponent(Animation);
        this._animacion.play("cocos_anim_idle");
        this._animActual = ANIMS.IDLE;

        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.keyUp, this);

        this.node.getComponent(Collider).on("onCollisionEnter", this.collisionEnter, this)

    }

    update() {
        if (this._dirActual != DIRS.IDLE && this._animActual == ANIMS.IDLE) {
            this._animacion.play("cocos_anim_walk");
            this._animActual = ANIMS.CAMINAR;
            this._velocidad1 = 0.05;
            this._velocidad2 = 0.0707;
        }
        else if (this._dirActual == DIRS.IDLE) {
            if (this._animActual == ANIMS.CORRER || this._animActual == ANIMS.CAMINAR) {
                this._animacion.play("cocos_anim_idle");
                this._animActual = ANIMS.IDLE;
            }
        }
        else if (this._dirActual != DIRS.IDLE && this._animActual == ANIMS.CAMINAR && this._corriendo) {
            this._animacion.play("cocos_anim_run");
            this._animActual = ANIMS.CORRER;
            this._velocidad1 = 0.075;
            this._velocidad2 = 0.10605;
        }

        let posicion = this.node.position;
        switch (this._dirActual) {
            case 1: //caso ARRIBA
                this.node.setPosition(posicion.x + this._velocidad1, posicion.y, posicion.z - this._velocidad1);
                this.node.setRotationFromEuler(0, 135, 0); //lado para el que ve el personaje estos valores van a ser siempre iguales
                break;
            case 2: //caso ABAJO
                this.node.setPosition(posicion.x - this._velocidad1, posicion.y, posicion.z + this._velocidad1);
                this.node.setRotationFromEuler(0, 315, 0);
                break;
            case 3: //caso DERECHA
                this.node.setPosition(posicion.x + this._velocidad1, posicion.y, posicion.z + this._velocidad1);
                this.node.setRotationFromEuler(0, 45, 0);
                break;
            case 4: //caso IZQUIERDA
                this.node.setPosition(posicion.x - this._velocidad1, posicion.y, posicion.z - this._velocidad1);
                this.node.setRotationFromEuler(0, 225, 0);
                break;
            case 5: //caso ARRIBADERECHA
                this.node.setPosition(posicion.x + this._velocidad2, posicion.y, posicion.z);
                this.node.setRotationFromEuler(0, 90, 0);
                break;
            case 6: //caso ARRIBAIZQUIERDA
                this.node.setPosition(posicion.x, posicion.y, posicion.z - this._velocidad2);
                this.node.setRotationFromEuler(0, 180, 0);
                break;
            case 7: //caso ABAJODERECHA
                this.node.setPosition(posicion.x, posicion.y, posicion.z + this._velocidad2);
                this.node.setRotationFromEuler(0, 0, 0);
                break;
            case 8: //caso ABAJOIZQUIERDA
                this.node.setPosition(posicion.x - this._velocidad2, posicion.y, posicion.z);
                this.node.setRotationFromEuler(0, 270, 0);
                break;
        }
        this.camara.node.setPosition(posicion.x - 10, posicion.y + 10, posicion.z + 10);
    }//update es una funcion que se ejecuta en cada frame

    keyDown(event: EventKeyboard) {
        //W = 87, A = 65, S = 83, D = 68 y ESPACIO = 32.
        //ctrl = 17 (agachar), shift = 16 (correr), con boton del mouse(atacar), z = 90(acostarse)
        switch (event.keyCode) {
            case 87:
                this._w = 2;
                if (this._s == 2) {
                    this._w = 1;
                }
                break;
            case 83:
                this._s = 2;
                if (this._w == 2) {
                    this._s = 1;
                }
                break;
            case 65:
                this._a = 2;
                if (this._d == 2) {
                    this._a = 1;
                }
                break;
            case 68:
                this._d = 2;
                if (this._a == 2) {
                    this._d = 1;
                }
                break;
            case 32:
                this.saltar();
                break;
            case 16:
                //correr "cocos_anim_run", una variable que me dice si esta corriendo o no
                this._corriendo = true;
                break;
            case 17:
                //agacharse "cocos_anim_squat" se puede reproducir solo cuando se esta estado idle o acostado
                this.agacharse();
                break;
            case 90:
                this.ataque();
                this._atacando = true;
                break;
        }
        this.obtieneDireccion();
    }
    ataque() {
        if (this._animActual != ANIMS.ATACAR) {
            this._animActual = ANIMS.ATACAR;
            this._animacion.play("cocos_anim_attack");
            this._animacion.once(Animation.EventType.LASTFRAME, this.terminarAnimacion, this);
        }
    }
    saltar() {
        if (this._animActual != ANIMS.SALTAR) {
            this._animActual = ANIMS.SALTAR;
            this._animacion.play("cocos_anim_jump");
            this._animacion.once(Animation.EventType.LASTFRAME, this.terminarAnimacion, this);
        }
    }
    agacharse() {
        if (this._animActual != ANIMS.AGACHAR && this._animActual != ANIMS.CAMINAR && this._animActual != ANIMS.CORRER) {
            this._animActual = ANIMS.AGACHAR;
            this._animacion.play("cocos_anim_squat");
        }
    }
    terminarAnimacion() {
        this._animActual = ANIMS.IDLE;
        this._animacion.play("cocos_anim_idle");
        this._atacando = false;
    }

    keyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case 87:
                this._w = 0;
                if (this._s == 1) {
                    this._s = 2;
                }
                break;
            case 83:
                this._s = 0;
                if (this._w == 1) {
                    this._w = 2;
                }
                break;
            case 65:
                this._a = 0;
                if (this._d == 1) {
                    this._d = 2;
                }
                break;
            case 68:
                this._d = 0;
                if (this._a == 1) {
                    this._a = 2;
                }
                break;
            case 16:
                //correr "cocos_anim_run", una variable que me dice si esta corriendo o no
                this._corriendo = false;
                break;
            case 17:
                this.terminarAnimacion();
                //normalmente uno puede tener una animacion de agacharse y una de pararse por lo tanto trabajariamos con dos animaciones en este caso hay una sola que tiene principio y fin.
                break;
        }
        this.obtieneDireccion();
    }
    private obtieneDireccion(): void {
        if (this._w + this._a + this._s + this._d == 0) {
            this._dirActual = DIRS.IDLE;
        }
        else {
            if (this._w + this._a + this._s + this._d >= 4) {
                if (this._w == 2 && this._a == 2) {
                    this._dirActual = DIRS.ARRIZQ;
                }
                else if (this._w == 2 && this._d == 2) {
                    this._dirActual = DIRS.ARRDER;
                }
                else if (this._s == 2) {
                    if (this._a == 2) {
                        this._dirActual = DIRS.ABIZQ;
                    }
                    else {
                        this._dirActual = DIRS.ABDER;
                    }
                }
            }
            else {
                if (this._w == 2) {
                    this._dirActual = DIRS.ARRIBA;
                }
                else {
                    if (this._s == 2) {
                        this._dirActual = DIRS.ABAJO;
                    }
                    else {
                        if (this._a == 2) {
                            this._dirActual = DIRS.IZQUIERDA;
                        }
                        else {
                            this._dirActual = DIRS.DERECHA;
                        }
                    }
                }
            }
        }
    }
    collisionEnter(event: ICollisionEvent) {
        if (this._atacando) {
            console.log(event.otherCollider.node.getChildByName("Cocos"));
        }
    }
    onDestroy() {

        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }
}
