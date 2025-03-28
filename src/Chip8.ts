import { Display } from "./Display";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory";

export class Chip8 {
    
    private _memory : Memory;

    private _display : Display;

    private _keyboard : Keyboard;

    constructor() {
        this._memory = new Memory();
        this._display = new Display(this._memory);
        this._keyboard = new Keyboard();
    }

    public get display() {
        return this._display;
    }

    public get memory() {
        return this._memory;
    }
}