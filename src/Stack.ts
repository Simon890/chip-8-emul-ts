import { STACK_SIZE } from "./constants/registryConstants";
import { StackOverflow } from "./errors/StackOverflow";
import { StackUnderflow } from "./errors/StackUnderflow";

export class Stack {

    /**
     * An array of 16 16-bit values, used to store the address that the interpreter should return to when finished with a subroutine.
     */
    private _buffer : Uint16Array;

    /**
     * Stack Pointer. A 8-bit register. It is used to point to the topmost level of the stack.
     */
    private _SP : number;
    
    constructor() {
        this._buffer = new Uint16Array(STACK_SIZE);
        this._buffer.fill(0);
        this._SP = 0;
    }

    public get SP() {
        return this._SP;
    }

    public push(value : number) {
        if(this._SP >= this._buffer.length) throw new StackOverflow(this._SP);
        this._buffer[this._SP] = value;
        this._SP++;
    }

    public pop() {
        this._SP--;
        if(this._SP < 0) throw new StackUnderflow(this._SP);
        const value = this._buffer[this._SP];
        return value;
    }

}