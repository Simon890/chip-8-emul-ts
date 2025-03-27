import { START_PROGRAM_ADDRESS } from "./constants/memoryConstants";
import { Stack } from "./Stack";

export class Register {

    /**
     * Chip-8 has 16 general purpose 8-bit registers, usually referred to as Vx, where x is a hexadecimal digit (0 through F)
     * 
     * The VF register should not be used by any program, as it is used as a flag by some instructions
     */
    private _V : Uint8Array;
    
    /**
     * A 16-bit register. This register is generally used to store memory addresses, so only the lowest (rightmost) 12 bits are usually used.
     */
    private _I : number;

    /**
     * A 8-bit register. When it is non-zero, it is automatically decremented at a rate of 60Hz.
     */
    private _delayTimer : number;

    /**
     * A 8-bit register. When it is non-zero, it is automatically decremented at a rate of 60Hz.
     */
    private _soundTimer : number;

    /**
     * Program Counter. A 16-bit register. It is used to store the currently executing address.
     */
    private _PC : number;

    /**
     * Array of 16 16-bit values, used to store the address that the interpreter should return to when finished with a subroutine.
     */
    private _stack : Stack;

    constructor() {
        this._V = new Uint8Array(16);
        this._V.fill(0);
        this._I = 0;
        this._delayTimer = 0;
        this._soundTimer = 0;
        this._PC = START_PROGRAM_ADDRESS;
        this._stack = new Stack();
    }
}