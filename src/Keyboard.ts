import { KEY_MAP } from "./constants/keyboardConstants"

export class Keyboard {

    private _keysPressed : Map<string, boolean>;

    constructor() {
        this._keysPressed = new Map(
            Object.entries(KEY_MAP).map(entry => [entry[0], false])
        );
        this._listenToEvents();
    }

    private _listenToEvents() {
        document.addEventListener("keydown", e => this._onKeyDown(e));
        document.addEventListener("keyup", e => this._onKeyUp(e));
    }

    private _onKeyDown(e : KeyboardEvent) {
        const key = e.key.toLowerCase();
        this._keysPressed.set(key, true);
    }

    private _onKeyUp(e : KeyboardEvent) {
        const key = e.key.toLowerCase();
        this._keysPressed.set(key, false);
    }
}