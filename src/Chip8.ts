import { Memory } from "./Memory";

export class Chip8 {
    
    private _memory : Memory;

    constructor() {
        this._memory = new Memory();
    }

    public get memory() {
        return this._memory;
    }
}