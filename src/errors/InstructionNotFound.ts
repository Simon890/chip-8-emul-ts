export class InstructionNotFound extends Error {
    constructor(opcode : number) {
        super(`Instruction 0x${opcode.toString(16)} does not exist`);
    }
}