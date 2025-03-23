import { MEMORY_SIZE } from "./constants/memoryConstants";
import { MemoryOutOfBounds } from "./errors/MemoryOutOfBounds";

export class Memory {

    private _buffer : Uint8Array;

    constructor() {
        this._buffer = new Uint8Array(MEMORY_SIZE);
        this.reset();
    }

    public reset() {
        this._buffer.fill(0);
    }

    public setMemory(index : number, value : number) {
        this._validateMemory(index);
        this._buffer[index] = value;
    }

    public getMemory(index : number) {
        this._validateMemory(index);
        return this._buffer[index];
    }

    private _validateMemory(index : number) {
        if(index < 0 || index >= MEMORY_SIZE) throw new MemoryOutOfBounds(index);
    }

}