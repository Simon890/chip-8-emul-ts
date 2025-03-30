import { KEY_MAP, NUMBER_TO_KEY } from "./constants/keyboardConstants"

export class Keyboard {

    private _keysPressed : Map<string, boolean>;
    private _listeners : {[key: string] : Function};

    constructor() {
        this._listeners = {};
        this._keysPressed = new Map(
            Object.entries(KEY_MAP).map(entry => [entry[0], false])
        );
        this._listenToEvents();
    }

    private _listenToEvents() {
        document.addEventListener("keydown", e => this._onKeyDown(e));
        document.addEventListener("keyup", e => this._onKeyUp(e));
    }

    public addListener(eventName : string, cb : Function) {
        this._listeners[eventName] = cb;
    }

    public removeListener(eventName : string) {
        delete this._listeners[eventName];
    }

    public isKeyDown(key : string | number) : boolean {
        let value : string | number = key;
        if(typeof value == "number") {
            value = NUMBER_TO_KEY[key as keyof typeof NUMBER_TO_KEY];
        }
        if(!this._keysPressed.has(value)) return false;
        return this._keysPressed.get(value)!;
    }

    private _onKeyDown(e : KeyboardEvent) {
        const key = e.key.toLowerCase();
        this._keysPressed.set(key, true);
        if("keydown" in this._listeners) {
            this._listeners["keydown"](KEY_MAP[key as keyof typeof KEY_MAP]);
        }
    }

    private _onKeyUp(e : KeyboardEvent) {
        const key = e.key.toLowerCase();
        this._keysPressed.set(key, false);
        if("keyup" in this._listeners) {
            this._listeners["keyup"](KEY_MAP[key as keyof typeof KEY_MAP]);
        }
    }
}