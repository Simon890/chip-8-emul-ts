import { EVENT_MEMORY_UPDATED } from "./constants/eventsConstants";
import { MEMORY_SIZE, START_PROGRAM_ADDRESS, STRIPE_CHARSET } from "./constants/memoryConstants";
import { MemoryOutOfBounds } from "./errors/MemoryOutOfBounds";
import { EventHandler } from "./EventEmitter";

export class Memory {

    private _buffer : Uint8Array;

    constructor() {
        this._buffer = new Uint8Array(MEMORY_SIZE);
        this.reset();
    }

    public reset() {
        this._buffer.fill(0);
        this._buffer.set(STRIPE_CHARSET, 0);
    }

    public loadRom(rom : ArrayLike<number>) {
        this._buffer.set(rom, START_PROGRAM_ADDRESS);
        EventHandler.instance.emit(EVENT_MEMORY_UPDATED, this._buffer, START_PROGRAM_ADDRESS)
    }

    public setMemory(index : number, value : number) {
        this._validateMemory(index);
        this._buffer[index] = value;
    }

    public getMemory(index : number) {
        this._validateMemory(index);
        return this._buffer[index];
    }

    public getOpcode(index : number) {
        const highByte = this.getMemory(index);
        const lowByte = this.getMemory(index + 1);
        return (highByte << 8) | lowByte;
    }

    private _validateMemory(index : number) {
        if(index < 0 || index >= MEMORY_SIZE) throw new MemoryOutOfBounds(index);
    }

}