import { Display } from "./Display";
import { Memory } from "./Memory";

export class Chip8 {
    
    private _memory : Memory;

    private _display : Display;

    constructor() {
        this._memory = new Memory();
        this._display = new Display(this._memory);
    }

    public get display() {
        return this._display;
    }

    public get memory() {
        return this._memory;
    }
}